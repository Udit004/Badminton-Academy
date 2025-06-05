import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'; // Changed import
import { useAuth } from '../context/authContext';
import BookingForm from '../components/BookingForm';
import BookingCalendar from '../components/BookingCalendar';
import { toast } from 'react-toastify';

const BookingPage = () => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const dateStr = selectedDate.toISOString().split('T')[0];
        const data = await apiService.checkAvailability(dateStr); // Updated function call
        setAvailability(data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load availability');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchAvailability();
    }
  }, [selectedDate, currentUser]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      setLoading(true);
      await apiService.createBooking(bookingData); // Updated function call
      toast.success('Booking created successfully!');
      // Refresh availability after booking
      const dateStr = selectedDate.toISOString().split('T')[0];
      const data = await apiService.checkAvailability(dateStr); // Updated function call
      setAvailability(data);
    } catch (err) {
      toast.error(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <h2>Book a Court</h2>
      {error && <div className="error">{error}</div>}
      
      <BookingCalendar 
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      
      {availability && (
        <BookingForm 
          availability={availability}
          selectedDate={selectedDate}
          onSubmit={handleBookingSubmit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default BookingPage;
