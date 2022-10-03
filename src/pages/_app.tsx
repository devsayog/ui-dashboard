import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import Layout from '@/components/common/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
