import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

declare global {
    interface Window {
        THREE?: any;
    }
}

export const ThreeScene3D: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let isCancelled = false;
        let animationFrameId: number;
        let renderer: any = null;
        let scene: any = null;
        let camera: any = null;

        // 3D Object Groups
        let globeGroup: any = null;
        let shapesGroup: any = null;
        let gridFloor: any = null;
        let matrixPoints: any = null;
        let matrixBasePositions: Float32Array | null = null;
        let matrixPointCount = 0;
        let cyberParticles: any = null;


        // Floating wireframe shapes
        let torusKnot: any = null;
        let torusRing: any = null;
        let octahedron: any = null;
        let icosahedron: any = null;
        let dodecahedron: any = null;

        // Globe components
        let orbit1Group: any = null;
        let orbit2Group: any = null;
        let satellite1: any = null;
        let satellite2: any = null;
        let halo1: any = null;
        let halo2: any = null;

        // Interaction state
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let scrollY = 0;
        let targetScrollY = 0;

        let autoAngle = 0;
        let sat1Angle = Math.PI * 0.85;
        let sat2Angle = Math.PI * 1.85;

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

            return new window.THREE.CanvasTexture(canvas);
        };

        const initThree = () => {
            if (isCancelled || !canvasRef.current || !containerRef.current) return;
            const THREE = window.THREE;
            if (!THREE) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            // 1. Scene & Camera
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.set(0, 0, 20.5);

            // 2. Renderer
            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // ==========================================
            // 3. HERO 3D GLOBE WITH BRAZIL-BERMUDA ARC
            // ==========================================
            globeGroup = new THREE.Group();
            scene.add(globeGroup);

            const radius = 6.4;

            // High-density Geodesic Wireframe Sphere (Detail = 4)
            const geo = new THREE.IcosahedronGeometry(radius, 4);
            const wireGeo = new THREE.WireframeGeometry(geo);
            const wireMat = new THREE.LineBasicMaterial({
                color: 0x7fb069,
                transparent: true,
                opacity: 0.35,
                blending: THREE.AdditiveBlending,
            });
            const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
            globeGroup.add(wireMesh);

            // Glowing vertex points on sphere
            const pointsMat = new THREE.PointsMaterial({
                color: 0xa8ff78,
                size: 0.14,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending,
            });
            const particles = new THREE.Points(geo, pointsMat);
            globeGroup.add(particles);

            // Ambient interior & surface sparkles (gold and green speckles)
            const speckleCount = 400;
            const specklePositions = new Float32Array(speckleCount * 3);
            const speckleColors = new Float32Array(speckleCount * 3);
            for (let i = 0; i < speckleCount; i++) {
                const u = Math.random();
                const v = Math.random();
                const theta = u * 2.0 * Math.PI;
                const phi = Math.acos(2.0 * v - 1.0);
                const r = radius * (0.92 + Math.random() * 0.1);
                const sinPhi = Math.sin(phi);
                specklePositions[i * 3] = r * sinPhi * Math.cos(theta);
                specklePositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
                specklePositions[i * 3 + 2] = r * Math.cos(phi);

                // Alternating green / coral-orange
                if (Math.random() > 0.4) {
                    speckleColors[i * 3] = 0.5; // G
                    speckleColors[i * 3 + 1] = 0.85;
                    speckleColors[i * 3 + 2] = 0.4;
                } else {
                    speckleColors[i * 3] = 0.88; // Coral
                    speckleColors[i * 3 + 1] = 0.48;
                    speckleColors[i * 3 + 2] = 0.37;
                }
            }
            const speckleGeo = new THREE.BufferGeometry();
            speckleGeo.setAttribute('position', new THREE.BufferAttribute(specklePositions, 3));
            speckleGeo.setAttribute('color', new THREE.BufferAttribute(speckleColors, 3));
            const speckleMat = new THREE.PointsMaterial({
                size: 0.16,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending,
            });
            const speckles = new THREE.Points(speckleGeo, speckleMat);
            globeGroup.add(speckles);

            // Latitude rings for spatial depth
            const latHeights = [-5.2, -3.4, -1.7, 0, 1.7, 3.4, 5.2];
            const latMat = new THREE.LineBasicMaterial({
                color: 0x8fe872,
                transparent: true,
                opacity: 0.22,
                blending: THREE.AdditiveBlending,
            });
            latHeights.forEach((y) => {
                const r = Math.sqrt(Math.max(0, radius * radius - y * y));
                const pts = [];
                for (let i = 0; i <= 64; i++) {
                    const theta = (i / 64) * Math.PI * 2;
                    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
                }
                const circleGeo = new THREE.BufferGeometry().setFromPoints(pts);
                globeGroup.add(new THREE.Line(circleGeo, latMat));
            });

            // Inner dark occlusion sphere for true 3D volumetric depth
            const innerSphereGeo = new THREE.SphereGeometry(radius * 0.985, 36, 36);
            const innerSphereMat = new THREE.MeshBasicMaterial({
                color: 0x0c100d,
                transparent: true,
                opacity: 0.86,
            });
            globeGroup.add(new THREE.Mesh(innerSphereGeo, innerSphereMat));

            // Orbit 1 with Satellite Beacon (Orange/Coral)
            orbit1Group = new THREE.Group();
            orbit1Group.rotation.x = 1.05;
            orbit1Group.rotation.z = -0.38;
            scene.add(orbit1Group);

            const orbit1Radius = 8.5;
            const orbit1Points = [];
            for (let i = 0; i <= 100; i++) {
                const theta = (i / 100) * Math.PI * 2;
                orbit1Points.push(new THREE.Vector3(Math.cos(theta) * orbit1Radius, Math.sin(theta) * orbit1Radius, 0));
            }
            const orbit1Line = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(orbit1Points),
                new THREE.LineBasicMaterial({ color: 0xe07a5f, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending })
            );
            orbit1Group.add(orbit1Line);

            satellite1 = new THREE.Group();
            satellite1.add(new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), new THREE.MeshBasicMaterial({ color: 0xa8ff78 })));
            const glowTex1 = createGlowTexture('#7fb069', '#a8ff78');
            if (glowTex1) {
                halo1 = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex1, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
                halo1.scale.set(2.2, 2.2, 1);
                satellite1.add(halo1);
            }
            orbit1Group.add(satellite1);

            // Orbit 2 with Satellite Beacon (Green)
            orbit2Group = new THREE.Group();
            orbit2Group.rotation.x = -0.85;
            orbit2Group.rotation.y = 0.45;
            scene.add(orbit2Group);

            const orbit2Radius = 8.1;
            const orbit2Points = [];
            for (let i = 0; i <= 100; i++) {
                const theta = (i / 100) * Math.PI * 2;
                orbit2Points.push(new THREE.Vector3(Math.cos(theta) * orbit2Radius, Math.sin(theta) * orbit2Radius, 0));
            }
            const orbit2Line = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(orbit2Points),
                new THREE.LineBasicMaterial({ color: 0x7fb069, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending })
            );
            orbit2Group.add(orbit2Line);

            satellite2 = new THREE.Group();
            satellite2.add(new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), new THREE.MeshBasicMaterial({ color: 0x66ff88 })));
            const glowTex2 = createGlowTexture('#85e368', '#b5ff99');
            if (glowTex2) {
                halo2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex2, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
                halo2.scale.set(2.0, 2.0, 1);
                satellite2.add(halo2);
            }
            orbit2Group.add(satellite2);

            // ==========================================
            // 4. 3D CYBER GRID FLOOR (ABOUT & PROJECTS)
            // ==========================================
            const gridHelper = new THREE.GridHelper(90, 45, 0x7fb069, 0x1f3b23);
            gridHelper.position.y = -8.5;
            gridHelper.material.transparent = true;
            gridHelper.material.opacity = 0.38;
            gridHelper.material.blending = THREE.AdditiveBlending;
            gridFloor = gridHelper;
            scene.add(gridFloor);

            // ==========================================
            // 5. SIGNATURE FLOATING 3D WIREFRAME GEOMETRIES
            // ==========================================
            shapesGroup = new THREE.Group();
            shapesGroup.visible = false;
            scene.add(shapesGroup);

            // Shape 1: Torus Knot (Green) - Top Left
            const tkGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 64, 16);
            torusKnot = new THREE.LineSegments(
                new THREE.WireframeGeometry(tkGeo),
                new THREE.LineBasicMaterial({ color: 0x7fb069, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending })
            );
            torusKnot.position.set(-11.5, 3.5, -4);
            shapesGroup.add(torusKnot);

            // Shape 2: Torus Ring (Orange) - Top Right
            const trGeo = new THREE.TorusGeometry(1.8, 0.45, 20, 48);
            torusRing = new THREE.LineSegments(
                new THREE.WireframeGeometry(trGeo),
                new THREE.LineBasicMaterial({ color: 0xe07a5f, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending })
            );
            torusRing.position.set(11.5, 4.0, -5);
            shapesGroup.add(torusRing);

            // Shape 3: Octahedron (Green/Emerald) - Bottom Left
            const octGeo = new THREE.OctahedronGeometry(1.8, 0);
            octahedron = new THREE.LineSegments(
                new THREE.WireframeGeometry(octGeo),
                new THREE.LineBasicMaterial({ color: 0x7fb069, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending })
            );
            octahedron.position.set(-10, -4.5, -3);
            shapesGroup.add(octahedron);

            // Shape 4: Icosahedron (Coral/Copper) - Bottom Right
            const icoGeo = new THREE.IcosahedronGeometry(2.0, 0);
            icosahedron = new THREE.LineSegments(
                new THREE.WireframeGeometry(icoGeo),
                new THREE.LineBasicMaterial({ color: 0xe07a5f, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending })
            );
            icosahedron.position.set(11, -5, -3);
            shapesGroup.add(icosahedron);

            // Shape 5: Dodecahedron (Gold) - Base Center
            const dodGeo = new THREE.DodecahedronGeometry(1.4, 0);
            dodecahedron = new THREE.LineSegments(
                new THREE.WireframeGeometry(dodGeo),
                new THREE.LineBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending })
            );
            dodecahedron.position.set(-6, -2, -6);
            shapesGroup.add(dodecahedron);




            // ==========================================
            // 6. 3D SPATIAL DUST CONSTELLATIONS (PROJECTS TILL LAST)
            // ==========================================
            // 7 columns x 4 rows of spaced 3D particle dust nodes in deep space
            // PURE WARM GOLDEN AMBER stardust clouds matching bernardomoschen.dev
            // (Does NOT spell "BM" - pure aesthetic cosmic stardust)
            const matrixPointsList: number[] = [];
            const matrixColorsList: number[] = [];

            for (let c = 0; c < 7; c++) {
                for (let r = 0; r < 4; r++) {
                    const cx = (c - 3) * 5.6;
                    const cy = (1.5 - r) * 3.8;
                    const cz = -13.5;

                    // 38 delicate stardust particles per cloud
                    for (let k = 0; k < 38; k++) {
                        matrixPointsList.push(
                            cx + (Math.random() - 0.5) * 1.8,
                            cy + (Math.random() - 0.5) * 1.4,
                            cz + (Math.random() - 0.5) * 1.3
                        );

                        // Warm golden amber celestial glow (#f5b941 / #e9c46a / #ffaa33)
                        const goldVariation = Math.random();
                        if (goldVariation > 0.6) {
                            matrixColorsList.push(0.96, 0.78, 0.22); // Honey gold
                        } else if (goldVariation > 0.25) {
                            matrixColorsList.push(0.92, 0.68, 0.26); // Warm amber
                        } else {
                            matrixColorsList.push(0.88, 0.55, 0.28); // Sunset copper
                        }
                    }
                }
            }

            matrixPointCount = matrixPointsList.length / 3;
            matrixBasePositions = new Float32Array(matrixPointsList);

            const matrixGeo = new THREE.BufferGeometry();
            matrixGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(matrixPointsList), 3));
            matrixGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(matrixColorsList), 3));

            const matrixMat = new THREE.PointsMaterial({
                size: 0.085,
                vertexColors: true,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });

            matrixPoints = new THREE.Points(matrixGeo, matrixMat);
            matrixPoints.visible = false;
            scene.add(matrixPoints);

            // 8. Ambient Cyber Dust Particles
            const starGeo = new THREE.BufferGeometry();
            const starCount = 240;
            const starPositions = new Float32Array(starCount * 3);
            for (let i = 0; i < starCount * 3; i += 3) {
                starPositions[i] = (Math.random() - 0.5) * 45;
                starPositions[i + 1] = (Math.random() - 0.5) * 45;
                starPositions[i + 2] = (Math.random() - 0.5) * 25;
            }
            starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
            cyberParticles = new THREE.Points(
                starGeo,
                new THREE.PointsMaterial({
                    color: 0x7fb069,
                    size: 0.1,
                    transparent: true,
                    opacity: 0.45,
                    blending: THREE.AdditiveBlending,
                })
            );
            scene.add(cyberParticles);

            // Event Listeners
            const onMouseMove = (e: MouseEvent) => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            };

            const onScroll = () => {
                targetScrollY = window.scrollY;
            };

            const onLenisScroll = (e: any) => {
                if (e.detail && typeof e.detail.scroll === 'number') {
                    targetScrollY = e.detail.scroll;
                }
            };

            const onResize = () => {
                if (!renderer || !camera) return;
                const newWidth = window.innerWidth;
                const newHeight = window.innerHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            };

            window.addEventListener('mousemove', onMouseMove, { passive: true });
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('lenis-scroll', onLenisScroll, { passive: true });
            window.addEventListener('resize', onResize);

            // ==========================================
            // 9. ANIMATION RENDER LOOP
            // ==========================================
            let time = 0;
            const animate = () => {
                if (isCancelled) return;
                animationFrameId = requestAnimationFrame(animate);
                time += 0.02;

                // Smooth scroll damping
                scrollY += (targetScrollY - scrollY) * 0.06;

                // Mouse smoothing
                targetX += (mouseY * 0.35 - targetX) * 0.04;
                targetY += (mouseX * 0.45 - targetY) * 0.04;

                autoAngle += 0.0018;

                // ==========================================
                // 3D CAMERA SCROLLYTELLING TRAJECTORY
                // ==========================================
                // Hero: Camera at (0, 0, 20.5), pitch 0
                // About & Projects: Camera smoothly glides forward to z=18.7, drops to y=-1.8, pitches down -0.08 rad
                const camProg = Math.min(1, Math.max(0, (scrollY - 1600) / 2000));
                const targetCamZ = 20.5 - camProg * 1.8;
                const targetCamY = -camProg * 1.8;
                const targetCamPitch = -camProg * 0.08;

                camera.position.z += (targetCamZ - camera.position.z) * 0.06;
                camera.position.y += (targetCamY - camera.position.y) * 0.06;
                camera.rotation.x += (targetCamPitch - camera.rotation.x) * 0.06;

                // ==========================================
                // HERO GLOBE SCROLLYTELLING (0 - 2600px)
                // ==========================================
                if (globeGroup) {
                    // Globe stays active through the entire Hero sticky scrollytelling track (~2400px)
                    const heroFade = Math.max(0, 1 - Math.max(0, (scrollY - 1800) / 900));
                    globeGroup.visible = heroFade > 0.005;

                    if (globeGroup.visible) {
                        const globeShrink = 1 - Math.min(0.35, Math.max(0, (scrollY - 1000) / 2600));
                        globeGroup.scale.setScalar(globeShrink * Math.min(1, heroFade * 1.2));
                        globeGroup.position.y = -Math.min(5, Math.max(0, (scrollY - 1400) * 0.004));

                        // User scroll drives rotational momentum on the globe matching live site
                        globeGroup.rotation.y = autoAngle + targetY + scrollY * 0.0016;
                        globeGroup.rotation.x = targetX + Math.sin(time * 0.5) * 0.03 + scrollY * 0.0003;
                    }

                    if (orbit1Group) {
                        orbit1Group.visible = globeGroup.visible;
                        if (orbit1Group.visible) {
                            orbit1Group.position.copy(globeGroup.position);
                            orbit1Group.scale.copy(globeGroup.scale);
                        }
                    }
                    if (orbit2Group) {
                        orbit2Group.visible = globeGroup.visible;
                        if (orbit2Group.visible) {
                            orbit2Group.position.copy(globeGroup.position);
                            orbit2Group.scale.copy(globeGroup.scale);
                        }
                    }
                }

                // Orbit satellites
                sat1Angle += 0.0075 + (targetScrollY !== scrollY ? 0.005 : 0);
                if (satellite1) {
                    satellite1.position.x = Math.cos(sat1Angle) * orbit1Radius;
                    satellite1.position.y = Math.sin(sat1Angle) * orbit1Radius;
                    if (halo1) {
                        const s = 2.2 + Math.sin(time * 3) * 0.3;
                        halo1.scale.set(s, s, 1);
                    }
                }

                sat2Angle += 0.0055 + (targetScrollY !== scrollY ? 0.004 : 0);
                if (satellite2) {
                    satellite2.position.x = Math.cos(sat2Angle) * orbit2Radius;
                    satellite2.position.y = Math.sin(sat2Angle) * orbit2Radius;
                    if (halo2) {
                        const s = 2.0 + Math.cos(time * 2.8) * 0.25;
                        halo2.scale.set(s, s, 1);
                    }
                }


                // ==========================================
                // 3D CYBER GRID FLOOR (ABOUT & PROJECTS)
                // ==========================================
                // Fades in as we leave Hero (scrollY > 1600px) and glides infinitely forward
                if (gridFloor) {
                    const gridFade = Math.min(1, Math.max(0, (scrollY - 1500) / 800));
                    gridFloor.position.z = (scrollY * 0.015) % 4; // Infinite forward gliding
                    gridFloor.material.opacity = gridFade * 0.42;
                    gridFloor.visible = gridFade > 0.01;
                }

                // ==========================================
                // FLOATING WIREFRAME GEOMETRIES SLIDE-IN
                // (Trigger: Appears as About section is ending & transitions into Projects)
                // ==========================================
                if (shapesGroup) {
                    const aboutEl = document.getElementById('about');
                    const nextEl = document.getElementById('skills') || document.getElementById('projects');
                    const certsEl = document.getElementById('certifications');

                    let aboutEnd = 4800;
                    if (nextEl) {
                        aboutEnd = nextEl.offsetTop;
                    } else if (aboutEl) {
                        aboutEnd = aboutEl.offsetTop + aboutEl.offsetHeight;
                    }

                    let nextSectionEnd = aboutEnd + 3500;
                    if (certsEl) {
                        nextSectionEnd = certsEl.offsetTop;
                    } else if (nextEl) {
                        nextSectionEnd = aboutEnd + nextEl.offsetHeight;
                    }

                    // Starts fading in as user approaches the end of About section
                    const fadeInStart = aboutEnd - window.innerHeight * 0.95;
                    const fadeInEnd = aboutEnd - window.innerHeight * 0.2;
                    const fadeIn = Math.min(1, Math.max(0, (scrollY - fadeInStart) / Math.max(1, fadeInEnd - fadeInStart)));

                    // Fades out gracefully past Skills / Projects (as Certifications / Contact approaches)
                    const fadeOut = Math.max(0, Math.min(1, 1 - (scrollY - nextSectionEnd) / 900));

                    const shapesFade = fadeIn * fadeOut;

                    shapesGroup.visible = shapesFade > 0.01;
                    shapesGroup.scale.setScalar(Math.max(0.01, shapesFade));

                    if (shapesGroup.visible) {
                        if (torusKnot) {
                            torusKnot.position.x = -15 + shapesFade * 3.5;
                            torusKnot.rotation.x += 0.006;
                            torusKnot.rotation.y += 0.008;
                            torusKnot.position.y = 3.5 + Math.sin(time * 0.8) * 0.5;
                        }
                        if (torusRing) {
                            torusRing.position.x = 15 - shapesFade * 3.5;
                            torusRing.rotation.x += 0.008;
                            torusRing.rotation.z += 0.005;
                            torusRing.position.y = 4.0 + Math.cos(time * 0.7) * 0.6;
                        }
                        if (octahedron) {
                            octahedron.position.x = -13 + shapesFade * 3.0;
                            octahedron.rotation.y += 0.01;
                            octahedron.rotation.z += 0.007;
                            octahedron.position.y = -4.5 + Math.sin(time + 1) * 0.4;
                        }
                        if (icosahedron) {
                            icosahedron.position.x = 14 - shapesFade * 3.0;
                            icosahedron.rotation.x += 0.007;
                            icosahedron.rotation.y += 0.009;
                            icosahedron.position.y = -5.0 + Math.cos(time * 0.9) * 0.5;
                        }
                        if (dodecahedron) {
                            dodecahedron.rotation.y += 0.008;
                            dodecahedron.rotation.x += 0.005;
                        }
                    }
                }


                // ==========================================
                // 3D SPATIAL DUST CONSTELLATIONS: VISIBLE FROM PROJECTS TILL LAST
                // ==========================================
                if (matrixPoints && matrixBasePositions) {
                    const projectsTimelineEl = document.getElementById('projects-timeline');
                    const skillsEl = document.getElementById('skills') || document.getElementById('projects');

                    let projectsStart = 2600;
                    if (projectsTimelineEl) {
                        projectsStart = projectsTimelineEl.offsetTop - window.innerHeight * 0.8;
                    } else if (skillsEl) {
                        projectsStart = skillsEl.offsetTop - window.innerHeight * 0.9;
                    }

                    // Fades in smoothly as Projects section starts, and stays visible till the end of the page
                    const matrixFade = Math.min(1, Math.max(0, (scrollY - projectsStart) / 400));
                    matrixPoints.material.opacity = matrixFade * 0.65; // Rich golden celestial dust
                    matrixPoints.visible = matrixFade > 0.01;

                    if (matrixPoints.visible) {
                        // Gentle, calm breathing drift (non-distracting)
                        const posAttr = matrixPoints.geometry.attributes.position;
                        const arr = posAttr.array;
                        for (let i = 0; i < matrixPointCount; i++) {
                            const bx = matrixBasePositions[i * 3];
                            const by = matrixBasePositions[i * 3 + 1];
                            const bz = matrixBasePositions[i * 3 + 2];
                            arr[i * 3 + 2] = bz + Math.sin(time * 0.6 + bx * 0.2 + by * 0.2) * 0.28;
                        }
                        posAttr.needsUpdate = true;

                        // Subtle parallax reaction to mouse
                        matrixPoints.rotation.y = targetY * 0.04 + Math.sin(time * 0.15) * 0.01;
                        matrixPoints.rotation.x = -targetX * 0.03;
                    }
                }

                // Cyber dust drift
                if (cyberParticles) {
                    cyberParticles.rotation.y += 0.0005;
                }

                renderer.render(scene, camera);
            };

            animate();

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('lenis-scroll', onLenisScroll);
                window.removeEventListener('resize', onResize);
            };
        };

        // If window.THREE is available, initialize right away; otherwise poll
        let pollTimer: any = null;
        if (window.THREE) {
            initThree();
        } else {
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
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
                // Subtle radial green atmosphere glow behind the globe, matching bernardomoschen.dev
                background: 'radial-gradient(circle at 50% 48%, rgba(127, 176, 105, 0.15) 0%, rgba(12, 16, 13, 0.95) 60%, #0c100d 100%)',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
            />
        </Box>
    );
};

export default ThreeScene3D;
