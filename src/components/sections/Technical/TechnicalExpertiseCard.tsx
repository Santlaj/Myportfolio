import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Box,
    Typography,
    useTheme,
    Chip,
    Divider,
} from '@mui/material';
import type { TechnicalArea } from '../../data/aboutData';
import TechnologyChipList from './TechnologyChipList';
import { getCategoryIcon } from '../../utils/iconMap';

interface TechnicalExpertiseCardProps {
    area: TechnicalArea;
}

const TechnicalExpertiseCard: React.FC<TechnicalExpertiseCardProps> = ({ area }) => {
    const [isDescriptionHovered, setIsDescriptionHovered] = useState(false);
    const theme = useTheme();

    const featuredCount = area.technologies.filter(tech => tech.featured).length;
    const totalCount = area.technologies.length;

    return (
        <Card
            sx={{
                background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`
                    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'dark'
                        ? `0 8px 25px ${theme.palette.primary.main}20`
                        : `0 8px 25px ${theme.palette.primary.main}15`,
                    borderColor: 'primary.main',
                },
            }}
        >
            <CardContent sx={{ p: 1.5 }}>
                {/* Compact Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            mr: 1.5,
                            boxShadow: `0 2px 8px ${theme.palette.primary.main}30`,
                        }}
                    >
                        {getCategoryIcon(area.iconType)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: 'text.primary',
                                    fontSize: '0.9rem',
                                }}
                            >
                                {area.category}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <Chip
                                    label={`${featuredCount} Core`}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 600,
                                        fontSize: '0.6rem',
                                        height: 16,
                                        '& .MuiChip-label': { px: 0.8 },
                                    }}
                                />
                                <Chip
                                    label={`${totalCount} Total`}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        fontSize: '0.6rem',
                                        height: 16,
                                        '& .MuiChip-label': { px: 0.8 },
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Compact Description */}
                        <Box
                            sx={{
                                position: 'relative',
                                minHeight: 28,
                                cursor: 'pointer',
                                borderRadius: 1,
                                p: 0.8,
                                background: theme.palette.mode === 'dark'
                                    ? `${theme.palette.background.paper}30`
                                    : `${theme.palette.background.paper}60`,
                            }}
                            onMouseEnter={() => setIsDescriptionHovered(true)}
                            onMouseLeave={() => setIsDescriptionHovered(false)}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.2,
                                    fontSize: '0.75rem',
                                    opacity: isDescriptionHovered ? 0 : 1,
                                    transform: isDescriptionHovered ? 'translateY(-6px)' : 'translateY(0)',
                                    transition: 'all 0.3s ease',
                                    position: isDescriptionHovered ? 'absolute' : 'static',
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            >
                                {area.description}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'secondary.main',
                                    lineHeight: 1.2,
                                    fontSize: '0.75rem',
                                    fontStyle: 'italic',
                                    fontWeight: 600,
                                    opacity: isDescriptionHovered ? 1 : 0,
                                    transform: isDescriptionHovered ? 'translateY(0)' : 'translateY(6px)',
                                    transition: 'all 0.3s ease',
                                    position: isDescriptionHovered ? 'static' : 'absolute',
                                    width: '100%',
                                }}
                            >
                                {area.descriptionHighlight}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <TechnologyChipList technologies={area.technologies} />
            </CardContent>
        </Card>
    );
};

export default TechnicalExpertiseCard;
