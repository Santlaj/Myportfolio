import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Chip,
    Stack,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    GitHub,
    Launch,
    Lock,
    Terminal,
} from '@mui/icons-material';
import { projects, type ProjectData } from '../../data/projectsData';
import siteConfig from '../../../config/site';
import ProjectCard3D from './ProjectCard3D';

const ProjectsSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedTab, setSelectedTab] = useState<'all' | 'professional' | 'open-source'>('all');

    const filteredProjects = projects.filter(p => {
        if (selectedTab === 'all') return true;
        return p.category === selectedTab;
    });

    return (
        <Box
            component="section"
            id="projects"
            sx={{
                py: { xs: 8, md: 14 },
                background: 'transparent',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'primary.main',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.85rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 1.5,
                        }}
                    >
                        // Selected Work
                    </Typography>

                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: isMobile ? '2.4rem' : '3.6rem',
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #ffffff 40%, #a8ff78 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.15,
                        }}
                    >
                        Featured Projects
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            fontSize: '1.15rem',
                            maxWidth: 680,
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        Production systems and side explorations — how I ship and how I learn.
                    </Typography>
                </Box>

                {/* Filter Tabs & Scroll Hint */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2,
                        mb: 6,
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        {(['all', 'professional', 'open-source'] as const).map(tab => (
                            <Button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                sx={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    borderRadius: '50px',
                                    px: 2.5,
                                    py: 0.6,
                                    border: selectedTab === tab
                                        ? `1px solid ${theme.palette.primary.main}`
                                        : '1px solid rgba(255, 255, 255, 0.12)',
                                    color: selectedTab === tab
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary,
                                    backgroundColor: selectedTab === tab
                                        ? 'rgba(127, 176, 105, 0.12)'
                                        : 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(8px)',
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        backgroundColor: 'rgba(127, 176, 105, 0.15)',
                                    },
                                }}
                            >
                                {tab === 'all' && 'All'}
                                {tab === 'professional' && 'Professional'}
                                {tab === 'open-source' && 'Open Source'}
                            </Button>
                        ))}
                    </Stack>

                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
                            <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'text.secondary' }}>
                                drag or scroll
                            </Typography>
                            <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'primary.main' }}>
                                &lt; &gt;
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Projects Grid */}
                <Grid container spacing={4} sx={{ mb: 10 }}>
                    {filteredProjects.map((project: ProjectData, index: number) => (
                        <Grid size={{ xs: 12, md: 6 }} key={project.title}>
                            <ProjectCard3D
                                indexNumber={`0${index + 1}`}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: 'rgba(14, 18, 15, 0.82)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(127, 176, 105, 0.22)',
                                    borderRadius: 3,
                                    p: { xs: 2.5, sm: 3.5 },
                                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(127, 176, 105, 0.55)',
                                        boxShadow: '0 20px 48px rgba(127, 176, 105, 0.15)',
                                    },
                                }}
                            >
                                {/* Top Badge Row */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                                    {/* Status Badge */}
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 0.7,
                                            px: 1.5,
                                            py: 0.35,
                                            borderRadius: '50px',
                                            fontSize: '0.72rem',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontWeight: 600,
                                            backgroundColor: 'rgba(74, 222, 128, 0.12)',
                                            color: '#4ade80',
                                            border: '1px solid rgba(74, 222, 128, 0.35)',
                                        }}
                                    >
                                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80' }} />
                                        Completed
                                    </Box>

                                    {/* Featured Pill */}
                                    {project.featured && (
                                        <Box
                                            sx={{
                                                px: 1.5,
                                                py: 0.35,
                                                borderRadius: '50px',
                                                fontSize: '0.72rem',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontWeight: 600,
                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                color: '#e5e7eb',
                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                            }}
                                        >
                                            Featured
                                        </Box>
                                    )}

                                    {/* Category Pill */}
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            px: 1.5,
                                            py: 0.35,
                                            borderRadius: '50px',
                                            fontSize: '0.72rem',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontWeight: 600,
                                            backgroundColor: project.category === 'open-source' ? 'rgba(127, 176, 105, 0.12)' : 'rgba(224, 122, 95, 0.12)',
                                            color: project.category === 'open-source' ? '#7fb069' : '#e07a5f',
                                            border: `1px solid ${project.category === 'open-source' ? 'rgba(127, 176, 105, 0.35)' : 'rgba(224, 122, 95, 0.35)'}`,
                                        }}
                                    >
                                        {project.category === 'open-source' ? (
                                            <>
                                                <span>&lt;/&gt;</span> Open Source
                                            </>
                                        ) : (
                                            <>
                                                <Lock sx={{ fontSize: '0.75rem' }} /> Professional
                                            </>
                                        )}
                                    </Box>
                                </Box>

                                {/* Terminal Mini-Window with Stats */}
                                <Box
                                    sx={{
                                        mb: 3,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'rgba(8, 12, 10, 0.75)',
                                        border: '1px solid rgba(255, 255, 255, 0.07)',
                                    }}
                                >
                                    {/* Terminal Prompt Header */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#27c93f' }} />
                                        <Typography
                                            sx={{
                                                ml: 1,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.72rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {project.terminalPrompt || 'project@preview ~ $'}
                                        </Typography>
                                    </Box>

                                    {/* Terminal Command if any */}
                                    {project.terminalCommand && (
                                        <Typography
                                            sx={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.72rem',
                                                color: '#7fb069',
                                                opacity: 0.85,
                                                mb: 1.5,
                                            }}
                                        >
                                            {project.terminalCommand}
                                        </Typography>
                                    )}

                                    {/* Stats 3 Columns */}
                                    {project.stats && (
                                        <Grid container spacing={1.5} sx={{ pt: 0.5 }}>
                                            {project.stats.map(stat => (
                                                <Grid size={{ xs: 6, sm: 6 }} key={stat.label}>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                            fontSize: { xs: '0.85rem', sm: '1rem' },
                                                            fontWeight: 700,
                                                            color: '#8fe872',
                                                            lineHeight: 1.1,
                                                            mb: 0.3,
                                                        }}
                                                    >
                                                        {stat.value}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                            fontSize: '0.62rem',
                                                            color: 'text.secondary',
                                                            letterSpacing: '0.5px',
                                                            textTransform: 'uppercase',
                                                        }}
                                                    >
                                                        {stat.label}
                                                    </Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </Box>

                                {/* Project Title */}
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 1.5,
                                        color: '#ffffff',
                                        fontSize: { xs: '1.4rem', sm: '1.7rem' },
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {project.title}
                                </Typography>

                                {/* Project Description */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 3,
                                        lineHeight: 1.65,
                                        color: 'text.secondary',
                                        fontSize: '0.95rem',
                                        flexGrow: 1,
                                    }}
                                >
                                    {project.description}
                                </Typography>

                                {/* Technologies Chips (Orange outline pills matching bernardomoschen.dev) */}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9, mb: 3 }}>
                                    {project.technologies.map(tech => (
                                        <Box
                                            key={tech}
                                            sx={{
                                                px: 1.5,
                                                py: 0.4,
                                                borderRadius: '50px',
                                                fontSize: '0.72rem',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontWeight: 600,
                                                color: '#e07a5f',
                                                border: '1px solid rgba(224, 122, 95, 0.45)',
                                                backgroundColor: 'rgba(224, 122, 95, 0.05)',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    borderColor: '#e07a5f',
                                                    backgroundColor: 'rgba(224, 122, 95, 0.15)',
                                                },
                                            }}
                                        >
                                            {tech}
                                        </Box>
                                    ))}
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                                    {project.githubUrl && (
                                        <Button
                                            size="small"
                                            startIcon={<GitHub />}
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="outlined"
                                            sx={{
                                                color: 'text.secondary',
                                                borderColor: 'rgba(255, 255, 255, 0.15)',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.75rem',
                                                borderRadius: 2,
                                                px: 2,
                                                py: 0.8,
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    color: 'primary.main',
                                                    backgroundColor: 'rgba(127, 176, 105, 0.08)',
                                                },
                                            }}
                                        >
                                            Source Code
                                        </Button>
                                    )}
                                    {project.liveUrl && (
                                        <Button
                                            size="small"
                                            startIcon={<Launch />}
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="contained"
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                borderRadius: 2,
                                                px: 2,
                                                py: 0.8,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.dark,
                                                },
                                            }}
                                        >
                                            Live Demo
                                        </Button>
                                    )}
                                </Box>
                            </ProjectCard3D>
                        </Grid>
                    ))}
                </Grid>

                {/* GitHub CTA */}
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<GitHub />}
                        href={siteConfig.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            borderColor: 'rgba(127, 176, 105, 0.4)',
                            color: theme.palette.primary.main,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderRadius: '50px',
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                backgroundColor: 'rgba(127, 176, 105, 0.1)',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        $ git checkout more-projects
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ProjectsSection;
