export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type CartItem = {
  product: Product
  quantity: number
}

export type CartState = {
  cartList: CartItem[]
  totalPrice: number
  customerInfo: FormData
}

export type FormData = {
  name: string
  email: string
  phone: string
}
