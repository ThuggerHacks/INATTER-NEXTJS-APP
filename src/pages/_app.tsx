import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/js/dist/toast");
    require("bootstrap/js/dist/modal");
  });
  return <Component {...pageProps} />;
}

export default MyApp;
