import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cardRoutes from './routes/cardRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/cards', cardRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});