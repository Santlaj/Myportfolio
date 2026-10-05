import React from 'react';
import { Typography, useTheme } from '@mui/material';

interface HeroTextProps {
    isMobile: boolean;
    name: string;
    title: string;
    description: string;
}

const HeroText: React.FC<HeroTextProps> = ({
    isMobile,
    name,
    title,
    description
}) => {
    const theme = useTheme();

    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    fontSize: isMobile ? '2.5rem' : '3.5rem',
                    fontWeight: 700,
                    mb: 1,
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.light} 90%)`
                        : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,

                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {name}
            </Typography>
            <Typography
                variant="h3"
                sx={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: 400,
                    mb: 3,
                    color: theme.palette.mode === 'dark' ? 'secondary.main' : 'black',
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontSize: '1.1rem',
                    mb: 4,
                    lineHeight: 1.7,
                    color: 'text.secondary',
                }}
            >
                {description}
            </Typography>
        </>
    );
};

export default HeroText;
