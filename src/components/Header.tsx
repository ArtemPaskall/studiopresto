import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartLengthBadge from './CartLengthBadge'

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-200 px-10 py-2">
      <Link href={'/products'}>
        <Image
          className="w-auto"
          src="/logo.svg"
          alt="Picture of the author"
          width={150}
          height={30}
          priority
        />
      </Link>
      <Link href={'/cart'} className="relative">
        <Image
          className="cursor-pointer"
          src="/cart_shopping_icon.svg"
          alt="Picture of the author"
          width={30}
          height={30}
        />
        <CartLengthBadge />
      </Link>
    </header>
  )
}

export default Header
