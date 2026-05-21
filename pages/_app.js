import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import DrawerNavigation from '../components/Layout/DrawerNavigation';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    const [navigating, setNavigating] = useState(false);

    useEffect(() => {
        const handleStart = () => setNavigating(true);
        const handleStop = () => setNavigating(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop);
        };
    }, [router]);

    return (
        <SessionProvider session={session} refetchInterval={180 * 60}>
            <div data-theme="dark" className="container mx-auto h-screen">
                <Toaster position="top-right" reverseOrder={false} />
                <Head>
                    <title>Team Nordstern</title>
                    <meta name="description" content="Team Nordstern App" />
                </Head>

                {navigating && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <span className="loading loading-spinner loading-lg text-nsOrange" />
                    </div>
                )}

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
