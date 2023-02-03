const express = require("express");
const Item = require("../models/Item");
var app = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/create", async (request, response) => {
    const item = new Item(request.body);
    try {
      await item.save();
      var re = {
        status: true,
        message: "Successfully",
        data: item,
      };
      console.log(re);
      response.send(re);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  app.get("/getAll", async (request, response) => {
    const item = await Item.find({});
    try {
      var re = {
        status: true,
        message: "Successfully",
        data: item,
      };
      console.log(re);
      response.send(re);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });

  async function GetItem(id) {
    const item = await Item.find({});
    const findItem = item.map((x) => x.id == id);
    for (let x in item) {
      if (item[x].id == id) {
        return item[x];
      }
    }
  }

  app.post("/getItem", async (request, response) => {
    try {
      var user = await GetItem(request.body._id);
      if (user) {
        var re = {
          status: true,
          message: "Successfully",
          data: user,
        };
        console.log(re);
        response.send(re);
      } else {
        var re = {
          status: false,
          message: "Falid - incorrect id",
          data: request.body,
        };
        console.log(re);
        response.send(re);
      }
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  app.put("/update", async (request, response) => {
    const item = await Item.findByIdAndUpdate(
      request.body._id,
      request.body
    );
    try {
      await item.save();
      var re = {
        status: true,
        message: "Successfully",
        data: item,
      };
      console.log(re);
      response.send(re);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  app.delete("/delete/:id", async (request, response) => {
    const post = await Item.findByIdAndDelete(request.params.id);
    try {
      var re = {
        status: true,
        message: "Successfully",
        data: post,
      };
      console.log(re);
      response.send(re);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });


  
module.exports = app;