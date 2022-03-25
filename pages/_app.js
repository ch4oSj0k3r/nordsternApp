import Head from 'next/head'

import '../styles/globals.css'

function MyApp({Component, pageProps}) {
  return (
    <div data-theme="mytheme" className="h-screen bg-base-900">
      <Head>
        <title>Team Nordstern</title>
        <meta name="description" content="Team Nordstern App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
