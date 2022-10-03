use anchor_lang::prelude::*;
use crate::State::deposit_market::*;

#[derive(Accounts)]
pub struct InitDepositMarketAlt <'info> {
    #[account(mut)]
    pub signer: Signer <'info>,  
    // Here we init a Program Derived Address on the Rust end.
    // The Rust end limits how large of an account you can init, but you likely won't hit the limit.
    // Most of your accounts will be PDAs like this.
    #[account(init,
        seeds = [
            b"depositMarket".as_ref(),
        ],
        bump,
        space = 8 + std::mem::size_of::<DepositMarket>(),
        payer = signer)]
    pub deposit_market: Account <'info, DepositMarket>,
    pub system_program: Program <'info, System>,
}


pub fn handler (ctx: Context <InitDepositMarketAlt>, signer:Pubkey) -> Result <()> {
    let deposit_market_data = &mut ctx.accounts.deposit_market;
    deposit_market_data.signer = signer;
    deposit_market_data.version = 0;
    Ok (()) 


}

