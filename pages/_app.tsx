import Layout from '../components/Layout'
import { AppProps } from 'next/app';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}