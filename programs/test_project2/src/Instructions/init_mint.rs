use anchor_lang::prelude::*;
use anchor_spl::{
    token::{Token,Mint,MintTo},
};

#[derive(Accounts)]
pub struct InitMint<'info> {
    #[account(
        init,
        payer = payer,
        mint::decimals = 9,
        mint::authority = payer,
        mint::freeze_authority = payer,
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    ///CHECK: This is not dangerous because we don't read or write from this account    
    pub rent: AccountInfo<'info>,
}

pub fn handler(ctx: Context<InitMint>) -> Result<()> {
    Ok(())
}