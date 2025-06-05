import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const BookingCalendar = ({ onDateChange, selectedDate }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAvailableDates();
        setAvailableDates(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDates();
  }, []);

  const handleDateClick = (date) => {
    onDateChange(date);
  };

  return (
    <div className="booking-calendar">
      <h3>Select a Date</h3>
      {loading && <p>Loading available dates...</p>}
      {error && <p className="error">{error}</p>}
      <div className="calendar-grid">
        {availableDates.map((date) => (
          <button
            key={date}
            className={`date-button ${selectedDate === date ? 'selected' : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {new Date(date).toLocaleDateString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;
