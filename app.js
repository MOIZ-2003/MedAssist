const express = require("express");
const http = require("http");
const session = require("express-session");
const dotenv = require("dotenv");
var mongoose = require("mongoose");

var cors = require('cors');
dotenv.config();

const port = 5000;
// const port = process.env.PORT;
const app = express();


app.use(cors());
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

mongoose.set('strictQuery', false);
mongoose.connect(
    "mongodb+srv://abizer:Abizer786@cluster0.7x9mozn.mongodb.net/?retryWrites=true&w=majority",
);

const authRoutes = require("./backend/routes/auth.js");
//const userRoutes = require("./backend/routes/user.js");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set("views", "./views");
// app.set("view engine", "ejs");
app.use(express.static("frontend"));
app.use("/auth", authRoutes);
//app.use("/user", userRoutes);

const server = http.createServer(app);
server.listen(port, () => {
    console.log("Listening on port " + port);
});
