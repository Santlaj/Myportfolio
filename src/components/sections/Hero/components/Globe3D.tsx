import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

declare global {
    interface Window {
        THREE?: any;
    }
}

interface Globe3DProps {
    isMobile?: boolean;
}

export const Globe3D: React.FC<Globe3DProps> = ({ isMobile = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let isCancelled = false;
        let animationFrameId: number;
        let renderer: any = null;
        let scene: any = null;
        let camera: any = null;
        let globeGroup: any = null;
        let orbit1Group: any = null;
        let orbit2Group: any = null;
        let satellite1: any = null;
        let satellite2: any = null;
        let halo1: any = null;
        let halo2: any = null;
        let pulseRing1: any = null;
        let pulseRing2: any = null;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let autoAngle = 0;
        let sat1Angle = Math.PI * 0.85; // Initial position near top-left
        let sat2Angle = Math.PI * 1.85; // Initial position near bottom-right

        // Helper: Create a glowing circular sprite texture using 2D canvas
        const createGlowTexture = (colorHex: string, innerColorHex = '#ffffff') => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;

            const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
            gradient.addColorStop(0, innerColorHex);
            gradient.addColorStop(0.25, colorHex);
            gradient.addColorStop(0.6, colorHex + '66');
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 128, 128);

            const texture = new window.THREE.CanvasTexture(canvas);
            return texture;
        };

        const initThree = () => {
            if (isCancelled || !canvasRef.current || !containerRef.current) return;
            const THREE = window.THREE;
            if (!THREE) return;

            const width = containerRef.current.clientWidth || (isMobile ? 360 : 700);
            const height = containerRef.current.clientHeight || (isMobile ? 360 : 700);

            // 1. Scene & Camera
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.z = isMobile ? 23 : 20.5;

            // 2. Renderer
            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // 3. Globe Parent Group
            globeGroup = new THREE.Group();
            scene.add(globeGroup);

            const radius = 6.4;

            // 4. Geodesic Wireframe Sphere
            const geo = new THREE.IcosahedronGeometry(radius, 3);
            const wireGeo = new THREE.WireframeGeometry(geo);
            const wireMat = new THREE.LineBasicMaterial({
                color: 0x7fb069,
                transparent: true,
                opacity: 0.34,
                blending: THREE.AdditiveBlending,
            });
            const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
            globeGroup.add(wireMesh);

            // 5. Particles on vertices
            const pointsMat = new THREE.PointsMaterial({
                color: 0xa8ff78,
                size: isMobile ? 0.14 : 0.16,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(geo, pointsMat);
            globeGroup.add(particles);

            // 6. Latitude circles for tech-grid globe feel
            const latHeights = [-5.0, -3.2, -1.6, 0, 1.6, 3.2, 5.0];
            const latMat = new THREE.LineBasicMaterial({
                color: 0x8fe872,
                transparent: true,
                opacity: 0.24,
                blending: THREE.AdditiveBlending,
            });
            latHeights.forEach((y) => {
                const r = Math.sqrt(Math.max(0, radius * radius - y * y));
                const points = [];
                const segments = 64;
                for (let i = 0; i <= segments; i++) {
                    const theta = (i / segments) * Math.PI * 2;
                    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
                }
                const circleGeo = new THREE.BufferGeometry().setFromPoints(points);
                const circleLine = new THREE.Line(circleGeo, latMat);
                globeGroup.add(circleLine);
            });

            // 7. Inner occlusion sphere for true 3D depth
            const innerSphereGeo = new THREE.SphereGeometry(radius * 0.985, 36, 36);
            const innerSphereMat = new THREE.MeshBasicMaterial({
                color: 0x0c100d,
                transparent: true,
                opacity: 0.82,
            });
            const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
            globeGroup.add(innerSphere);

            // 8. Orbit 1 with Glowing Satellite (Coral/Orange & Green)
            orbit1Group = new THREE.Group();
            orbit1Group.rotation.x = 1.05;
            orbit1Group.rotation.z = -0.38;
            scene.add(orbit1Group);

            const orbit1Radius = 8.5;
            const orbit1Points = [];
            const orbitSegments = 100;
            for (let i = 0; i <= orbitSegments; i++) {
                const theta = (i / orbitSegments) * Math.PI * 2;
                orbit1Points.push(new THREE.Vector3(Math.cos(theta) * orbit1Radius, Math.sin(theta) * orbit1Radius, 0));
            }
            const orbit1Geo = new THREE.BufferGeometry().setFromPoints(orbit1Points);
            const orbit1Mat = new THREE.LineBasicMaterial({
                color: 0xe07a5f,
                transparent: true,
                opacity: 0.5,
                blending: THREE.AdditiveBlending,
            });
            const orbit1Line = new THREE.Line(orbit1Geo, orbit1Mat);
            orbit1Group.add(orbit1Line);

            // Satellite 1 Beacon
            satellite1 = new THREE.Group();
            const sat1Mesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.24, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0xa8ff78 })
            );
            satellite1.add(sat1Mesh);

            const glowTex1 = createGlowTexture('#7fb069', '#a8ff78');
            if (glowTex1) {
                const spriteMat1 = new THREE.SpriteMaterial({
                    map: glowTex1,
                    transparent: true,
                    opacity: 0.9,
                    blending: THREE.AdditiveBlending,
                });
                halo1 = new THREE.Sprite(spriteMat1);
                halo1.scale.set(2.2, 2.2, 1);
                satellite1.add(halo1);
            }

            // Pulse ring around beacon 1
            const ringGeo1 = new THREE.RingGeometry(0.35, 0.42, 32);
            const ringMat1 = new THREE.MeshBasicMaterial({
                color: 0xa8ff78,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
            });
            pulseRing1 = new THREE.Mesh(ringGeo1, ringMat1);
            satellite1.add(pulseRing1);

            orbit1Group.add(satellite1);

            // 9. Orbit 2 with Glowing Satellite (Neon Lime/Emerald)
            orbit2Group = new THREE.Group();
            orbit2Group.rotation.x = -0.85;
            orbit2Group.rotation.y = 0.45;
            scene.add(orbit2Group);

            const orbit2Radius = 8.1;
            const orbit2Points = [];
            for (let i = 0; i <= orbitSegments; i++) {
                const theta = (i / orbitSegments) * Math.PI * 2;
                orbit2Points.push(new THREE.Vector3(Math.cos(theta) * orbit2Radius, Math.sin(theta) * orbit2Radius, 0));
            }
            const orbit2Geo = new THREE.BufferGeometry().setFromPoints(orbit2Points);
            const orbit2Mat = new THREE.LineBasicMaterial({
                color: 0x7fb069,
                transparent: true,
                opacity: 0.42,
                blending: THREE.AdditiveBlending,
            });
            const orbit2Line = new THREE.Line(orbit2Geo, orbit2Mat);
            orbit2Group.add(orbit2Line);

            // Satellite 2 Beacon
            satellite2 = new THREE.Group();
            const sat2Mesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.22, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x66ff88 })
            );
            satellite2.add(sat2Mesh);

            const glowTex2 = createGlowTexture('#85e368', '#b5ff99');
            if (glowTex2) {
                const spriteMat2 = new THREE.SpriteMaterial({
                    map: glowTex2,
                    transparent: true,
                    opacity: 0.95,
                    blending: THREE.AdditiveBlending,
                });
                halo2 = new THREE.Sprite(spriteMat2);
                halo2.scale.set(2.0, 2.0, 1);
                satellite2.add(halo2);
            }

            const ringGeo2 = new THREE.RingGeometry(0.32, 0.38, 32);
            const ringMat2 = new THREE.MeshBasicMaterial({
                color: 0x66ff88,
                transparent: true,
                opacity: 0.65,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
            });
            pulseRing2 = new THREE.Mesh(ringGeo2, ringMat2);
            satellite2.add(pulseRing2);

            orbit2Group.add(satellite2);

            // 10. Ambient Floating Cyber-Dust Particles (120 particles)
            const starGeo = new THREE.BufferGeometry();
            const starCount = 120;
            const starPositions = new Float32Array(starCount * 3);
            for (let i = 0; i < starCount * 3; i += 3) {
                starPositions[i] = (Math.random() - 0.5) * 35;
                starPositions[i + 1] = (Math.random() - 0.5) * 35;
                starPositions[i + 2] = (Math.random() - 0.5) * 20;
            }
            starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
            const starMat = new THREE.PointsMaterial({
                color: 0x7fb069,
                size: 0.08,
                transparent: true,
                opacity: 0.45,
                blending: THREE.AdditiveBlending,
            });
            const starPoints = new THREE.Points(starGeo, starMat);
            scene.add(starPoints);

            // 11. Mouse Movement Listener
            const onMouseMove = (e: MouseEvent) => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                } else {
                    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                }
            };
            window.addEventListener('mousemove', onMouseMove, { passive: true });

            // 12. Resize Listener
            const onResize = () => {
                if (!containerRef.current || !renderer || !camera) return;
                const newWidth = containerRef.current.clientWidth || (isMobile ? 360 : 700);
                const newHeight = containerRef.current.clientHeight || (isMobile ? 360 : 700);
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            };
            window.addEventListener('resize', onResize);

            // 13. Animation Loop
            let time = 0;
            const animate = () => {
                if (isCancelled) return;
                animationFrameId = requestAnimationFrame(animate);
                time += 0.02;

                // Auto rotate globe
                autoAngle += 0.0018;

                // Mouse smoothing lerp
                targetX += (mouseY * 0.35 - targetX) * 0.04;
                targetY += (mouseX * 0.45 - targetY) * 0.04;

                globeGroup.rotation.x = targetX + Math.sin(time * 0.5) * 0.03;
                globeGroup.rotation.y = autoAngle + targetY;

                // Satellites orbiting
                sat1Angle += 0.0075;
                if (satellite1) {
                    satellite1.position.x = Math.cos(sat1Angle) * orbit1Radius;
                    satellite1.position.y = Math.sin(sat1Angle) * orbit1Radius;
                    if (halo1) {
                        const pulseScale = 2.2 + Math.sin(time * 3) * 0.3;
                        halo1.scale.set(pulseScale, pulseScale, 1);
                    }
                    if (pulseRing1) {
                        const ringScale = 1 + ((time * 1.5) % 1) * 0.8;
                        pulseRing1.scale.set(ringScale, ringScale, 1);
                        pulseRing1.material.opacity = 0.8 * (1 - ((time * 1.5) % 1));
                    }
                }

                sat2Angle += 0.0055;
                if (satellite2) {
                    satellite2.position.x = Math.cos(sat2Angle) * orbit2Radius;
                    satellite2.position.y = Math.sin(sat2Angle) * orbit2Radius;
                    if (halo2) {
                        const pulseScale = 2.0 + Math.cos(time * 2.8) * 0.25;
                        halo2.scale.set(pulseScale, pulseScale, 1);
                    }
                    if (pulseRing2) {
                        const ringScale = 1 + ((time * 1.2 + 0.5) % 1) * 0.8;
                        pulseRing2.scale.set(ringScale, ringScale, 1);
                        pulseRing2.material.opacity = 0.8 * (1 - ((time * 1.2 + 0.5) % 1));
                    }
                }

                // Slow starfield rotation
                starPoints.rotation.y += 0.0004;

                renderer.render(scene, camera);
            };

            animate();

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('resize', onResize);
            };
        };

        // If window.THREE is available, initialize right away; otherwise load/poll
        let pollTimer: any = null;
        if (window.THREE) {
            initThree();
        } else {
            if (typeof document !== 'undefined' && !document.querySelector('script[data-threejs]')) {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
                script.async = true;
                script.setAttribute('data-threejs', 'true');
                script.onload = () => {
                    if (!isCancelled) initThree();
                };
                document.head.appendChild(script);
            }
            let attempts = 0;
            const checkThree = () => {
                attempts++;
                if (window.THREE) {
                    initThree();
                } else if (attempts < 60 && !isCancelled) {
                    pollTimer = setTimeout(checkThree, 100);
                }
            };
            checkThree();
        }

        return () => {
            isCancelled = true;
            if (pollTimer) clearTimeout(pollTimer);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (renderer) {
                renderer.dispose();
                if (renderer.domElement && renderer.domElement.parentNode) {
                    // Renderer cleanup
                }
            }
        };
    }, [isMobile]);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 380, sm: 540, md: 740, lg: 820 },
                height: { xs: 380, sm: 540, md: 740, lg: 820 },
                pointerEvents: 'none',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Ambient Radial Glow Behind Globe */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '75%',
                    height: '75%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(127, 176, 105, 0.22) 0%, rgba(224, 122, 95, 0.08) 45%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: 0,
                    animation: 'pulseGlow 6s ease-in-out infinite alternate',
                    '@keyframes pulseGlow': {
                        '0%': { transform: 'scale(0.92)', opacity: 0.7 },
                        '100%': { transform: 'scale(1.08)', opacity: 1 },
                    },
                }}
            />
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1,
                }}
            />
        </Box>
    );
};

export default Globe3D;
