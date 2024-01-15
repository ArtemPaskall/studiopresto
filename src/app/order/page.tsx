'use client'
import { useSelector } from 'react-redux'
import EmailTemplate from '../../components/EmailTemplate/EmailTemplate'
import { selectCart } from '../../redux/features/cart-slice'
import OrderForm from '../../components/OrderForm/OrderForm'

export default function Order() {
  const { cartList, totalPrice } = useSelector(selectCart)

  const sendMail = async () => {

    try {
      const sendEmail = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({ cartList, totalPrice }),
      })
      
      const data = await sendEmail.json()
      console.log(data)
    } catch (error) {
      throw new Error('Error sending email')
    }
  }

  return cartList && totalPrice ? (
    <div className="px-8 flex flex-col items-center">
      <h3 className="text-xl mt-1">Please input your information to complete your order</h3>
      <OrderForm />
      <EmailTemplate cartList={cartList} totalPrice={totalPrice} />
      <div
        className="bg-green-600 hover:bg-green-700 text-white
            font-bold py-2 px-4 w-60 mt-4 cursor-pointer flex justify-center"
        onClick={sendMail}
      >
        SUBMIT
      </div>
    </div>
  ) : (
    <h1 className="text-3xl text-center mt-4">You have not selected a product to order</h1>
  )
}
