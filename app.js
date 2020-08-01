const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = 5000;
app.set('port', process.env.port || port);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const routes = require('./routes/api/team');
app.use('/api', routes);




// DB Connection Done
var db = require('./config/conn').url;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
