import styles from './OrderButton.module.css'
import Link from 'next/link'

export default function OrderButton() {
  return (
    <Link href={'/order'} className={styles['order-button']}>
      Order
    </Link>
  )
}
