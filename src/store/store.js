import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
const Store=configureStore({
    reducer:{
        auth:authSlice,
        //ToDO: add more slices here for posts
    }
}
   
);
export default Store;