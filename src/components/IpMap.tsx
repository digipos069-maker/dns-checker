'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface IpMapProps {
  lat: number;
  lng: number;
  city: string;
  country: string;
  ip: string;
}

const customIcon = L.divIcon({
  className: 'custom-map-icon success',
  html: `<div style="background-color: var(--primary); width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 10, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function IpMap({ lat, lng, city, country, ip }: IpMapProps) {
  const center: [number, number] = [lat, lng];

  return (
    <div className="map-wrapper" style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', zIndex: 0 }}>
      <MapContainer
        center={center}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} />
        
        <Marker position={center} icon={customIcon}>
          <Popup>
            <div style={{ padding: '4px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', fontSize: '1.1em' }}>{ip}</strong>
              <span style={{ color: '#64748b' }}>{city}, {country}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
