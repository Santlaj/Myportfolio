import React from 'react';
import { Box } from '@mui/material';
import type { Technology } from '../../data/aboutData';
import { getTechnologyIcon } from '../../utils/iconMap';

interface TechnologyChipProps {
    technology: Technology;
}

const TechnologyChip: React.FC<TechnologyChipProps> = ({ technology }) => {
    return (
        <Box
            sx={{
                px: 1,
                py: 0.3,
                background: `linear-gradient(135deg, ${technology.iconColor}12 0%, ${technology.iconColor}06 100%)`,
                border: `1px solid ${technology.iconColor}30`,
                borderRadius: 1,
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'text.primary',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    background: `linear-gradient(135deg, ${technology.iconColor}20 0%, ${technology.iconColor}12 100%)`,
                    borderColor: technology.iconColor,
                    transform: 'translateY(-1px) scale(1.02)',
                    boxShadow: `0 3px 8px ${technology.iconColor}25`,
                    '&::before': {
                        transform: 'translateX(0)',
                    },
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    background: `linear-gradient(90deg, ${technology.iconColor} 0%, transparent 100%)`,
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.2s ease',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                    '& svg': {
                        width: '12px',
                        height: '12px',
                    }
                }}
            >
                {getTechnologyIcon(technology.iconType, technology.iconColor)}
            </Box>
            <Box
                component="span"
                sx={{
                    fontFamily: 'inherit',
                    letterSpacing: 0.2,
                }}
            >
                {technology.name}
            </Box>
        </Box>
    );
};

export default TechnologyChip;
