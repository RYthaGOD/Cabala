"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const STATS = [
  { label: "Total Value Locked", value: "1,368 SOL", accent: "#00FF9F" },
  { label: "Active Loans", value: "23", accent: "#D4AF77" },
  { label: "Base APY", value: "14.2%", accent: "#9945FF" },
  { label: "Cabal Members", value: "4,200", accent: "#00FF9F" },
];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#00FF9F" strokeWidth="1.5"/>
        <path d="M10 14L13 17L18 11" stroke="#00FF9F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Instant Borrow",
    desc: "Use your verified Jito Cabal NFT as collateral. Borrow 1.2 SOL instantly — zero price discovery risk, mathematically fixed LTV.",
    accent: "#00FF9F",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="14,3 25,9 25,19 14,25 3,19 3,9" stroke="#D4AF77" strokeWidth="1.5" fill="none"/>
        <polygon points="14,8 20,11.5 20,16.5 14,20 8,16.5 8,11.5" fill="#D4AF77" opacity="0.2"/>
      </svg>
    ),
    title: "Earn as Lender",
    desc: "Deposit SOL into the sovereign pool. Earn compounding APY from borrower interest and 0.8 SOL default spreads.",
    accent: "#D4AF77",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 9V19L14 25L3 19V9L14 3Z" stroke="#9945FF" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="14" r="4" fill="#9945FF" opacity="0.4"/>
        <circle cx="14" cy="14" r="2" fill="#9945FF"/>
      </svg>
    ),
    title: "Quest & Earn",
    desc: "Complete Cabal quests, climb the leaderboard. The deeper in the shadows you go, the greater the rewards.",
    accent: "#9945FF",
  },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      {/* ── HERO SECTION ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-24">
        {/* Large ambient glow behind hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width: "700px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,159,0.06) 0%, rgba(153,69,255,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
          }} />
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 mb-8"
          style={{ animation: "floatY 5s ease-in-out infinite" }}
        >
          <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]">
            <div className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(0,255,159,0.15) 0%, transparent 70%)", filter: "blur(30px)" }} />
            <Image
              src="/hero-archon.png"
              alt="Jito Cabal Archon — The Vault Keeper"
              fill
              className="object-contain relative z-10"
              priority
            />
            {/* Orbiting coin */}
            <motion.div
              className="absolute"
              style={{ top: "10%", right: "-10%", animation: "floatCoin 4s ease-in-out infinite" }}
            >
              <div className="relative w-16 h-16">
                <Image src="/jitosol-coin.png" alt="JitoSOL" fill className="object-contain" />
                <div className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 20px rgba(0,255,159,0.5)", borderRadius: "50%" }} />
              </div>
            </motion.div>
            {/* Second orbiting coin (delayed) */}
            <motion.div
              className="absolute"
              style={{ bottom: "15%", left: "-12%", animation: "floatCoin 5.5s ease-in-out infinite", animationDelay: "1.5s" }}
            >
              <div className="relative w-10 h-10 opacity-60">
                <Image src="/jitosol-coin.png" alt="JitoSOL" fill className="object-contain" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <p className="badge badge-neon mx-auto mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime inline-block animate-pulse" />
            Jito Cabal Verified Protocol
          </p>
          <h1 className="display-text text-4xl md:text-6xl lg:text-7xl text-white mb-3 leading-tight">
            Lend in the Shadows.
          </h1>
          <h1 className="display-text text-4xl md:text-6xl lg:text-7xl leading-tight mb-8"
            style={{ color: "#00FF9F", textShadow: "0 0 40px rgba(0,255,159,0.5), 0 0 80px rgba(0,255,159,0.2)" }}>
            Borrow the Light.
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            The premier peer-to-pool NFT-backed lending protocol. Exclusively for{" "}
            <span style={{ color: "#D4AF77" }}>Jito Cabal</span> holders.
            Borrow instantly. Earn compounding APY.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/borrow">
              <button className="btn-neon px-10 py-4 text-sm w-full sm:w-auto">
                Enter the Vault
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-ghost px-10 py-4 text-sm w-full sm:w-auto">
                View Dashboard
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 mt-16 w-full max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-5 text-center">
                <div className="font-mono text-2xl font-bold mb-1" style={{ color: s.accent }}>
                  {s.value}
                </div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="neon-divider" />
      </div>

      {/* ── FEATURES SECTION ─── */}
      <section className="relative px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-4">The Protocol</p>
          <h2 className="display-text text-3xl md:text-4xl text-white mb-4">
            Built for the <span className="gold-text">Inner Circle</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Peer-to-pool architecture. Cryptographically verified NFT collateral. Sovereign liquidity for sovereign holders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: `rgba(${f.accent === "#00FF9F" ? "0,255,159" : f.accent === "#D4AF77" ? "212,175,119" : "153,69,255"},0.08)`, border: `1px solid ${f.accent}22` }}>
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {f.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/5">
                <Link href={f.title === "Instant Borrow" ? "/borrow" : f.title === "Earn as Lender" ? "/lend" : "/quests"}
                  className="text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all hover:gap-3"
                  style={{ color: f.accent }}>
                  {f.title === "Instant Borrow" ? "Borrow Now" : f.title === "Earn as Lender" ? "Deposit SOL" : "View Quests"}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─── */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12"
          style={{ background: "rgba(0,255,159,0.02)", borderColor: "rgba(0,255,159,0.08)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="badge badge-neon mb-5 w-fit">Borrower Flow</p>
              <h2 className="display-text text-2xl md:text-3xl text-white mb-6">
                Your NFT.<br />
                <span style={{ color: "#00FF9F" }}>Your Liquidity.</span>
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  { step: "01", text: "Connect your wallet holding a verified Jito Cabal NFT" },
                  { step: "02", text: "Select your NFT as collateral — floor value auto-verified on-chain" },
                  { step: "03", text: "Borrow exactly 1.2 SOL at 60% LTV, instantly to your wallet" },
                  { step: "04", text: "Repay within the window. Your NFT returns. No price risk." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.2)" }}>
                      <span className="font-mono text-xs font-bold text-neon-lime">{item.step}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/borrow">
                  <button className="btn-neon px-8 py-3.5 text-sm">Borrow Against NFT</button>
                </Link>
              </div>
            </div>
            <div>
              <p className="badge badge-gold mb-5 w-fit">Lender Flow</p>
              <h2 className="display-text text-2xl md:text-3xl text-white mb-6">
                Passive Yield.<br />
                <span className="gold-text">Secured by Rarity.</span>
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  { step: "01", text: "Deposit SOL into the sovereign liquidity pool — open to all" },
                  { step: "02", text: "Receive jPoolShares representing your pro-rata ownership" },
                  { step: "03", text: "Earn 14.2% base APY from borrower interest + default spreads" },
                  { step: "04", text: "Withdraw at any time by burning jPoolShares for SOL + accrued yield" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(212,175,119,0.08)", border: "1px solid rgba(212,175,119,0.2)" }}>
                      <span className="font-mono text-xs font-bold" style={{ color: "#D4AF77" }}>{item.step}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/lend">
                  <button className="btn-ghost px-8 py-3.5 text-sm">Deposit &amp; Earn</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
