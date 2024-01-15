import Image from 'next/image'
import { Product } from '../../../../types'
import BuyButton from '../../../components/BuyButton/BuyButton'
import Rating from '../../../components/Rating'
import Spiner from '../../../components/Spiner/Spiner'

async function getProduct(id: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  const product = await res.json()
  return product
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<{ title: string }> {
  const product = (await getProduct(+id)) as Product
  const title = product.title.split(' ').slice(0, 5).join(' ')

  return {
    title,
  }
}

async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = (await getProduct(+id)) as Product

  return (
    <div className="mt-10 px-3" style={{ color: ' #1c314e' }}>
      <div className="flex items-align justify-between h-80">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={150}
          className="w-auto h-auto max-w-sm"
          priority
        />
        <div className="px-2 flex flex-col justify-between px-8">
          <div className="font-bold text-2xl text-center pt-2">{product.title}</div>
          <div className="text-right font-bold text-sky-600">
            Category: <span className="italic underline">{product.category}</span>
          </div>
          <div>{product.description}</div>
          <div className="flex justify-between items-end">
            <Rating rate={product.rating.rate} count={product.rating.count} />
            <div className="flex flex-col items-end">
              <div className="text-4xl font-bold mb-2" style={{ color: '#29be1e' }}>
                {product.price.toFixed(2)} $
              </div>
              <BuyButton id={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
