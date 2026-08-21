import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dnschecker.store'),
  title: {
    default: 'DNS Checker | Global DNS Propagation & Records Tool',
    template: '%s | DNS Checker'
  },
  description: 'Instantly check DNS propagation, verify A, AAAA, MX, TXT, CNAME records, and locate IPs globally with our powerful DNS checker tool.',
  keywords: ['dns check', 'dns checker', 'dns lookup', 'dns lookup tool', 'dns check tool', 'online dns checker', 'online dns lookup', 'dns record checker', 'dns record lookup', 'check dns records', 'free dns checker', 'free dns lookup', 'dns propagation checker', 'domain dns lookup', 'check domain dns records', 'IP location', 'A record', 'MX record', 'NS record', 'dnschecker.store'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dnschecker.store',
    title: 'DNS Checker | Global DNS Propagation & Records Tool',
    description: 'Instantly check DNS propagation, verify records, and locate IPs globally.',
    siteName: 'DNS Checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DNS Checker | Global DNS Propagation',
    description: 'Instantly check DNS propagation, verify records, and locate IPs globally.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "DNS Checker",
              "url": "https://dnschecker.store",
              "description": "Instantly check DNS propagation, verify A, AAAA, MX, TXT, CNAME records, and locate IPs globally.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
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
