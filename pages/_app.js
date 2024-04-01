import React , { useEffect, useState } from 'react';
import { Layout } from '../components';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';
import 'react-quill/dist/quill.snow.css';
import '../styles/custom.css'
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';


function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
      <Layout>
            <SessionProvider session={session}>
              <Component {...pageProps} />
              <Toaster />
            </SessionProvider>
      </Layout>
  );
}

export default MyApp
