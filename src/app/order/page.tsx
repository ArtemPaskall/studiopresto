'use client'
import { useSelector } from 'react-redux'
import EmailTemplate from '../../components/EmailTemplate/EmailTemplate'
import { selectCart } from '../../redux/features/cart-slice'
import OrderForm from '../../components/OrderForm/OrderForm'

export default function Order() {
  const { cartList, totalPrice, customerInfo } = useSelector(selectCart)

  return cartList ? (
    <div className="px-8 flex flex-col items-center">
      <h3 className="text-xl mt-1">Please input your information to complete your order</h3>
      <OrderForm />
      <EmailTemplate cartList={cartList} totalPrice={totalPrice} customerInfo={customerInfo} />
    </div>
  ) : (
    <h1 className="text-3xl text-center mt-4">You have not selected a product to order</h1>
  )
}
