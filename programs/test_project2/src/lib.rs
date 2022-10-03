use anchor_lang::prelude::*;
use State::*;
use Instructions::*;
pub mod State;
pub mod Instructions;
use anchor_lang::solana_program::system_program;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod test_project2 {
    use super::*;

    pub fn init_deposit_market(ctx: Context<InitDepositMarket>) -> Result<()> {
        Instructions::init_deposit_market::handler(ctx)
    }
    pub fn increment_version(ctx: Context<InitDepositMarket>) -> Result<()> {
        Instructions::init_deposit_market::IncrementVersion(ctx)
    }
    pub fn send_post(ctx: Context<SendPost>, topic: String, content: String) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        Instructions::send_post::SendPost(ctx, topic, content)
    }
}

// // 4. Create error constraints to apply to the topic and content of the post
// #[error_code]
// pub enum ErrorCode {
//     #[msg("The provided topic should be 50 characters long maximum.")]
//     TopicTooLong,
//     #[msg("The provided content should be 280 characters long maximum.")]
//     ContentTooLong,
// }
