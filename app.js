//Import Libraries
const express = require('express');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const requestLogger = require('express-sequelize-logger');

//Environment Variables
let { PORT } = require("./config/config_env");
const port = PORT;

//DB Connections
const { sequelize } = require('./DB/connection');
const { dbConnection } = require("./DB/connection");

//Project Imports
const { swaggerDocs: V1SwaggerDocs } = require("./helpers/swagger");

dirname = __dirname;

dbConnection();

const apiPath = '/api/v1';
const app = express();
const server = http.createServer(app);

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("chat", (msj) => {
    io.emit("chat", msj);
  });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger({sequelize}));

/* ROUTES */
app.get('/', function(req, res){
    res.send('<html><h1>API is ready to use. Please go to "/api/v1"</h1></html>');
});

app.use(apiPath, require('./routes/auth'));
app.use(apiPath, require('./routes/admin_access'));
app.use(apiPath, require('./routes/client'));
app.use(apiPath, require('./routes/clientuser'));
app.use(apiPath, require('./routes/clientuser_noadmin'));
app.use(apiPath, require("./routes/streaming"));
app.use(apiPath, require("./routes/socket"));
app.use(apiPath, require("./routes/excel"));

server.listen(port, () => {
    console.log(`Server Listening on port ${port}!`);
    V1SwaggerDocs(app, port);
  });
