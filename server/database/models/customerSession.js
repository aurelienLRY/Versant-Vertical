const mongoose = require('mongoose');

const CustomerSessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    typeOfReservation: { type: String, required: false},
    number_of_people: { type: Number, required: true },
    last_name: { type: String, required: true },
    first_names: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    people_list: [{
        size: { type: String, required: true },
        weight: { type: String, required: true }
    }]
});

const CustomerSession = mongoose.model('CustomerSession', CustomerSessionSchema);
module.exports = CustomerSession;