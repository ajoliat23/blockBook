import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { GetPrice } from './components/SolanaPrice'




var usdFill: string | undefined;
var solFill: string | undefined;
var convertRate: number = GetPrice();
//var convertRate: number = 35;

function Home() {

 

    function buttonPressed1() {
        var usd = ((document.getElementById("usd") as HTMLInputElement).value as unknown as number);
        //this is a place holder until api / live connection works
        var sol = usd / convertRate;
        ((document.getElementById("usd") as HTMLInputElement).value as string) = "";
        ((document.getElementById("sol") as HTMLInputElement).placeholder as unknown as number) = sol;
        ((document.getElementById("usd") as HTMLInputElement).placeholder as string) = ""

        return;
    }

    function buttonPressed2() {
        var sol = (document.getElementById("sol") as HTMLInputElement).value as unknown as number;
        var convertRate = 35; //this is a place holder until api / live connection works
        var usd = sol * convertRate;

        (document.getElementById("sol") as HTMLInputElement).value = "";
        ((document.getElementById("sol") as HTMLInputElement).placeholder as unknown as number) = usd;
        (document.getElementById("sol") as HTMLInputElement).placeholder = ""

        return;
    }

    function purchase() {
        
    }

    return (
        <html>
        
            
            <div className='midCol'>
                <h1>Welcome to Block Book</h1>
                <div className='trade'>
                    <div className='currency'>
                        <img src="usd.jpg" width="40px" className='currencyImg' />
                        <label >USD</label>
                        <input type="text" id="usd" className='tradeInput' placeholder={usdFill} />
                        <button onClick={buttonPressed1} className="button1">Convert to SOL</button>
                    </div>
                    <img src="switch.png" width="40px" height="40px" />
                    <div className='currency'>
                        <img src="sol.jpg" width="40px" className='currencyImg' />
                        <label >SOL</label>
                        <input type="text" id="sol" className='tradeInput' placeholder={solFill} />
                        <button onClick={buttonPressed2} className="button1">Convert to USD</button>
                    </div>
                    <button onClick={purchase} className="button2">Purchase</button>
                </div>
            </div>
        </html>
    )
}

export default Home;
