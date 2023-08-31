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

  it("Find someone's facebook address", async () => {
    const userAddress = new anchor.web3.PublicKey("EatHXJpsV6kaq32YNaaERDHntgcG8sCHMKn9oFSg5GtD");
    const [userFacebookAccountm _] = await anchor.web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('self-custodial facebook2'),
        userAddress.toBuffer(),
      ]
      program.programId
    )
    try {
      let userDetails = await program.account.facebookAccount.fetch(userFacebookAccount);
      console.log(`Created a new account with the following details \n Name :: ${userDetails.name} \n Status :: ${userDetails.status} \n Twitter :: ${userDetails.twitter}`);
    } catch (error) {
      console.log("User account does not exist :: ", error);
    }
  });

  it("Close my facebook account", async() => {
    const ix = await program.methods.deleteAccount();
    const userFacebookAddress = (await ix.pubKeys()).facebookAccount;
    console.log("user facebook address :: ", userFacebookAddress.toString());
    // create user's facebook address
    const tx = await ix.rpc();
    console.log("your transaciton signature", tx)
    // user details not found since we closed the account
    try {
      let userDetails = await program.account.facebookAccount.fetch(userFacebookAddress);
      console.log(`Created a new account with the following details \n Name :: ${userDetails.name} \n Status :: ${userDetails.status} \n Twitter :: ${userDetails.twitter}`);
    } catch {
      console.log("User details not found, cuz' we closed it");
    }
  });
});
