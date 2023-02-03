const express = require("express");
const Rent = require("../models/Rent");
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
    const item = new Rent(request.body);
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
    const item = await Rent.find({});
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
    const item = await Rent.find({});
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

  async function GetItembyIds(username) {
    const item = await Rent.find();
    const findItem = item.map((x) => x.username == username);
    for (let x in item) {
      if (item[x].username == username) {
        return item;
      }
    }
  }

  app.get("/getItembyId/:username", async (request, response) => {
    // try {
      const user = await Rent.find(request.params);
      response.send(user);  
      // var user = await GetItembyIds(request.body.username);
    //   if (user) {
    //     var re = {
    //       status: true,
    //       message: "Successfully",
    //       data: user,
    //     };
    //     console.log(re);
    //     response.send(re);
    //   } else {
    //     var re = {
    //       status: false,
    //       message: "Falid - incorrect id",
    //       data: request.body,
    //     };
    //     console.log(re);
    //     response.send(re);
    //   }
    // } catch (error) {
    //   response.status(500).send(error);
    //   console.log(error);
    // }
  });
  
  app.put("/update", async (request, response) => {
    const item = await Rent.findByIdAndUpdate(
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
    const post = await Rent.findByIdAndDelete(request.params.id);
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