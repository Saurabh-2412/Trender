const jwt = require("jsonwebtoken");
const mySecret = process.env['Token'];

const authVerify = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log("token",token);
  try {
    let decoded = jwt.verify(token, mySecret);
    req.user = {userid:decoded.userid};
    //console.log(req.user);
    return next();
  } catch (err) {
    //console.log("token error")
    res.status(401).json({ message: "token not valid" });
  }
}

module.exports = { authVerify }