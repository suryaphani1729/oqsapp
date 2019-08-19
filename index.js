const express = require("express");


const app = express();

app.use(express.json({ extended: false }));


//get all users
app.get("/",  (req, res) => {

    res.send("Helloworld");
 
});

app.listen(3000);
