"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/lend", label: "Lend" },
  { href: "/borrow", label: "Borrow" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/quests", label: "Quests" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05]"
      style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(0,255,159,0.1)", border: "1px solid rgba(0,255,159,0.25)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polygon points="8,1 15,5 15,11 8,15 1,11 1,5" stroke="#00FF9F" strokeWidth="1.2" fill="none"/>
              <polygon points="8,4 12,6.5 12,9.5 8,12 4,9.5 4,6.5" fill="#00FF9F" opacity="0.3"/>
              <circle cx="8" cy="8" r="1.5" fill="#00FF9F"/>
            </svg>
          </div>
          <span className="display-text text-sm text-white tracking-[0.2em]">CABALA</span>
        </Link>
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Wallet + Transparency */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/transparency" className={`nav-link hidden md:block ${pathname === "/transparency" ? "active" : ""}`}>
            Verify
          </Link>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
