"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const ACTIVITY = [
  { type: "borrow", addr: "7xKd...F3e2", amount: "1.2 SOL", time: "2m ago", color: "#00FF9F" },
  { type: "lend", addr: "4mQr...A9b1", amount: "15 SOL", time: "5m ago", color: "#D4AF77" },
  { type: "repay", addr: "9pLs...C7k4", amount: "1.2 SOL", time: "11m ago", color: "#9945FF" },
  { type: "borrow", addr: "2nWt...E8x3", amount: "1.2 SOL", time: "18m ago", color: "#00FF9F" },
  { type: "lend", addr: "6rJu...B2m5", amount: "50 SOL", time: "25m ago", color: "#D4AF77" },
  { type: "repay", addr: "8sKv...D4n6", amount: "1.2 SOL", time: "33m ago", color: "#9945FF" },
  { type: "borrow", addr: "1oTw...G5p7", amount: "1.2 SOL", time: "41m ago", color: "#00FF9F" },
  { type: "lend", addr: "3qLx...H6q8", amount: "8 SOL", time: "52m ago", color: "#D4AF77" },
];

const POSITIONS = [
  { nft: "Cabal #1204", collateral: "2.00 SOL", borrowed: "1.2 SOL", ltv: "60%", health: 85, due: "12d 4h", status: "healthy" },
  { nft: "Cabal #0087", collateral: "2.00 SOL", borrowed: "1.2 SOL", ltv: "60%", health: 55, due: "3d 7h", status: "warning" },
];

function HealthChip({ health, status }: { health: number; status: string }) {
  const color = status === "healthy" ? "#00FF9F" : status === "warning" ? "#D4AF77" : "#C8102E";
  return (
    <div className="flex items-center gap-2">
      <div className="health-bar-track w-20">
        <div className={`health-bar-fill ${status}`} style={{ width: `${health}%` }} />
      </div>
      <span className="font-mono text-xs" style={{ color }}>{health}%</span>
    </div>
  );
}

function DonutGauge({ pct }: { pct: number }) {
  const r = 52; const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
      <circle cx="64" cy="64" r={r} fill="none" stroke="#00FF9F" strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,159,0.7))", transition: "stroke-dasharray 1s ease" }}/>
      <text x="64" y="60" textAnchor="middle" fill="#00FF9F" fontSize="20" fontWeight="bold" fontFamily="JetBrains Mono">{pct}%</text>
      <text x="64" y="76" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Inter" letterSpacing="2">UTILIZED</text>
    </svg>
  );
}

export default function DashboardPage() {
  const { connected } = useWallet();
  const [variant, setVariant] = useState<"default" | "purple">("default");

  const glowColor = variant === "purple" ? "rgba(153,69,255,0.12)" : "rgba(0,255,159,0.06)";
  const accentBorder = variant === "purple" ? "rgba(153,69,255,0.2)" : "rgba(0,255,159,0.1)";

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-8 px-6 max-w-7xl mx-auto">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="display-text text-2xl text-white mb-1">Cabal Dashboard</h1>
          <p className="text-white/35 text-sm">Real-time protocol overview · Solana Mainnet</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVariant(v => v === "default" ? "purple" : "default")}
            className="badge badge-purple cursor-pointer hover:opacity-80 transition-opacity text-xs">
            {variant === "default" ? "◐ Purple Vault" : "◑ Default Dark"}
          </button>
          <div className="badge badge-neon">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse inline-block"/>
            Live
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Global Pool Card (col-span-2) ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6 md:p-8"
          style={{ borderColor: accentBorder, boxShadow: `0 0 60px ${glowColor} inset, 0 4px 40px rgba(0,0,0,0.6)` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-white/35 text-xs font-semibold tracking-widest uppercase mb-1">Sovereign Liquidity Pool</p>
              <h2 className="display-text text-xl text-white">Global Pool</h2>
            </div>
            <div className="badge badge-neon">JitoSOL-Backed</div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <DonutGauge pct={67} />
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {[
                { label: "Total Value Locked", value: "1,368.18 SOL", accent: "#00FF9F" },
                { label: "Base APY", value: "14.2%", accent: "#00FF9F" },
                { label: "Active Loans", value: "23", accent: "#D4AF77" },
                { label: "Default Rate", value: "0.0%", accent: "#D4AF77" },
                { label: "Pool Capacity", value: "2,048 SOL", accent: "#9945FF" },
                { label: "Lenders", value: "187", accent: "#9945FF" },
              ].map(m => (
                <div key={m.label} className="stat-pill">
                  <span className="stat-pill-label">{m.label}</span>
                  <span className="stat-pill-value" style={{ color: m.accent }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <Link href="/lend"><button className="btn-neon px-6 py-3 text-xs">Deposit SOL</button></Link>
            <Link href="/borrow"><button className="btn-ghost px-6 py-3 text-xs">Borrow</button></Link>
          </div>
        </motion.div>

        {/* ── Activity Feed ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 flex flex-col overflow-hidden" style={{ maxHeight: "420px" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/35 text-xs font-semibold tracking-widest uppercase">Live Activity</p>
            <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
          </div>
          <div className="overflow-hidden flex-1 relative">
            <div className="activity-feed-inner flex flex-col gap-2">
              {[...ACTIVITY, ...ACTIVITY].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                    <div>
                      <span className="text-xs font-semibold capitalize" style={{ color: item.color }}>{item.type}</span>
                      <span className="text-white/40 text-xs ml-2 font-mono">{item.addr}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-white/80">{item.amount}</div>
                    <div className="text-[10px] text-white/30">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Positions Table ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl mt-6 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="display-text text-base text-white">My Active Positions</h2>
          {!connected && <span className="text-white/35 text-xs">Connect wallet to view</span>}
          {connected && <Link href="/portfolio" className="text-xs font-semibold" style={{ color: "#00FF9F" }}>View All →</Link>}
        </div>
        {connected ? (
          <div className="overflow-x-auto p-6 pt-4">
            <table className="data-table">
              <thead>
                <tr>
                  <th>NFT</th><th>Collateral</th><th>Borrowed</th><th>LTV</th><th>Health</th><th>Due</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {POSITIONS.map((p) => (
                  <tr key={p.nft}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <span className="text-[10px] text-white/40">◆</span>
                        </div>
                        <span className="font-semibold text-white">{p.nft}</span>
                      </div>
                    </td>
                    <td><span className="font-mono">{p.collateral}</span></td>
                    <td><span className="font-mono text-neon-lime">{p.borrowed}</span></td>
                    <td><span className="font-mono text-white/60">{p.ltv}</span></td>
                    <td><HealthChip health={p.health} status={p.status} /></td>
                    <td><span className="font-mono text-xs text-white/60">{p.due}</span></td>
                    <td>
                      <button className="btn-ghost px-3 py-1.5 text-xs rounded-lg">Repay</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,255,159,0.05)", border: "1px solid rgba(0,255,159,0.15)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="8" width="14" height="10" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4"/>
                <path d="M7 8V6a3 3 0 016 0v2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-white/40 text-sm">Connect wallet to view your positions</p>
            <WalletMultiButton />
          </div>
        )}
      </motion.div>
    </div>
  );
}
