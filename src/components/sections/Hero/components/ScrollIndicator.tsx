import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

interface ScrollIndicatorProps {
    onScrollClick: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onScrollClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: isMobile ? 16 : 32,
                left: '50%',
                transform: 'translateX(-50%)',
                cursor: 'pointer',
                zIndex: 1,
                display: isMobile ? 'none' : 'block',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                    '0%, 20%, 50%, 80%, 100%': {
                        transform: 'translateX(-50%) translateY(0)',
                    },
                    '40%': {
                        transform: 'translateX(-50%) translateY(-10px)',
                    },
                    '60%': {
                        transform: 'translateX(-50%) translateY(-5px)',
                    },
                },
                '&:hover': {
                    animation: 'bounce 1s infinite',
                    '& .arrow-icon': {
                        color: 'secondary.main',
                        transform: 'scale(1.1)',
                    },
                },
                transition: 'all 0.3s ease',
            }}
            onClick={onScrollClick}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.mode === 'dark'
                        ? `${theme.palette.background.paper}80`
                        : `${theme.palette.background.paper}90`,
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${theme.palette.primary.main}30`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? `0 4px 20px ${theme.palette.primary.main}30`
                        : `0 4px 20px ${theme.palette.primary.main}40`,
                }}
            >
                <KeyboardArrowDown 
                    className="arrow-icon"
                    sx={{ 
                        fontSize: 32, 
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                    }} 
                />
            </Box>
        </Box>
    );
};

export default ScrollIndicator;
