import React from 'react';
import {
    Grid,
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import { School, Psychology } from '@mui/icons-material';
import { aboutMe } from '../../data/aboutData';

const AboutContent: React.FC = () => {
    const theme = useTheme();

    return (
        <Grid size={{ xs: 12 }}>
            <Box sx={{ px: { xs: 1, sm: 2, md: 3 }, py: { xs: 1, sm: 2 } }}>
                {/* 1. Core Lead Statement */}
                <Box
                    sx={{
                        p: { xs: 2, sm: 2.5 },
                        mb: 3,
                        borderRadius: 2,
                        background: theme.palette.mode === 'dark' ? 'rgba(127, 176, 105, 0.06)' : 'rgba(127, 176, 105, 0.08)',
                        borderLeft: '4px solid #7fb069',
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.primary',
                            fontSize: { xs: '1.08rem', sm: '1.22rem', md: '1.26rem' },
                            lineHeight: 1.6,
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {aboutMe.lead}
                    </Typography>
                </Box>

                {/* 2. Detailed Technical & Philosophical Points */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
                    {aboutMe.paragraphs.map((paragraph, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    mt: 1.1,
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: index === 0 ? '#7fb069' : '#e07a5f',
                                    flexShrink: 0,
                                    boxShadow: index === 0 ? '0 0 8px #7fb069' : '0 0 8px #e07a5f',
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.96rem', sm: '1.04rem' },
                                    lineHeight: 1.8,
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {paragraph}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* 3. Quick Status Cards */}
                <Box
                    sx={{
                        pt: 3,
                        borderTop: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 2,
                    }}
                >
                    {/* Academic Status */}
                    <Box
                        sx={{
                            p: 2.5,
                            borderRadius: 2.5,
                            background: 'rgba(127, 176, 105, 0.05)',
                            border: '1px solid rgba(127, 176, 105, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: '#7fb069',
                                background: 'rgba(127, 176, 105, 0.08)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                            <School sx={{ fontSize: 18, color: '#7fb069' }} />
                            <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#7fb069', fontWeight: 700 }}>
                                // ACADEMIC STATUS
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'text.primary', mb: 0.3 }}>
                            {aboutMe.academicStatus.institution}
                        </Typography>
                        <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {aboutMe.academicStatus.degree}
                        </Typography>
                    </Box>

                    {/* Problem Solving */}
                    <Box
                        sx={{
                            p: 2.5,
                            borderRadius: 2.5,
                            background: 'rgba(224, 122, 95, 0.05)',
                            border: '1px solid rgba(224, 122, 95, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: '#e07a5f',
                                background: 'rgba(224, 122, 95, 0.08)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                            <Psychology sx={{ fontSize: 18, color: '#e07a5f' }} />
                            <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#e07a5f', fontWeight: 700 }}>
                                // PROBLEM SOLVING
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'text.primary', mb: 0.3 }}>
                            {aboutMe.problemSolving.highlight}
                        </Typography>
                        <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.5 }}>
                            {aboutMe.problemSolving.details}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default AboutContent;
