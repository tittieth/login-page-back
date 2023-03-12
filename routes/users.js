var express = require('express');
var router = express.Router();
const fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    res.send(data)
    return;
  }
  )
});

router.get('/login', function(req, res, next) {
  res.send("loginroutern");
});

router.post('/add', function(req, res, next) {

  console.log(req.body);
  fs.readFile("users.json", function(err, data) {
    if (err) {
      console.log(err);

      if (err.code == "ENOENT") {
        console.log("Filen finns inte");

        let users = [{
          "userName":"Janne",
          "password":"test",
          "userId":1
        }];

        fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
          if (err) {
            console.log(err);
          }
        }) 

        res.send("Fil skapad och ny användare sparad");
        return;
      }
      res.send("404 - något gick fel!")
    }

    const users = JSON.parse(data);

    let newUser = req.body;
    newUser.userId = users.length + 1;
    users.push(newUser);
    console.log(newUser);

    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
      if (err) {
        console.log(err);
      }
    })
    res.json(users);
  });
});

router.post('/login', function(req, res, next) {
  const { name, password } = req.body;
  fs.readFile("users.json", function(err, data){
    if(err) {
      console.log(err)
    }
    let users = JSON.parse(data);
    const foundUser = users.find(user => user.userName === name);

    if(password === foundUser.password) {
      res.status(201).json({name: foundUser.userName, id: foundUser.userId})
    }
    else {
      res.status(401).json("Incorrect password or username")
    }
    return;
  })
});

module.exports = router;