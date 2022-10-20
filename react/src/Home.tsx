import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {GetPrice} from './components/SolanaPrice'

var usdFill = null;
var solFill = null;
var convertRate:number = GetPrice();

function Home(){

    function buttonPressed1() {
        var usd = document.getElementById("usd").value;
         //this is a place holder until api / live connection works
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

    function purchase() {
        alert("Purchase");
    }




    return ( 
        <html>
            <div className='midCol'>
                <h1>Welcome to Block Book</h1>
                <div className='trade'>
                    <div className='currency'>
                        <img src="usd.jpg" width="40px" className='currencyImg' />
                        <label >USD</label>
                        <input type="text" id="usd" className='tradeInput' placeholder={usdFill}/>
                        <button onClick={buttonPressed1} className="button1">Convert to SOL</button>
                    </div>
                    <img src="switch.png" width="40px" height="40px"/>
                    <div className='currency'>
                        <img src="sol.jpg" width="40px" className='currencyImg'/>
                        <label >SOL</label>
                        <input type="text" id="sol" className='tradeInput' placeholder={solFill}/>
                        <button onClick={buttonPressed2} className="button1">Convert to USD</button>
                    </div>
                    <button onClick={purchase} className="button2">Purchase</button>
                </div>
            </div>
        </html>
     )
}

export default Home;
