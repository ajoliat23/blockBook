use anchor_lang::prelude::*;

#[account()]
pub struct DepositMarket {
    pub signer: Pubkey,
    pub version: u16,
}

impl DepositMarket {
    pub fn get_version(&self) -> u16{
        self.version
    }
}