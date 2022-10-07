import {
  AnchorProvider,
  Program,
  setProvider,
  Wallet,
  workspace,
} from "@project-serum/anchor";
import { Keypair, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { assert } from "chai";

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
    console.log(assert.equal(currentVersion.toString(), "0"));
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
    console.log(assert.equal(initialVersion.toString(), "0"));

  
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
    console.log(assert.equal(nowVersion.toString(), "1"));    
      
      /// Testing to see if we can change with different signer
    const secondWallet = new Keypair;
    
    await delay(5000);
    let tx3 = new Transaction();
    let changeVersion2Ix = await program.methods
      .changeVersion()
      .accounts({ depositMarket: depositMarket, signer: secondWallet.publicKey})
      .instruction();
    tx3.add(changeVersion2Ix);

    try {
      await program.provider.sendAndConfirm(tx3);
    } catch (err) {
      console.log(err);
    }

    const nowAccount2 = await program.account.depositMarket.fetch(
      depositMarket
    );
    const nowVersion2 = nowAccount2.version;
    console.log(assert.equal(nowVersion2.toString(), "2"));      
  });

});
