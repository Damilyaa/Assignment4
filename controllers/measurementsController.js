const Measurement = require("../models/Measurement");

const getMeasurements = async (req, res) => {
  try {
    const { start_date, end_date, field } = req.query;
    let filter = {};

    if (start_date && end_date) {
      filter.timestamp = {
        $gte: new Date(start_date),
        $lte: new Date(end_date)
      };
    }

    const data = await Measurement.find(filter).select(field ? `timestamp ${field}` : "");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

const getMetrics = async (req, res) => {
  try {
    const { field } = req.query;
    if (!field) {
      return res.status(400).json({ message: "Укажите поле (field) для метрик" });
    }

    const stats = await Measurement.aggregate([
      { $group: {
        _id: null,
        avg: { $avg: `$${field}` },
        min: { $min: `$${field}` },
        max: { $max: `$${field}` },
        stdDev: { $stdDevPop: `$${field}` }
      }}
    ]);

    res.json(stats[0] || { message: "Нет данных" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

const addMeasurement = async (req, res) => {
  try {
    const { timestamp, field1, field2, field3 } = req.body;
    const newMeasurement = new Measurement({ timestamp, field1, field2, field3 });
    await newMeasurement.save();
    res.status(201).json(newMeasurement);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

module.exports = { getMeasurements, getMetrics, addMeasurement };
