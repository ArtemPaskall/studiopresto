'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Pagination from './Pagination'
import ProductCard from './ProductCard/ProductCard'
import { AppDispatch } from '../redux/store'
import {
  fetchAllProducts,
  selectProducts,
  fetchProductsByCategory,
} from '../redux/features/products-slice'
import { Product } from '../../types'
import Spiner from './Spiner/Spiner'
import { usePathname } from 'next/navigation'

function ProductsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch<AppDispatch>()
  const { status, error, products, searchText } = useSelector(selectProducts)
  const path = usePathname()

  const pageSwitch = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [products, searchText])

  useEffect(() => {
    if (path === '/products') {
      document.title = 'Studiopresto | All Products'
      dispatch(fetchAllProducts())
      return
    }

    if (path.startsWith('/products/') && path !== '/products/') {
      const category = path.substring('/products/'.length)
      document.title = `Studiopresto | ${decodeURI(category).toUpperCase()}`
      dispatch(fetchProductsByCategory(category))
      return
    }
  }, [path])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase()),
  )

  const productsPerPage = 6
  const currentProductsLength = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex) as Product[]

  if (status === 'failed') {
    return <div className="flex justify-center text-xl w-full font-bold">{error}</div>
  }

  return (
    <>
      {status === 'loading' || status === 'idle' ? (
        <div className="flex justify-center w-full">
          <Spiner />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center mx-4 mb-6">
          <ul className="w-full">
            {currentProducts.map((product: Product) => (
              <li className="flex items-center justify-between w-full" key={product.id}>
                <Link href={`/product/${product.id}`} className="w-full">
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
          </ul>
          {currentProductsLength > 1 && (
            <Pagination length={currentProductsLength} pageSwitch={pageSwitch} />
          )}
        </div>
      )}
    </>
  )
}

export default ProductsList
