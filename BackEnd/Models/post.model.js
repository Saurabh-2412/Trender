const mongoose = require("mongoose");
const User = require('./user.model');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  userid:{ type: Schema.Types.ObjectId, ref: "User" },
  desc:{
    type:String,
    max:200
  },
  likes:{
    type:Array,
    default:[]
  },
  image:{
    type:String,
    default:""
  },
  comments: [{ userid: { type: Schema.Types.ObjectId, ref: 'User' }, comment: String }]
},{ timestamps: true})

const Posts = mongoose.model("posts", postSchema);

module.exports = Posts