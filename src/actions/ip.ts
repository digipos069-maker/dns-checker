'use server'

import geoip from 'geoip-lite';

export interface IpLocationResult {
  ip: string;
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  timezone: string;
  isp: string;
}

export async function resolveIpLocation(ip: string): Promise<{ success: true; data: IpLocationResult } | { success: false; error: string }> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,timezone,isp,query`, { next: { revalidate: 3600 } });
    const data = await res.json();
    
    if (data.status !== 'success') {
      return { success: false, error: data.message || 'Location not found for this IP.' };
    }
    
    return {
      success: true,
      data: {
        ip: data.query,
        country: data.country || '',
        region: data.regionName || '',
        city: data.city || '',
        lat: data.lat || 0,
        lng: data.lon || 0,
        timezone: data.timezone || '',
        isp: data.isp || 'N/A'
      }
    };
  } catch (error) {
    return { success: false, error: 'Failed to resolve IP location.' };
  }
}
