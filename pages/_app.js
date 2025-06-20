import '../styles/index.css'
import '../styles/materialize-color.css'
import '../styles/font.css'
import '../styles/prism.css'

import Router from "next/router";
import { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import BlogLoading from '../components/BlogLoading'
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = (url) => {
      if(url.includes("/blog")) {
        setLoading(true);
      }
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <BlogLoading />
      ) : (
        <Component {...pageProps} />
      )}
      <SpeedInsights />
    </>
  );
}
