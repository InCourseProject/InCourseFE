import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    detail: [],
    isLoading: false,
    error: null,
    like: false,
};
export const _getLikePost = createAsyncThunk(
    "post/getPost",
    async (payload, thunkApI) => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/mypage/heart`, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                    RefreshToken: localStorage.getItem("RefreshToken")
                }
            });
            return thunkApI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkApI.rejectWithValue(error);
        }
    }
);


export const homeSlice = createSlice({
    name: "form",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(_getLikePost.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(_getLikePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.detail = action.payload

            })
            .addCase(_getLikePost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;


            });
    }
});

export const { createMarker, likePost, deleteCose, updatePost, hatePost, categorySelect, createTitle } = homeSlice.actions;
export default homeSlice.reducer