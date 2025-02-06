const express = require("express");
const { getMeasurements, getMetrics, addMeasurement } = require("../controllers/measurementsController");

const router = express.Router();

router.get("/", getMeasurements);  
router.get("/metrics", getMetrics);  
router.post("/", addMeasurement); 

module.exports = router;
