'use client'
import './BuyButton.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOneToCart } from '../../redux/features/cart-slice'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/features/products-slice'
import { Product } from '../../../types'
import BuyModal from './ModalBuyMessage'

export default function BuyButton({ id }: { id: number }) {
  const dispatch = useDispatch()
  const { products } = useSelector(selectProducts)
  const [showModal, setShowModal] = useState(false)
  const selectedProduct = products.find(product => product.id === id) as Product

  const handleBuyClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    if (selectedProduct) {
      dispatch(addOneToCart(selectedProduct))
      setShowModal(true)

      setTimeout(() => {
        setShowModal(false)
      }, 800)
    }
  }

  return (
    <>
      <div className="card__buy" onClick={e => handleBuyClick(e)}>
        BUY
        {showModal && <BuyModal />}
      </div>
    </>
  )
}
