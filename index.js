const http = require("http")
const express = require("express")
const app = express()
const server = http.createServer(app)
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors');
require('./utils/db')
const indexRouter = require("./routes/index")
const path = require("path")

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// console.log(__dirname + '/public');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", indexRouter)

server.listen(process.env.PORT)