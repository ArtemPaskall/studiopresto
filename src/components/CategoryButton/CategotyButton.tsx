'use client'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchAllProducts, fetchProductsByCategory } from '../../redux/features/products-slice'
import './CategoryButton.css'
import { usePathname } from 'next/navigation'

export default function CategoryButton({ category }: { category: string }) {
  const path = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  const isActive =
    decodeURI(path) === `/products/${decodeURI(category)}` ||
    (decodeURI(path) === '/products' && category === 'All Products')

  function handleCategoryClick(category: string) {
    if (category === 'All Products') {
      dispatch(fetchAllProducts())
      return
    }
    dispatch(fetchProductsByCategory(category))
  }

  return (
    <div
      className={`category__button ${isActive ? 'category__button--active' : ''}`}
      onClick={() => handleCategoryClick(category)}
    >
      {category}
    </div>
  )
}
