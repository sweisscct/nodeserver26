const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const { Strategy } = require("passport-local");

const PORT = 3000;
const SESSION_SECRET = "secret";
const MONGO_URL = "127.0.0.1:27017";
const COLLECTION = "chatApp";

app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${MONGO_URL}/${COLLECTION}`)
.then(conn => console.log(conn.model));

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose.default);
const User = mongoose.model("User", userSchema);

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        mongoURL: MONGO_URL,
        collection: COLLECTION
    }, err => console.log(err))
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));

app.get("/", (req, res) => {
    console.log("Yay, a visitor!");
    console.log(__dirname);
    res.sendFile("index.html", {root: __dirname});
});

app.get("/login", (req, res) => {
    res.sendFile("login.html", {root: __dirname});
});

app.post("/login", (req, res) => {
    console.log(req.body);
    console.log(req.body.username);
})

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`); 
    console.log(`http://localhost:${PORT}`);
});