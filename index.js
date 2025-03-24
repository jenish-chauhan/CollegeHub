require express from 'express';
const app = express();
require path from 'path';
app.use(express.static(path.join(__dirname, 'public')));
require mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});