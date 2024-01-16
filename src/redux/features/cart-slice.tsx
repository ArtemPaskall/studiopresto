import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, CartState, CartItem, FormData } from '../../../types'

const calculateTotalPrice = (cartList: CartItem[]) => {
  return cartList.reduce((acc, cartItem) => {
    const productPrice = cartItem.product.price
    const itemTotalPrice = productPrice * cartItem.quantity
    return acc + itemTotalPrice
  }, 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
    totalPrice: 0,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
    },
  } as CartState,
  reducers: {
    addOneToCart: (state, action: PayloadAction<Product>) => {
      const productIdToAdd = action.payload.id
      const existingItemIndex = state.cartList.findIndex(item => item.product.id === productIdToAdd)

      if (existingItemIndex !== -1) {
        state.cartList[existingItemIndex].quantity += 1
      } else {
        state.cartList.push({ product: action.payload, quantity: 1 })
      }
      state.totalPrice = calculateTotalPrice(state.cartList)
    },
    removeOneFromCart: (state, action: PayloadAction<Product>) => {
      const productIdToRemoveOne = action.payload.id
      const existingItemIndex = state.cartList.findIndex(
        item => item.product.id === productIdToRemoveOne,
      )

      if (existingItemIndex !== -1) {
        if (state.cartList[existingItemIndex].quantity > 1) {
          state.cartList[existingItemIndex].quantity -= 1
        }
      }
      state.totalPrice = calculateTotalPrice(state.cartList)
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload
      state.cartList = state.cartList.filter(item => item.product.id !== productIdToRemove)
      state.totalPrice = calculateTotalPrice(state.cartList)
    },
    setCustomerInfo: (state, action: PayloadAction<FormData>) => {
      state.customerInfo = action.payload
    }
  },
})

export const { addOneToCart, removeOneFromCart, removeItemFromCart, setCustomerInfo } = cartSlice.actions

export const selectCart = (state: { cart: CartState }) => state.cart

export default cartSlice.reducer
