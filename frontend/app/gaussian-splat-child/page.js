"use client";

import { useState, useEffect } from 'react';

export default function GaussianSplatChildPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/run_command')
      .then((response) => response.json())  // Now it expects a JSON response
      .then((result) => {
        setData(result.output);  // Access the 'output' field in the JSON
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Output from Server</h1>
      <pre>{data}</pre>
    </div>
  );
}
