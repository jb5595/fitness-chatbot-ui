import Layout from '../components/Layout'
import { AppProps } from 'next/app';
import "../app/globals.css";
import { CurrentUserProvider } from '@/context/currentUserContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </CurrentUserProvider>

  )
}