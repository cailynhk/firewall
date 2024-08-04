"use client";

import L from 'leaflet';

const myIcon = new L.Icon({
    iconUrl: '/pin.png',
    iconSize: [32, 32]
});

export default function FireMarker({ lat, lon, severity, map }) {
    L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 250
    }).on('click', function() {
        window.location.href = '/viewmodel'; // Updated to use href
    }).addTo(map);

    return null;
}
