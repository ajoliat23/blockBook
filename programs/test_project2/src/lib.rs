use anchor_lang::prelude::*;
use State::*;
use Instructions::*;
pub mod State;
pub mod Instructions;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod test_project2 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn init_deposit_market(ctx: Context<InitDepositMarket>) -> Result<()> {
        Instructions::init_deposit_market::handler(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
