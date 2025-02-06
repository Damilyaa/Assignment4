const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    field1: { type: Number, required: true }, // Температура
    field2: { type: Number, required: true }, // Влажность
    field3: { type: Number, required: true }, // CO2
});

const Measurement = mongoose.model('Measurement', measurementSchema);
module.exports = Measurement;