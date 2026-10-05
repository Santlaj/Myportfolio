import React from 'react';
import {
    Box,
    Typography,
    Paper,
    useTheme,
    useMediaQuery,
    Chip,
    Stack,
    Button,
    List,
    ListItem,
} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from '@mui/lab';
import {
    GitHub,
    Launch,
    Code,
    RocketLaunch,
    Devices,
    Storage,
    Terminal,
    Stars,
    Layers,
    ArrowOutward,
} from '@mui/icons-material';
import { projects, type ProjectData } from '../../data/projectsData';

// Map project icons based on category/title
const getProjectIcon = (index: number) => {
    switch (index % 4) {
        case 0:
            return <RocketLaunch sx={{ fontSize: 24 }} />;
        case 1:
            return <Devices sx={{ fontSize: 24 }} />;
        case 2:
            return <Storage sx={{ fontSize: 24 }} />;
        case 3:
            return <Terminal sx={{ fontSize: 24 }} />;
        default:
            return <Code sx={{ fontSize: 24 }} />;
    }
};

const getCategoryBadgeColor = (category: string) => {
    if (category === 'open-source') return '#7fb069';
    return '#e07a5f';
};

export const ProjectsTimeline: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box id="projects-timeline" sx={{ mt: { xs: 8, md: 12 }, position: 'relative' }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Chip
                    icon={<Stars sx={{ fontSize: '1rem !important' }} />}
                    label="Portfolio Showcase"
                    variant="outlined"
                    sx={{
                        mb: 2,
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        px: 1.5,
                        py: 0.4,
                    }}
                />
                <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                        fontSize: isMobile ? '1.85rem' : '2.6rem',
                        fontWeight: 800,
                        mb: 1.5,
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #ffffff 30%, #7fb069 90%)'
                            : 'linear-gradient(135deg, #0c100d 30%, #7fb069 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Featured Projects
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        maxWidth: 620,
                        mx: 'auto',
                        lineHeight: 1.6,
                        fontSize: isMobile ? '0.9rem' : '1.05rem',
                    }}
                >
                    Full-stack applications, production systems, and architectural side explorations I have engineered.
                </Typography>
            </Box>

            {/* Alternating Project Timeline */}
            <Timeline
                position={isMobile ? "right" : "alternate"}
                sx={{
                    p: 0,
                    m: 0,
                    '& .MuiTimelineItem-root': {
                        '&:before': {
                            content: isMobile ? 'none' : '""',
                        },
                    },
                    '& .MuiTimelineContent-root': {
                        textAlign: 'left !important',
                    },
                }}
            >
                {projects.map((project: ProjectData, index: number) => {
                    const iconColor = index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main;
                    const isEven = index % 2 === 0;

                    return (
                        <TimelineItem key={project.title} sx={{ mb: { xs: 4, md: 5 } }}>
                            {/* Date / Status on the opposite side on desktop */}
                            {!isMobile && (
                                <TimelineOppositeContent
                                    sx={{
                                        m: 'auto 0',
                                        px: 3,
                                    }}
                                    align={isEven ? "right" : "left"}
                                >
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            flexDirection: 'column',
                                            alignItems: isEven ? 'flex-end' : 'flex-start',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                color: iconColor,
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            {project.status === 'completed' ? '// COMPLETED' : '// IN PROGRESS'}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            {project.category.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </TimelineOppositeContent>
                            )}

                            {/* Separator / Dot */}
                            <TimelineSeparator>
                                <TimelineDot
                                    sx={{
                                        backgroundColor: '#0c100d',
                                        border: `2px solid ${iconColor}`,
                                        color: iconColor,
                                        width: { xs: 44, sm: 54 },
                                        height: { xs: 44, sm: 54 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 0 20px ${iconColor}40`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.15)',
                                            boxShadow: `0 0 28px ${iconColor}80`,
                                        },
                                    }}
                                >
                                    {getProjectIcon(index)}
                                </TimelineDot>
                                {index < projects.length - 1 && (
                                    <TimelineConnector
                                        sx={{
                                            background: `linear-gradient(180deg, ${iconColor} 0%, rgba(127, 176, 105, 0.2) 100%)`,
                                            width: 2,
                                            minHeight: { xs: 40, md: 60 },
                                        }}
                                    />
                                )}
                            </TimelineSeparator>

                            {/* Project Content Card */}
                            <TimelineContent sx={{ py: '6px', px: { xs: 1.5, sm: 3 }, textAlign: 'left !important' }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 2.5, sm: 3.5 },
                                        textAlign: 'left',
                                        borderRadius: 3,
                                        background: theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, rgba(22, 27, 34, 0.85) 0%, rgba(14, 18, 15, 0.95) 100%)'
                                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 248, 245, 0.9) 100%)',
                                        backdropFilter: 'blur(16px)',
                                        border: `1px solid ${iconColor}35`,
                                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            borderColor: iconColor,
                                            boxShadow: `0 14px 40px ${iconColor}22`,
                                        },
                                    }}
                                >
                                    {/* Top decorative accent bar */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '3px',
                                            background: `linear-gradient(90deg, ${iconColor}, transparent)`,
                                        }}
                                    />

                                    {/* Title and Badges */}
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1.5, textAlign: 'left' }}>
                                        <Typography
                                            variant="h5"
                                            component="h4"
                                            sx={{
                                                fontWeight: 800,
                                                fontSize: { xs: '1.25rem', sm: '1.45rem' },
                                                color: 'text.primary',
                                                fontFamily: "'Inter', sans-serif",
                                                textAlign: 'left',
                                            }}
                                        >
                                            {project.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center' }}>
                                            <Chip
                                                label={project.category === 'open-source' ? 'Open Source' : 'System Engine'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: `${getCategoryBadgeColor(project.category)}18`,
                                                    color: getCategoryBadgeColor(project.category),
                                                    border: `1px solid ${getCategoryBadgeColor(project.category)}40`,
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    fontSize: '0.68rem',
                                                    fontWeight: 600,
                                                    height: 22,
                                                }}
                                            />
                                            {project.featured && (
                                                <Chip
                                                    label="Featured"
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: 'rgba(250, 204, 21, 0.15)',
                                                        color: '#facc15',
                                                        border: '1px solid rgba(250, 204, 21, 0.35)',
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        fontSize: '0.68rem',
                                                        fontWeight: 600,
                                                        height: 22,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Description */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.7,
                                            mb: 2.5,
                                            fontSize: { xs: '0.88rem', sm: '0.94rem' },
                                            textAlign: 'left',
                                        }}
                                    >
                                        {project.description}
                                    </Typography>

                                    {/* Key Work Highlights (if available) */}
                                    {project.keyWork && project.keyWork.length > 0 && (
                                        <Box sx={{ mb: 2.5, pl: 0.5, textAlign: 'left' }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.72rem',
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    color: 'text.secondary',
                                                    mb: 1,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.08em',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                Key Technical Work
                                            </Typography>
                                            <List dense disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.6, textAlign: 'left' }}>
                                                {project.keyWork.map((point, pIdx) => (
                                                    <ListItem
                                                        key={pIdx}
                                                        disableGutters
                                                        sx={{
                                                            py: 0,
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: 1,
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        <Box
                                                            component="span"
                                                            sx={{
                                                                color: iconColor,
                                                                fontFamily: "'JetBrains Mono', monospace",
                                                                fontSize: '0.85rem',
                                                                lineHeight: 1.4,
                                                                userSelect: 'none',
                                                                flexShrink: 0,
                                                                mt: '1px',
                                                            }}
                                                        >
                                                            ›
                                                        </Box>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: 'text.secondary',
                                                                fontSize: '0.84rem',
                                                                lineHeight: 1.5,
                                                                textAlign: 'left',
                                                                flex: 1,
                                                            }}
                                                        >
                                                            {point}
                                                        </Typography>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>
                                    )}

                                    {/* Project Stats Metrics (if available) */}
                                    {project.stats && project.stats.length > 0 && (
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                gap: 1.5,
                                                p: 1.8,
                                                mb: 2.5,
                                                borderRadius: 2,
                                                background: 'rgba(0, 0, 0, 0.25)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                textAlign: 'left',
                                            }}
                                        >
                                            {project.stats.map((stat, sIdx) => (
                                                <Box key={sIdx} sx={{ textAlign: 'left' }}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.65rem',
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                            color: 'text.secondary',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.06em',
                                                            textAlign: 'left',
                                                            mb: 0.3,
                                                        }}
                                                    >
                                                        {stat.label}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.85rem',
                                                            fontWeight: 700,
                                                            color: iconColor,
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        {stat.value}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}

                                    {/* Technologies Stack Chips */}
                                    <Box sx={{ mb: 2.5, textAlign: 'left' }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.72rem',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                color: 'text.secondary',
                                                mb: 1,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em',
                                                textAlign: 'left',
                                            }}
                                        >
                                            Tech Stack
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, justifyContent: 'flex-start' }}>
                                            {project.technologies.map((tech) => (
                                                <Chip
                                                    key={tech}
                                                    label={tech}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                                        color: 'text.primary',
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        fontSize: '0.72rem',
                                                        height: 24,
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            borderColor: iconColor,
                                                            backgroundColor: `${iconColor}15`,
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    {/* Action Links */}
                                    <Stack direction="row" spacing={1.5} sx={{ pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.07)', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        {project.liveUrl && (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                startIcon={<Launch sx={{ fontSize: '16px !important' }} />}
                                                sx={{
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    fontFamily: "'Inter', sans-serif",
                                                    backgroundColor: iconColor,
                                                    color: '#0c100d',
                                                    boxShadow: `0 2px 10px ${iconColor}40`,
                                                    '&:hover': {
                                                        backgroundColor: iconColor,
                                                        filter: 'brightness(1.1)',
                                                    },
                                                }}
                                            >
                                                Live Demo
                                            </Button>
                                        )}


                                        {project.caseStudyUrl && (
                                            <Box
                                                component="a"
                                                href={project.caseStudyUrl}
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.7,
                                                    color: 'text.primary',
                                                    textDecoration: 'none',
                                                    fontSize: '0.86rem',
                                                    fontWeight: 600,
                                                    fontFamily: "'Inter', sans-serif",
                                                    py: 0.6,
                                                    px: 0.8,
                                                    borderRadius: 1,
                                                    border: 'none',
                                                    background: 'transparent',
                                                    transition: 'all 0.2s ease',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: iconColor,
                                                        '& .cs-arrow': {
                                                            transform: 'translate(2px, -2px)',
                                                            color: iconColor,
                                                        },
                                                    },
                                                }}
                                            >
                                                <Layers sx={{ fontSize: 18, color: iconColor }} />
                                                <span>View Case Study</span>
                                                <ArrowOutward
                                                    className="cs-arrow"
                                                    sx={{
                                                        fontSize: 14,
                                                        color: 'text.secondary',
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        {!project.liveUrl && !project.githubUrl && !project.caseStudyUrl && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    fontStyle: 'italic',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                // Enterprise Repository & Architecture
                                            </Typography>
                                        )}
                                    </Stack>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
        </Box>
    );
};

export default ProjectsTimeline;
