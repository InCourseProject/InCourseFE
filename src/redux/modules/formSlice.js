import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getCookie } from "../../shared/cookie";
import axios from "axios";

const accessToken = localStorage.getItem('Authorization'); //accessToken
const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
const initialState = {
    form: {
        postRequestDto:{},
        placeRequestDtoList:[],
},
    post:{},
    isLoading: false,
    error: null,
    like: false,
};
export const _getPost = createAsyncThunk(
    "post/getPost",
    async(payload, thunkApI) => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/${payload}`,{
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
export const _deletePost = createAsyncThunk(
    "post/deDate",
    async (payload, thunkAPI) => {
        console.log(payload)
        try{
            const data = await axios.delete(

                `${process.env.REACT_APP_SERVER_API}/api/course/${payload.id}`,payload.coseId
                ,{
                    headers:{
                        Authorization: accessToken,
                        RefreshToken: refreshToken

                    }
                }
            )
            console.log(data)
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const _deleteCose = createAsyncThunk(
    "post/deDate",
    async (payload, thunkAPI) => {
        console.log(payload)
        try{
            const data = await axios.delete(

                `${process.env.REACT_APP_SERVER_API}/api/course/place/${payload}`  
                ,{
                    headers:{
                        Authorization: accessToken,
                        RefreshToken: refreshToken

                    }
                }
            )
            console.log(data)
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)
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

export const formSlice = createSlice({
  name:"form",
  initialState,
  reducers:{
    createMarker(state,action){
        state.form.placeRequestDtoList.push(action.payload);
        // localStorage.setItem(action.payload)
        
    },
    categorySelect(state,action){
        state.form.postRequestDto = action.payload;
        // localStorage.setItem(action.payload)
        
    },
    createTitle(state,action){
        state.title = action.payload;
        // localStorage.setItem(action.payload)
        
    },
    // likePost(state, action){
    //    let index = state.post.findIndex(post => post.id === action.payload.id);
    //    state.post[index].count +=1;
    //    axios.patch(`http://54.180.31.216/api/auth/post/post/${action.payload.id}`,action.payload)
    // },
    // hatePost(state, action){
    //     let index = state.post.findIndex(post => post.id === action.payload.id);
    //     state.post[index].count -=1;
    //     axios.patch(`http://54.180.31.216/api/auth/post/post/${action.payload.id}`,action.payload)
    // },
    deleteCose(state,action){
        console.log(state)
        let index = state.form.placeRequestDtoList.findIndex(cose =>cose.coordinateX === action.payload)
        state.form.placeRequestDtoList.splice(index,1)
        console.log(index)
    },
    updatePost(state,action){
        let index = state.post.findIndex(post => post.id === action.payload.id);
        state.post.splice(index,1,action.payload)
    }
  },
  extraReducers:  (builder) => {
    // builder
    //     .addCase(_deletePost.pending, (state) => {
    //         state.isLoading = true;
          
    //     })
    //     .addCase(_deletePost.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         const deleteState = state.post.findIndex(post => post.id === action.payload)
    //         state.post.slice(deleteState,1)
    //         state.isDelete = true;
        
    //     })
    //     .addCase(_deletePost.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
           
    //     });
    builder
        .addCase(_getPost.pending, (state) => {
            state.isLoading = true;
           
        })
        .addCase(_getPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.form = action.payload;
            
        })
        .addCase(_getPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
           
       
        });
    // builder
    //     .addCase(_updatePost.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(_updatePost.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.post = action.payload;
    //         console.log(state.post)
    //     })
    //     .addCase(_updatePost.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
       
    //     });

   
  }
});

export const {createMarker,likePost,deleteCose,updatePost,hatePost,categorySelect,createTitle} = formSlice.actions;
export default formSlice.reducer