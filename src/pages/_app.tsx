import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalStyle from '@/theme/globalStyles';
import { CustomContextProvider } from '@/context/customContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <CustomContextProvider>
        <Component {...pageProps} />
      </CustomContextProvider>
    </>
  )
}
