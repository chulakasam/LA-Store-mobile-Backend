import mongoose, { ConnectOptions } from 'mongoose';

mongoose.connect('mongodb://localhost:27017/LAStore', {} as ConnectOptions)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

export default mongoose;