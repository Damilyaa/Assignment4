const mongoose = require('mongoose');
const Measurement = require('./models/measurement'); // Подключаем модель

// Подключение к MongoDB (измените URL, если нужно)
mongoose.connect('mongodb://localhost:27017/analytics_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection error", err));

// Функция генерации случайных значений в указанном диапазоне
const getRandomValue = (min, max) => Math.random() * (max - min) + min;

// Создаём массив с данными с 1 по 20 января
const generateMeasurements = () => {
    let measurements = [];

    for (let day = 1; day <= 20; day++) {
        const timestamp = new Date(`2025-01-${String(day).padStart(2, '0')}T12:00:00Z`); // Январь 2024
        const field1 = getRandomValue(-10, 10);  // Температура (-10°C до 10°C)
        const field2 = getRandomValue(30, 70);   // Влажность (30% до 70%)
        const field3 = getRandomValue(300, 600); // CO2 (300 до 600 ppm)

        measurements.push({ timestamp, field1, field2, field3 });
    }

    return measurements;
};

// Вставка данных в MongoDB
const seedDatabase = async () => {
    try {
        await Measurement.deleteMany(); // Очистка старых данных
        const data = generateMeasurements();
        await Measurement.insertMany(data);
        console.log("✅ Данные успешно добавлены!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Ошибка при добавлении данных:", error);
        mongoose.connection.close();
    }
};

seedDatabase();