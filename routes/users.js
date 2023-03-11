var express = require('express');
var router = express.Router();

let users = [
  {
  "userId":1,
  "userName":"Janne",
  "password":"test"
},{
  "userId":2,
  "userName":"Tittie",
  "password":"sol"
},{
  "userId":3,
  "userName":"Levi",
  "password":"fotboll"
}]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

router.get('/login', function(req, res, next) {
  res.send("loginroutern");
});

router.post('/', function(req, res, next) {

  let newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  console.log(newUser);

  res.json(users);
});

router.post('/login', function(req, res, next) {
  const { name, password } = req.body;
  const foundUser = users.find(user => user.userName === name);

  if(password === foundUser.password) {
    res.status(201).json({name: foundUser.userName, id: foundUser.userId})
  }
  else {
    res.status(401).json("Incorrect password or username")
  }
});

module.exports = router;