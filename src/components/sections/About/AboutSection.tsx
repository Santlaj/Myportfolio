import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    useTheme,
    useMediaQuery,
    Paper,
    Chip,
    Stack,
} from '@mui/material';
import {
    Person,
    Code,
    Timeline,
    AutoAwesome,
} from '@mui/icons-material';
import AboutContent from './AboutContent';
import ProjectsTimeline from './ProjectsTimeline';

const AboutSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="section"
            id="about"
            sx={{
                py: { xs: 8, md: 12 },
                background: 'transparent',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Glowing Section Header Transition Line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(127,176,105,0.3) 20%, #7fb069 50%, rgba(224,122,95,0.3) 80%, transparent 100%)',
                    boxShadow: '0 0 12px rgba(127,176,105,0.6)',
                }}
            />

            {/* Background decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: theme.palette.mode === 'dark'
                        ? `radial-gradient(circle at 25% 25%, ${theme.palette.primary.main} 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, ${theme.palette.secondary.main} 1px, transparent 1px)`
                        : `radial-gradient(circle at 25% 25%, ${theme.palette.primary.main} 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, ${theme.palette.secondary.main} 1px, transparent 1px)`,
                    backgroundSize: '50px 50px, 30px 30px',
                    backgroundPosition: '0 0, 25px 25px',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Enhanced Header Section */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    {/* Section Badge */}
                    <Chip
                        icon={<Person />}
                        label="About Me"
                        variant="outlined"
                        sx={{
                            mb: 3,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            px: 2,
                            py: 0.5,
                            '& .MuiChip-icon': {
                                color: 'primary.main',
                            },
                        }}
                    />

                    {/* Main Title */}
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: isMobile ? '2.5rem' : '3.5rem',
                            fontWeight: 800,
                            mb: 2,
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`
                                : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: 'none',
                            position: 'relative',
                        }}
                    >
                        Get to Know Me
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: 680,
                            mx: 'auto',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            mb: 4,
                            fontSize: { xs: '0.95rem', sm: '1.05rem' },
                        }}
                    >
                        A concise summary of my engineering background, core technical capabilities, and product philosophy.
                    </Typography>
                </Box>

                {/* Content Grid with Enhanced Styling */}
                {/* Content Grid with Enhanced Styling */}
                <Paper
                    elevation={0}
                    sx={{
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(22, 27, 34, 0.75) 0%, rgba(18, 23, 20, 0.85) 100%)'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 245, 240, 0.85) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: theme.palette.mode === 'dark'
                            ? `1px solid ${theme.palette.primary.main}30`
                            : `1px solid ${theme.palette.primary.main}15`,
                        borderRadius: 3,
                        overflow: 'hidden',
                        mb: 6,
                        boxShadow: theme.palette.mode === 'dark'
                            ? `0 20px 40px ${theme.palette.primary.main}15`
                            : `0 20px 40px ${theme.palette.primary.main}10`,
                    }}
                >
                    {/* Terminal window header */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 3,
                            py: 1.5,
                            borderBottom: theme.palette.mode === 'dark'
                                ? `1px solid ${theme.palette.primary.main}20`
                                : `1px solid ${theme.palette.primary.main}15`,
                            background: theme.palette.mode === 'dark'
                                ? 'rgba(12, 16, 13, 0.7)'
                                : 'rgba(240, 240, 240, 0.6)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27c93f' }} />
                            <Typography
                                sx={{
                                    ml: 1.5,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.8rem',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 500,
                                }}
                            >
                                ~/about — profile.tsx
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.75rem',
                                color: theme.palette.primary.main,
                                opacity: 0.8,
                            }}
                        >
                            UTF-8 // TypeScript
                        </Typography>
                    </Box>

                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                        <Grid container>
                            <AboutContent />
                        </Grid>
                    </Box>
                </Paper>

                {/* Projects Showcase Timeline */}
                <ProjectsTimeline />
            </Container>
        </Box>
    );
};

export default AboutSection;
