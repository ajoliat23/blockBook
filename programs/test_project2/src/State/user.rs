use anchor_lang::prelude::*;
use std::hash::{Hash, Hasher};
use std::collections::hash_map::DefaultHasher;

#[account()]
pub struct User {
    pub wallet: Pubkey,
    pub username: String,
    pub avatar_nft_name: String,
    //pub last_50_tweets: Hash,  // I have to figure this one out
    pub country: String,
    pub dob: String,
    pub bump: u8,
}

impl User {
    pub fn get_username(self) -> String{
        self.username
    }
    pub fn get_avatar(self) -> String{
        self.avatar_nft_name
    }
    pub fn get_country(self) -> String{
        self.country
    }
    pub fn get_dob(self) -> String{
        self.dob
    }
}