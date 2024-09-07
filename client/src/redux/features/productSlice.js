import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
    productCount: 0,
};

export const productSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        fetchCourseList: (state, action) => {
            state.courses = action.payload;
        },
    },
});

export const { fetchProductList } = productSlice.actions;

export default productSlice.reducer;