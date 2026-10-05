import React from 'react';
import {
    Fab,
    Fade,
    useTheme,
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

interface ScrollToTopButtonProps {
    show: boolean;
    onClick: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ show, onClick }) => {
    const theme = useTheme();

    return (
        <Fade in={show}>
            <Fab
                size="medium"
                aria-label="scroll back to top"
                onClick={onClick}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    color: 'white',
                    border: `2px solid ${theme.palette.primary.main}40`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? `0 8px 25px ${theme.palette.primary.main}40, 0 0 20px ${theme.palette.secondary.main}30`
                        : `0 8px 25px ${theme.palette.primary.main}30, 0 0 15px ${theme.palette.secondary.main}20`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-4px) scale(1.1)',
                        boxShadow: theme.palette.mode === 'dark'
                            ? `0 12px 35px ${theme.palette.primary.main}50, 0 0 25px ${theme.palette.secondary.main}40`
                            : `0 12px 35px ${theme.palette.primary.main}40, 0 0 20px ${theme.palette.secondary.main}30`,
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -2,
                        left: -2,
                        right: -2,
                        bottom: -2,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: '50%',
                        zIndex: -1,
                        opacity: 0.7,
                        animation: 'pulse 2s infinite',
                    },
                    zIndex: 1000,
                }}
            >
                <KeyboardArrowUp sx={{ fontSize: 28 }} />
            </Fab>
        </Fade>
    );
};

export default ScrollToTopButton;
