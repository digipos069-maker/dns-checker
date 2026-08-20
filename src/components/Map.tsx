'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

// Custom icons using external image URLs for simplicity in Next.js
const iconOptions = {
  iconSize: [25, 41] as [number, number],
  iconAnchor: [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  shadowSize: [41, 41] as [number, number],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
};

const successIcon = new L.Icon({
  ...iconOptions,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
});

const errorIcon = new L.Icon({
  ...iconOptions,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
});

const pendingIcon = new L.Icon({
  ...iconOptions,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
});

function MapInteraction({ selectedServerId, hoveredServerId, servers, markerRefs }: { selectedServerId: string | null, hoveredServerId: string | null, servers: any[], markerRefs: React.MutableRefObject<Record<string, L.Marker>> }) {
  const map = useMap();
  
  // Fly only on click (selectedServerId change)
  useEffect(() => {
    if (selectedServerId) {
      const server = servers.find(s => s.id === selectedServerId);
      if (server) {
        map.flyTo([server.lat, server.lng], map.getZoom(), {
          duration: 1.5
        });
      }
    }
  }, [selectedServerId, servers, map]);

  // Handle popups for both click and hover
  useEffect(() => {
    const targetId = hoveredServerId || selectedServerId;
    if (targetId) {
      // Small timeout to allow flyTo to start without getting interrupted
      setTimeout(() => {
        if (markerRefs.current[targetId]) {
          markerRefs.current[targetId].openPopup();
        }
      }, 50);
    } else {
      map.closePopup();
    }
  }, [hoveredServerId, selectedServerId, markerRefs, map]);
  
  return null;
}

export default function Map({ servers, results, selectedServerId, hoveredServerId }: { servers: any[], results: Record<string, any>, selectedServerId: string | null, hoveredServerId: string | null }) {
  const markerRefs = useRef<Record<string, L.Marker>>({});

  // Fix Leaflet's default icon issue with Webpack/Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer 
      center={[20, 0]} 
      zoom={2} 
      style={{ height: '100%', width: '100%', zIndex: 10 }}
      scrollWheelZoom={false}
      doubleClickZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapInteraction selectedServerId={selectedServerId} hoveredServerId={hoveredServerId} servers={servers} markerRefs={markerRefs} />
      {servers.map((server) => {
        const resState = results[server.id];
        const status = resState?.status || 'pending';
        
        let icon = pendingIcon;
        if (status === 'success') icon = successIcon;
        if (status === 'error') icon = errorIcon;

        return (
          <Marker 
            key={server.id} 
            position={[server.lat, server.lng]} 
            icon={icon}
            ref={(r) => {
              if (r) markerRefs.current[server.id] = r;
            }}
          >
            <Popup>
              <strong>{server.location}</strong><br />
              <span style={{ color: '#64748b' }}>{server.name} ({server.ip})</span><br />
              Status: {status.toUpperCase()}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
