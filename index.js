const express = require("express");

const app = express();

app.use(express.json({ extended: false }));
const port = process.env.PORT || 8080;

//get all users
app.get("/",  (req, res) => {

    res.send("Hello world2");
 
});

app.listen(port);
