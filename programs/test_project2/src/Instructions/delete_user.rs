use anchor_lang::prelude::*;
use crate::State::user::*;

#[derive(Accounts)]
pub struct DeleteUser<'info> {
	pub user: Signer<'info>,
	#[account(mut, close = user, seeds = [b"user-profile", user.key().as_ref()], bump = user_account.bump)]
	pub user_account: Account<'info, User>,
}

pub fn handler(_ctx: Context<DeleteUser>) -> Result<()> {
	Ok(())
}
