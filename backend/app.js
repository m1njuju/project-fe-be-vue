var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const history = require("connect-history-api-fallback");

var indexRouter = require("./routes/index");
var apimemoRouter = require("./routes/apimemo");
const imageRouter = require("./routes/apiimage");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/memo", apimemoRouter);
app.use("/api/image", imageRouter);

module.exports = app;
