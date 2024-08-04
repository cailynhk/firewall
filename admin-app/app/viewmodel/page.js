// app/viewmodel/page.js
"use client";

import GaussianViewer from './gaussian_viewer'; // Adjust the import path based on your project structure

const Page = () => {
  // Path to your .ply file
  const modelPath = '/ply/point_cloud.ply';

  const containerStyle = {
    backgroundColor: 'white', // White background
    padding: '20px', // Padding around the viewer
    display: 'flex', // Use flexbox for centering
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Full viewport height
    textAlign: 'center' // Center align the text
  };

  return (
    <div style={containerStyle}>
      <h1>3D Viewer</h1>
      <GaussianViewer modelPath={modelPath} />
    </div>
  );
};

export default Page;
