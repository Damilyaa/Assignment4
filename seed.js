const mongoose = require('mongoose');
const Measurement = require('./models/Measurement');

mongoose.connect('mongodb://localhost:27017/analytics_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection error", err));

const getRandomValue = (min, max) => Math.random() * (max - min) + min;

const generateMeasurements = () => {
    let measurements = [];

    for (let day = 1; day <= 20; day++) {
        const timestamp = new Date(`2025-01-${String(day).padStart(2, '0')}T12:00:00Z`); 
        const field1 = getRandomValue(-10, 10);  //temp
        const field2 = getRandomValue(30, 70);   //humid
        const field3 = getRandomValue(300, 600); //co2

        measurements.push({ timestamp, field1, field2, field3 });
    }

    return measurements;
};

const seedDatabase = async () => {
    try {
        await Measurement.deleteMany(); 
        const data = generateMeasurements();
        await Measurement.insertMany(data);
        console.log("Данные успешно добавлены!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Ошибка при добавлении данных:", error);
        mongoose.connection.close();
    }
};

seedDatabase();