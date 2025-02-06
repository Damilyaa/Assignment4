const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true, default: Date.now },
  field1: { type: Number, required: true }, 
  field2: { type: Number, required: true }, 
  field3: { type: Number, required: true }, 
});

module.exports = mongoose.model("Measurement", MeasurementSchema);
