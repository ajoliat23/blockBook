import {
  AnchorProvider,
  Program,
  setProvider,
  Wallet,
  workspace,
} from "@project-serum/anchor";
import { Keypair, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { assert } from "chai";

export type mockUser = {
  wallet: Keypair;
  /**
   * An anchor Program that uses the user's wallet
   */
  userProgram: Program;
// Other stuff we might need, for example:
  /**
   * The user's USDC account (an ATA)
   */
  usdcAccount: PublicKey;

}

export const setupTestUser = async (
  provider: AnchorProvider,
  wallet: Wallet
) => {
  //Creates a user wallet with some SOL in it to pay tx fees
  const userWallet = Keypair.generate();
  const fundTx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: userWallet.publicKey,
      lamports: 1000 * LAMPORTS_PER_SOL,
    })
  );
  await provider.sendAndConfirm(fundTx, [wallet.payer]);

// other setup you might do...
  const user: mockUser = {
    wallet: userWallet,
    userProgram: undefined,
    usdcAccount: PublicKey.default,
  };
  return user;
}

export const registerTestUserProgram = (program: Program, user: mockUser) => {
  const userProgram = new Program(
    program.idl,
    program.programId,
    new AnchorProvider(program.provider.connection, new Wallet(user.wallet), {})
  );
  user.userProgram = userProgram;
};
