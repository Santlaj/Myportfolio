import React from 'react';
import {
    Grid,
    Typography,
    Stack,
    useTheme,
    useMediaQuery,
    Box,
} from '@mui/material';
import { technicalAreas } from '../../data/aboutData';
import TechnicalExpertiseCard from './TechnicalExpertiseCard';
import { Code, TrendingUp } from '@mui/icons-material';

const TechnicalExpertiseSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Code
                    sx={{
                        color: 'primary.main',
                        fontSize: 24,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.7 },
                        },
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        fontFamily: 'monospace',
                        background: theme.palette.mode === 'dark'
                            ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`
                            : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'none',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.7 },
                        },
                    }}
                >
                    {'<TechStack />'}
                </Typography>
                <TrendingUp sx={{ color: 'secondary.main', fontSize: 20, ml: 1 }} />
            </Box>
            <Stack spacing={2}>
                {technicalAreas.map((area, index) => (
                    <TechnicalExpertiseCard key={index} area={area} />
                ))}
            </Stack>
        </Grid>
    );
};

export default TechnicalExpertiseSection;
