import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/css/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CMSProject</title>
        <meta name="description" content="MERN CMSProject" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
