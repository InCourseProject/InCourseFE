import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getCookie } from "../../shared/cookie";
import axios from "axios";

const initialState = {
    detail: [],
    isLoading: false,
    error: null,
    like: false,
};
export const _getLikePost = createAsyncThunk(
    "post/getPost",
    async(payload, thunkApI) => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/mypage/heart`,{
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                    RefreshToken: localStorage.getItem("RefreshToken")
                }
            });
            console.log(data)
            return thunkApI.fulfillWithValue(data.data)
        }catch(error){
            return thunkApI.rejectWithValue(error);
        }
    }
);



// export const _updatePost = createAsyncThunk(
//     "post/upDate",
//     async (payload, thunkApI) => {
//         console.log(payload)
//         try {
//             const data = await axios.patch(
//                 `http://54.180.31.216/api/auth/post/${payload.id}`,

//                 payload.data,{
//                     headers:{
//                         "Content-Type": "multipart/form",
//                         Authorization: getCookie("ACESS_TOKEN"),
//                         RefreshToken: getCookie("REFRESH_TOKEN")
//                     }
                    
//                 }
//             )
//             window.location.replace('/main')
//             return thunkApI.fulfillWithValue(data.data);
//             console.log(data)
//         }catch(error){
//             return thunkApI.rejectWithValue(error);
//         }
//     }
// )
// export const _deletePost = createAsyncThunk(
//     "post/deDate",
//     async (payload, thunkAPI) => {
//         console.log(payload)
//         try{
//             const data = await axios.delete(

//                 `http://54.180.31.216/api/auth/post/${payload.id}`  
//                 ,{
//                     headers:{
//                         Authorization: payload.token,
//                         RefreshToken: payload.refresh

//                     }
//                 }
//             )
//             console.log(data)
//             return data
//         }catch(error){
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// )
// export const _getLike = createAsyncThunk(
//     "post/getPost",
//     async(payload, thunkApI) => {
//         try {
//             const data = await axios.get("http://13.209.97.75:8080/api/auth/like/{id}");
//             // console.log(data)
//             return thunkApI.fulfillWithValue(data.data);
//         }catch(error){
//             return thunkApI.rejectWithValue(error);
//         }
//     }
// );

export const homeSlice = createSlice({
  name:"form",
  initialState,
  reducers:{},
  extraReducers:  (builder) => {
//     builder
//         .addCase(_deletePost.pending, (state) => {
//             state.isLoading = true;
          
//         })
//         .addCase(_deletePost.fulfilled, (state, action) => {
//             state.isLoading = false;
//             const deleteState = state.post.findIndex(post => post.id === action.payload)
//             state.post.slice(deleteState,1)
//             state.isDelete = true;
        
//         })
//         .addCase(_deletePost.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
           
//         });
    builder
        .addCase(_getLikePost.pending, (state) => {
            state.isLoading = true;
           
        })
        .addCase(_getLikePost.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.detail = action.payload
            // index.find((post) => ( post.id === action.payload.id))
            
        })
        .addCase(_getLikePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
           
       
        });
//     builder
//         .addCase(_updatePost.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(_updatePost.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.post = action.payload;
//             console.log(state.post)
//         })
//         .addCase(_updatePost.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
       
//         });

   
  }
});

export const {createMarker,likePost,deleteCose,updatePost,hatePost,categorySelect,createTitle} = homeSlice.actions;
export default homeSlice.reducer