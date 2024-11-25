require('dotenv').config({ path: './server/.env' });
const express = require('express');
const mongoose = require('mongoose');
const wordRoutes = require('./routes/words');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Lingva AI API!');
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Routes
app.use('/api/words', wordRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

