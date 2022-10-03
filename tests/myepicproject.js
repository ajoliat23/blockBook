import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TestProject2 } from "../target/types/test_project2";

<<<<<<< Updated upstream:tests/myepicproject.js
describe("myepicproject", () => {
=======
describe("test_project2", () => {
>>>>>>> Stashed changes:tests/test_project2.ts
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TestProject2 as Program<TestProject2>;

  it("Is initialized!", async () => {
    // Add your test here.
<<<<<<< Updated upstream:tests/myepicproject.js
    const program = anchor.workspace.Myepicproject;
=======
>>>>>>> Stashed changes:tests/test_project2.ts
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
