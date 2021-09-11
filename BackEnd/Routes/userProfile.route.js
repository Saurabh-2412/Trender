const User = require("../Models/user.model");
const express = require("express")
const router = express.Router();

//get all user
router.get("", (async (req, res) => {
  const { userid } = req.user;
  console.log(userid);
  try {
    const NewUser = await User.find({});
    //console.log(NewUser);
    const filteredUsers = NewUser.filter((user) => user._id !== userid);
    //console.log(filteredUsers);
    res.status(201).json({success: true, user: filteredUsers });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot update details" })
  }
}))

//get user details
router.get("/:username", (async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username }).select("name username location url bio profilePicture followers following ");
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot update details" })
  }
}))

//update user
router.post("/update", (async (req, res) => {
  const { userid } = req.user;
  const userdetails = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userid }, { $set: userdetails }, { new: true }).select("name username location url bio profilePicture followers following ");
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot update details" })
  }
}))

//deleting a user
router.delete("/:userId", (async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndRemove({ _id: userId });
    res.status(201).json({success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot update details" })
  }
}))

//follow
router.post("/follow/:targetid", async (req, res) => {
  const { userid } = req.user;
  const { targetid } = req.params;
  //console.log(userid,targetid);
  try {
    const currentUser = await User.findByIdAndUpdate({ _id:userid }, { $addToSet: { following: targetid }}, { new: true });
    const targetUser = await User.findByIdAndUpdate(targetid, { $addToSet: { followers: userid }}, { new: true }).select("followers");
    res.status(201).json(targetUser)
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot follow user", err: err.message })
  }
});

//unfollow
router.post("/unfollow/:targetid", async (req, res) => {
  const { userid } = req.user;
  const { targetid } = req.params;
  try {
    const currentUser = await User.findByIdAndUpdate({ _id:userid }, { $pull: { following: targetid }}, { new: true });
    //console.log(currentUser);
    const targetUser = await User.findByIdAndUpdate(targetid, {$pull: {followers: userid }}, {new: true}).select("followers");
    //console.log(targetUser)
    res.status(201).json(targetUser)
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot follow user", err: err.message })
  }
});

//get followers
router.get("/:username/followers", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).select("followers");
    const followers = await Promise.all(
      user.followers.map(userid => {
        return User.findById(userid).select("name username profilePicture")
      })
    );
    if (followers) {
      res.status(200).json(followers)
    } else {
      res.status(400).json({ message: "No followers" })
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, followers cannot be fetched", error: err.message })
  }
});

//get following
router.get("/:username/following", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).select("following");
    const following = await Promise.all(
      user.following.map(userid => {
        return User.findById(userid).select("name username profilePicture")
      })
    );
    if (following) {
      res.status(200).json(following)
    } else {
      res.status(400).json({ message: "No followers" })
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, followers cannot be fetched", error: err.message })
  }
});

//search a user
router.get("/searchuser/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.find({ $or: [{ name: { $regex: username, $options:"$i" } }, { username: { $regex: username, $options:"$i"} }] }).select("name username profilePicture");
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: "User not found y" })
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, cannot get user", err: err.message })
  }
})

module.exports = router;