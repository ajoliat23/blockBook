use anchor_lang::prelude::*;
use crate::State::deposit_market::*;

#[derive(Accounts)]
pub struct ChangeVersion <'info> {
    #[account(mut, has_one = signer)] // has_one: enforces the constraint that ChangeVersion.DepositMarket.signer == changeVersion.signer.key
    pub deposit_market: Account <'info, DepositMarket>, // account that is a DepositMarket
    pub signer: Signer <'info>,
}


pub fn handler (ctx: Context <ChangeVersion>) -> Result <()> {// this is like main func.
    let deposit_market_data = &mut ctx.accounts.deposit_market;
    deposit_market_data.version += 1;
    Ok(())
}
