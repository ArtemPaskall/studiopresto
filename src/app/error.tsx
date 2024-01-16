'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">Something went wrong!</div>
        <div onClick={() => reset()} className="text-2xl font-bold bg-gray-600 p-2 text-white cursor-pointer">Try again</div>
      </body>
    </html>
  )
}
