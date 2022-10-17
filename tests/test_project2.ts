import {
  AnchorProvider,
  Program,
  setProvider,
  Wallet,
  workspace,
} from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token"; 
import { Keypair, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, ParsedAccountData } from "@solana/web3.js";
import { assert } from "chai";
import { mockUser, setupTestUser, registerTestUserProgram } from "./mock";
import { BN } from "bn.js";

const delay = ms => new Promise(res => setTimeout(res, ms));



describe("Test project integration testing", () => {
  // Saving these values makes you not have to do program.x.y.z for the rest of the tests...
  // Also removes annoyance of doing anchor.everything if you import from anchor by name.
  const program: Program = workspace.TestProject2;
  const provider = AnchorProvider.local();
  const wallet = provider.wallet as Wallet;

  const size = 256;

  it("Initializes a new deposit market", async () => {
    setProvider(provider); 
    const rent = await provider.connection.getMinimumBalanceForRentExemption(
      size
    );

    let depositMarket: Keypair = new Keypair();

    // It costs money to send a tx (on the real chain), AND it takes time for the tx to confirm.
    // For example in this case you would be waiting for the createAccount to confirm, and this
    // might take ~5s during high congestion, this is annoying on the front end.

    // So typically you pack multiple instructions
    // into a single transaction (note: they execute in the order they are packed, and the most data
    // that can fit into one tx is ~1200 bytes, i.e. around 25 public keys).

    // Here you can easily pack the create, then the init.
    let tx = new Transaction();
    tx.add(
      SystemProgram.createAccount({
        fromPubkey: wallet.payer.publicKey,
        newAccountPubkey: depositMarket.publicKey,
        space: size,
        programId: program.programId,
        lamports: rent,
      })
    );
    let depositIx = await program.methods
      .initDepositMarket()
      .accounts({ depositMarket: depositMarket.publicKey })
      .instruction();
    tx.add(depositIx);

    // You guys forgot to SEND the tx in your code originally, so the account doesn't exist.
    // Note that the createAccount ix needs to be signed with the Keypair for that account.
    // Generally you can throw it away after this is done.
    try {
      await program.provider.sendAndConfirm(tx, [depositMarket]);
    } catch (err) {
      console.log(err);
    }
    const accountcurrent = await program.account.depositMarket.fetch(
      depositMarket.publicKey
    );
    const currentVersion = accountcurrent.version;
    assert.equal(currentVersion.toString(), "0");
  });

  it("Initializes a new deposit market (alt)", async () => {
    setProvider(provider); 
    let depositMarket: PublicKey;

    // Here we need to derive the PDA in the same way the Rust side would: the code on the Rust side
    // will validate that it was derived correctly, an important security measure.
    [depositMarket] = PublicKey.findProgramAddressSync(
      [Buffer.from("depositMarket")],
      program.programId
    );

    let tx = new Transaction();
    let depositIx = await program.methods
      .initDepositMarketAlt(wallet.publicKey)
      .accounts({ depositMarket: depositMarket })
      .instruction();
    tx.add(depositIx);

    try {
      await program.provider.sendAndConfirm(tx);
    } catch (err) {
      console.log(err);
    }
    const accountcurrent = await program.account.depositMarket.fetch(
      depositMarket
    );
    const initialVersion = accountcurrent.version;
    assert.equal(initialVersion.toString(), "0");

  
    let tx2 = new Transaction();
    let changeVersionIx = await program.methods
      .changeVersion()
      .accounts({ depositMarket: depositMarket, signer: wallet.publicKey})
      .instruction();
    tx2.add(changeVersionIx);

    try {
      await program.provider.sendAndConfirm(tx2);
    } catch (err) {
      console.log(err);
    }

    const nowAccount = await program.account.depositMarket.fetch(
      depositMarket
    );
    const nowVersion = nowAccount.version;
    assert.equal(nowVersion.toString(), "1");    
      
    //   /// Testing to see if we can change with different signer
    // const secondWallet = new Keypair;
    
    // await delay(5000);
    // let tx3 = new Transaction();
    // let changeVersion2Ix = await program.methods
    //   .changeVersion()
    //   .accounts({ depositMarket: depositMarket, signer: secondWallet.publicKey})
    //   .instruction();
    // tx3.add(changeVersion2Ix);

    // try {
    //   await program.provider.sendAndConfirm(tx3);
    // } catch (err) {
    //   console.log(err);
    // }

    // const nowAccount2 = await program.account.depositMarket.fetch(
    //   depositMarket
    // );
    // const nowVersion2 = nowAccount2.version;
    // console.log(assert.equal(nowVersion2.toString(), "2"));
    
    // //// Trying it with a different user - Should be no change

    await delay(1000);
    let user = await setupTestUser(provider, wallet);
    registerTestUserProgram(program, user);

    let tx4 = new Transaction();
    let changeVersion4Ix = await program.methods
      .changeVersion()
      .accounts({ depositMarket: depositMarket, signer: wallet.publicKey})
      .instruction();
    tx4.add(changeVersion4Ix);

    try {
      await user.userProgram.provider.sendAndConfirm(tx4);
      assert.ok(false);
    } catch (err) {
      assert.ok(true);
    }

    let lastAccount = await program.account.depositMarket.fetch(
      depositMarket
    );
    const lastVersion = lastAccount.version;
    assert.equal(lastVersion.toString(), "1");   
    
  });


  const mintKey: anchor.web3.Keypair = new Keypair();
  // AssociatedTokenAccount for anchor's workspace wallet
  let associatedTokenAccount: PublicKey;

  it("Mint a token", async () => {
    // Get anchor's wallet's public key
    const key = wallet.publicKey;
    // Get the amount of SOL needed to pay rent for our Token Mint
    const lamports: number =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );

    // Get the ATA for a token and the account that we want to own the ATA (but it might not existing on the SOL network yet)
    associatedTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      key,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    console.log(associatedTokenAccount.toString());
    console.log(mintKey.publicKey.toString());

    // Fires a list of instructions
    let mint_tx = new Transaction();

    mint_tx.add(
      SystemProgram.createAccount({
        fromPubkey: wallet.payer.publicKey,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports: lamports,
      }),
      // Fire a transaction to create our mint account that is controlled by our anchor wallet
      createInitializeMintInstruction(
        mintKey.publicKey,
        6,
        key,
        null,
        TOKEN_PROGRAM_ID
      ),
      createAssociatedTokenAccountInstruction(
        key,
        associatedTokenAccount,
        key,
        mintKey.publicKey,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    // sends and create the transaction
    try {
      await program.provider.sendAndConfirm(mint_tx, [wallet.payer, mintKey]);
    } catch (err) {
      console.log(err);
    }

    console.log("done!"); 
  
    console.log(
      await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
    );
  
    // console.log("Account: ", res);
    // console.log("Mint key: ", mintKey.publicKey.toString());
    // console.log("User: ", key.toString());

    //   // Executes our code to mint our token into our specified ATA
    await program.methods.mintToken(new BN(10*10**6)).accounts({
      mint: mintKey.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount: associatedTokenAccount,
      authority: key,
    }).rpc();
  
    //   // Get minted token amount on the ATA for our anchor wallet
    const tokenAccount = await program.provider.connection.getParsedAccountInfo(
      associatedTokenAccount
    );
    const accountData = (tokenAccount.value?.data as ParsedAccountData).parsed;
    assert.equal(accountData.info.tokenAmount.amount, 10000000);
  });
  
    it("Transfer token", async () => {
      // Get anchor's wallet's public key
      const myWallet = anchor.AnchorProvider.env().wallet.publicKey;
      // Wallet that will receive the token 
      const toWallet: anchor.web3.Keypair = anchor.web3.Keypair.generate();
      // The ATA for a token on the to wallet (but might not exist yet)
      const toATA = await getAssociatedTokenAddress(
        mintKey.publicKey,
        toWallet.publicKey
      );
  
      // Fires a list of instructions
      const mint_tx = new anchor.web3.Transaction().add(
        // Create the ATA account that is associated with our To wallet
        createAssociatedTokenAccountInstruction(
          myWallet, toATA, toWallet.publicKey, mintKey.publicKey
        )
      );
  
      // Sends and create the transaction
      await anchor.AnchorProvider.env().sendAndConfirm(mint_tx, []);
  
      // Executes our transfer smart contract 
      await program.methods.transferToken(new BN(5*10**6)).accounts({
        tokenProgram: TOKEN_PROGRAM_ID,
        from: associatedTokenAccount,
        fromAuthority: myWallet,
        to: toATA,
      }).rpc();
  
      // Get minted token amount on the ATA for our anchor wallet
      const tokenAccount = await program.provider.connection.getParsedAccountInfo(
        associatedTokenAccount
      );
      const accountData = (tokenAccount.value?.data as ParsedAccountData).parsed;
      assert.equal(accountData.info.tokenAmount.amount, 5000000);
  
    });
  });  


