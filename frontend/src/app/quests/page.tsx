"use client";
import { motion } from "framer-motion";

const RANKS = ["Initiate", "Adept", "Warlock", "Archon", "Cabal Elder"];
const RANK_COLORS = ["rgba(255,255,255,0.4)", "#9945FF", "#00FF9F", "#D4AF77", "#FFD700"];
const RANK_XP = [0, 500, 1500, 4000, 10000];

const USER_XP = 1850;
const USER_RANK = 2; // Warlock

const QUESTS = [
  { id: 1, title: "First Borrow", desc: "Take your first loan against a Jito Cabal NFT", xp: 200, progress: 100, status: "complete", category: "Borrow" },
  { id: 2, title: "Diamond Hands", desc: "Hold a loan position for 30 days without early repayment", xp: 500, progress: 45, status: "active", category: "Hold" },
  { id: 3, title: "Pool Patron", desc: "Deposit 10 or more SOL into the sovereign liquidity pool", xp: 300, progress: 100, status: "complete", category: "Lend" },
  { id: 4, title: "Loyal Lender", desc: "Maintain a liquidity position for 60 consecutive days", xp: 800, progress: 37, status: "active", category: "Lend" },
  { id: 5, title: "Repay Master", desc: "Repay 5 loans before the due date", xp: 400, progress: 60, status: "active", category: "Repay" },
  { id: 6, title: "Cabal Elder", desc: "Execute 10 borrow-repay cycles as a verified Cabal member", xp: 1500, progress: 0, status: "locked", category: "Elite" },
];

const LEADERBOARD = [
  { rank: 1, addr: "3xKd...F3e2", xp: 8420, tier: "Archon", tierColor: "#D4AF77" },
  { rank: 2, addr: "7pQr...A9b1", xp: 6180, tier: "Archon", tierColor: "#D4AF77" },
  { rank: 3, addr: "2mLs...C7k4", xp: 4900, tier: "Archon", tierColor: "#D4AF77" },
  { rank: 4, addr: "9nWt...E8x3", xp: 3200, tier: "Warlock", tierColor: "#00FF9F" },
  { rank: 5, addr: "1rJu...B2m5", xp: 2650, tier: "Warlock", tierColor: "#00FF9F" },
  { rank: 6, addr: "6sKv...D4n6", xp: 1980, tier: "Warlock", tierColor: "#00FF9F" },
  { rank: 7, addr: "4oTw...G5p7", xp: 1200, tier: "Adept", tierColor: "#9945FF" },
  { rank: 8, addr: "8qLx...H6q8", xp: 890, tier: "Adept", tierColor: "#9945FF" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  complete: { bg: "rgba(0,255,159,0.08)", color: "#00FF9F", label: "Complete ✓" },
  active: { bg: "rgba(153,69,255,0.08)", color: "#9945FF", label: "Active" },
  locked: { bg: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", label: "Locked" },
};

export default function QuestsPage() {
  const nextRankXp = RANK_XP[USER_RANK + 1] || RANK_XP[4];
  const prevRankXp = RANK_XP[USER_RANK];
  const xpPct = Math.min(((USER_XP - prevRankXp) / (nextRankXp - prevRankXp)) * 100, 100);

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-8 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <p className="badge badge-purple mb-3 w-fit">Season I · The Founding Shadow</p>
          <h1 className="display-text text-3xl md:text-4xl text-white mb-2">Quests &amp; Ranks</h1>
          <p className="text-white/40">Prove your loyalty. Rise through the Cabal's ranks. Earn exclusive rewards.</p>
        </div>

        {/* XP Progress bar */}
        <div className="glass-card rounded-2xl p-6 mb-8"
          style={{ borderColor: "rgba(212,175,119,0.15)", boxShadow: "0 0 40px rgba(212,175,119,0.04) inset" }}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="display-text text-sm" style={{ color: RANK_COLORS[USER_RANK] }}>
                    {RANKS[USER_RANK]}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z" fill={RANK_COLORS[USER_RANK]} opacity="0.8"/>
                  </svg>
                </div>
                <span className="font-mono text-sm text-white/50">{USER_XP.toLocaleString()} / {nextRankXp.toLocaleString()} XP</span>
              </div>
              <div className="xp-bar-track">
                <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-white/30">
                <span>{RANKS[USER_RANK]}</span>
                <span>{RANKS[USER_RANK + 1] || "MAX"}</span>
              </div>
            </div>
            {/* Rank tiers */}
            <div className="flex items-center gap-3 shrink-0">
              {RANKS.map((r, i) => (
                <div key={r} className="flex flex-col items-center gap-1.5 cursor-default"
                  style={{ opacity: i <= USER_RANK ? 1 : 0.3 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: i <= USER_RANK ? `${RANK_COLORS[i]}15` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${i <= USER_RANK ? RANK_COLORS[i] + "40" : "rgba(255,255,255,0.06)"}`,
                      color: RANK_COLORS[i] }}>
                    {i + 1}
                  </div>
                  <span className="text-[8px] font-semibold tracking-wider uppercase text-center leading-tight"
                    style={{ color: i === USER_RANK ? RANK_COLORS[i] : "rgba(255,255,255,0.3)" }}>
                    {r.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Quest Cards (2/3) ── */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/35 mb-4">Active Quests</p>
            <div className="flex flex-col gap-4">
              {QUESTS.map((quest, i) => {
                const style = STATUS_STYLES[quest.status];
                return (
                  <motion.div key={quest.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-white text-sm">{quest.title}</h3>
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold tracking-wide uppercase"
                            style={{ background: style.bg, color: style.color }}>{style.label}</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed">{quest.desc}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-mono font-bold" style={{ color: "#D4AF77" }}>+{quest.xp}</div>
                        <div className="text-[10px] text-white/30">XP</div>
                      </div>
                    </div>
                    {quest.status !== "locked" && (
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white/30">Progress</span>
                          <span className="font-mono" style={{ color: style.color }}>{quest.progress}%</span>
                        </div>
                        <div className="xp-bar-track h-1.5">
                          <div className="xp-bar-fill" style={{ width: `${quest.progress}%`,
                            background: quest.status === "complete" ? "#00FF9F" : "linear-gradient(90deg, #9945FF, #00FF9F)" }} />
                        </div>
                      </div>
                    )}
                    {quest.status === "locked" && (
                      <p className="text-[11px] text-white/25">🔒 Unlock by reaching Archon rank</p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="badge badge-neutral text-[9px]">{quest.category}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Leaderboard (1/3) ── */}
          <div className="glass-card rounded-2xl p-6 h-fit">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/35 mb-4">Cabal Leaderboard</p>
            <div className="flex flex-col gap-2">
              {LEADERBOARD.map((entry, i) => (
                <div key={entry.rank} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                      style={{ background: i < 3 ? `${entry.tierColor}15` : "rgba(255,255,255,0.04)",
                        color: i < 3 ? entry.tierColor : "rgba(255,255,255,0.35)",
                        border: `1px solid ${i < 3 ? entry.tierColor + "30" : "transparent"}` }}>
                      {entry.rank}
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                      style={{ background: "rgba(255,255,255,0.04)" }}>◆</div>
                    <div>
                      <div className="font-mono text-xs text-white/70">{entry.addr}</div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: entry.tierColor }}>{entry.tier}</div>
                    </div>
                  </div>
                  <div className="font-mono text-xs font-bold text-white/60">{entry.xp.toLocaleString()} XP</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.05] text-center">
              <p className="text-xs text-white/30">Season ends in <span className="font-mono text-white/50">42d 11h 8m</span></p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
