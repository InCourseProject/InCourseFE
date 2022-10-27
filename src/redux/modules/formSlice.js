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
    posts:{
        place:[]
    },
    isLoading: false,
    error: null,
    like: false,
};

//게시물 불러오기
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
            return thunkApI.fulfillWithValue(data.data)
        }catch(error){
            return thunkApI.rejectWithValue(error);
        }
    }
);

//게시물 작성
export const _addPost = createAsyncThunk(
    "post/addPost",
    async(payload, thunkApI) => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course`,payload,{
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: localStorage.getItem("Authorization"),
                    RefreshToken: localStorage.getItem("RefreshToken")
                }
            });
            return thunkApI.fulfillWithValue(data.data)
        }catch(error){
            return thunkApI.rejectWithValue(error);
        }
    }
);

//게시물 삭제
export const _deletePost = createAsyncThunk(
    "post/deDate",
    async (payload, thunkAPI) => {
        try{
            const datas = await axios.delete(`${process.env.REACT_APP_SERVER_API}/api/course/${payload.id}`,{
                    headers:{
                        Authorization: accessToken,
                        RefreshToken: refreshToken

                    },
                    data:payload.coseId
                }
            )
            return alert(datas.data),
        window.location.replace("/mypostpage")
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

//코스 삭제
export const _deleteCose = createAsyncThunk(
    "post/deDate",
    async (payload, thunkAPI) => {
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
            return data,
            window.location.replace("")
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const formSlice = createSlice({
  name:"form",
  initialState,
  reducers:{
    createMarker(state,action){
        state.form.placeRequestDtoList.push(action.payload);
    },
    categorySelect(state,action){
        state.form.postRequestDto = action.payload;
        state.form.posts = action.payload;
    },
    createTitle(state,action){
        state.title = action.payload;
    },
    deleteCose(state,action){
        let index = state.form.placeRequestDtoList.findIndex(cose =>cose.coordinateX === action.payload)
        state.form.placeRequestDtoList.splice(index,1)
    },
    updatePost(state,action){
        let index = state.post.findIndex(post => post.id === action.payload.id);
        state.post.splice(index,1,action.payload)
    }
  },
  extraReducers:  (builder) => {
    builder
        .addCase(_addPost.pending, (state) => {
            state.isLoading = true;
          
        })
        .addCase(_addPost.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(_addPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
           
        });
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
  }
});

export const {createMarker,likePost,deleteCose,updatePost,hatePost,categorySelect,createTitle} = formSlice.actions;
export default formSlice.reducer