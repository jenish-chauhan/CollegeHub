import express from 'express';
const app = express();
import path from 'path';
app.use(express.static(path.join(__dirname, 'public')));
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});