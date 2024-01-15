import Image from 'next/image'
import { CartItem } from '../../../types.ts'
import styles from './CartCard.module.css'
import AddRemoveButton from '../AddRemoveButton/AddRemoveButton.tsx'
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../redux/features/cart-slice.tsx'
import { useState } from 'react'

export default function CartCard({ cartItem }: { cartItem: CartItem }) {
  const dispatch = useDispatch()
  const { product, quantity } = cartItem
  const [isRemoving, setRemoving] = useState(false)

  const calculateTotalPrice = () => {
    return (product.price * quantity).toFixed(2)
  }

  const handleRemoveItem = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault()
    setRemoving(true)
    setTimeout(() => {
      dispatch(removeItemFromCart(product.id))
    }, 300)
  }

  return (
    <div className={`${styles.card} ${isRemoving ? styles.removing : ''}`}>
      <Image
        className={styles.card__image}
        src={product.image}
        alt={product.title}
        width={120}
        height={40}
        priority
      />
      <div className={styles['card__content']}>
        <Image
          className={styles['card__delete-icon']}
          src={'/delete-icon.svg'}
          alt={'delete button image'}
          width={22}
          height={22}
          onClick={e => handleRemoveItem(e)}
        />
        <div>
          <span className={styles['card__title']}>{product.title}</span>
        </div>
        <div className={styles['card__descriprion']}>
          <div className={styles['card__category-price']}>
            <div className={styles['card__category']}>
              <span className="font-bold">Category: </span>
              {product.category}
            </div>
            <div>
              <span className="font-bold text-md pr-2">Price: </span>
              <span className={styles['card__price']}>{product.price} $</span>
            </div>
          </div>
          <div className="mt-4">
            <AddRemoveButton cartItem={cartItem} />
          </div>
        </div>
        <div className={styles['total-price']}>
          <div className={styles['total-price__title']}>Total :</div>
          <div className={styles['total-price__value']}>{calculateTotalPrice()} $</div>
        </div>
      </div>
    </div>
  )
}
