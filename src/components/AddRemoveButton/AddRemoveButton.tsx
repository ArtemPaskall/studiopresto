'use client'
import styles from './AddRemoveButton.module.css'
import { CartItem } from '../../../types'
import { useDispatch } from 'react-redux'
import { addOneToCart, removeOneFromCart } from '../../redux/features/cart-slice'

export default function AddRemoveButton({ cartItem }: { cartItem: CartItem }) {
  const dispatch = useDispatch()

  return (
    <div className={styles['button__wrapper']}>
      <div
        className={`${styles.button} ${styles['button__minus']}`}
        onClick={e => {
          e.preventDefault()
          dispatch(removeOneFromCart(cartItem.product))
        }}
      >
        -
      </div>
      <div className={styles['button__quantity']}>{cartItem.quantity}</div>
      <div
        className={`${styles.button} ${styles['button__plus']}`}
        onClick={e => {
          e.preventDefault()
          dispatch(addOneToCart(cartItem.product))
        }}
      >
        +
      </div>
    </div>
  )
}
