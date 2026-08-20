'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { resolveIpLocation, IpLocationResult } from '@/actions/ip';

const IpMap = dynamic(() => import('@/components/IpMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '400px', width: '100%', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#94a3b8' }}>Loading Map...</p>
    </div>
  )
});

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

function IpLocationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialIp = searchParams.get('ip') || '';

  const [ipInput, setIpInput] = useState(initialIp);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IpLocationResult | null>(null);
  const [error, setError] = useState('');

  const fetchLocation = async (ipToSearch: string) => {
    if (!ipToSearch) return;
    setLoading(true);
    setError('');
    
    try {
      const res = await resolveIpLocation(ipToSearch);
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error);
        setResult(null);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setResult(null);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (initialIp) {
      fetchLocation(initialIp);
    }
  }, [initialIp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipInput) return;
    router.push(`/ip-location?ip=${encodeURIComponent(ipInput)}`);
  };

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="hero-section text-center">
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(135deg, var(--text-main), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          IP Location Tracker
        </h1>
        <p className="subtitle" style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
          Instantly discover the geographical location of any IP address globally.
        </p>

        <form onSubmit={handleSubmit} className="search-box glass-card" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '1rem', padding: '1rem' }}>
          <input
            type="text"
            className="input-field"
            style={{ flex: 1, padding: '1rem 1.5rem', fontSize: '1.1rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}
            placeholder="e.g., 142.250.190.46"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0 2rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {loading ? (
              <><i className="fi fi-rr-spinner" style={{ animation: 'spin 1s linear infinite' }}></i> Locating...</>
            ) : (
              <><i className="fi fi-rr-search"></i> Locate IP</>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div style={{ maxWidth: '800px', margin: '2rem auto 0', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', borderRadius: '12px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ maxWidth: '1000px', margin: '4rem auto 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', color: 'var(--text-main)' }}>
              Location Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, max-content) 1fr', gap: '1rem 2rem', fontSize: '1.1rem' }}>
              <strong style={{ color: 'var(--text-muted)' }}>IP:</strong>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{result.ip}</div>
              
              <strong style={{ color: 'var(--text-muted)' }}>Country:</strong>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{getFlagEmoji(result.country)} {result.country}</div>
              
              <strong style={{ color: 'var(--text-muted)' }}>State:</strong>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{result.region}</div>
              
              <strong style={{ color: 'var(--text-muted)' }}>City:</strong>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{result.city}</div>
              
              <strong style={{ color: 'var(--text-muted)' }}>Latitude:</strong>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{result.lat.toFixed(4)}</div>
              
              <strong style={{ color: 'var(--text-muted)' }}>Longitude:</strong>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{result.lng.toFixed(4)}</div>
              
              <strong style={{ color: 'var(--text-muted)' }}>ISP:</strong>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{result.isp}</div>
            </div>
          </div>
          
          <IpMap lat={result.lat} lng={result.lng} city={result.city} country={result.country} ip={result.ip} />
        </div>
      )}
    </main>
  );
}

export default function IpLocationPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading Tool...</div>}>
      <IpLocationContent />
    </Suspense>
  );
}
