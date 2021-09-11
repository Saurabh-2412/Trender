import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setupAuthHeaderForServiceCalls } from "./ServiceHandler";
import { toastSuccess } from "../Utils/ToastMessages";
import { clearLocalStorage, setlocalStorage } from "./Storage";

export const userRegisteration = createAsyncThunk(
    "auth/signup",
    async (values, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `https://Social-Media.saurabhsharma11.repl.co/v1/userAuth/signup`,
                values
            );
            if (response.status === 201) {
                toastSuccess("User Registered Successfully");
            }
            return fulfillWithValue(response);
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (values, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await axios.post(
            `https://Social-Media.saurabhsharma11.repl.co/v1/userAuth/login`,values
        );
            //console.log("login",response);
            if (response.status === 200) {
                setupAuthHeaderForServiceCalls(response.data.token);
                setlocalStorage(response.data.userdata, response.data.token);
            }
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error.response);
        }
    } 
);

const currentUser = {
    username: "",
    name: "",
    profilePicture: "",
    userid: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: currentUser,
        token: "",
        status: "idle",
        error: null
    },
    reducers: {
        logout: (state) => {
            state.status = "idle";
            state.token = "";
            clearLocalStorage();
        },
        setData: (state, action) => {
            //console.log("auth slice",action.payload.userdata);
            state.token = action.payload.token;
            state.currentUser = action.payload.userdata;
        },
        updateUser: (state, action) => {
            console.log(action.payload);
            state.currentUser = action.payload;
            localStorage.setItem("userdata", JSON.stringify(state.currentUser));
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.status = "pending";
        },
        [login.fulfilled]: (state, action) => {
            //console.log("reducer",action.payload.userdata);
            state.status = "success";
            state.token = action.payload.token;
            state.currentUser = action.payload.userdata;
        },
        [login.rejected]: (state, action) => {
            state.error = action.error.message;
            state.status = "failed";
        },
    },
});
  
export const { logout, setData, updateUser } = authSlice.actions;
  
export default authSlice.reducer;
  