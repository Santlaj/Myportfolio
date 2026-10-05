import React from 'react';
import { Button, Stack, useTheme } from '@mui/material';
import { Email, Download } from '@mui/icons-material';

interface ActionButtonsProps {
    isMobile: boolean;
    onContactClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isMobile, onContactClick }) => {
    const theme = useTheme();

    return (
        <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            sx={{ mb: 4 }}
        >
            <Button
                variant="contained"
                size="large"
                startIcon={<Email />}
                onClick={onContactClick}
                sx={{
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`
                        : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    '&:hover': {
                        background: theme.palette.mode === 'dark'
                            ? `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`
                            : `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                    },
                }}
            >
                Get In Touch
            </Button>

            <Button
                variant="outlined"
                size="large"
                startIcon={<Download />}
                href="/resume.pdf"
                target="_blank"
                sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'primary.main',
                        color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'white',
                    },
                }}
            >
                Download Resume
            </Button>
        </Stack>
    );
};

export default ActionButtons;
