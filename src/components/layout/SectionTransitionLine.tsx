import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface SectionInfo {
    id: string;
    index: string;
    label: string;
    name: string;
}

const SECTIONS: SectionInfo[] = [
    { id: 'hero', index: '00', label: '// hero', name: 'OVERVIEW' },
    { id: 'about', index: '01', label: '// about', name: 'ABOUT & WORK' },
    { id: 'skills', index: '02', label: '// skills', name: 'SKILLS & STACK' },
    { id: 'certifications', index: '03', label: '// certifications', name: 'CREDENTIALS' },
    { id: 'contact', index: '04', label: '// contact', name: 'CONTACT' },
];

export const SectionTransitionLine: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionInfo>(SECTIONS[0]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [lineProgress, setLineProgress] = useState(0);
    const lastSectionId = useRef('hero');
    const transitionTimer = useRef<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrollPosition = currentScroll + window.innerHeight * 0.42;

            let currentSec = SECTIONS[0];
            for (let i = SECTIONS.length - 1; i >= 0; i--) {
                const el = document.getElementById(SECTIONS[i].id);
                if (el && el.offsetTop <= scrollPosition) {
                    currentSec = SECTIONS[i];
                    break;
                }
            }

            if (currentSec.id !== lastSectionId.current) {
                lastSectionId.current = currentSec.id;
                setActiveSection(currentSec);

                // Trigger glowing horizontal transition line animation
                setIsTransitioning(true);
                setLineProgress(0);

                if (transitionTimer.current) clearTimeout(transitionTimer.current);

                // Fast laser sweep across screen
                const startTime = performance.now();
                const sweepDuration = 700; // ms

                const animateSweep = (now: number) => {
                    const elapsed = now - startTime;
                    const p = Math.min(1, elapsed / sweepDuration);
                    setLineProgress(p);

                    if (p < 1) {
                        requestAnimationFrame(animateSweep);
                    } else {
                        // Keep visible glowing line for a moment, then fade
                        transitionTimer.current = setTimeout(() => {
                            setIsTransitioning(false);
                        }, 1800);
                    }
                };

                requestAnimationFrame(animateSweep);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('lenis-scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('lenis-scroll', handleScroll);
            if (transitionTimer.current) clearTimeout(transitionTimer.current);
        };
    }, []);

    if (!isTransitioning && activeSection.id === 'hero') return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: { xs: 68, md: 76 },
                left: 0,
                right: 0,
                zIndex: 80,
                pointerEvents: 'none',
                opacity: isTransitioning ? 1 : 0.25,
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {/* Luminous Horizontal Laser Line */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(127,176,105,0) 0%, rgba(127,176,105,0.7) 15%, rgba(250,204,21,0.9) 50%, rgba(224,122,95,0.75) 85%, rgba(224,122,95,0) 100%)',
                    boxShadow: isTransitioning
                        ? '0 0 12px rgba(127,176,105,0.85), 0 0 24px rgba(250,204,21,0.5), 0 0 35px rgba(224,122,95,0.4)'
                        : '0 0 6px rgba(127,176,105,0.3)',
                    transform: `scaleX(${isTransitioning ? lineProgress : 1})`,
                    transformOrigin: 'left center',
                    transition: isTransitioning ? 'none' : 'transform 0.4s ease',
                }}
            >
                {/* Leading Photon Flare */}
                {isTransitioning && lineProgress > 0 && lineProgress < 1 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translate(50%, -50%)',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#ffffff',
                            boxShadow: '0 0 16px 4px #a8ff78, 0 0 30px 8px #facc15',
                        }}
                    />
                )}
            </Box>

            {/* Futuristic Section Status Pill Tag attached to the horizontal line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 6,
                    left: { xs: 16, sm: 32, md: 48 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    px: 1.5,
                    py: 0.4,
                    borderRadius: '9999px',
                    bgcolor: 'rgba(12, 16, 13, 0.85)',
                    border: '1px solid rgba(127, 176, 105, 0.35)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(127,176,105,0.2)',
                    opacity: isTransitioning ? 1 : 0,
                    transform: isTransitioning ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Pulsing indicator dot */}
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: '#7fb069',
                        boxShadow: '0 0 8px #7fb069, 0 0 14px #a8ff78',
                        animation: 'pulse 1.5s infinite',
                    }}
                />

                <Typography
                    sx={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#7fb069',
                        letterSpacing: '0.08em',
                        lineHeight: 1,
                    }}
                >
                    [{activeSection.index}] {activeSection.name}
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.62rem',
                        color: 'rgba(255,255,255,0.45)',
                        lineHeight: 1,
                    }}
                >
                    {activeSection.label}
                </Typography>
            </Box>
        </Box>
    );
};

export default SectionTransitionLine;
