use anchor_lang::prelude::*;
use crate::State::post::*;
use anchor_lang::solana_program::system_program;


#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(init, payer = author, space = Post :: LEN)]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program :: ID)]
    pub system_program: Program<'info, System>,
}

pub fn SendPost (ctx: Context<SendPost>, topic: String, content: String) -> anchor_lang::solana_program::entrypoint::ProgramResult {
    let post: &mut Account<Post> = &mut ctx.accounts.post;
    let author: &Signer = &ctx.accounts.author;
    let clock: Clock = Clock::get().unwrap();

    // if topic.chars().count() > 50 {
    //     return Err(ErrorCode::TopicTooLong::into())
    // }

    // if content.chars().count() > 280 {
    //     return Err(ErrorCode::ContentTooLong.into())
    // }


    post.author = *author.key;
    post.timestamp = clock.unix_timestamp;
    post.topic = topic;
    post.content = content;

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}