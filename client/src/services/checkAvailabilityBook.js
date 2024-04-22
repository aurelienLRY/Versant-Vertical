/**
 * Checks the availability of a booking based on the provided date, start time, and end time.
 * @param {string} date - The date of the booking in the format 'YYYY-MM-DD'.
 * @param {string} startTime - The start time of the booking in the format 'HH:MM'.
 * @param {string} endTime - The end time of the booking in the format 'HH:MM'.
 * @returns {boolean} - Returns true if there is a conflicting booking, otherwise false.
 */ 
export function checkAvailabilityBook(date, startTime , endTime , bookings , id = true) {
    return bookings.some((booking) => {
        if (id && booking._id === id) {
            return false;
        }
        const bookingDate = new Date(booking.date).toLocaleDateString('fr-CA');
        const isSameDate = bookingDate === new Date(date).toLocaleDateString('fr-CA');

        // Convertir les heures en minutes pour faciliter la comparaison
        const [bookingStartHours, bookingStartMinutes] = booking.startTime.split(':').map(Number);
        const [bookingEndHours, bookingEndMinutes] = booking.endTime.split(':').map(Number);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const bookingStartTimeInMinutes = bookingStartHours * 60 + bookingStartMinutes;
        const bookingEndTimeInMinutes = bookingEndHours * 60 + bookingEndMinutes;
        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;

        // Vérifier si les heures de début et de fin sont en conflit
        const isStartTimeConflict = startTimeInMinutes >= bookingStartTimeInMinutes && startTimeInMinutes < bookingEndTimeInMinutes;
        const isEndTimeConflict = endTimeInMinutes > bookingStartTimeInMinutes && endTimeInMinutes <= bookingEndTimeInMinutes;

        return isSameDate && (isStartTimeConflict || isEndTimeConflict);
    });
}



