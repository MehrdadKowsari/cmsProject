
import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { NextPage } from 'next';
import { Layout } from 'src/layouts/admin/components';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import ConfirmContextProvider from 'src/state/providers/ConfirmProvider';
import ConfirmModal from 'src/@core/components/confirm/ConfirmModal';
import { AuthProvider } from 'src/state/providers/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import createEmotionCache from '../configs/createEmotionCache';
import { store } from '../state/store';
import { appWithTranslation } from 'next-i18next'
import "src/styles/scss/modules.scss";

const CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  isRequiredAuth?: boolean;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
  emotionCache?: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ConfirmContextProvider>
      <ConfirmModal/>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>             
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <AuthProvider>
                  {getLayout(<Component {...pageProps} />)}
                </AuthProvider>
              </GoogleOAuthProvider>
            </ThemeComponent>
          }}
        </SettingsConsumer>
        <ToastContainer />
      </SettingsProvider>
      </ConfirmContextProvider>
    </CacheProvider>
    </Provider>
    
  );
}

export default appWithTranslation(MyApp);
