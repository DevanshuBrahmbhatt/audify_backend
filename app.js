const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = 5001;
app.set('port', process.env.port || port);
app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());

const Fullfillment = require('./intents/index');
app.use('/fullfillment', Fullfillment);

const routes = require('./routes/api');
app.use('/public', express.static('public'));
app.use('/', routes);

// DB Connection Done
mongoose.connect(require('./config/conn').url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.once('open', () => console.log('Database Connected'));
db.on('error', err => console.log(err));
mongoose.set('debug', true);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
