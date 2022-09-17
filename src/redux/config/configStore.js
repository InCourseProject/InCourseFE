import { configureStore } from "@reduxjs/toolkit";
import defaultSlice from "../modules/defaultSlice";



const store = configureStore({

    reducer: {
        something: defaultSlice,
    }

});

export default store;