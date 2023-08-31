use anchor_lang::prelude::*;

declare_id!("FL9dfffqMRqKBmiRMSYhtHG1MGT6SXKczYpqz6yXjurG");

#[program]
pub mod self_custodial_facebook {
    use super::*;

    pub fn create_facebook(
        ctx: Context<Initialize>,
        name: String,
        status: String,
        twitter: String,
    ) -> Result<()> {
        // setting userdata in user's account
        let users_account_data = &mut ctx.accounts.facebook_account;
        users_account_data.bump = *ctx.bumps.get("facebook_account").unwrap();

        users_account_data.authority = *ctx.accounts.signer.key;
        users_account_data.name = name.to_owned();
        users_account_data.status = status.to_owned();
        users_account_data.twitter = twitter.to_owned();

        // printing User Info into program's on-chain transaction log
        msg!(
            "created a new account with following details:
            Name:: {0},
            Status:: {1},
            Twitter:: {2}",
            name,
            status,
            twitter
        );
        Ok(())
    }

    pub fn update_status(ctx: Constext<Update>, new_status: String) -> Result<()> {
        // update user status, much like whatsapp 24 hr status without self destruction
        msg!(
            "Updating the status from {0} to {1}",
            &ctx.accounts.facebook_account.status,
            &new_status
        );
        ctx.accounts.facebook_account.status = new_status;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    // user's facebook account
    #[account(
        mut,
        seeds = [
            "self-custodial-facebook".as_bytes(),
            signer.key.as_ref(),
        ],
        bump = facebook_account.bump,
    )]
    pub facebook_account: Account<'info, FacebookAccount>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // User's account
    #[account(mut)]
    pub signer: Signer<'info>,
    // creating a new account for every user with seed of their wallet address
    // this constraint allows one account per wallet address
    #[account(
        init,
        payer = signer,
        space = FacebookAccount::LEN,
        seeds = ["self-custodial-facebook-2.0".as_bytes(), signer.key.as_ref()],
        bump,
    )]
    pub facebook_account: Account<'info, FacebookAccount>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct FacebookAccount {
    pub authority: Pubkey, // authority of this account
    pub bump: u8,
    pub name: String,    // max 10 chars
    pub status: String,  // max 100 chars
    pub twitter: String, // max 10 chars
}

impl FacebookAccount {
    const LEN: usize = 8 // anchor discriminator
        + 32 // public key
        + 1 // bump
        + (4+10) // 10 chars for name
        + (4+100) // 100 chars for status
        + (4+10); // 10 chars for twitter
}
