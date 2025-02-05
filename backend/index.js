const express = require('express');
const mongoose = require('mongoose');
const Measurement = require('./models/Measurement');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/analytics_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON
app.use(express.json());

// Fetch time-series data
app.get('/api/measurements', async (req, res) => {
  const { field, start_date, end_date } = req.query;

  // Validate field name
  if (!['field1', 'field2', 'field3'].includes(field)) {
    return res.status(400).json({ error: 'Invalid field name' });
  }

  // Query database
  const query = {
    timestamp: { $gte: new Date(start_date), $lte: new Date(end_date) },
  };
  const data = await Measurement.find(query, { timestamp: 1, [field]: 1, _id: 0 });

  if (data.length === 0) {
    return res.status(404).json({ error: 'No data found in the specified range' });
  }

  res.json(data);
});

// Fetch metrics
app.get('/api/measurements/metrics', async (req, res) => {
  const { field } = req.query;

  // Validate field name
  if (!['field1', 'field2', 'field3'].includes(field)) {
    return res.status(400).json({ error: 'Invalid field name' });
  }

  // Query database
  const data = await Measurement.find({}, { [field]: 1, _id: 0 });
  const values = data.map((d) => d[field]);

  // Calculate metrics
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const stdDev = Math.sqrt(values.map((x) => Math.pow(x - avg, 2)).reduce((a, b) => a + b) / values.length);

  res.json({ avg, min, max, stdDev });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});