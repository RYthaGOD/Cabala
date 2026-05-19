const { Connection, PublicKey } = require("@solana/web3.js");

async function main() {
  const endpoint = "https://api.mainnet-beta.solana.com";
  const connection = new Connection(endpoint, "confirmed");

  const vaultAddress = new PublicKey("5YVNYsdh7RPEunc5VaiX4ky33W6TjTq9Vwt34Bhpfjtw");
  console.log("Jito Cabal Vault Address:", vaultAddress.toBase58());

  console.log("Scanning token accounts owned by the vault...");
  const tokenProgramId = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    vaultAddress,
    { programId: tokenProgramId }
  );

  console.log(`Found ${tokenAccounts.value.length} standard token accounts.\n`);

  const activeNFTs = [];

  for (const account of tokenAccounts.value) {
    const info = account.account.data.parsed.info;
    const amount = info.tokenAmount.uiAmount;
    const mint = info.mint;

    if (amount > 0) {
      console.log(`- Mint: ${mint}, Amount: ${amount}`);
      activeNFTs.push(new PublicKey(mint));
    }
  }

  // Also scan Token-2022
  console.log("\nScanning Token-2022 accounts...");
  const token2022ProgramId = new PublicKey("TokenzQdBNbLqP5xxRZr6tQeA7S5THHA6tLk3E9r1xm");
  try {
    const token2022Accounts = await connection.getParsedTokenAccountsByOwner(
      vaultAddress,
      { programId: token2022ProgramId }
    );
    console.log(`Found ${token2022Accounts.value.length} Token-2022 accounts.\n`);
    for (const account of token2022Accounts.value) {
      const info = account.account.data.parsed.info;
      const amount = info.tokenAmount.uiAmount;
      const mint = info.mint;

      if (amount > 0) {
        console.log(`- [Token-2022] Mint: ${mint}, Amount: ${amount}`);
        activeNFTs.push(new PublicKey(mint));
      }
    }
  } catch (err) {
    console.error("Token-2022 scan failed:", err);
  }

  // If we found any NFTs, let's fetch the Metaplex metadata for the first few!
  if (activeNFTs.length > 0) {
    console.log(`\nFetching Metaplex metadata for first NFT: ${activeNFTs[0].toBase58()}...`);
    const metaplexProgramId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        metaplexProgramId.toBuffer(),
        activeNFTs[0].toBuffer(),
      ],
      metaplexProgramId
    );

    const accountInfo = await connection.getAccountInfo(metadataPDA);
    if (accountInfo) {
      const data = accountInfo.data;
      const nameLen = data.readUInt32LE(65);
      const name = data.subarray(69, 69 + nameLen).toString("utf8").replace(/\0/g, "").trim();
      const symbolLen = data.readUInt32LE(101);
      const symbol = data.subarray(105, 105 + symbolLen).toString("utf8").replace(/\0/g, "").trim();
      const uriLen = data.readUInt32LE(115);
      const uri = data.subarray(119, 119 + uriLen).toString("utf8").replace(/\0/g, "").trim();

      console.log("\n================ METAPLEX DATA ================");
      console.log("Name:   ", name);
      console.log("Symbol: ", symbol);
      console.log("URI:    ", uri);
      console.log("================================================");
    } else {
      console.log("No Metaplex metadata account found for this token.");
    }
  }
}

main().catch(console.error);
