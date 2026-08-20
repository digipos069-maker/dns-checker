import React from 'react';

export const metadata = {
  title: 'Privacy Policy | DNS Checker',
  description: 'Privacy Policy for DNS Checker.',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
      <div className="glass-card" style={{ padding: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Privacy Policy</h1>
        <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            At DNS Checker, we take your privacy seriously. This Privacy Policy outlines the types of information we collect, how it is used, and the steps we take to ensure your data is protected when you use our website.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>1. Information We Collect</h2>
          <p>
            Our tool is designed to be privacy-friendly. When you perform a DNS lookup, we process the domain name and record type you submit to query public DNS servers. We may temporarily log these requests (including your IP address and user agent) for security, rate-limiting, and analytics purposes to ensure the stability of our service.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>2. How We Use Information</h2>
          <p>
            The data collected is used solely to provide and maintain the DNS lookup service, monitor for malicious activity, and improve the user experience. We do not sell, rent, or share your personal information or search history with third-party data brokers or marketing agencies.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>3. Third-Party Services</h2>
          <p>
            We may use external APIs to provide enriched geolocation data for IP addresses. These third-party services operate under their own privacy policies. We ensure that no personally identifiable information is transmitted to these services beyond what is strictly required to perform the lookup.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>4. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
}
