import Navbar from './components/Navbar';
import Home from './Home';
import About from './About';
import Wallet from './Wallet';
import Connect from './Connect';
import NFTSearch from './NFTSearch';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="content">
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/connect">
              <Connect />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/nftsearch">
              <NFTSearch />
            </Route>
          </Switch>

        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
