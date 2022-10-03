import Navbar from './components/Navbar';
import Home from './Home';
import About from './About';
import Wallet from './Wallet';
import Connect from './Connect';
import NFTSearch from './NFTSearch';
import Footer from './components/Footer';
import MyComponent from './components/MyComponent';
import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

//---------------------Wallet imports---------------------------------------
import { clusterApiUrl } from '@solana/web3.js';
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
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import './App.css';

// import the styles
require('@solana/wallet-adapter-react-ui/styles.css');
//--------------------------------wallet imports end------------------------------------------------

function App() {
 // you can use Mainnet, Devnet or Testnet here
 const network = WalletAdapterNetwork.Mainnet;
 const endpoint = useMemo(() => clusterApiUrl(network), [network]);
 // initialise all the wallets you want to use
 const wallets = useMemo(
     () => [
         new PhantomWalletAdapter(),
         new GlowWalletAdapter(),
         new SlopeWalletAdapter(),
         new SolflareWalletAdapter({ network }),
         new TorusWalletAdapter(),
         //new LedgerWalletAdapter(),
         new SolletExtensionWalletAdapter(),
         new SolletWalletAdapter(),
     ],
     [network]
 );

    

  return (
    
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
           
          <BrowserRouter>
          <div className ="App">
            <div className='nav'>
              <Navbar />
              <MyComponent/>
                          
            </div>
            
            
            <div className = "content"> 
            <Switch> 
                <Route path = "/home">
                  <Home/>
                </Route>
                <Route path = "/wallet">
                  <Wallet/>
                </Route>
                <Route path = "/connect">
                  <Connect/>
                </Route>
                <Route path = "/about">
                  <About/>
                </Route>
                <Route path="/nftsearch">
                  <NFTSearch />
                </Route>
            </Switch>
            
            </div>

            <Footer/>
          </div>
        </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
  </ConnectionProvider>

  )
}

export default App;

