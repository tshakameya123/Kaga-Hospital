const Booking = require('../models/booking.js');

// Controller for bookings
exports.createBooking = async (req, res) => {

    const { appointment, amount, method, status } = req.body;
    try {
        const newBooking = new Booking({
            appointment,
            amount,
            method,
            status,
        });

        // Save the booking to the database
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);

    } catch (error) {
        console.error('Error creating booking:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to create booking' });
    }
};

// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('appointment');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch bookings' });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('appointment');
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.status(200).json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch booking' });
    }
};

// Update booking by ID
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'Server Error: Unable to update booking' });
    }
};

// Delete booking by ID
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Server Error: Unable to delete booking' });
    }
};