const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const routes = require('./routes/routes')
const db = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
