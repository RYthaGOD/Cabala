const fs = require("fs");

async function main() {
  const filePath = "C:\\Users\\craig\\.gemini\\antigravity\\brain\\ef5b2677-4e56-4768-9b11-547234ebc72d\\.system_generated\\steps\\1090\\content.md";
  if (!fs.existsSync(filePath)) {
    console.log("❌ File does not exist!");
    return;
  }
  const content = fs.readFileSync(filePath, "utf8");
  console.log("File loaded! Character count:", content.length);

  // Regex for Solana base58
  const regex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
  const matches = content.match(regex) || [];
  console.log("Matches found:", matches.length);
}

main().catch(console.error);
