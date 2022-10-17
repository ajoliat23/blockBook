use anchor_lang::prelude::*;
use crate::State::user::*;


#[derive(Accounts)]
pub struct ChangeUsername<'info> {
	pub signer: Signer<'info>,
	#[account(mut, seeds = [b"user-profile", signer.key().as_ref()], bump = user_account.bump)]
	pub user_account: Account<'info, User>,
}

// Function that changes the username of a user.
//Pulls the account_data, verifies that the new username is different than the old one and no too long, and then updates the username.
pub fn handler(ctx: Context<ChangeUsername>, new_username: String) -> Result<()> {
	let account_data = &mut ctx.accounts.user_account;

	require!(account_data.username != new_username, ErrorCode::NothingChanged);
	require!(new_username.chars().count() <= 50, ErrorCode::TooLong);

	account_data.username = new_username;

	Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided name should be 50 characters long maximum.")]
    TooLong,
    #[msg("The username is identical to the current one. Please pick a new username.")]
    NothingChanged,
}