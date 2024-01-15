import Sidebar from '../../components/Sidebar'
import ProductList from '../../components/ProductsList'
import Search from '../../components/Search'

export default function Layout() {
  return (
    <main>
      <Search />
      <div className="flex justify-between px-6">
        <Sidebar />
        <ProductList />
      </div>
    </main>
  )
}
