const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;

app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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
})

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`); 
});