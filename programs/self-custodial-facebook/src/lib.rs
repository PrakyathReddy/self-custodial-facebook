use anchor_lang::prelude::*;

declare_id!("FL9dfffqMRqKBmiRMSYhtHG1MGT6SXKczYpqz6yXjurG");

#[program]
pub mod self_custodial_facebook {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
