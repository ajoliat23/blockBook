use anchor_lang::prelude::*;


pub struct DepositMarket {
    pub version: u16
}

impl DepositMarket {
    pub fn get_version(&self) -> u16{
        self.version
    }
}