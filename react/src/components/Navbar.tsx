import React from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD:react/src/components/Navbar.tsx
function Navbar(){ //got this navbar stuff also from The Net Ninja
    return ( 
=======
const Navbar = () => { //got this navbar stuff also from The Net Ninja
    return (
>>>>>>> main:react/src/components/Navbar.js
        <div className='navbar'>
            <img height="100px" src="bb_logo.png" id="logo" />
            <nav className='links'>
                <Link to="/home">Home</Link>
                <Link to="/wallet">Wallet</Link>
                <Link to="/connect">Connect</Link>
                <Link to="/about">About</Link>
                <Link to="/nftsearch">NFT Search</Link>
            </nav>
        </div>
    )
}

export default Navbar;
