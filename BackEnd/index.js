const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { dbInitilizer } = require('./DBConnector/dbInitializer.js');
const { authVerify } = require('./Routes/auth.middleware');

dbInitilizer();
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json({ limit: '5mb' }));

app.use("/v1/posts", authVerify, require('./Routes/post.route'));
app.use("/v1/images", require('./Routes/upload.route'));
app.use("/v1/userAuth", require('./Routes/userAuth.route'));
app.use("/v1/userProfile", authVerify, require('./Routes/userProfile.route'));

app.get('',(req,res) => {
  res.send("Hello! Welcoming you to EXPRESS your world in express" )
})

app.use((req, res) => {
  res.status(404).json({ success: false, message: "the route you're looking for couldn't be found status 404" })
})

app.listen(3000, () => {
  console.log('server started');
});