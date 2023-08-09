import { createSlice } from "@reduxjs/toolkit";
import PRODUCTS from '../../constantes/data/products.json'

const initialState = {
    data: PRODUCTS
}

const productsSlices = createSlice({
    name: "products",
    initialState,
    reducers: {},
})

export default productsSlices.reducer;