const { Connection, PublicKey } = require("@solana/web3.js");

async function main() {
  const endpoint = "https://api.mainnet-beta.solana.com";
  const connection = new Connection(endpoint, "confirmed");

  const mintPubkey = new PublicKey("5YVNYsdh7RPEunc5VaiX4ky33W6TjTq9Vwt34Bhpfjtw");
  console.log("Target NFT Mint:", mintPubkey.toBase58());

  // Derive Metaplex Metadata Account PDA
  const metaplexProgramId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      metaplexProgramId.toBuffer(),
      mintPubkey.toBuffer(),
    ],
    metaplexProgramId
  );

  console.log("Derived Metadata PDA:", metadataPDA.toBase58());

  console.log("Fetching account info from Mainnet...");
  const accountInfo = await connection.getAccountInfo(metadataPDA);

  if (!accountInfo) {
    console.log("❌ Metadata Account does NOT exist on Mainnet. This address is either not an NFT or does not have Metaplex metadata.");
    return;
  }

  console.log("✅ Metadata Account found! Data length:", accountInfo.data.length);

  // Parse Metaplex Metadata V1 structure
  const data = accountInfo.data;

  const updateAuthority = new PublicKey(data.subarray(1, 33));
  const mint = new PublicKey(data.subarray(33, 65));

  // Name: 65 (4 bytes length + 32 bytes string)
  const nameLen = data.readUInt32LE(65);
  const name = data.subarray(69, 69 + nameLen).toString("utf8").replace(/\0/g, "").trim();

  // Symbol: 69 + 32 = 101 (4 bytes length + 10 bytes string)
  const symbolLen = data.readUInt32LE(101);
  const symbol = data.subarray(105, 105 + symbolLen).toString("utf8").replace(/\0/g, "").trim();

  // URI: 105 + 10 = 115 (4 bytes length + 200 bytes string)
  const uriLen = data.readUInt32LE(115);
  const uri = data.subarray(119, 119 + uriLen).toString("utf8").replace(/\0/g, "").trim();

  console.log("\n================ METAPLEX DATA ================");
  console.log("Update Authority:", updateAuthority.toBase58());
  console.log("Mint Address:    ", mint.toBase58());
  console.log("Name:            ", name);
  console.log("Symbol:          ", symbol);
  console.log("URI:             ", uri);
  console.log("================================================\n");

  if (uri) {
    console.log("Fetching JSON Metadata from URI:", uri);
    try {
      const res = await fetch(uri);
      const json = await res.json();
      console.log("\nJSON Metadata:", JSON.stringify(json, null, 2));
    } catch (err) {
      console.log("Failed to fetch JSON metadata from URI:", err);
    }
  }
}

main().catch(console.error);
