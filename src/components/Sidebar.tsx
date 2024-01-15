import CategoryButton from './CategoryButton/CategotyButton'
import Link from 'next/link'

async function getCategories() {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error('Server error')
  }
}

async function Sidebar() {
  const categories = await getCategories()

  return (
    <ul className="mt-1">
      <li>
        <Link href={'/products'}>
          <CategoryButton category="All Products" />
        </Link>
      </li>
      {categories.map((category: string) => (
        <li key={category}>
          <Link href={`/products/${category}`}>
            <CategoryButton category={category} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Sidebar
