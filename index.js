const express = require("express");


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ extended: false }));


//get all users
app.get("/",  (req, res) => {

    res.send("Helloworld");
 
});

app.listen(port);
