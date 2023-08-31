import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SelfCustodialFacebook } from "../target/types/self_custodial_facebook";

describe("self-custodial-facebook", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SelfCustodialFacebook as Program<SelfCustodialFacebook>;

  it("Creating a new account for user", async () = {
    const ix = await program.methods.createFacebook("Prakyath","LFG","Reddy");
    const user_facebook_address = (await ix.pubkeys()).facebookAccount;
    console.log("User facebook address :: ", userFacebookAddress.toString());
    // create user's facebook address
    const tx = await ix.rpc();
      console.log("Your transaction signature", tx);
    // User details
    let userDetails = await program.account.facebookAccount.fetch(userFacebookAddress);
    console.log(`created a new account with the following details \n Name :: ${userDetails.name} \n Status :: ${userDetails.status} \n Twitter :: ${userDetails.twitter}`);
  });

  it("update my status", async() => {
    const ix = await program.methods.updateStatus("&mut self :crab");
    const userFacebookAddress = (await ix.pubKeys()).facebookAccount;
    console.log("user facebook address :: ", userFacebookAddress.toString());
    // create user's facebook address
    const tx = await ix.rpc();
    console.log("you transaction signature: ", tx);
    // user details
    let userDetails = await program.account.facebookAccount.fetch(userFacebookAddress);
    console.log(`Created a new account with following details \n Name :: ${userDetails.name} \n Status :: ${userDetails.status} \n Twitter :: ${userDetails.twitter}`);
  });
});
