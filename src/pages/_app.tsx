
/* Imports */
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Navbar from '@/components/navigation';
import GlobalStyle from '@/theme/globalStyles';
import { AuthContextProvider } from '@/context/authContext';
import { CustomContextProvider } from '@/context/customContext';


/* Component */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noAuthRequired: Array<string> = ['/login', '/signup'];

  return (
    <AuthContextProvider>
      <GlobalStyle></GlobalStyle>
      <Navbar></Navbar>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
        <>
          <CustomContextProvider>
            <Component {...pageProps} />
          </CustomContextProvider>
        </>
      )}
  </AuthContextProvider>
  )
}
