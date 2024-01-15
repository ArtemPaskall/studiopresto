'use client'
import { selectCart } from '../../redux/features/cart-slice'
import { useSelector } from 'react-redux'
import CartCard from '../../components/CartCard/CartCard'
import Link from 'next/link'
import OrderButton from '../../components/OrderButton/OrderButton'
import { CartItem } from '../../../types'

export default function Cart() {
  const { cartList, totalPrice } = useSelector(selectCart)

  return (
    <>
      {cartList.length < 1 ? (
        <h1 className="text-3xl text-center mt-4">Your cart is empty</h1>
      ) : (
        <div className="px-20" style={{ color: '#1c314e' }}>
          <ul className="mb-4">
            {cartList.map((cartItem: CartItem) => (
              <li key={cartItem.product.id}>
                <Link href={`/product/${cartItem.product.id}`}>
                  <CartCard cartItem={cartItem} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-4 px-4">
            <div className="flex justify-between border-b-2 border-solid border-green-600">
              <div className="text-2xl font-bold"> Total Amount : </div>
              <div className="text-2xl font-bold" style={{ color: 'rgb(53, 192, 53)' }}>
                {totalPrice.toFixed(2)} $
              </div>
            </div>
          </div>
          <OrderButton />
        </div>
      )}
    </>
  )
}
