import Image from 'next/image'

function Rating({ rate, count }: { rate: number; count: number }) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/47202.png"
        alt="star"
        width={80}
        height={40}
        className="w-auto h-auto max-w-sm"
        priority
      />
      <div className="font-bold">
        <span className="text-4xl" style={{ color: '#ff8159' }}>
          {rate}
        </span>
        <span className="text-lg text-sky-600">({count})</span>
      </div>
    </div>
  )
}

export default Rating
