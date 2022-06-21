// i18n
import "../locales/i18n";

// highlight
import "../utils/highlight";

// scroll bar
import "simplebar/src/simplebar.css";
// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import cookie from "cookie";
import { ReactElement, ReactNode } from "react";
// next
import { NextPage } from "next";
import Head from "next/head";
import App, { AppProps, AppContext } from "next/app";
//
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// @mui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// redux
import { store, persistor } from "../redux/store";
// utils
import { getSettings } from "../utils/settings";
import { SettingsValueProps } from "../components/settings/type";
// contexts
import { SettingsProvider } from "../contexts/SettingsContext";
import { CollapseDrawerProvider } from "../contexts/CollapseDrawerContext";
// theme
import ThemeProvider from "../theme";
// components
import Settings from "../components/settings";
import ProgressBar from "../components/ProgressBar";
import ThemeColorPresets from "../components/ThemeColorPresets";
import NotistackProvider from "../components/NotistackProvider";
import ThemeLocalization from "../components/ThemeLocalization";
import MotionLazyContainer from "../components/animate/MotionLazyContainer";

//import { AuthProvider } from '../contexts/JWTContext';
// import { AuthProvider } from '../contexts/Auth0Context';
import { AuthProvider } from "../contexts/FirebaseContext";
// import { AuthProvider } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
}
function MyApp(props: MyAppProps) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CollapseDrawerProvider>
                <SettingsProvider defaultSettings={settings}>
                  <ThemeProvider>
                    <NotistackProvider>
                      <MotionLazyContainer>
                        <ThemeColorPresets>
                          <ThemeLocalization>
                            {/* <Settings /> */}
                            <ProgressBar />
                            {getLayout(<Component {...pageProps} />)}
                          </ThemeLocalization>
                        </ThemeColorPresets>
                      </MotionLazyContainer>
                    </NotistackProvider>
                  </ThemeProvider>
                </SettingsProvider>
              </CollapseDrawerProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </AuthProvider>
    </>
  );
}
MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || "" : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
export default MyApp;
