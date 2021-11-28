// pages/_app.js
import { AppProps } from 'next/dist/shared/lib/router/router'
import '../styles/globals.css'
import React from "react"


function MyApp({ Component, pageProps }: AppProps) {
  const [post, setPost] = React.useState(null);
  return <Component {...pageProps} />
}


export default MyApp