import Link from 'next/link'
import '../styles/globals.css';
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import Head from "next/head"
import Router from "next/router"
import NProgress from "nprogress"

NProgress.configure({showSpinner: true})

Router.onRouteChangeStart = url => {NProgress.start()}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function MyApp({ Component, pageProps }) {
  return (<>
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
    </Head>
    <div className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Picture of the author"
          height={66}
          width={231}
        />
      </Link>
    </div>
    <div className={styles.body}>
      <div className={styles.center}>
        <Component {...pageProps} />
      </div>
    </div>
  </>)
}

export default MyApp
