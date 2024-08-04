"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import FireMarker from './FireMarker';
import 'leaflet/dist/leaflet.css';

export default function Map({ fires }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current === null) {
            mapRef.current = L.map('mapID').setView([50.84673, 4.35247], 12);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            fires.forEach(fire => {
                FireMarker({ lat: fire.lat, lon: fire.lon, severity: fire.severity, map: mapRef.current });
            });
        }
        return () => {
            if (mapRef.current !== null) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [fires]);

    return (
        <div style={{ margin: 'auto', width: '50%' }}>
            <div id="mapID" style={{ height: '400px', width: '600px' }}>
            </div>
        </div>
    );
}
