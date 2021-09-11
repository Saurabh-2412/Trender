const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    index:true
  },
  username:{
    type:String,
    unique:true,
    index:true
  },
  email:{
    type:String,
    required:[true,"email is required"],
    unique:true,
  },
  password:{
    type:String,
    required:[true,"password required"],
    min:[8,"atleast 8 charecters needed"],
  },
  location:{
    type:String,
    default:""
  },
 url:{
    type:String,
    default:""
  },
  profilePicture:{
    type:String,
    default:""
  },
  picturePublicId:{
    type:String,
    default:""
  },
  bio:{
    type:String,
    max:200,
    default:""
  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  }
},{ timestamps: true})

const User = mongoose.model("User", UserSchema);

module.exports = User;