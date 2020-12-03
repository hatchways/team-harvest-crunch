const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const paymentRouter = require("./routes/payment");
const conversationRouter = require("./routes/conversations");

const { json, urlencoded } = express;

var app = express();

// db connection
mongoose
    .connect(process.env.mongodb_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(() => console.log("database connected"))
    .catch(err => console.log(err.message));

// middleware
app.use(logger("dev"));
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// API routes
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/user", userRouter);
app.use(productRouter);
app.use("/messenger", conversationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
