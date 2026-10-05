import React, { useState } from 'react';
import {
    Box,
    Button,
    Collapse,
    useTheme,
    useMediaQuery,
    Typography,
    Fade,
} from '@mui/material';
import { ExpandMore, ExpandLess, Star } from '@mui/icons-material';
import type { Technology } from '../../data/aboutData';
import TechnologyChip from './TechnologyChip';

interface TechnologyChipListProps {
    technologies: Technology[];
}

const TechnologyChipList: React.FC<TechnologyChipListProps> = ({ technologies }) => {
    const theme = useTheme();
    const [showAll, setShowAll] = useState(false);

    const featuredTechnologies = technologies.filter(tech => tech.featured);
    const additionalTechnologies = technologies.filter(tech => !tech.featured);
    const hasAdditionalTechnologies = additionalTechnologies.length > 0;

    return (
        <Box>
            {/* Featured Technologies Section */}
            {featuredTechnologies.length > 0 && (
                <Box sx={{ mb: hasAdditionalTechnologies ? 1.5 : 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 0.8,
                        }}
                    >
                        <Star
                            sx={{
                                color: 'primary.main',
                                fontSize: 12,
                                mr: 0.5,
                            }}
                        />
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                fontSize: '0.65rem',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Core Technologies
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.8,
                        }}
                    >
                        {featuredTechnologies.map((tech, index) => (
                            <Fade in={true} timeout={200 + index * 50} key={index}>
                                <Box>
                                    <TechnologyChip technology={tech} />
                                </Box>
                            </Fade>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Additional Technologies - Collapsible */}
            {hasAdditionalTechnologies && (
                <Box>
                    <Collapse in={showAll}>
                        <Box sx={{ mb: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 0.8,
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        fontSize: '0.6rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    Additional Skills
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.8,
                                }}
                            >
                                {additionalTechnologies.map((tech, index) => (
                                    <Fade in={showAll} timeout={150 + index * 30} key={index}>
                                        <Box>
                                            <TechnologyChip technology={tech} />
                                        </Box>
                                    </Fade>
                                ))}
                            </Box>
                        </Box>
                    </Collapse>

                    {/* Compact Show More/Less Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.8 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setShowAll(!showAll)}
                            startIcon={showAll ? <ExpandLess /> : <ExpandMore />}
                            sx={{
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 1.5,
                                px: 1.5,
                                py: 0.3,
                                minWidth: 100,
                                height: 24,
                                background: theme.palette.mode === 'dark'
                                    ? `${theme.palette.primary.main}06`
                                    : `${theme.palette.primary.main}04`,
                                '&:hover': {
                                    backgroundColor: `${theme.palette.primary.main}12`,
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-1px)',
                                    boxShadow: `0 2px 8px ${theme.palette.primary.main}20`,
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {showAll
                                ? `Show Less`
                                : `+${additionalTechnologies.length} More`
                            }
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default TechnologyChipList;
