
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './About';
import Connect from './Connect';
import NFTSearch from './NFTSearch';
import TwitterClone from './TwitterClone';
import Home from './Home';
import Footer from './components/Footer';
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEQOCwBjPa1Zsb1VypTAE6XZQBildtEWU",
  authDomain: "blockbook-50440.firebaseapp.com",
  projectId: "blockbook-50440",
  storageBucket: "blockbook-50440.appspot.com",
  messagingSenderId: "758247764370",
  appId: "1:758247764370:web:f7eb76744c5690c356514b",
  measurementId: "G-XNJ9E8YCRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');



export const Wallet: FC = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Select the wallets you wish to support, by instantiating wallet adapters here.
             *
             * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
             * That package supports tree shaking and lazy loading -- only the wallets you import
             * will be compiled into your application, and only the dependencies of wallets that
             * your users connect to will be loaded.
             */
            new PhantomWalletAdapter(),

            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            //new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            //new LedgerWalletAdapter(),
            new SolletExtensionWalletAdapter(),
            new SolletWalletAdapter(),

        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <BrowserRouter>
                        <div className='nav'>
                            <Navbar />
                            <WalletMultiButton />
                        </div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="connect" element={<Connect />} />
                            <Route path="nftsearch" element={<NFTSearch />} />
                            <Route path="twitterclone" element={<TwitterClone />} />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default Wallet;
