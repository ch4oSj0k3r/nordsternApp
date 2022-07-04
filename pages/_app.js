import Head from 'next/head'
import {Toaster} from 'react-hot-toast'

import Appbar from '../components/Layout/Appbar'
import Navigation from '../components/Layout/Navigation'

import '../styles/globals.css'

function MyApp({Component, pageProps}) {
  return (
    <div
      data-theme="mytheme"
      className="container mx-auto h-screen bg-base-900"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <Head>
        <title>Team Nordstern</title>
        <meta name="description" content="Team Nordstern App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen flex-col">
        <div className="p-2 md:p-4">
          <Appbar />
        </div>
        <div className="grow overflow-y-auto">
          <Component {...pageProps} />
        </div>
        <div className="p-4 self-center ">
          <Navigation />
        </div>
      </div>
    </div>
  )
}

export default MyApp
