use anchor_lang::prelude::*;
use crate::State::deposit_market::*;

#[derive(Accounts)]
pub struct InitDepositMarket <'info> {
    pub signer: Signer <'info>,  //separate by comma
    pub deposit_market: Account <'info, DepositMarket>, // account that is a DepositMarket
    pub system_program: Program <'info, System>,
}


pub fn Handler (ctx: Context <InitDepositMarket>) -> Result <()> {// this is like main func.
    let deposit_market_data = &mut ctx.deposit_market;
    deposit_market_data.version = 0;
    Ok (()) 
}

// how to use boxes: pub deposit_market: Box <Account <'info, DepositMarket>> // account that is a DepositMarket
// this allocates to heap instead of stack when out of space