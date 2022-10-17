use anchor_lang::prelude::*;
use crate::State::user::*;

#[derive(Accounts)]
pub struct ChangeCountry<'info> {
	pub signer: Signer<'info>,
	#[account(mut, seeds = [b"user-profile", signer.key().as_ref()], bump = user_account.bump)]
	pub user_account: Account<'info, User>,
}

pub fn handler(ctx: Context<ChangeCountry>, new_country: String) -> Result<()> {
	let account_data = &mut ctx.accounts.user_account;

    // Will need to insert logic to verify that the input is a country.

	account_data.country = new_country;

	Ok(())
}
