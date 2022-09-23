import React, { useState } from 'react';
import Navbar from './components/Navbar';


const Home = () => {
    return (
        <html >
            <div className='midCol'>
                <h1>Welcome to Block Book</h1>
                <div className='trade'>
                    <div className='currency'>
                        <img src="usd.jpg" width="40px" className='currencyImg' />
                        <label for="usd">USD</label>
                        <input type="text" id="usd" className='tradeInput'></input>
                    </div>
                    <img src="switchArrows.jpg" />
                    <div className='currency'>
                        <img src="sol.jpg" width="40px" className='currencyImg' />
                        <label for="sol">SOL</label>
                        <input type="text" id="sol" className='tradeInput'></input>
                    </div>
                </div>
            </div>

        </html>
    );
}

export default Home;
