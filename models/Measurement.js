const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    field1: { type: Number, required: true }, 
    field2: { type: Number, required: true },
    field3: { type: Number, required: true }, 
});

const Measurement = mongoose.model('Measurement', measurementSchema);
module.exports = Measurement;