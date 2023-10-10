require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require('../src/middlewares/not-found')
const errorMiddleware = require('../src/middlewares/error')
const rateLimitMiddleware = require('../src/middlewares/rate-limit')


const app = express();

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use(rateLimitMiddleware)
app.use(errorMiddleware)
app.use(notFoundMiddleware)


const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
