import React from 'react';
import {
    Box,
    Divider,
    IconButton,
    useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ThemeToggle } from '../../theme';

interface MobileMenuButtonProps {
    onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>
            <ThemeToggle />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onClick}
                sx={{
                    color: 'text.primary',
                    border: `1px solid ${theme.palette.primary.main}40`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'rotate(90deg)',
                    },
                }}
            >
                <MenuIcon />
            </IconButton>
        </Box>
    );
};

export default MobileMenuButton;
