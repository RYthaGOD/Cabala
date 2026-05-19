"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MOBILE_LINKS = [
  { href: "/", label: "Home", icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 9L9 2L16 9V16H12V12H6V16H2V9Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
    </svg>
  )},
  { href: "/dashboard", label: "Dash", icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  )},
  { href: "/borrow", label: "Borrow", icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 5V9L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )},
  { href: "/lend", label: "Lend", icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2V14M5 6L9 2L13 6M5 12L9 16L13 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { href: "/quests", label: "Quests", icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polygon points="9,1 11.5,6.5 17,7.3 13,11.2 13.9,17 9,14.3 4.1,17 5,11.2 1,7.3 6.5,6.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    </svg>
  )},
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-around px-2 py-3">
        {MOBILE_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all"
              style={{ color: isActive ? "#00FF9F" : "rgba(255,255,255,0.35)" }}>
              {link.icon}
              <span className="text-[9px] font-bold tracking-wider uppercase">{link.label}</span>
              {isActive && (
                <div className="w-4 h-0.5 rounded-full" style={{ background: "#00FF9F", boxShadow: "0 0 6px #00FF9F" }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
