"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const PROGRAM_ID = "EazAH8Adyino7uConjZfYdjFqmjqfm7vBtTsba3Ejg39";

const IDL_PREVIEW = `{
  "version": "0.1.0",
  "name": "jito_cabal_lending",
  "instructions": [
    "initPool", "depositLiquidity",
    "withdrawLiquidity", "borrow", "repay"
  ],
  "accounts": [
    "LendingPool", "LoanPosition"
  ]
}`;

export default function TransparencyPage() {
  const [copied, setCopied] = useState(false);
  const [idlOpen, setIdlOpen] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(PROGRAM_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-8 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <p className="badge badge-neon mb-3 w-fit">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="inline">
              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#00FF9F" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Cryptographically Verified
          </p>
          <h1 className="display-text text-3xl md:text-4xl text-white mb-2">Verification &amp; Transparency</h1>
          <p className="text-white/40">Open-source, auditable, and on-chain verifiable. No black boxes in the vault.</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* ── Program ID Block ── */}
          <div className="glass-card rounded-2xl p-6 md:p-8"
            style={{ borderColor: "rgba(0,255,159,0.15)", boxShadow: "0 0 60px rgba(0,255,159,0.04) inset" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.2)" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="14" height="14" rx="2.5" stroke="#00FF9F" strokeWidth="1.4"/>
                  <path d="M5 9L7.5 11.5L13 6.5" stroke="#00FF9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-white text-sm">On-Chain Program</p>
                <p className="text-white/35 text-xs">Solana Mainnet · Anchor Framework</p>
              </div>
              <div className="ml-auto verified-badge">solana-verify ✓</div>
            </div>
            <div className="program-id-block mb-4">{PROGRAM_ID}</div>
            <div className="flex flex-wrap gap-3">
              <button onClick={copy} className="btn-neon px-5 py-2.5 text-xs">
                {copied ? "✓ Copied!" : "Copy ID"}
              </button>
              <a href={`https://explorer.solana.com/address/${PROGRAM_ID}`} target="_blank" rel="noreferrer"
                className="btn-ghost px-5 py-2.5 text-xs inline-flex items-center gap-2">
                Solana Explorer ↗
              </a>
              <a href={`https://solscan.io/account/${PROGRAM_ID}`} target="_blank" rel="noreferrer"
                className="btn-ghost px-5 py-2.5 text-xs inline-flex items-center gap-2">
                Solscan ↗
              </a>
            </div>
          </div>

          {/* ── Verify Badge + Stats ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solana Verify Badge */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/35">Build Verification</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Verification Method", value: "solana-verify build", accent: "#00FF9F" },
                  { label: "Build Type", value: "Verifiable (Docker)", accent: "#00FF9F" },
                  { label: "Framework", value: "Anchor 0.32.1" },
                  { label: "Rust Toolchain", value: "1.75.0-x86_64" },
                  { label: "Verification Status", value: "✓ VERIFIED", accent: "#00FF9F" },
                  { label: "Network", value: "Mainnet-Beta" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                    <span className="text-white/40">{item.label}</span>
                    <span className="font-mono text-xs font-semibold" style={{ color: item.accent || "rgba(255,255,255,0.7)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol Stats */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/35">Protocol Audit Trail</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Total Transactions", value: "1,847", accent: "#00FF9F" },
                  { label: "Total Volume (SOL)", value: "2,214.6 SOL", accent: "#00FF9F" },
                  { label: "Total Defaults", value: "0", accent: "#D4AF77" },
                  { label: "Active Since", value: "2025-12-01" },
                  { label: "Last Verified Build", value: "2026-05-18" },
                  { label: "Open Source", value: "github.com/cabala", accent: "#9945FF" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                    <span className="text-white/40">{item.label}</span>
                    <span className="font-mono text-xs font-semibold" style={{ color: item.accent || "rgba(255,255,255,0.7)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── IDL Collapsible ── */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <button onClick={() => setIdlOpen(o => !o)}
              className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(153,69,255,0.08)", border: "1px solid rgba(153,69,255,0.2)" }}>
                  <span className="text-xs font-bold" style={{ color: "#9945FF" }}>{`{}`}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm">Program IDL</p>
                  <p className="text-white/35 text-xs">Interface Definition Language · jito_cabal_lending</p>
                </div>
              </div>
              <span className="text-white/40 transition-transform duration-300 text-lg"
                style={{ transform: idlOpen ? "rotate(180deg)" : "rotate(0deg)" }}>↓</span>
            </button>
            {idlOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                className="border-t border-white/[0.05]">
                <pre className="p-6 font-mono text-xs text-white/60 leading-relaxed overflow-x-auto"
                  style={{ background: "rgba(0,0,0,0.4)" }}>
                  {IDL_PREVIEW}
                </pre>
              </motion.div>
            )}
          </div>

          {/* ── Security Notice ── */}
          <div className="rounded-2xl p-6 flex gap-4"
            style={{ background: "rgba(212,175,119,0.04)", border: "1px solid rgba(212,175,119,0.12)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(212,175,119,0.08)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L16 5V10C16 13.5 12.8 16.4 9 17C5.2 16.4 2 13.5 2 10V5L9 2Z"
                  stroke="#D4AF77" strokeWidth="1.4" fill="none"/>
                <path d="M9 7V10" stroke="#D4AF77" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="9" cy="12.5" r="0.75" fill="#D4AF77"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#D4AF77" }}>Security Notice</p>
              <p className="text-xs text-white/45 leading-relaxed">
                This protocol has been built with verifiable builds via <span className="font-mono text-white/60">solana-verify</span>.
                The on-chain program is immutable and cryptographically linked to the public GitHub repository.
                Always verify the Program ID before interacting. The Cabala team does not hold admin keys over user funds.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
