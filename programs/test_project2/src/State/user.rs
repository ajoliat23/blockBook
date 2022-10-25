use anchor_lang::prelude::*;
use std::hash::{Hash};

#[account()]
pub struct User {
    pub wallet: Pubkey,
    pub username: String,
    pub avatar_nft_name: Pubkey,
    pub last_50_tweets: Vec<u64>,  // I have to figure this one out
    pub country: String,
    pub bump: u8,
}

impl User {
    // pub fn get_username(self) -> String{
    //     self.username
    // }
    // pub fn get_avatar(self) -> Pubkey{
    //     self.avatar_nft_name
    // }
    // pub fn get_country(self) -> String{
    //     self.country
    // }
    // pub fn get_dob(self) -> String{
    //     self.dob
    // }
}