import React from 'react';
import { Box, useTheme } from '@mui/material';

const BackgroundElements: React.FC = () => {
    const theme = useTheme();

    return (
        <>
            {/* Background Pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: theme.palette.mode === 'dark'
                        ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)'
                        : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Floating Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(45deg, ${theme.palette.primary.main}20 30%, ${theme.palette.secondary.main}20 90%)`
                        : `linear-gradient(45deg, ${theme.palette.primary.main}10 30%, ${theme.palette.secondary.main}10 90%)`,
                    animation: 'float 6s ease-in-out infinite',
                    display: { xs: 'none', md: 'block' },
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '40%',
                    right: '30%',
                    width: 100,
                    height: 100,
                    borderRadius: '20%',
                    rotate: '-30deg',
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(45deg, ${theme.palette.primary.main}20 30%, ${theme.palette.secondary.main}20 90%)`
                        : `linear-gradient(45deg, ${theme.palette.primary.main}10 30%, ${theme.palette.secondary.main}10 90%)`,
                    animation: 'float 2s ease-in-out infinite',
                    display: { xs: 'none', md: 'block' },
                }}
            />
        </>
    );
};

export default BackgroundElements;
