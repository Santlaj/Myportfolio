import React from 'react';
import {
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import { Terminal } from '@mui/icons-material';

interface BrandLogoProps {
    trigger: boolean;
    onClick: () => void;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ trigger, onClick }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
            onClick={onClick}
        >
            <Terminal
                sx={{
                    color: 'primary.main',
                    mr: 1,
                    fontSize: 28,
                    animation: trigger ? 'none' : 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                        '100%': { opacity: 1 },
                    },
                }}
            />
            <Box>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontFamily: 'monospace',
                        lineHeight: 1,
                    }}
                >
                    santlaj.kumar
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'secondary.main',
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        opacity: trigger ? 0.8 : 0.6,
                        transition: 'opacity 0.3s ease',
                    }}
                >
                    {'{ fullstack.engineer }'}
                </Typography>
            </Box>
        </Box>
    );
};

export default BrandLogo;
