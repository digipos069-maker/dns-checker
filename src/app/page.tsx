'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { resolveDns, DnsRecordType, DnsResult } from '@/actions/dns';
import Dropdown from '@/components/Dropdown';
import AboutSection from '@/components/AboutSection';

// Import map dynamically since Leaflet requires window
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });


const DNS_SERVERS = [
  { id: 'us-mv', name: 'Google', location: 'Mountain View CA, United States', ip: '8.8.8.8', lat: 37.3861, lng: -122.0839 },
  { id: 'us-sf', name: 'OpenDNS', location: 'San Francisco CA, United States', ip: '208.67.222.222', lat: 37.7749, lng: -122.4194 },
  { id: 'us-berkeley', name: 'Quad9', location: 'Berkeley, US', ip: '9.9.9.9', lat: 37.8715, lng: -122.2730 },
  { id: 'us-cambridge', name: 'Akamai', location: 'Cambridge, United States', ip: '1.1.1.1', lat: 42.3736, lng: -71.1097 },
  { id: 'us-ashburn', name: 'Quad9', location: 'Ashburn, United States', ip: '9.9.9.10', lat: 39.0438, lng: -77.4874 },
  { id: 'us-centurylink', name: 'CenturyLink', location: 'United States', ip: '205.171.3.65', lat: 39.8283, lng: -98.5795 },
  { id: 'us-wilmington', name: 'NextDNS Inc.', location: 'Wilmington, US', ip: '45.90.28.190', lat: 39.7447, lng: -75.5484 },
  { id: 'ca-toronto', name: 'Cloudflare', location: 'Toronto, Canada', ip: '1.0.0.1', lat: 43.6510, lng: -79.3470 },
  { id: 'ru-spb', name: 'PJSC MegaFon', location: 'Saint Petersburg, Russia', ip: '77.88.8.8', lat: 59.9311, lng: 30.3609 },
  { id: 'za-cullinan', name: 'Liquid Telecom', location: 'Cullinan, South Africa', ip: '8.8.8.8', lat: -25.6706, lng: 28.5236 },
  { id: 'nl-lelystad', name: 'LeaseWeb', location: 'Lelystad, Netherlands', ip: '1.1.1.1', lat: 52.5185, lng: 5.4714 },
  { id: 'fr-strasbourg', name: 'Assoc Alsace', location: 'Strasbourg, France', ip: '8.8.4.4', lat: 48.5734, lng: 7.7521 },
  { id: 'es-parla', name: 'AIRE NETWORKS', location: 'Parla, Spain', ip: '9.9.9.9', lat: 40.2372, lng: -3.7725 },
  { id: 'ch-zurich', name: 'Swisscom Ltd', location: 'Zürich, Switzerland', ip: '1.1.1.1', lat: 47.3769, lng: 8.5417 },
  { id: 'at-innsbruck', name: 'nemox.net', location: 'Innsbruck, Austria', ip: '8.8.8.8', lat: 47.2692, lng: 11.4041 },
  { id: 'gb-newbury', name: 'Vodafone', location: 'Newbury, United Kingdom', ip: '208.67.220.220', lat: 51.4014, lng: -1.3259 },
  { id: 'dk-copenhagen', name: 'Fiberby ApS', location: 'Copenhagen, Denmark', ip: '1.1.1.1', lat: 55.6761, lng: 12.5683 },
  { id: 'de-frankfurt', name: 'Ecrcnet', location: 'Frankfurt, Germany', ip: '8.8.8.8', lat: 50.1109, lng: 8.6821 },
  { id: 'mx-mexicocity', name: 'TOTAL PLAY', location: 'Mexico City, Mexico', ip: '9.9.9.9', lat: 19.4326, lng: -99.1332 },
  { id: 'br-jacarezinho', name: 'Ligga Telecom', location: 'Jacarezinho, Brazil', ip: '1.1.1.1', lat: -23.1611, lng: -49.9722 },
  { id: 'my-portdickson', name: 'Bigband Sdn Bhd', location: 'Port Dickson, Malaysia', ip: '8.8.8.8', lat: 2.5228, lng: 101.7959 },
  { id: 'au-research', name: 'Cloudflare', location: 'Research, Australia', ip: '1.1.1.1', lat: -37.7667, lng: 145.1833 },
  { id: 'au-brisbane', name: 'Cloudflare', location: 'Brisbane, Australia', ip: '1.0.0.1', lat: -27.4698, lng: 153.0251 },
  { id: 'nz-auckland', name: 'Voyager Internet', location: 'Auckland, New Zealand', ip: '8.8.8.8', lat: -36.8485, lng: 174.7633 },
  { id: 'sg-singapore', name: 'DigitalOcean', location: 'Singapore', ip: '1.1.1.1', lat: 1.3521, lng: 103.8198 },
  { id: 'kr-seoul', name: 'SK Telecom', location: 'Seoul, South Korea', ip: '8.8.4.4', lat: 37.5665, lng: 126.9780 },
  { id: 'cn-xinfeng', name: 'Nanjing Xinfeng', location: 'Xinfeng, China', ip: '223.5.5.5', lat: 32.0603, lng: 118.7969 },
  { id: 'tr-istanbul', name: 'Radore Veri Merkezi', location: 'Istanbul, Turkey', ip: '8.8.8.8', lat: 41.0082, lng: 28.9784 },
  { id: 'in-bengaluru', name: 'BHARAT PUBLIC DNS', location: 'Bengaluru, India', ip: '1.10.10.10', lat: 12.9716, lng: 77.5946 },
  { id: 'pk-karachi', name: 'Connect Comms', location: 'Karachi, Pakistan', ip: '1.1.1.1', lat: 24.8607, lng: 67.0011 },
  { id: 'pt-lisbon', name: 'NOS COMUNICACOES', location: 'Lisbon, Portugal', ip: '8.8.8.8', lat: 38.7223, lng: -9.1393 },
  { id: 'ie-ireland', name: 'Daniel Cid', location: 'Ireland', ip: '9.9.9.9', lat: 53.1424, lng: -7.6921 },
  { id: 'bd-dhaka', name: 'Dhaka', location: 'Dhaka, Bangladesh', ip: '8.8.4.4', lat: 23.8103, lng: 90.4125 }
];

const getRecordTypeIcon = (type: string) => {
  switch(type) {
    case 'A': return 'fi fi-rr-computer';
    case 'AAAA': return 'fi fi-rr-cloud-network';
    case 'MX': return 'fi fi-rr-envelope';
    case 'TXT': return 'fi fi-rr-document';
    case 'CNAME': return 'fi fi-rr-link';
    case 'NS': return 'fi fi-rr-server';
    case 'PTR': return 'fi fi-rr-exchange';
    case 'SRV': return 'fi fi-rr-settings';
    case 'SOA': return 'fi fi-rr-badge-check';
    case 'CAA': return 'fi fi-rr-lock';
    case 'DS': return 'fi fi-rr-shield';
    case 'DNSKEY': return 'fi fi-rr-key';
    default: return 'fi fi-rr-search';
  }
};

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

type ServerResult = {
  status: 'pending' | 'success' | 'error';
  result?: DnsResult;
};

export default function Home() {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState<DnsRecordType>('A');
  const [loading, setLoading] = useState(false);
  const [serverResults, setServerResults] = useState<Record<string, ServerResult>>({});
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [hoveredServerId, setHoveredServerId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    setLoading(true);
    setHasSearched(true);
    
    // Initialize results state for all servers to 'pending'
    const initialResults: Record<string, ServerResult> = {};
    DNS_SERVERS.forEach(server => {
      initialResults[server.id] = { status: 'pending' };
    });
    setServerResults(initialResults);
    
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
    
    // Fire concurrent requests
    await Promise.all(
      DNS_SERVERS.map(async (server) => {
        try {
          const res = await resolveDns(cleanDomain, recordType, server.ip);
          setServerResults(prev => ({
            ...prev,
            [server.id]: { status: res.success ? 'success' : 'error', result: res }
          }));
        } catch (err) {
          setServerResults(prev => ({
            ...prev,
            [server.id]: { status: 'error', result: { success: false, error: 'Failed' } }
          }));
        }
      })
    );

    setLoading(false);
  };

  const renderValue = (val: any) => {
    if (typeof val === 'string') {
      if (recordType === 'A' || recordType === 'AAAA') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{val}</span>
            <Link href={`/ip-location?ip=${val}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', textDecoration: 'none', background: '#eff6ff', width: '24px', height: '24px', borderRadius: '50%', fontSize: '0.85em' }} title="Locate IP">
              <i className="fi fi-rr-marker" style={{ marginTop: '2px' }}></i>
            </Link>
          </div>
        );
      }
      return val;
    }
    if (Array.isArray(val)) {
      return val.join(' ');
    }
    if (typeof val === 'object' && val !== null) {
      // MX
      if ('exchange' in val && 'priority' in val) {
        return `Priority: ${val.priority}, Exchange: ${val.exchange}`;
      }
      // SRV
      if ('weight' in val && 'port' in val && 'name' in val) {
        return `Priority: ${val.priority}, Weight: ${val.weight}, Port: ${val.port}, Target: ${val.name}`;
      }
      // SOA
      if ('nsname' in val && 'hostmaster' in val) {
        return `NS: ${val.nsname}, Hostmaster: ${val.hostmaster}, Serial: ${val.serial}`;
      }
      // CAA (node:dns returns { critical, issue|issuewild|iodef })
      if ('critical' in val) {
        const tag = 'issue' in val ? 'issue' : 'issuewild' in val ? 'issuewild' : 'iodef';
        return `Flag: ${val.critical}, Tag: ${tag}, Value: ${val[tag]}`;
      }
      
      // dns-packet formats (DS, DNSKEY) might contain buffers
      const clone = { ...val };
      for (const k in clone) {
        if (clone[k] && clone[k].type === 'Buffer' && Array.isArray(clone[k].data)) {
          clone[k] = Buffer.from(clone[k].data).toString('hex');
        } else if (Buffer.isBuffer(clone[k])) {
          clone[k] = clone[k].toString('hex');
        }
      }
      return JSON.stringify(clone);
    }
    return String(val);
  };

  return (
    <div className="container" style={{ maxWidth: '1415px' }}>
      <div className="page-hero">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>DNS Lookup Tool</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Perform a domain DNS lookup, online DNS lookup, and check DNS propagation across the globe with our fast DNS record lookup tool.</p>
      </div>

      <div className="glass-card">
        <div className="results-container">
          <div className="left-column">
            <form className="search-form" onSubmit={handleSubmit} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1, minWidth: '230px' }}>
                <label htmlFor="domain">Domain Name</label>
                <input
                  id="domain"
                  type="text"
                  placeholder="e.g. google.com"
                  className="input-field"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group" style={{ width: '90px' }}>
                <label>Record Type</label>
                <Dropdown
                  value={recordType}
                  onChange={setRecordType}
                  options={[
                    { label: 'A', value: 'A', description: 'IPv4 address' },
                    { label: 'AAAA', value: 'AAAA', description: 'IPv6 address' },
                    { label: 'MX', value: 'MX', description: 'Mail exchange' },
                    { label: 'TXT', value: 'TXT', description: 'Text records' },
                    { label: 'CNAME', value: 'CNAME', description: 'Canonical name' },
                    { label: 'NS', value: 'NS', description: 'Name servers' },
                    { label: 'PTR', value: 'PTR', description: 'Pointer record' },
                    { label: 'SRV', value: 'SRV', description: 'Service locator' },
                    { label: 'SOA', value: 'SOA', description: 'Start of authority' },
                    { label: 'CAA', value: 'CAA', description: 'Cert authority auth' },
                    { label: 'DS', value: 'DS', description: 'Delegation signer' },
                    { label: 'DNSKEY', value: 'DNSKEY', description: 'DNSSEC public key' },
                  ]}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button type="submit" className="btn-primary" disabled={loading} style={{ height: '42px', padding: '0 1.5rem' }}>
                  {loading ? <span className="loader"></span> : 'Search'}
                </button>
              </div>
            </form>

            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th style={{ width: 'calc(50% - 6px)' }}>Location / Server</th>
                    <th style={{ width: '80px', textAlign: 'center', padding: 0 }}>Status</th>
                    <th>Result Value</th>
                  </tr>
                </thead>
                <tbody>
                {DNS_SERVERS.map(server => {
                  const resState = serverResults[server.id];
                  const isIdle = !hasSearched;
                  const isPending = hasSearched && (!resState || resState.status === 'pending');
                  const isSuccess = hasSearched && resState?.status === 'success';
                  const isError = hasSearched && resState?.status === 'error';
                  
                  return (
                    <tr 
                      key={server.id}
                      onClick={() => setSelectedServerId(server.id)}
                      onMouseEnter={() => setHoveredServerId(server.id)}
                      onMouseLeave={() => setHoveredServerId(null)}
                      style={{ 
                        cursor: 'pointer', 
                        backgroundColor: selectedServerId === server.id ? '#eff6ff' : (hoveredServerId === server.id ? '#f8fafc' : undefined),
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td>
                        <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.1rem' }}>{getFlagEmoji(server.id.split('-')[0])}</span>
                          <span>{server.location}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                          {server.name} ({server.ip})
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', fontSize: '1.25rem', padding: 0 }}>
                        {isIdle && <span style={{ color: '#cbd5e1' }}>-</span>}
                        {isPending && <i className="fi fi-rr-spinner" style={{ color: '#94a3b8', animation: 'spin 1s linear infinite', display: 'inline-block' }}></i>}
                        {isSuccess && <i className="fi fi-sr-check-circle" style={{ color: 'var(--success)' }}></i>}
                        {isError && <i className="fi fi-sr-cross-circle" style={{ color: 'var(--error)' }}></i>}
                      </td>
                      <td style={{ wordBreak: 'break-all' }}>
                        {isIdle && (
                          <div style={{ color: '#cbd5e1' }}>
                            <i className={getRecordTypeIcon(recordType)} style={{ fontSize: '1.25rem' }}></i>
                          </div>
                        )}
                        {isPending && <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Querying...</span>}
                        {isSuccess && resState.result?.success && (
                          <div>
                            {resState.result.data.length === 0 ? (
                              <span style={{ color: 'var(--text-muted)' }}>No records found</span>
                            ) : (
                              resState.result.data.map((r: any, i: number) => (
                                <div key={i}>{renderValue(r)}</div>
                              ))
                            )}
                          </div>
                        )}
                        {isError && resState.result && !resState.result.success && (
                          <span style={{ color: 'var(--error)', fontSize: '0.875rem' }}>
                            {resState.result.error}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="right-column">
          <div className="map-wrapper">
            <MapComponent 
              servers={DNS_SERVERS} 
              results={serverResults} 
              selectedServerId={selectedServerId} 
              hoveredServerId={hoveredServerId}
            />
          </div>

          <div className="summary-list">
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>DNS Servers</h2>
            <div className="summary-list-content">
              {(() => {
                const uniqueCountries = new Map();
                DNS_SERVERS.forEach(server => {
                  const countryName = server.location.split(',').pop()?.trim();
                  if (countryName) {
                    if (!uniqueCountries.has(countryName)) {
                      uniqueCountries.set(countryName, { countryCode: server.id.split('-')[0] });
                    }
                  }
                });

                return Array.from(uniqueCountries.entries()).map(([countryName, { countryCode }]) => {
                  const flag = getFlagEmoji(countryCode);
                  
                  return (
                    <div 
                      key={countryName} 
                      className="summary-item" 
                    >
                      <span className="summary-flag">{flag}</span>
                      <span className="summary-name" title={countryName}>{countryName}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>
      </div>
      <AboutSection />
    </div>
  );
}
