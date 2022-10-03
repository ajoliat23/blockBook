use anchor_lang::prelude::*;
use State::*;
use Instructions::*;
pub mod State;
pub mod Instructions;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod test_project2 {
    use super::*;

    pub fn init_deposit_market(ctx: Context<InitDepositMarket>) -> Result<()> {
        Instructions::init_deposit_market::handler(ctx)
    }

    pub fn init_deposit_market_alt(ctx: Context<InitDepositMarketAlt>, signer:Pubkey) -> Result<()> {
        Instructions::init_deposit_market_alt::handler(ctx, signer)
    }

    pub fn send_post(ctx: Context<SendPost>, topic: String, content: String) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        Instructions::send_post::SendPost(ctx, topic, content)
    }

    pub fn change_version(ctx: Context<ChangeVersion>) -> Result<()> {
        Instructions::change_version::handler(ctx)
    }
}
