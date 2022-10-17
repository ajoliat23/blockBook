use anchor_lang::prelude::*;
use crate::State::user::*;

#[derive(Accounts)]
pub struct CreateUserProfile<'info> {
	// space: 8 discriminator + (4 length prefix + 50 * 4 ) alias + 1 bump
	#[account(init, 
		payer = signer, 
		space = 8 + std::mem::size_of::<User>(),
		seeds = [b"user-profile", signer.key().as_ref()],
		bump)]
	pub user_account: Account<'info, User>,
	pub system_program: Program<'info, System>,
	#[account(mut)]
	pub signer: Signer<'info>,
}

/*  
Function to create (initialize) the user profile. 
The signer is the user's wallet that will be associated to the account
We do no initialize the avatar, country and dob for now.
*/

pub fn handler (ctx: Context <CreateUserProfile>, signer:Pubkey, username:String) -> Result <()> {
    let user_data = &mut ctx.accounts.user_account;
    user_data.wallet = signer;
    user_data.username = username;
	user_data.bump = *ctx.bumps.get("user_data").unwrap();
    Ok (()) 


}