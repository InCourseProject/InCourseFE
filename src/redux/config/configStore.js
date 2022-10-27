import { configureStore } from "@reduxjs/toolkit";
import formSlice from "../modules/formSlice";
import homeSilce from "../modules/homeSilce";



const store = configureStore({

    reducer: {
        formSlice:formSlice,
        homeSlice:homeSilce
    }

});

export default store;