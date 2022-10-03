use anchor_lang::prelude::*;
use crate::State::deposit_market::*;

#[derive(Accounts)]
pub struct InitDepositMarket <'info> {
    #[account(mut)]
    pub signer: Signer <'info>,  //separate by comma
    // createAccount makes you an account of the given size that's all 0s and owned by the given
    // program. If you don't say zero here, it will fail because it is expecting a DepositMarket,
    // and the account coming in is not one (it's all zeros, e.g. nothing)
    #[account(zero)]
    pub deposit_market: Account <'info, DepositMarket>, // account that is a DepositMarket
    pub system_program: Program <'info, System>,
}


pub fn handler (ctx: Context <InitDepositMarket>) -> Result <()> {// this is like main func.
    let deposit_market_data = &mut ctx.accounts.deposit_market;
    deposit_market_data.version = 0;
    Ok (()) 
}

// pub fn incrementVersion (ctx: Context <InitDepositMarket>) ->Result<()> {
//     let deposit_market_data = &mut ctx.accounts.deposit_market;
//     deposit_market_data.version = deposit_market_data.version + 1;
//     Ok (()) 
// }
// how to use boxes: pub deposit_market: Box <Account <'info, DepositMarket>> // account that is a DepositMarket
// this allocates to heap instead of stack when out of space
