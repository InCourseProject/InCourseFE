import { configureStore } from "@reduxjs/toolkit";
import defaultSlice from "../modules/defaultSlice";
import formSlice from "../modules/formSlice";




const store = configureStore({

    reducer: {
        something: defaultSlice,
        formSlice:formSlice
    }

});

export default store;