import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() { //got this navbar stuff also from The Net Ninja
    return (

        <div className='navbar'>
            <img height="100px" src="bb_logo_new.png" id="logo" />
            <nav className='links'>
                <Link to="/">Home</Link>
                <Link to="/connect">Connect</Link>
                <Link to="/about">About</Link>
                <Link to="/nftsearch">NFT Search</Link>
                <Link to="/twitterclone">Feed</Link>
            </nav>
        </div>
    )
}

export default Navbar;
