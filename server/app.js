const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const winston = require("winston");
const expressWinston = require("express-winston");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { newTransport } = require("./documentation/winstonLogger");
const { options } = require("./documentation/swaggerDocumentation");
const {connectToDatabase} = require("./database/db");
const app = express();


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



require("dotenv").config({path:"./.env"});

async function connectDb() { 
  await connectToDatabase();
}
connectDb()

// Routes Definition
const authRoutes = require("../server/src/routes/authRoutes");



// Middlewares
app.use('/auth', authRoutes)

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Documentation and Logging
const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  expressWinston.logger({
    transports: [newTransport],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// Routes

module.exports = app;
app.listen(8000, ()=>console.log("server running on port 8000"))
