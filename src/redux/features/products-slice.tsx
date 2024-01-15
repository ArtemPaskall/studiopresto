import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../../types'

interface ProductsState {
  products: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchText: string
}

export const fetchAllProducts = createAsyncThunk<Product[]>(
  'products/fetchAllProducts',
  async () => {
    try {
      const url = 'https://fakestoreapi.com/products'
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Server error')
    }
  },
)

export const fetchProductsByCategory = createAsyncThunk<Product[], string>(
  'products/fetchProductsByCategory',
  async category => {
    try {
      const url = `https://fakestoreapi.com/products/category/${category}`
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Server error')
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    searchText: '',
  } as ProductsState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch products'
      })
      .addCase(fetchProductsByCategory.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch products by category'
      })
  },
})

export const selectProducts = (state: { products: ProductsState }) => state.products

export const { setSearchText } = productsSlice.actions

export default productsSlice.reducer
