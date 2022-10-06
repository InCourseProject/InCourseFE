import { configureStore } from "@reduxjs/toolkit";
import defaultSlice from "../modules/defaultSlice";
import formSlice from "../modules/formSlice";
import homeSilce from "../modules/homeSilce";



const store = configureStore({

    reducer: {
        something: defaultSlice,
        formSlice:formSlice,
        homeSlice:homeSilce
    }

});

export default store;