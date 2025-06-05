import { useState } from 'react';

const BookingForm = ({ availability, selectedDate, onSubmit, loading }) => {
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourt || !selectedTimeSlot) {
      alert('Please select a court and time slot');
      return;
    }

    const bookingData = {
      courtId: selectedCourt,
      timeSlotId: selectedTimeSlot,
      bookingDate: selectedDate.toISOString(),
      numberOfPlayers,
      playerNames: playerNames.filter(name => name.trim() !== '')
    };

    onSubmit(bookingData);
  };

  const handlePlayerNameChange = (index, value) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label>Time Slot:</label>
        <select 
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          {availability.morning.map(slot => (
            <option key={slot.timeSlot._id} value={slot.timeSlot._id}>
              {slot.timeSlot.startTime} - {slot.timeSlot.endTime} (Morning)
            </option>
          ))}
          {availability.evening.map(slot => (
            <option key={slot.timeSlot._id} value={slot.timeSlot._id}>
              {slot.timeSlot.startTime} - {slot.timeSlot.endTime} (Evening)
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Court:</label>
        <select 
          value={selectedCourt}
          onChange={(e) => setSelectedCourt(e.target.value)}
          required
        >
          <option value="">Select a court</option>
          {selectedTimeSlot && 
            [...availability.morning, ...availability.evening]
              .find(slot => slot.timeSlot._id === selectedTimeSlot)
              ?.availableCourts.map(court => (
                <option key={court._id} value={court._id}>
                  Court {court.courtNumber} - ₹{court.basePrice}
                </option>
              ))
          }
        </select>
      </div>

      <div className="form-group">
        <label>Number of Players:</label>
        <input
          type="number"
          min="1"
          max="6"
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(parseInt(e.target.value))}
          required
        />
      </div>

      <div className="form-group">
        <label>Player Names (optional):</label>
        {Array.from({ length: numberOfPlayers }).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Player ${index + 1} name`}
            value={playerNames[index] || ''}
            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
          />
        ))}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </form>
  );
};

export default BookingForm;
