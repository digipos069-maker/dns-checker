'use client';

import { useState } from 'react';
import { resolveDns, DnsRecordType, DnsResult } from '@/actions/dns';
import Dropdown from '@/components/Dropdown';

const DNS_SERVERS = [
  { id: 'us-mv', name: 'Google', location: 'Mountain View CA, United States', ip: '8.8.8.8' },
  { id: 'us-sf', name: 'OpenDNS', location: 'San Francisco CA, United States', ip: '208.67.222.222' },
  { id: 'us-berkeley', name: 'Quad9', location: 'Berkeley, US', ip: '9.9.9.9' },
  { id: 'us-cambridge', name: 'Akamai', location: 'Cambridge, United States', ip: '1.1.1.1' },
  { id: 'us-ashburn', name: 'Quad9', location: 'Ashburn, United States', ip: '9.9.9.10' },
  { id: 'us-centurylink', name: 'CenturyLink', location: 'United States', ip: '205.171.3.65' },
  { id: 'us-wilmington', name: 'NextDNS Inc.', location: 'Wilmington, US', ip: '45.90.28.190' },
  { id: 'ca-toronto', name: 'Cloudflare', location: 'Toronto, Canada', ip: '1.0.0.1' },
  { id: 'ru-spb', name: 'PJSC MegaFon', location: 'Saint Petersburg, Russia', ip: '77.88.8.8' },
  { id: 'za-cullinan', name: 'Liquid Telecom', location: 'Cullinan, South Africa', ip: '8.8.8.8' },
  { id: 'nl-lelystad', name: 'LeaseWeb', location: 'Lelystad, Netherlands', ip: '1.1.1.1' },
  { id: 'fr-strasbourg', name: 'Assoc Alsace', location: 'Strasbourg, France', ip: '8.8.4.4' },
  { id: 'es-parla', name: 'AIRE NETWORKS', location: 'Parla, Spain', ip: '9.9.9.9' },
  { id: 'ch-zurich', name: 'Swisscom Ltd', location: 'Zürich, Switzerland', ip: '1.1.1.1' },
  { id: 'at-innsbruck', name: 'nemox.net', location: 'Innsbruck, Austria', ip: '8.8.8.8' },
  { id: 'gb-newbury', name: 'Vodafone', location: 'Newbury, United Kingdom', ip: '208.67.220.220' },
  { id: 'dk-copenhagen', name: 'Fiberby ApS', location: 'Copenhagen, Denmark', ip: '1.1.1.1' },
  { id: 'de-frankfurt', name: 'Ecrcnet', location: 'Frankfurt, Germany', ip: '8.8.8.8' },
  { id: 'mx-mexicocity', name: 'TOTAL PLAY', location: 'Mexico City, Mexico', ip: '9.9.9.9' },
  { id: 'br-jacarezinho', name: 'Ligga Telecom', location: 'Jacarezinho, Brazil', ip: '1.1.1.1' },
  { id: 'my-portdickson', name: 'Bigband Sdn Bhd', location: 'Port Dickson, Malaysia', ip: '8.8.8.8' },
  { id: 'au-research', name: 'Cloudflare', location: 'Research, Australia', ip: '1.1.1.1' },
  { id: 'au-brisbane', name: 'Cloudflare', location: 'Brisbane, Australia', ip: '1.0.0.1' },
  { id: 'nz-auckland', name: 'Voyager Internet', location: 'Auckland, New Zealand', ip: '8.8.8.8' },
  { id: 'sg-singapore', name: 'DigitalOcean', location: 'Singapore', ip: '1.1.1.1' },
  { id: 'kr-seoul', name: 'SK Telecom', location: 'Seoul, South Korea', ip: '8.8.4.4' },
  { id: 'cn-xinfeng', name: 'Nanjing Xinfeng', location: 'Xinfeng, China', ip: '223.5.5.5' },
  { id: 'tr-istanbul', name: 'Radore Veri Merkezi', location: 'Istanbul, Turkey', ip: '8.8.8.8' },
  { id: 'in-bengaluru', name: 'BHARAT PUBLIC DNS', location: 'Bengaluru, India', ip: '1.10.10.10' },
  { id: 'pk-karachi', name: 'Connect Comms', location: 'Karachi, Pakistan', ip: '1.1.1.1' },
  { id: 'pt-lisbon', name: 'NOS COMUNICACOES', location: 'Lisbon, Portugal', ip: '8.8.8.8' },
  { id: 'ie-ireland', name: 'Daniel Cid', location: 'Ireland', ip: '9.9.9.9' },
  { id: 'bd-dhaka', name: 'Dhaka', location: 'Dhaka, Bangladesh', ip: '8.8.4.4' }
];

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
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(' ');
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
    <main className="container">
      <div className="header">
        <h1>DNS Checker</h1>
        <p>Instantly check DNS records across the globe.</p>
      </div>

      <div className="glass-card">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-group" style={{ flex: 2 }}>
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
          
          <div className="form-group" style={{ minWidth: '200px' }}>
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

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="loader"></span> : 'Search'}
          </button>
        </form>

        {hasSearched && (
          <div className="results-container">
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Location / Server</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Status</th>
                    <th>Result Value</th>
                  </tr>
                </thead>
                <tbody>
                  {DNS_SERVERS.map(server => {
                    const resState = serverResults[server.id];
                    const isPending = !resState || resState.status === 'pending';
                    const isSuccess = resState?.status === 'success';
                    const isError = resState?.status === 'error';
                    
                    return (
                      <tr key={server.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{server.location}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {server.name} ({server.ip})
                          </div>
                        </td>
                        <td style={{ textAlign: 'center', fontSize: '1.25rem' }}>
                          {isPending && <i className="fi fi-rr-spinner" style={{ color: '#94a3b8', animation: 'spin 1s linear infinite', display: 'inline-block' }}></i>}
                          {isSuccess && <i className="fi fi-sr-check-circle" style={{ color: 'var(--success)' }}></i>}
                          {isError && <i className="fi fi-sr-cross-circle" style={{ color: 'var(--error)' }}></i>}
                        </td>
                        <td style={{ wordBreak: 'break-all' }}>
                          {isPending && <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Querying...</span>}
                          {isSuccess && resState.result?.success && (
                            <div>
                              {resState.result.data.length === 0 ? (
                                <span style={{ color: 'var(--text-muted)' }}>No records found</span>
                              ) : (
                                resState.result.data.map((r, i) => (
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
        )}
      </div>
    </main>
  );
}
