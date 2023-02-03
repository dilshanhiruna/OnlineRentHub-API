const express = require("express");
const User = require("../models/User");
var uapp = express.Router();

uapp.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  async function UserAvailabilityCheck(email) {
    const user = await User.find({});
    const findUser = user.map((x) => x.email == email);
    for (let x in findUser) {
      if (findUser[x]) {
        return true;
      }
    }
    return false;
  }
  
  async function UserLoginCheck(username, password) {
    const user = await User.find({});
    const findUser = user.map((x) => x.username == username && x.password == password);
    for (let x in findUser) {
      if (findUser[x]) {
        return true;
      }
    }
    return false;
  }
  
  async function GetUser(email) {
    const user = await User.find({});
    const findUser = user.map((x) => x.email == email);
    for (let x in user) {
      if (user[x].email == email) {
        return user[x];
      }
    }
  }

  //User - API End Points

  uapp.post("/create", async (request, response) => {
    const user = new User(request.body);
    try {
      if (await UserAvailabilityCheck(user.email)) {
        var re = {
          status: false,
          message: "Failed - This User already exists",
          data: user,
        };
        console.log(re);
        response.send(re);
      } else {
        await user.save();
        var re = {
          status: true,
          message: "Successfully",
          data: user,
        };
        console.log(re);
        response.send(re);
      }
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  uapp.get("/getAll", async (request, response) => {
    const user = await User.find({});
    //response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    try {
      var re = {
        status: true,
        message: "Successfully",
        data: user,
      };
      console.log(re);
      response.send(re);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  uapp.put("/update", async (request, response) => {
    const user = await User.findByIdAndUpdate(
      request.body._id,
      request.body
    );
    try {
      await user.save();
      var re = {
        status: true,
        message: "Successfully",
        data: user,
      };
      console.log(re);
      response.send(re);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  uapp.post("/userLogin", async (request, response) => {
    try {
      if (await UserLoginCheck(request.body.username, request.body.password)) {
        var re = {
          status: true,
          message: "Successfully",
          data: request.body.username,
        };
        console.log(re);
        response.send(re);
      } else {
        var re = {
          status: false,
          message: "Falid - username or password incorrect",
          data: request.body.username,
        };
        console.log(re);
        response.send(re);
      }
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  uapp.post("/getUser", async (request, response) => {
    try {
      var user = await GetUser(request.body.email);
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
          message: "Falid - email or password incorrect",
          data: request.body.email,
        };
        console.log(re);
        response.send(re);
      }
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });
  
  uapp.delete("/delete/:id", async (request, response) => {
    const post = await User.findByIdAndDelete(request.params.id);
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
  
  async function UserAvailabilityCheck(email) {
    const user = await User.find({});
    const findUser = user.map((x) => x.email == email);
    for (let x in findUser) {
      if (findUser[x]) {
        return true;
      }
    }
    return false;
  }

  module.exports = uapp;