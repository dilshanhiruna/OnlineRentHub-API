const express = require('express')
const app = express();
var cors = require('cors');


app.use(cors())
const bodyPaser = require('body-parser')
app.use(bodyPaser.json())
app.use(express.urlencoded({ extended: true }))

const User = require("./routes/User-route");
const Item = require("./routes/Item-route");
const Rent = require("./routes/Rent-route");

app.use("/user",User);
app.use("/item",Item);
app.use("/rent",Rent);


module.exports = app;
