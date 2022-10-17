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

    function purchase() {
        //ask George for help to make this
        if(document.getElementById("usd").value == null) {
            alert("Please Enter an Amount")
        }
        else {
            alert("PURCHASE SOL PLS")
        }
    }

  

    //class name feed is going to be used for a RSS feed or some sort
    //of dev news feed. Will be implemented this week -TS

    return ( 
        <html>

            <div className='feed'>
            </div>


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
                        <img src="sol.jpg" width="40px" className='currencyImg' />
                        <label >SOL</label>
                        <input type="text" id="sol" className='tradeInput' placeholder={solFill}/>
                        <button onClick={buttonPressed2} className="button1">Convert to USD</button>
                    </div>
                    <button onClick={purchase} className="button2">     Purchase    </button>
                </div>
            </div>

        </html>
    )
}

export default Home;