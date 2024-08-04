"use client";

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';

// Dynamically import the Map component to avoid server-side rendering
const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
    const [fires, setFires] = useState([
        { lat: 50.84673, lon: 4.35247, severity: 1 },
        { lat: 50.84304, lon: 4.35248, severity: 1 }
    ]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                    crossOrigin="" />
            </Head>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossOrigin=""></script>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <text style={{ textAnchor: 'middle' }}>hello, here is a map</text>
            </div>
            <Map fires={fires} />
        </>
    );
}
