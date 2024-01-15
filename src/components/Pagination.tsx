import { useState } from 'react'

export default function Pagination({
  length,
  pageSwitch,
}: {
  length: number
  pageSwitch: (index: number) => void
}) {
  const [activePage, setActivePage] = useState(1)

  return (
    <div className="flex flex-row align-center mt-3">
      {Array.from({ length }).map((_, index) => (
        <span
          key={index + 1}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-200
            ${activePage === index + 1 ? 'bg-gray-200' : ''}
          `}
          onClick={() => {
            pageSwitch(index + 1)
            setActivePage(index + 1)
          }}
        >
          {index + 1}
        </span>
      ))}
    </div>
  )
}
