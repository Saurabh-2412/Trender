import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (username, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://Social-Media.saurabhsharma11.repl.co/v1/userProfile/${username}`
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "users/editProfile",
  async ({ values, image }, { fulfillWithValue, rejectWithValue }) => {
    if (image) {
      const formData = new FormData();
      const fileName = Date().now + image.name;
      formData.append("image", image);
      formData.append("name", fileName);
      try {
        const { data, status } = await axios.post(
          `https://social-media.saurabhsharma11.repl.co/v1/images/upload`,
          formData
        );
        if (status === 201) {
          values.profilePicture = data.url;
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    try {
      const response = await axios.post(
        "https://Social-Media.saurabhsharma11.repl.co/v1/userProfile/update",
        values
      );
      //console.log("api",response);
      return fulfillWithValue(response.data);
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const follow = createAsyncThunk(
  "user/follow",
  async (userid, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/userProfile/follow/${userid}`
      );
      console.log("follow",response.data);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.resposne);
    }
  }
);

export const unFollow = createAsyncThunk(
  "user/unfollow",
  async (userid, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/userProfile/unfollow/${userid}`
      );
      console.log("unfollow",response.data);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getFollowers = createAsyncThunk(
  "user/followers",
  async (username) => {
    const response = await axios.get(
      `https://Social-Media.saurabhsharma11.repl.co/v1/userProfile/${username}/followers`
    );
    return response.data;
  }
);

export const getFollowing = createAsyncThunk(
  "user/following",
  async (username) => {
    const response = await axios.get(
      `https://Social-Media.saurabhsharma11.repl.co/v1/userProfile/${username}/following`
    );
    return response.data;
  }
);

export const searchUserClicked = createAsyncThunk(
  "users/Search",
  async (value, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://Social-Media.saurabhsharma11.repl.co/v1/userProfile/searchuser/${value}`
      );
      console.log("search",response);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.resposne);
    }
  }
);


export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: "",
        followers: [],
        following: [],
        status: "idle",
        error: null
    },
    reducers: { },
    extraReducers: {
      [fetchUser.pending]: (state, action) => {
        state.status = "pending";
      },
      [fetchUser.fulfilled]: (state, action) => {
        state.status = "success";
        state.user = action.payload;
      },
      [fetchUser.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error;
      },
      [updateProfile.pending]: (state, action) => {
        state.status = "pending";
      },
      [updateProfile.fulfilled]: (state, action) => {
        state.status = "success";
        state.user = action.payload;
      },
      [updateProfile.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error;
      },
      [follow.pending]: (state, action) => {
        state.status = "pending";
      },
      [follow.fulfilled]: (state, action) => {
        state.status = "success";
        state.user.followers = action.payload.followers;
      },
      [follow.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error;
      },
      [unFollow.pending]: (state) => {
        state.status = "pending";
      },
      [unFollow.fulfilled]: (state, action) => {
        state.status = "success";
        state.user.followers = action.payload.followers;
      },
      [unFollow.rejected]: (state, action) => {
        state.status = "failed";
        state.status = action.error;
      },
      
      [getFollowers.pending]: (state) => {
        state.status = "pending";
      },
      [getFollowers.fulfilled]: (state, action) => {
        state.status = "success";
        state.followers = action.payload;
      },
      [getFollowers.rejected]: (state, action) => {
        state.status = "failed";
        state.status = action.error;
      },
      [getFollowing.pending]: (state) => {
        state.status = "pending";
      },
      [getFollowing.fulfilled]: (state, action) => {
        state.status = "success";
        state.following = action.payload;
      },
      [getFollowing.rejected]: (state, action) => {
        state.status = "failed";
        state.status = action.error;
      }
    }
});

export const { postAdded, likedPost } = userSlice.actions;

export default userSlice.reducer;

export const selectUserById = (state, username) =>
  state.user.userDb.find((item) => item.username === username);