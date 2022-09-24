import * as anchor from "@project-serum/anchor";
import { AccountClient, Program} from "@project-serum/anchor";
import account from "@project-serum/anchor/dist/cjs/program/namespace/account";
import TransactionFactory from "@project-serum/anchor/dist/cjs/program/namespace/transaction";
import {
  Keypair, Transaction, SystemProgram
} from "@solana/web3.js";
import assert from "assert";
//import { TestProject2 } from "../target/types/test_project2";



describe("test_project2", () => {

  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program:Program = anchor.workspace.TestProject2;



  it("Is initialized!", async () => {
    // Add your test here.
    const rent = await provider.connection.getMinimumBalanceForRentExemption(
      256
    );


    let depositMarket:Keypair = new Keypair();
    let myAccount:account = new account();
    
    let transaction = new Transaction();
    transaction.add( 
      SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: depositMarket.publicKey,
        space: 256,
        programId: program.programId,
        lamports: rent
    })
    )
//    const accountcurrent = await program.account.depositMarket.fetch(
//      depositMarket.publicKey
//    );
//    const currentVersion = accountcurrent.version;
//    assert.equal(currentVersion.toString(), "0");
    const tx = await program.methods.initDepositMarket().accounts({depositMarket: depositMarket.publicKey}).instruction();
    console.log("Your transaction signature", tx);
    
    //program.provider.publicKey 
  });
});

