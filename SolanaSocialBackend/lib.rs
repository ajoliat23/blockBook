use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("5EtTrvMn7TX7UAh9jwskq6Rmy9nQyvjFfvy2g7Nn1vgs");

#[program]
pub mod block_book {
    use super::*;

    pub fn send_post(ctx: Context<SendPost>, topic: String, content: String) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if topic.chars().count() > 50 {
            return Err(ErrorCode::TopicTooLong.into())
        }
    
        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into())
        }

        post.author = *author.key;
        post.timestamp = clock.unix_timestamp;
        post.topic = topic;
        post.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(init, payer = author, space = Post :: LEN)]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program :: ID)]
    pub system_program: AccountInfo<'info>,
}
// 1. Define the structure of the Post account.
#[account]
pub struct Post {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

// 2. Add constants for sizing propeties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max.

// 3. Add a constant on the Post account that provides its total size.
impl Post {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}

// 4. Create error constraints to apply to the topic and content of the post
#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}