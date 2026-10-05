import React from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    useTheme,
    useMediaQuery,
    Chip,
    Stack,
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
import type { Experience } from '../../data/aboutData';
import { getCategoryIcon } from '../../utils/iconMap';

interface ExperienceTimelineProps {
    experiences: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ mt: 8 }}>
            <Typography
                variant="h4"
                component="h3"
                sx={{
                    textAlign: 'center',
                    mb: 6,
                    fontSize: isMobile ? '1.8rem' : '2rem',
                    fontWeight: 600,
                }}
            >
                Professional Experience
            </Typography>

            <Timeline
                position={isMobile ? "right" : "alternate"}
                sx={{
                    '& .MuiTimelineItem-root': {
                        '&:before': {
                            content: isMobile ? 'none' : '""',
                        },
                    },
                }}
            >
                {experiences.map((exp, index) => (
                    <TimelineItem key={index}>
                        {!isMobile && (
                            <TimelineOppositeContent
                                sx={{
                                    m: 'auto 0',
                                    variant: 'body2',
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                }}
                                align={index % 2 === 0 ? "right" : "left"}
                            >
                                {exp.period}
                            </TimelineOppositeContent>
                        )}

                        <TimelineSeparator>
                            <TimelineDot
                                sx={{
                                    backgroundColor: 'primary.main',
                                    width: 60,
                                    height: 60,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 4px 15px ${theme.palette.primary.main}50`,
                                }}
                            >
                                {getCategoryIcon(exp.iconType)}
                            </TimelineDot>
                            {index < experiences.length - 1 && (
                                <TimelineConnector
                                    sx={{
                                        backgroundColor: `${theme.palette.primary.main}30`,
                                        width: 3,
                                    }}
                                />
                            )}
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}08 100%)`,
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 10px 30px ${theme.palette.primary.main}30`,
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 1,
                                        color: 'primary.main',
                                    }}
                                >
                                    {exp.role}
                                </Typography>

                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 500,
                                        mb: 2,
                                        color: 'secondary.main',
                                    }}
                                >
                                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>

                                        {exp.company}
                                    </a>
                                </Typography>

                                {isMobile && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 2,
                                            color: 'text.secondary',
                                            fontStyle: 'italic',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {exp.period}
                                    </Typography>
                                )}

                                {/* Job Description - Always Visible for SEO */}
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    {exp.description.map((desc: string, descIndex: number) => (
                                        <ListItem
                                            sx={{
                                                display: 'list-item',
                                                py: 0.5,
                                                px: 0,
                                            }}
                                            key={descIndex}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    lineHeight: 1.6,
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {desc}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
};

export default ExperienceTimeline;
