import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: [],

}

export const addNewProduct = createAsyncThunk(
    "/products/add-new-product",
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/admin/products/add-product",
                formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

export const fetchAllProducts = createAsyncThunk(
    "/products/fetch-all-products",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/admin/products/fetch-all-products"
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

export const editProduct = createAsyncThunk(
    "/products/edit-product",
    async ({ id, formData }, thunkAPI) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/admin/products/edit-product/${id}`,
                formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

export const deleteProduct = createAsyncThunk(
    "/products/delete-product",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/admin/products/delete-product/${id}`,
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });




const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {

                state.isLoading = false;
                state.productList = action.payload.data || action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })
    },
});


export default AdminProductsSlice.reducer;
