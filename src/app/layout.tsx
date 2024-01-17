import { Roboto } from 'next/font/google'
import './styles/globals.css'
import ReduxProvider from '../redux/provider'
import Header from '../components/Header'
import { Metadata } from 'next'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Studiopresto',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Vercel_favicon.svg" />
      </head>
      <body className={roboto.className}>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
