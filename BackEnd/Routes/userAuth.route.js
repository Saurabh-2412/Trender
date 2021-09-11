const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../Models/user.model");
const mySecret = process.env['Token'];
var bcrypt = require('bcrypt');
const saltRounds = 10;

//existing user check middleware
const UserExistenceCheckMidWare = async (req, res, next) => {
  const user = req.body;
  //console.log(user);
  try {
    const emailCheck = User.findOne({ email: user.email });
    //console.log("emailCheck",emailCheck);
    const usernameCheck = User.findOne({ username: user.username });
    //console.log("usernameCheck",usernameCheck);
    const [emailExist,usernameExist] = await Promise.all([emailCheck,usernameCheck]);
    if (emailExist || usernameExist) {
      res.status(409).json({ success: false, message: "User already exist" })
      return;
    } else {
      req.userdata = user;
      return next();
    }
  } catch (error) {
    console.log(error);
  }
}

//update user
router.route("/signup")
.post( UserExistenceCheckMidWare, (async (req, res) => {
  const userdetails = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const newUser = req.body;
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const NewUser = new User(newUser);
    const savedUser = await NewUser.save(NewUser);
    res.status(201).json({success: true, user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot update details" })
  }
}))

//update user
router.post("/update/:userid", (async (req, res) => {
  const { userid } = req.params;
  const userdetails = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id:userid }, { $set: userdetails }, { new: true }).select("name username location url bio profilePicture followers following ");
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot update details" })
  }
}))

//username middleware validation
const getUsername = async (req, res, next) => {
  try {
    const { userCredential, password } = req.body;
    //console.log(userCredential,password);
    let userData="";
    if(userCredential.includes("@")){
      userData = await User.findOne({ email: userCredential});
    }else{
      userData = await User.findOne({ username: userCredential });
    }
    //console.log("userData",userData);
    if (userData) {
      const validPassword = await bcrypt.compare(password, userData.password);
      //console.log(validPassword);
      if (validPassword) {
        req.user = userData;
        return next();
      }
    }
    res.status(404).json({ message: "Username or password incorrect" });
  } catch (error) {
    console.log(error)
  }
}

router.route("/login")
  .post(getUsername, (req, res) => {
    const { _id, name, username, profilePicture } = req.user;
    const token = jwt.sign({
      userid: _id
    }, mySecret, { expiresIn: '24h' });
    res.status(200).json({ success: true, token: token, userdata: { userid: _id, name, username, profilePicture }, message: "User authenticated successfully" })
})

module.exports = router;