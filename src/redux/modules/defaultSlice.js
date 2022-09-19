import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  
};

// Reducer | Action Creater | Action Value
export const defaultSlice = createSlice({
  name: "name", // 이 모듈의 이름
  initialState, // 이 모듈의 초기상태 값
  reducers: { // 이 모듈의 Reducer 로직
    addSomething: (state, action) => {
      state.Something = state.Something + action.payload
    },


  },
});

export const { addSomething } = defaultSlice.actions
export default defaultSlice.reducer