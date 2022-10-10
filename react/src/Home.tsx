import React, { useState } from 'react';
import Navbar from './components/Navbar';

var usdFill = null;
var solFill = null;


function Home(){

    function buttonPressed1() {
        var usd = document.getElementById("usd").value;
        var convertRate = 35; //this is a place holder until api / live connection works
        var sol = usd / convertRate;


        document.getElementById("usd").value = "";
        document.getElementById("sol").placeholder = sol;
        document.getElementById("usd").placeholder = ""

        return;
    }

    function buttonPressed2() {
        var sol = document.getElementById("sol").value;
        var convertRate = 35; //this is a place holder until api / live connection works
        var usd = sol * convertRate;

        document.getElementById("sol").value = "";
        document.getElementById("usd").placeholder = usd;
        document.getElementById("sol").placeholder = ""

        return;
    }

  



    return ( 
        <html >
            <div className='midCol'>
                <h1>Welcome to Block Book</h1>
                <div className='trade'>
                    <div className='currency'>
                        <img src="usd.jpg" width="40px" className='currencyImg' />
                        <label >USD</label>
                        <input type="text" id="usd" className='tradeInput' placeholder={usdFill}/>
                        <button onClick={buttonPressed1}>Convert to SOL</button>
                    </div>
                    <img src="switch.png" width="40px" height="40px"/>
                    <div className='currency'>
                        <img src="sol.jpg" width="40px" className='currencyImg'/>
                        <label >SOL</label>
                        <input type="text" id="sol" className='tradeInput' placeholder={solFill}/>
                        <button onClick={buttonPressed2}>Convert to USD</button>
                    </div>
                </div>
            </div>

        </html>
     )
}

export default Home;