import type { Metadata } from "next";
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import Navbar from "@/components/nav/Navbar";
import MobileNav from "@/components/nav/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400","500","600","700","900"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400","500","600"] });

export const metadata: Metadata = {
  title: "CABALA — Jito Cabal Lending | Lend in the Shadows. Borrow the Light.",
  description: "The premier peer-to-pool NFT-backed lending protocol. Exclusively for Jito Cabal holders. Borrow instantly against your Cabal NFT. Earn compounding APY as a lender.",
  keywords: ["Jito Cabal", "NFT lending", "Solana DeFi", "JitoSOL", "peer-to-pool"],
  openGraph: {
    title: "CABALA — Jito Cabal Lending",
    description: "Lend in the Shadows. Borrow the Light.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cinzel.variable} ${jetbrainsMono.variable} antialiased`}>
        <WalletContextProvider>
          <div className="relative min-h-screen">
            {/* Particle layer */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${(i * 5.5 + 3) % 100}%`,
                    animationDuration: `${12 + (i * 3.7) % 20}s`,
                    animationDelay: `${(i * 2.3) % 12}s`,
                    width: i % 3 === 0 ? '3px' : '2px',
                    height: i % 3 === 0 ? '3px' : '2px',
                    opacity: 0.4 + (i % 4) * 0.1,
                    background: i % 5 === 0 ? '#D4AF77' : '#00FF9F',
                  }}
                />
              ))}
            </div>
            {/* Desktop Navbar */}
            <Navbar />
            {/* Main Content */}
            <main className="relative z-10">
              {children}
            </main>
            {/* Mobile Bottom Nav */}
            <MobileNav />
            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 mt-24 pb-20 md:pb-0">
              <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="display-text text-xs text-white/30 tracking-widest">CABALA</span>
                  <span className="text-white/15 text-xs">·</span>
                  <span className="text-white/20 text-xs font-mono">Jito Cabal Lending Protocol</span>
                </div>
                <div className="flex flex-col items-center md:items-end gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse" />
                    <span className="text-white/30 text-xs font-mono">Program ID</span>
                  </div>
                  <span className="text-neon-lime/60 text-xs font-mono tracking-wider">EazAH8Adyino7uConjZfYdjFqmjqfm7vBtTsba3Ejg39</span>
                </div>
              </div>
            </footer>
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}
