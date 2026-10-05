import React, { useState, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Chip,
    Button,
    TextField,
    InputAdornment,
    useTheme,
    useMediaQuery,
    Stack,
} from '@mui/material';
import {
    Search,
    Code,
    Storage,
    Cloud,
    Devices,
    Bolt,
    CheckCircle,
    AutoAwesome,
    Terminal,
    Speed,
    Security,
    Psychology,
} from '@mui/icons-material';
import { technicalAreas, type Technology } from '../../data/aboutData';
import { getTechnologyIcon } from '../../utils/iconMap';

interface FlatTechnology extends Technology {
    category: string;
}

export const SkillsSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Flatten technologies across categories for search and filtering
    const allTechnologies: FlatTechnology[] = useMemo(() => {
        const list: FlatTechnology[] = [];
        technicalAreas.forEach((area) => {
            area.technologies.forEach((tech) => {
                list.push({
                    ...tech,
                    category: area.category,
                });
            });
        });
        return list;
    }, []);

    // Filter by Category and Search Query
    const filteredTechnologies = useMemo(() => {
        return allTechnologies.filter((tech) => {
            const matchesCategory =
                activeTab === 'all' ||
                tech.category.toLowerCase().includes(activeTab.toLowerCase());

            const matchesSearch =
                searchQuery.trim() === '' ||
                tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tech.category.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [allTechnologies, activeTab, searchQuery]);

    const categories = [
        { id: 'all', label: 'All Arsenal', icon: <AutoAwesome sx={{ fontSize: 16 }} /> },
        { id: 'languages', label: 'Languages', icon: <Code sx={{ fontSize: 16 }} /> },
        { id: 'frontend', label: 'Frontend', icon: <Devices sx={{ fontSize: 16 }} /> },
        { id: 'backend', label: 'Backend & APIs', icon: <Storage sx={{ fontSize: 16 }} /> },
        { id: 'database', label: 'Database & Infra', icon: <Cloud sx={{ fontSize: 16 }} /> },
        { id: 'dsa', label: 'DSA & LeetCode', icon: <Psychology sx={{ fontSize: 16 }} /> },
    ];

    return (
        <Box
            component="section"
            id="skills"
            sx={{
                py: { xs: 10, md: 16 },
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

            {/* Alias anchor so #projects navigation or bookmarks still scroll here */}
            <div id="projects" style={{ position: 'absolute', top: 0 }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* 1. Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 0.5,
                            borderRadius: '9999px',
                            border: '1px solid rgba(127, 176, 105, 0.35)',
                            background: 'rgba(127, 176, 105, 0.08)',
                            backdropFilter: 'blur(8px)',
                            color: '#7fb069',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#7fb069',
                                boxShadow: '0 0 10px #7fb069',
                                animation: 'pulseDot 2s infinite',
                                '@keyframes pulseDot': {
                                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                    '50%': { opacity: 0.5, transform: 'scale(0.8)' },
                                },
                            }}
                        />
                        <span>// TECHNICAL ARSENAL</span>
                    </Box>

                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: isMobile ? '2.4rem' : isTablet ? '3.2rem' : '3.8rem',
                            fontWeight: 900,
                            mb: 2,
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #ffffff 40%, #7fb069 80%, #e07a5f 100%)'
                                : 'linear-gradient(135deg, #0c100d 40%, #7fb069 80%, #e07a5f 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Skills & Technologies
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: 680,
                            mx: 'auto',
                            lineHeight: 1.7,
                            fontSize: isMobile ? '0.95rem' : '1.1rem',
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        A comprehensive toolkit of languages, frameworks, cloud services, and engineering principles I use to craft scalable web systems.
                    </Typography>
                </Box>

                {/* 2. Stat Highlights Banner */}
                <Grid container spacing={2.5} sx={{ mb: 6 }}>
                    {[
                        {
                            label: 'Technologies & Tools',
                            value: '30+',
                            desc: 'Modern production stack',
                            icon: <Code sx={{ color: '#7fb069' }} />,
                            accent: '#7fb069',
                        },
                        {
                            label: 'Primary Specialization',
                            value: 'TypeScript & React',
                            desc: 'End-to-end full-stack',
                            icon: <Bolt sx={{ color: '#61DAFB' }} />,
                            accent: '#61DAFB',
                        },
                        {
                            label: 'Backend & Architecture',
                            value: 'Node.js & APIs',
                            desc: 'REST, GraphQL & Microservices',
                            icon: <Storage sx={{ color: '#e07a5f' }} />,
                            accent: '#e07a5f',
                        },
                        {
                            label: 'DevOps & Containers',
                            value: 'Docker & Cloud',
                            desc: 'PostgreSQL, Linux, AWS',
                            icon: <Cloud sx={{ color: '#2496ED' }} />,
                            accent: '#2496ED',
                        },
                    ].map((stat, sIdx) => (
                        <Grid size={{ xs: 6, md: 3 }} key={sIdx}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2, sm: 2.5 },
                                    borderRadius: 3,
                                    background: 'rgba(22, 27, 34, 0.65)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    '&:hover': {
                                        borderColor: `${stat.accent}60`,
                                        transform: 'translateY(-3px)',
                                        boxShadow: `0 8px 24px ${stat.accent}18`,
                                    },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            color: 'text.secondary',
                                            fontSize: '0.7rem',
                                            letterSpacing: '0.04em',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                    {stat.icon}
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 800,
                                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                        color: '#ffffff',
                                        mb: 0.5,
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: stat.accent,
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.72rem',
                                    }}
                                >
                                    {stat.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* 3. Filter Controls: Categories Tabs & Search Input */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'stretch', md: 'center' },
                        justifyContent: 'space-between',
                        gap: 2,
                        mb: 4,
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 3,
                        background: 'rgba(22, 27, 34, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Category Buttons */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            overflowX: 'auto',
                            pb: { xs: 1, md: 0 },
                            '&::-webkit-scrollbar': { height: 4 },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(127, 176, 105, 0.3)', borderRadius: 2 },
                        }}
                    >
                        {categories.map((cat) => {
                            const isSelected = activeTab === cat.id;
                            return (
                                <Button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    startIcon={cat.icon}
                                    sx={{
                                        borderRadius: '9999px',
                                        px: 2,
                                        py: 0.6,
                                        fontSize: '0.78rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        whiteSpace: 'nowrap',
                                        color: isSelected ? '#0c100d' : 'text.secondary',
                                        backgroundColor: isSelected ? '#7fb069' : 'rgba(255, 255, 255, 0.04)',
                                        border: `1px solid ${isSelected ? '#7fb069' : 'rgba(255, 255, 255, 0.1)'}`,
                                        boxShadow: isSelected ? '0 0 16px rgba(127, 176, 105, 0.4)' : 'none',
                                        transition: 'all 0.25s ease',
                                        '&:hover': {
                                            backgroundColor: isSelected ? '#8fd476' : 'rgba(127, 176, 105, 0.12)',
                                            borderColor: '#7fb069',
                                            color: isSelected ? '#0c100d' : '#7fb069',
                                        },
                                    }}
                                >
                                    {cat.label}
                                </Button>
                            );
                        })}
                    </Stack>

                    {/* Search Input */}
                    <TextField
                        size="small"
                        placeholder="Search skill (e.g. React, Node, Docker)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'text.secondary', fontSize: 18 }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            minWidth: { xs: '100%', md: 280 },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '9999px',
                                fontSize: '0.82rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.12)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                </Box>

                {/* 4. Interactive Grid of Technology Cards */}
                <Grid container spacing={2}>
                    {filteredTechnologies.map((tech) => {
                        const icon = getTechnologyIcon(tech.iconType, tech.iconColor);

                        return (
                            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={`${tech.name}-${tech.category}`}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        height: '100%',
                                        borderRadius: 2.5,
                                        background: 'rgba(22, 27, 34, 0.65)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-4px) scale(1.02)',
                                            borderColor: tech.iconColor,
                                            boxShadow: `0 8px 24px ${tech.iconColor}28`,
                                            '& .tech-icon-container': {
                                                transform: 'scale(1.15) rotate(4deg)',
                                                filter: `drop-shadow(0 0 12px ${tech.iconColor})`,
                                            },
                                        },
                                    }}
                                >
                                    {/* Tech Icon Container */}
                                    <Box
                                        className="tech-icon-container"
                                        sx={{
                                            fontSize: 34,
                                            mb: 1.5,
                                            height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {icon}
                                    </Box>

                                    {/* Tech Name */}
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            fontSize: '0.88rem',
                                            fontFamily: "'Inter', sans-serif",
                                            mb: 0.8,
                                        }}
                                    >
                                        {tech.name}
                                    </Typography>

                                    {/* Proficiency Tag */}
                                    <Chip
                                        label={tech.featured ? 'Core Stack' : 'Production'}
                                        size="small"
                                        sx={{
                                            height: 18,
                                            fontSize: '0.62rem',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontWeight: 600,
                                            backgroundColor: tech.featured ? `${tech.iconColor}22` : 'rgba(255, 255, 255, 0.05)',
                                            color: tech.featured ? tech.iconColor : 'text.secondary',
                                            border: `1px solid ${tech.featured ? `${tech.iconColor}50` : 'rgba(255, 255, 255, 0.1)'}`,
                                            '& .MuiChip-label': { px: 0.8 },
                                        }}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* 5. Architectural Pillars / Engineering Standards */}
                <Box sx={{ mt: 8 }}>
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 800,
                            mb: 3,
                            color: '#ffffff',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        }}
                    >
                        Engineering Foundations & Core Standards
                    </Typography>

                    <Grid container spacing={3}>
                        {[
                            {
                                title: 'Clean Architecture & Type Safety',
                                description: 'Adhering to SOLID principles, strict TypeScript strict mode, clean modular component boundaries, and reusable design tokens.',
                                icon: <Security sx={{ color: '#7fb069', fontSize: 28 }} />,
                                accent: '#7fb069',
                            },
                            {
                                title: 'High-Performance & Web Vitals',
                                description: 'Optimized bundle size, asset preloading, 60fps WebGL rendering, smooth Lenis inertia scrolling, and sub-100ms response targets.',
                                icon: <Speed sx={{ color: '#e07a5f', fontSize: 28 }} />,
                                accent: '#e07a5f',
                            },
                            {
                                title: 'Modern API & Cloud Mindset',
                                description: 'Designing RESTful and GraphQL contracts, containerized Docker local/cloud environments, PostgreSQL indexing, and microservice decoupling.',
                                icon: <Terminal sx={{ color: '#61DAFB', fontSize: 28 }} />,
                                accent: '#61DAFB',
                            },
                        ].map((pillar, pIdx) => (
                            <Grid size={{ xs: 12, md: 4 }} key={pIdx}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        background: 'rgba(22, 27, 34, 0.65)',
                                        border: `1px solid ${pillar.accent}30`,
                                        backdropFilter: 'blur(12px)',
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: pillar.accent,
                                            transform: 'translateY(-3px)',
                                            boxShadow: `0 10px 30px ${pillar.accent}15`,
                                        },
                                    }}
                                >
                                    <Box sx={{ mb: 1.5 }}>{pillar.icon}</Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1.05rem',
                                            color: '#ffffff',
                                            mb: 1,
                                            fontFamily: "'Inter', sans-serif",
                                        }}
                                    >
                                        {pillar.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.7,
                                            fontSize: '0.88rem',
                                        }}
                                    >
                                        {pillar.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default SkillsSection;
