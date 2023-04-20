import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalStyle from '@/theme/globalStyles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Component {...pageProps} />
    </>
  )
}
