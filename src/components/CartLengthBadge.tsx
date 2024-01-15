'use client'
import { useSelector } from 'react-redux'
import { selectCart } from '../redux/features/cart-slice'

export default function CartLengthBadge() {
  const { cartList } = useSelector(selectCart)

  return (
    <div className="flex items-center justify-center bg-red-500 rounded-full w-4 h-4 absolute top-0 right-[-5px]">
      <span style={{ fontSize: '10px', color: '#fff' }}>{cartList.length}</span>
    </div>
  )
}
