import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchallPosts",
  async () => {
    const { data } = await axios.get(
      `https://Social-Media.saurabhsharma11.repl.co/v1/posts/feed`
    );
    console.log("api",data);
    return data;
  }
);

export function DateSetter(){
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ',' + cTime;
    return dateTime;
}

export const createPost = createAsyncThunk("post/createPost",
  async ({ content,image }, { fulfillWithValue, rejectWithValue }) => {
    let postData = {
      desc: content,
      status: "A",
      likes: [],
      comments: [],
      createdAt: DateSetter(),
      modifiedAt: DateSetter()
    };

    if (image) {
      const formData = new FormData();
      const fileName = Date().now + image.name;
      formData.append("image", image);
      formData.append("name", fileName);
      try {
        const { data, status } = await axios.post(
            "https://social-media.saurabhsharma11.repl.co/v1/images/upload",
            formData
        );
        if (status === 201) {
            postData.image = data.url;
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    try {
      const { data } = await axios.post(
        "https://social-media.saurabhsharma11.repl.co/v1/posts",
          postData
      );
      return fulfillWithValue(data.post);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postid }, { fulfillWithValue, rejectWithValue }) => {
    //console.log(postid);
    try {
      const { status, data } = await axios.delete(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/${postid}`
      );
      console.log("delete",data);
      if (status === 200) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ postid,desc,image }, { fulfillWithValue, rejectWithValue }) => {
    let postUpdatedData = {
      desc: desc
    };
    console.log(postid,desc,image,"from editpostapi");
    if (image) {
      const formData = new FormData();
      const fileName = Date().now + image.name;
      formData.append("image", image);
      formData.append("name", fileName);
      try {
        const { data, status } = await axios.post(
            "https://social-media.saurabhsharma11.repl.co/v1/images/upload",
            formData
        );
        if (status === 201) {
          postUpdatedData.image = data.url;
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/${postid}`, postUpdatedData
      );
      console.log(data);
      if (status === 200) {
        return fulfillWithValue(data.post);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const likePost = createAsyncThunk("post/likePost", 
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/likepost/${postId}`
      );
      console.log(status,data);
      if (status === 201) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unlikePost = createAsyncThunk(
    "post/unlikePost",
    async (postId, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://Social-Media.saurabhsharma11.repl.co/v1/posts/unlikepost/${postId}`
        );
        if (status === 200) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const likeSinglePost = createAsyncThunk(
  "post/likeSinglePost",
  async (postid, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/likeone/${postid}`
      );
      if (status === 201) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unLikeSinglePost = createAsyncThunk(
  "post/unlikeSinglePost",
  async (postid, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/unlikeone/${postid}` 
      );
      if (status === 200) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postComment = createAsyncThunk(
  "post/postComment",
  async ({ postid, comment }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/comment/${postid}`,
        { comment }
      );
      if (status === 201) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dropComment = createAsyncThunk(
  "post/unComment",
  async ({ postid }, { fulfillWithValue, rejectWithValue }) => {
    console.log(postid);
    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/uncomment/${postid}`
      );
      if (status === 201) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const viewPost = createAsyncThunk("post/viewPost", 
    async (postid, { fulfillWithValue, rejectWithValue }) => {
        try {
          //console.log("slice",postid);
            const { status, data } = await axios.get(
                `https://Social-Media.saurabhsharma11.repl.co/v1/posts/viewpost/${postid}`
            );
            //console.log("api",data);
            if (status === 200) {
                return fulfillWithValue(data.posts);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getUserPost = createAsyncThunk(
  "post/getUserPost",
  async (userid) => {
    const response = await axios.get(
      `https://Social-Media.saurabhsharma11.repl.co/v1/posts/${userid}/allposts`
    );
    //console.log("getUserPost",response);
    return response.data;
  }
);

export const getAllLikedPost = createAsyncThunk(
  "post/getAllLikedPost",
  async (userid) => {
    const response = await axios.get(
      `https://Social-Media.saurabhsharma11.repl.co/v1/posts/${userid}/likedposts`
    );

    return response.data;
  }
);


export const postSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
    singlePost: ""
  },
  reducers: {},
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
    },
    [editPost.pending]: (state, action) => {
      state.status = "pending";
    },
    [editPost.fulfilled]: (state, action) => {
      console.log(action.payload,"edit");
      state.status = "success";
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      state.posts.splice(index, 1, action.payload);
      //console.log("fulfilled",index);
    },
    [editPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [deletePost.pending]: (state) => {
      state.status = "pending";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "success";
      //state.posts = action.payload;
      console.log("delete post",action.payload);
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      console.log("index",index);
      state.posts.splice(index, 1);
    },
    [fetchAllPosts.pending]: (state) => {
      state.status = "pending";
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [likePost.pending]: (state) => {
      state.status = "pending";
    },
    [likePost.fulfilled]: (state, action) => {
      state.status = "success";
      const existingPost = state.posts.findIndex((post) => post._id === action.payload._id);
      state.posts.splice(existingPost, 1, action.payload);
    },
    [likePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [unlikePost.pending]: (state) => {
      state.status = "pending";
    },
    [unlikePost.fulfilled]: (state, action) => {
      state.status = "success";
      const existingPost = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts.splice(existingPost, 1, action.payload);
    },
    [unlikePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postComment.fulfilled]: (state, action) => {
      state.singlePost = action.payload;
    },
    [dropComment.fulfilled]: (state, action) => {
      state.singlePost = action.payload;
    },
    [viewPost.fulfilled]: (state, action) => {
      state.singlePost = action.payload;
    },
    [getUserPost.pending]: (state) => {
      state.status = "pending";
    },
    [getUserPost.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getUserPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [getAllLikedPost.pending]: (state) => {
      state.status = "pending";
    },
    [getAllLikedPost.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getAllLikedPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    }
  }
});

export const { LikeClicked, DisLikeClicked } = postSlice.actions;

export default postSlice.reducer;

export const selectPostById = (state, id) =>
  state.post.posts.find((item) => item._id === id);