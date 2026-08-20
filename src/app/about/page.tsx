import React from 'react';

export const metadata = {
  title: 'About Us | DNS Checker',
  description: 'Learn more about our Global DNS Propagation Checker tool.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
      <div className="glass-card" style={{ padding: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>About DNS Checker</h1>
        <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Welcome to <strong>DNS Checker</strong>, your go-to platform for instantly verifying DNS records and propagation worldwide. Our mission is to provide developers, system administrators, and webmasters with the most accurate and up-to-date DNS insights.
          </p>
          <p>
            When you update your domain's nameservers or change hosting providers, it can take up to 48 hours for the changes to propagate across the globe. Our tool queries multiple DNS servers located in different geographic regions simultaneously, allowing you to track the exact propagation status of your domain in real-time.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>Features</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Global DNS Lookups:</strong> Query servers from North America, Europe, Asia, and more.</li>
            <li><strong>All Major Record Types:</strong> Support for A, AAAA, CNAME, MX, TXT, NS, PTR, and SRV records.</li>
            <li><strong>IP Location:</strong> Instantly discover the geographic location and ISP of any resolved IP address.</li>
            <li><strong>Lightning Fast:</strong> Our backend leverages fast UDP DNS packets for real-time results without the wait.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
