'use client'

export default function Error({ error }: { error: Error }) {
  return <div className="flex justify-center font-bold text-lg my-4">Oooops!. {error.message}</div>
}
