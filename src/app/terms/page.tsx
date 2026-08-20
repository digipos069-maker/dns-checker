import React from 'react';

export const metadata = {
  title: 'Terms of Service | DNS Checker',
  description: 'Terms of Service for DNS Checker.',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
      <div className="glass-card" style={{ padding: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Terms of Service</h1>
        <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>1. Acceptance of Terms</h2>
          <p>
            By accessing and using DNS Checker, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our service.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>2. Use of Service</h2>
          <p>
            DNS Checker provides public DNS resolution and IP geolocation tools for informational purposes. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Automated scraping, abuse of our backend APIs, or attempting to bypass rate limits is strictly prohibited.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>3. Disclaimer of Warranties</h2>
          <p>
            The service is provided on an "as is" and "as available" basis. While we strive to provide accurate DNS and propagation data, we make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of the service. DNS propagation is influenced by external factors beyond our control.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>4. Limitation of Liability</h2>
          <p>
            In no event shall DNS Checker or its operators be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </div>
      </div>
    </div>
  );
}
