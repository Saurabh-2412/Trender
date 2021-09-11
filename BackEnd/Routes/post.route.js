const express = require('express');
const router = express.Router();
const postsDB = require('../Database/postsDB.js');
const Posts = require('../Models/post.model');
const User = require('../Models/user.model');

//get all posts of user
router.get("/:userid/allposts", async (req, res) => {
  const { userid } = req.params;
  //console.log(userid);
  try {
    const userPosts = await Posts.find({ userid: userid }).populate("userid", "name username profilePicture");
    //console.log(userPosts);
    if(userPosts){
      res.status(200).json(userPosts);
    } else {
      res.status(400).json({message:"No post available"});
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

// get all posts by followers
router.get("/feed", async (req, res) => {
  const { userid } = req.user;
  //console.log(userid);
  try {
    const post = await Posts.find({ userid: userid }).populate("userid", "name username profilePicture");
    //console.log("post",post);
    const currentUser = await User.findById(userid);
    //console.log("currentUser",currentUser);
    const followingPost = await Promise.all(
      currentUser.following.map(followingid => {
        return Posts.find({ userid: followingid }).populate("userid", "name username profilePicture")
      })
    );
    allposts = post.concat(...followingPost)
    //console.log("allposts",allposts);
    res.status(200).json(allposts);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

//get all liked posts
router.get("/:userid/likedposts", async (req, res) => {
  const { userid } = req.params;
  try {
    const likedposts = await Posts.find({ likes: { $all: [userid] } }).populate("userid", "name username profilePicture");
    res.status(200).json(likedposts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

//creating new post
router.post("/",async(req, res) => {
  try{

    const { userid } = req.user;
    const postReceived = req.body;
    //console.log(userid,postReceived);
    const NewPost = new Posts({ ...postReceived, userid: userid });
    //console.log(NewPost);
    NewPost.populate('userid', 'name username profilePicture').execPopulate();
    const savedPost = await NewPost.save();
    res.json({success: true, post: savedPost });
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add post..!", errorMessage: err.message});
  }
})

//get a post
router.get("/viewpost/:postId",async (req, res) => {
  try {
    const { postId } = req.params;
    const viewPost = await Posts.findOne({ _id : postId }).populate("userid", "name username profilePicture").populate("comments.userid", "name username profilePicture");
    res.status(200).json({ posts:viewPost });
  } catch (err) {
    res.status(500).json({ success: false, errorMessage: err.message });
  }
})

//edit post
router.post("/:postid", async (req, res) => {
  const { postid } = req.params;
  const postDetails = req.body;
  console.log(postDetails);
  try {
    const post = await Posts.findOneAndUpdate({ _id:postid }, { $set: postDetails }, { new: true });
    console.log(post);
    res.status(200).json({ success: true,post:post });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

//delete a post
router.delete("/:postid", async (req, res) => {
  const { postid } = req.params;
  const { userid } = req.user;
  console.log(postid);
  try {
    const userPosts = await Posts.findByIdAndDelete({ _id:postid });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

//like a post
router.post('/likepost/:postId', async(req, res) => {
    const { postId } = req.params;
    const { userid } = req.user;
    console.log(postId,userid);
    try{
      const post = await Posts.findByIdAndUpdate({ _id : postId}, { $addToSet: { likes: userid }}, { new: true })
    res.status(201).json(post);
  }
  catch(err){
    res.status(500).json({ success: false, errorMessage: err.message })
  }
})

//like single post
router.post("/likeone/:postid", async (req, res) => {
  const { postid } = req.params;
  const { userid } = req.user;
  //console.log(postid,userid);
  try {
    const post = await Posts.findByIdAndUpdate(postid, {
      $addToSet: { likes: userid }
    }, { new: true }).populate("userid", "name username profilePicture").populate("comments.userid", "name username profilePicture");
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

//unlike a post
router.post("/unlikeone/:postid", async (req, res) => {
  const { postid } = req.params;
  const { userid } = req.user;
  try {
    const post = await Posts.findByIdAndUpdate(postid, { $pull: { likes: userid } }, { new: true }).populate("userid", "name username profilePicture").populate("comments.userid", "name username profilePicture");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

//unlike a post
router.post("/unlikepost/:postid", async (req, res) => {
  const { postid } = req.params;
  const { userid } = req.user;
  try {
      const post = await Posts.findByIdAndUpdate({ _id : postid}, { $pull: { likes: userid }}, { new: true }).populate("userid", "name username profilePicture");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

//comment on a post
// router.post("/comment/:postId", async (req, res) => {
//   const { postId } = req.params;
//   const { comment,userId } = req.body;
//   try {
//     const post = await Posts.findByIdAndUpdate({_id: postId}, {
//       $push: { comments: { userId: userId, comment: comment }} }, { new: true });
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error", err: err.message });
//   }
// });

//comment on a post
router.post("/comment/:postid", async (req, res) => {
  const { postid } = req.params;
  const { comment } = req.body;
  const { userid } = req.user;
  //console.log(postid,comment,userid);
  try {
    const post = await Posts.findByIdAndUpdate({ _id:postid }, {
      $push: { comments: { userid: userid, comment: comment } }
    }, { new: true }).populate("userid", "name username profilePicture").populate("comments.userid", "name username profilePicture");
    //console.log("commenting post",post)
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

//delete comment from post
router.post("/uncomment/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userid } = req.user;
  try {
    const post = await Posts.findByIdAndUpdate({ _id:postId },{
      $pull: { comments: { userid: userid }}
    }, { new: true })
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err.message });
  }
});

module.exports = router