import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    useTheme,
    useMediaQuery,
    Tooltip,
} from '@mui/material';
import {
    GitHub,
    LinkedIn,
    Email,
    KeyboardArrowDown,
} from '@mui/icons-material';
import { Globe3D } from './components';
import { PERSONAL_INFO, scrollToSection } from './utils';

const HeroSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const heroEl = document.getElementById('hero');
            if (!heroEl) return;
            const rect = heroEl.getBoundingClientRect();
            const totalDist = heroEl.offsetHeight - window.innerHeight;
            if (totalDist <= 0) return;
            const scrolled = -rect.top;
            const progress = Math.min(1, Math.max(0, scrolled / totalDist));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('lenis-scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('lenis-scroll', handleScroll);
        };
    }, []);

    return (
        <Box
            component="section"
            id="hero"
            sx={{
                height: { xs: '180vh', md: '230vh' },
                width: '100%',
                position: 'relative',
                background: 'transparent',
            }}
        >
            {/* Sticky 100vh Viewport Wrapper */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    pt: { xs: 8, sm: 10 },
                    pb: { xs: 6, sm: 8 },
                }}
            >
                {/* Subtle cyber background grid lines */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: theme.palette.mode === 'dark'
                            ? 'radial-gradient(rgba(127, 176, 105, 0.08) 1px, transparent 1px)'
                            : 'radial-gradient(rgba(127, 176, 105, 0.15) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        opacity: 0.6,
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />

                <Container
                    maxWidth="md"
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        px: { xs: 2.5, sm: 4 },
                        opacity: Math.max(0, 1 - scrollProgress * 2.2),
                        transform: `translateY(-${scrollProgress * 90}px) scale(${1 - scrollProgress * 0.08})`,
                        filter: `blur(${scrollProgress * 8}px)`,
                        pointerEvents: scrollProgress > 0.4 ? 'none' : 'auto',
                        transition: 'opacity 0.05s linear, transform 0.05s linear, filter 0.05s linear',
                    }}
                >
                {/* 1. Circular Avatar at Top of Globe */}
                <Box
                    sx={{
                        position: 'relative',
                        mb: { xs: 2, sm: 2.5 },
                        animation: 'fadeInDown 0.8s ease-out',
                        '@keyframes fadeInDown': {
                            '0%': { opacity: 0, transform: 'translateY(-20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: 110, sm: 125, md: 135 },
                            height: { xs: 110, sm: 125, md: 135 },
                            borderRadius: '50%',
                            p: '3px',
                            background: 'linear-gradient(135deg, #e07a5f 0%, #7fb069 100%)',
                            boxShadow: '0 0 32px rgba(224, 122, 95, 0.35), 0 0 60px rgba(127, 176, 105, 0.2)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.06) rotate(3deg)',
                                boxShadow: '0 0 45px rgba(224, 122, 95, 0.5), 0 0 80px rgba(127, 176, 105, 0.3)',
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={PERSONAL_INFO.profileImage}
                            alt={PERSONAL_INFO.name}
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                const target = e.currentTarget;
                                if (!target.src.endsWith('/profile-photo.png')) {
                                    target.src = '/profile-photo.png';
                                }
                            }}
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                display: 'block',
                                border: '3px solid #0c100d',
                            }}
                        />
                    </Box>
                </Box>

                {/* 2. Hero Name - Santlaj (Gradient 2-Line Bold Text) */}
                <Typography
                    component="h1"
                    sx={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 900,
                        fontSize: { xs: '3.2rem', sm: '4.8rem', md: '5.8rem', lg: '6.4rem' },
                        lineHeight: 0.95,
                        letterSpacing: '-0.04em',
                        m: 0,
                        textAlign: 'center',
                        userSelect: 'none',
                        background: 'linear-gradient(135deg, #7fb069 15%, #b5df8f 45%, #e07a5f 85%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 2px 24px rgba(127, 176, 105, 0.2))',
                        animation: 'fadeInUp 0.8s ease-out 0.1s both',
                        '@keyframes fadeInUp': {
                            '0%': { opacity: 0, transform: 'translateY(24px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    <Box component="span" sx={{ display: 'block' }}>{PERSONAL_INFO.firstName}</Box>
                    <Box component="span" sx={{ display: 'block' }}>{PERSONAL_INFO.lastName}</Box>
                </Typography>

                {/* 3. Monospace Subtitle Tagline */}
                <Typography
                    sx={{
                        fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace",
                        fontSize: { xs: '0.85rem', sm: '1.05rem', md: '1.18rem' },
                        fontWeight: 500,
                        color: '#e07a5f',
                        mt: { xs: 2, sm: 2.5 },
                        mb: 1.8,
                        letterSpacing: '-0.01em',
                        textShadow: '0 0 16px rgba(224, 122, 95, 0.4)',
                        animation: 'fadeInUp 0.8s ease-out 0.2s both',
                    }}
                >
                    {PERSONAL_INFO.tagline}
                </Typography>

                {/* 4. Location Badge Tag */}
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 0.5,
                        borderRadius: '9999px',
                        border: '1px solid rgba(127, 176, 105, 0.3)',
                        background: 'rgba(127, 176, 105, 0.08)',
                        backdropFilter: 'blur(8px)',
                        color: '#a8d084',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: { xs: '0.72rem', sm: '0.8rem' },
                        fontWeight: 500,
                        mb: { xs: 3, sm: 3.5 },
                        animation: 'fadeInUp 0.8s ease-out 0.25s both',
                    }}
                >
                    <span>{PERSONAL_INFO.locationTag}</span>
                </Box>

                {/* 5. Action Buttons (Pill Shapes) */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 1.5, sm: 2 },
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        mb: 3,
                        animation: 'fadeInUp 0.8s ease-out 0.3s both',
                    }}
                >
                    {/* Primary Button: See What I've Shipped */}
                    <Button
                        variant="contained"
                        onClick={() => scrollToSection('projects-timeline')}
                        sx={{
                            borderRadius: '9999px',
                            px: { xs: 3, sm: 3.5 },
                            py: { xs: 1.1, sm: 1.25 },
                            fontSize: { xs: '0.85rem', sm: '0.92rem' },
                            fontWeight: 700,
                            fontFamily: "'Inter', sans-serif",
                            textTransform: 'none',
                            color: '#0c100d',
                            background: 'linear-gradient(135deg, #7fb069 0%, #e07a5f 100%)',
                            boxShadow: '0 4px 20px rgba(127, 176, 105, 0.35)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 28px rgba(127, 176, 105, 0.5), 0 0 15px rgba(224, 122, 95, 0.4)',
                                background: 'linear-gradient(135deg, #8ad177 0%, #e5876e 100%)',
                            },
                        }}
                    >
                        See What I've Shipped
                    </Button>

                    {/* Secondary Button: Download Resume */}
                    <Button
                        variant="outlined"
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            borderRadius: '9999px',
                            px: { xs: 3, sm: 3.5 },
                            py: { xs: 1.1, sm: 1.25 },
                            fontSize: { xs: '0.85rem', sm: '0.92rem' },
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                            textTransform: 'none',
                            color: '#e5e7eb',
                            border: '1px solid rgba(127, 176, 105, 0.45)',
                            background: 'rgba(12, 16, 13, 0.45)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                borderColor: '#7fb069',
                                background: 'rgba(127, 176, 105, 0.12)',
                                color: '#ffffff',
                                boxShadow: '0 6px 20px rgba(127, 176, 105, 0.25)',
                            },
                        }}
                    >
                        Download Resume
                    </Button>
                </Box>

                {/* 6. Social Links Row */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        animation: 'fadeInUp 0.8s ease-out 0.35s both',
                    }}
                >
                    <Tooltip title="GitHub" arrow>
                        <IconButton
                            href={PERSONAL_INFO.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.75)',
                                p: 1.2,
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: '#7fb069',
                                    background: 'rgba(127, 176, 105, 0.12)',
                                    borderColor: 'rgba(127, 176, 105, 0.4)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <GitHub sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="LinkedIn" arrow>
                        <IconButton
                            href={PERSONAL_INFO.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.75)',
                                p: 1.2,
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: '#7fb069',
                                    background: 'rgba(127, 176, 105, 0.12)',
                                    borderColor: 'rgba(127, 176, 105, 0.4)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <LinkedIn sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Email" arrow>
                        <IconButton
                            href={PERSONAL_INFO.social.email}
                            aria-label="Email"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.75)',
                                p: 1.2,
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: '#e07a5f',
                                    background: 'rgba(224, 122, 95, 0.12)',
                                    borderColor: 'rgba(224, 122, 95, 0.4)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Email sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Container>

            {/* 7. Bottom Chevron Scroll Indicator */}
            <Box
                onClick={() => scrollToSection('about')}
                sx={{
                    position: 'absolute',
                    bottom: { xs: 16, sm: 24 },
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    color: '#7fb069',
                    opacity: Math.max(0, 1 - scrollProgress * 4),
                    pointerEvents: scrollProgress > 0.25 ? 'none' : 'auto',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        opacity: 1,
                        transform: 'translateX(-50%) translateY(3px)',
                    },
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.62rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.5)',
                    }}
                >
                    Keep Going
                </Typography>
                <KeyboardArrowDown
                    sx={{
                        fontSize: 26,
                        animation: 'bounceArrow 2s infinite',
                        filter: 'drop-shadow(0 0 8px rgba(127, 176, 105, 0.6))',
                        '@keyframes bounceArrow': {
                            '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                            '40%': { transform: 'translateY(6px)' },
                            '60%': { transform: 'translateY(3px)' },
                        },
                    }}
                />
            </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;
