'use client'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchText } from '../redux/features/products-slice'
import { selectProducts } from '../redux/features/products-slice'

function SearchByText() {
  const dispatch = useDispatch()
  const { searchText } = useSelector(selectProducts)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value))
  }

  return (
    <div className="flex items-center justify-center mt-2 relative left-40">
      <input
        type="text"
        placeholder="Search by text"
        className="rounded-2xl bg-gray-100 h-10 w-96 p-4 outline-none"
        value={searchText}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default SearchByText
