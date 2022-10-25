import {
    AnchorProvider,
    Program,
    setProvider,
    Wallet,
    workspace,
  } from "@project-serum/anchor";
  import * as anchor from "@project-serum/anchor";
  import { Keypair, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, ParsedAccountData } from "@solana/web3.js";
  import { assert } from "chai";
  import { mockUser, setupTestUser, registerTestUserProgram } from "./mock";
  
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  
  
  describe("Test user instructions", () => {

    const program: Program = workspace.TestProject2;
    const provider = AnchorProvider.local();
    const wallet = provider.wallet as Wallet;
  
    const size = 256;
  
    it("Creates a new user and then tries to modify it with the wrong signer", async () => {
      setProvider(provider); 
      const rent = await provider.connection.getMinimumBalanceForRentExemption(
        size
      );
  
      let walletKeyPair: Keypair = new Keypair();
  
      let tx = new Transaction();
      tx.add(
        SystemProgram.createAccount({
          fromPubkey: wallet.payer.publicKey,
          newAccountPubkey: walletKeyPair.publicKey,
          space: size,
          programId: program.programId,
          lamports: rent,
        })
      );
      let createUserIx = await program.methods
        .createUserProfile()
        .accounts({username: "KnightInBlack"})
        .instruction();
      tx.add(createUserIx);
  
      try {
        await program.provider.sendAndConfirm(tx, [walletKeyPair]);
      } catch (err) {
        console.log(err);
      }
      const accountcurrent = await program.account.walletKeyPair.fetch(
        walletKeyPair.publicKey
      );
      const currentUsername = accountcurrent.username;
      assert.equal(currentUsername.toString(), "KnightInBlack");

          // //// Trying it with a different user - Should be no change

      await delay(1000);
      let user = await setupTestUser(provider, wallet);
      registerTestUserProgram(program, user);

      let tx2 = new Transaction();
      let changeUsernameIx = await program.methods
        .change_username()
        .accounts({username: "changed"})
        .instruction();
      tx2.add(changeUsernameIx);

      try {
        await user.userProgram.provider.sendAndConfirm(tx2);
        assert.ok(false);
      } catch (err) {
        assert.ok(true);
      }

      let accountAfterChange = await program.account.walletKeyPair.fetch(
        walletKeyPair.publicKey
      );
      const newUsername = accountAfterChange.username;
      assert.equal(newUsername.toString(), "changed");   
    });

  });  
  
  
  