import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import DrawerNavigation from '../components/Layout/DrawerNavigation';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session} refetchInterval={180 * 60}>
            <div data-theme="dark" className="container mx-auto h-screen">
                <Toaster position="top-right" reverseOrder={false} />
                <Head>
                    <title>Team Nordstern</title>
                    <meta name="description" content="Team Nordstern App" />
                </Head>

                <DrawerNavigation>
                    <div className="flex h-screen flex-col">
                        <div className="grow overflow-y-auto">
                            <Component {...pageProps} />
                        </div>
                    </div>
                </DrawerNavigation>
            </div>
        </SessionProvider>
    );
}

export default MyApp;
