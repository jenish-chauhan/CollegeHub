const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//Creating a local server 

app.listen(9995, () => {
    console.log('server is listening at port:9995');
});