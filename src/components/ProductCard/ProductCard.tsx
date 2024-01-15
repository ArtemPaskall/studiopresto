import Image from 'next/image'
import { Product } from '../../../types'
import './ProductCard.css'
import BuyButton from '../BuyButton/BuyButton'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <Image
        className="card__image"
        src={product.image}
        alt={product.title}
        width={120}
        height={40}
        priority
      />
      <div className="card__content">
        <span className="card__title">{product.title}</span>
        <div className="card__descriprion">
          <span className="card__category">Category: {product.category}</span>
          <span className="card__price">{product.price.toFixed(2)} $</span>
          <BuyButton id={product.id} />
        </div>
      </div>
    </div>
  )
}
