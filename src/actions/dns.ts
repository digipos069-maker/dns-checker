'use server'

import dns from 'node:dns/promises';
import dgram from 'node:dgram';
// @ts-ignore
import dnsPacket from 'dns-packet';

export type DnsRecordType = 'A' | 'AAAA' | 'MX' | 'TXT' | 'CNAME' | 'NS' | 'PTR' | 'SRV' | 'SOA' | 'CAA' | 'DS' | 'DNSKEY';

export type DnsResult = 
  | { success: true; data: any[] }
  | { success: false; error: string };

function queryDnsPacket(domain: string, type: DnsRecordType, serverIp: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket('udp4');
    
    const timeoutId = setTimeout(() => {
      socket.close();
      reject(new Error('Timeout'));
    }, 5000);

    let queryDomain = domain;
    // Basic auto-formatting for PTR if user enters an IP address
    if (type === 'PTR' && /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain)) {
      queryDomain = domain.split('.').reverse().join('.') + '.in-addr.arpa';
    }

    const buf = dnsPacket.encode({
      type: 'query',
      id: Math.floor(Math.random() * 65535),
      flags: dnsPacket.RECURSION_DESIRED,
      questions: [{ type: type as any, name: queryDomain }]
    });

    socket.on('message', message => {
      clearTimeout(timeoutId);
      try {
        const response = dnsPacket.decode(message);
        socket.close();
        if (response.answers) {
          resolve(response.answers.map((a: any) => a.data));
        } else {
          resolve([]);
        }
      } catch (err) {
        socket.close();
        reject(err);
      }
    });

    socket.on('error', err => {
      clearTimeout(timeoutId);
      socket.close();
      reject(err);
    });

    socket.send(buf, 0, buf.length, 53, serverIp);
  });
}

export async function resolveDns(domain: string, type: DnsRecordType, serverIp?: string): Promise<DnsResult> {
  if (!domain) {
    return { success: false, error: 'Domain is required' };
  }

  try {
    let records: any[] = [];
    
    // We use dns-packet for DS and DNSKEY because Node's native dns module doesn't support them.
    if (type === 'DS' || type === 'DNSKEY') {
      if (!serverIp) {
         serverIp = '8.8.8.8';
      }
      records = await queryDnsPacket(domain, type, serverIp);
    } else {
      let resolver: any = dns;
      
      // Node's dns module doesn't auto-reverse IPs for PTR for resolvePtr, so we do it
      let queryDomain = domain;
      if (type === 'PTR' && /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain)) {
        queryDomain = domain.split('.').reverse().join('.') + '.in-addr.arpa';
      }

      if (serverIp) {
        resolver = new dns.Resolver();
        resolver.setServers([serverIp]);
      }

      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );

      const res = await Promise.race([
        resolver.resolve(queryDomain, type as any),
        timeoutPromise
      ]);
      records = Array.isArray(res) ? res : [res];
    }

    return { success: true, data: records };
  } catch (error: any) {
    console.error('DNS Resolution Error:', error);
    if (error.message === 'Timeout') {
      return { success: false, error: 'Connection timed out' };
    }
    return { 
      success: false, 
      error: error.code === 'ENOTFOUND' || error.code === 'ENODATA' 
        ? `No ${type} records found` 
        : error.message || 'Failed to resolve DNS' 
    };
  }
}
