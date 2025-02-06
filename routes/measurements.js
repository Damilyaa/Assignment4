const express = require("express");
const { getMeasurements, getMetrics, addMeasurement } = require("../controllers/measurementsController");

const router = express.Router();

router.get("/", getMeasurements);  // Получить данные
router.get("/metrics", getMetrics);  // Получить метрики
router.post("/", addMeasurement);  // Добавить новые данные

module.exports = router;
