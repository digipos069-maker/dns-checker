import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DNS Checker | Online Tool",
  description: "Check DNS records (A, AAAA, MX, TXT, CNAME, NS) for any domain easily and quickly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body>
        <header className="global-header">
          <div className="header-container">
            <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
              <i className="fi fi-rr-globe"></i>
              <span>DNS Checker</span>
            </Link>
            <nav className="nav-links">
              <Link href="/" className="active">Home</Link>
              <Link href="/ip-location">Tools</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>

        <footer className="global-footer">
          <div className="footer-container">
            <p>&copy; {new Date().getFullYear()} DNS Checker. All rights reserved.</p>
            <div className="footer-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
