
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BeatingHeart3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Heart Shape
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo( x + 5, y + 5 );
    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7, x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    const geometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 2,
      bevelSize: 2,
      bevelThickness: 2
    });

    const material = new THREE.MeshPhongMaterial({ 
      color: 0xff4d6d,
      shininess: 100,
      specular: 0x444444
    });

    const heart = new THREE.Mesh(geometry, material);
    heart.rotation.x = Math.PI; // Correct orientation
    heart.position.set(-5, 10, 0); // Center the shape origin
    scene.add(heart);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0xff758f, 0.8);
    backLight.position.set(-20, -20, 10);
    scene.add(backLight);

    // Animation variables
    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.05;

      // Heartbeat pulse effect
      // Two-part beat (lub-dub)
      const beat = Math.pow(Math.sin(time), 2) * Math.exp(-Math.pow(Math.cos(time), 2) * 10);
      const scale = 1 + beat * 0.2;
      heart.scale.set(scale, scale, scale);

      // Gentle rotation
      heart.rotation.y = Math.sin(time * 0.5) * 0.3;
      heart.rotation.z = Math.cos(time * 0.3) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default BeatingHeart3D;
