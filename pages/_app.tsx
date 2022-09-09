import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppLayout } from "components/layout";
import usePreviousRoute from "hooks/usePrevoiusRoute";

function MyApp({ Component, pageProps }: AppProps) {
  usePreviousRoute();
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
