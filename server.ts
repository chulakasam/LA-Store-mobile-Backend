


import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from "./route/auth-routes";

dotenv.config();
const app = express();


mongoose.connect("mongodb://localhost:27017/LAStore")
    .then(() => console.log("✅ DB connected successfully"))
    .catch(err => console.error("❌ DB connection error:", err));

app.use(express.json());



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use('/auth',authRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
