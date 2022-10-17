use anchor_lang::prelude::*;
use crate::State::user::*;

#[derive(Accounts)]
pub struct ChangeDob<'info> {
	pub signer: Signer<'info>,
	#[account(mut, seeds = [b"user-profile", signer.key().as_ref()], bump = user_account.bump)]
	pub user_account: Account<'info, User>,
}

pub fn handler(ctx: Context<ChangeDob>, new_dob: String) -> Result<()> {
	let account_data = &mut ctx.accounts.user_account;

    // Will need to insert logic to verify that the dob is in a good format.

	account_data.dob = new_dob;

	Ok(())
}
