import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const SECTIONS = [
    { id: 'hero', label: '// hero' },
    { id: 'about', label: '// about' },
    { id: 'skills', label: '// skills' },
    { id: 'certifications', label: '// certifications' },
    { id: 'contact', label: '// contact' },
];

export const RightScrollIndicator: React.FC = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollPercent(docHeight > 0 ? (currentScroll / docHeight) * 100 : 0);

            const scrollPosition = currentScroll + window.innerHeight * 0.4;
            for (let i = SECTIONS.length - 1; i >= 0; i--) {
                const el = document.getElementById(SECTIONS[i].id);
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(SECTIONS[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('lenis-scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('lenis-scroll', handleScroll);
        };
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                right: { xs: '0.75rem', sm: '1.25rem' },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 60,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}
        >
            {/* Active section label */}
            <Typography
                sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.62rem',
                    color: '#7fb069',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    opacity: 0.85,
                    display: { xs: 'none', md: 'block' },
                    textShadow: '0 0 8px rgba(127, 176, 105, 0.4)',
                }}
            >
                {SECTIONS.find((s) => s.id === activeSection)?.label}
            </Typography>

            {/* Vertical Track Line */}
            <Box
                sx={{
                    position: 'relative',
                    width: 2,
                    height: '45vh',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: `${scrollPercent}%`,
                        background: 'linear-gradient(to bottom, #7fb069, #e07a5f)',
                        borderRadius: 1,
                        transition: 'height 0.1s linear',
                        boxShadow: '0 0 10px #7fb069',
                    }}
                />
            </Box>

            {/* Section Dots */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: '45vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 2,
                }}
            >
                {SECTIONS.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                        <Box
                            key={sec.id}
                            onClick={() => scrollTo(sec.id)}
                            sx={{
                                width: isActive ? 8 : 6,
                                height: isActive ? 8 : 6,
                                borderRadius: '50%',
                                bgcolor: isActive ? '#7fb069' : 'rgba(255, 255, 255, 0.3)',
                                boxShadow: isActive ? '0 0 12px #7fb069, 0 0 4px #a8ff78' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: 'translateX(-2px)',
                                '&:hover': {
                                    bgcolor: '#a8ff78',
                                    transform: 'translateX(-2px) scale(1.4)',
                                },
                            }}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default RightScrollIndicator;
