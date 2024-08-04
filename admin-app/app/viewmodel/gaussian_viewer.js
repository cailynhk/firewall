"use client";
import { useEffect, useRef } from 'react';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';

const GaussianViewer = ({ modelPath }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !modelPath) return;

        const renderWidth = 500;
        const renderHeight = 500;

        // Create the renderer
        const renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setSize(renderWidth, renderHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Create the camera
        const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
        camera.position.set(-1, -4, 6);
        camera.up.set(0, -1, -0.6).normalize();
        camera.lookAt(new THREE.Vector3(0, 4, -0));

        // Initialize the viewer
        const viewer = new GaussianSplats3D.Viewer({
            'selfDrivenMode': false,
            'renderer': renderer,
            'camera': camera,
            'useBuiltInControls': true,
            'ignoreDevicePixelRatio': false,
            'gpuAcceleratedSort': true,
            'enableSIMDInSort': true,
            'sharedMemoryForWorkers': true,
            'integerBasedSort': true,
            'halfPrecisionCovariancesOnGPU': true,
            'dynamicScene': false,
            'webXRMode': GaussianSplats3D.WebXRMode.None,
            'renderMode': GaussianSplats3D.RenderMode.OnChange,
            'sceneRevealMode': GaussianSplats3D.SceneRevealMode.Instant,
            'antialiased': false,
            'focalAdjustment': 1.0,
            'logLevel': GaussianSplats3D.LogLevel.None,
            'sphericalHarmonicsDegree': 0,
            'enableOptionalEffects': false,
            'plyInMemoryCompressionLevel': 2,
            'freeIntermediateSplatData': false
        });

        // Add the splat scene
        viewer.addSplatScene(modelPath)
            .then(() => {
                function update() {
                    requestAnimationFrame(update);
                    viewer.update();
                    viewer.render();
                }
                update();
            })
            .catch(error => {
                console.error("Error adding splat scene:", error);
            });

        // Cleanup on unmount
        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, [modelPath]);

    return <div ref={containerRef} style={{ width: '500px', height: '500px' }}></div>;
};

export default GaussianViewer;
