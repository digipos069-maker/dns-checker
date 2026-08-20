import type { Metadata } from "next";
import { Outfit } from "next/font/google";
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
            <div className="logo">
              <i className="fi fi-rr-globe"></i>
              <span>DNS Checker</span>
            </div>
            <nav className="nav-links">
              <a href="#" className="active">Home</a>
              <a href="#">Tools</a>
              <a href="#">About</a>
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
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
