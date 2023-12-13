const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.k44rpzy.mongodb.net/shotaeff', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', () => {
  console.log('Успешное подключение к MongoDB!');
});

const PortfolioSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    pdf: String,
})

const Portfolio = new mongoose.model('Portfolio', PortfolioSchema)

// Create a new portfolio item
app.post('/api/create', async (req, res) => {
    try {
        const { image, name, description, pdf } = req.body;

        const newJob = new Portfolio({
            image,
            name,
            description,
            pdf
        });

        await newJob.save();
        res.json({ message: 'Работа успешно добавлена' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Ошибка при добавлении работы' });
    }
});

// View all portfolio items
app.post('/api/view', async (req, res) => {
    try {
        const allPortfolio = await Portfolio.find();
        res.json(allPortfolio);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Ошибка при получении портфолио' });
    }
});

// Delete a portfolio item
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
        res.json(deletedPortfolio);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Ошибка при удалении работы' });
    }
});

app.listen(5000, () => {
    console.log(`Сервер запущен: http://localhost:5000`);
});
