import React from 'react';
import {
    Box,
    Button,
    Typography,
    useTheme,
} from '@mui/material';

interface MenuItem {
    label: string;
    href: string;
}

interface DesktopNavigationProps {
    menuItems: MenuItem[];
    activeSection: string;
    onMenuClick: (href: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
    menuItems,
    activeSection,
    onMenuClick,
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {menuItems.map((item, index) => (
                <Button
                    key={item.label}
                    disableFocusRipple
                    disableTouchRipple
                    disableRipple
                    disableElevation
                    onClick={() => {
                        onMenuClick(item.href);
                    }}
                    sx={{
                        color: activeSection === item.href.replace('#', '')
                            ? 'primary.main'
                            : 'text.primary',
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        position: 'relative',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        border: '1px solid transparent',
                        boxShadow: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            color: 'primary.main',
                            boxShadow: 'none',
                            backgroundColor: `${theme.palette.primary.main}10`,
                            transform: 'translateY(-2px)',
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: activeSection === item.href.replace('#', '') ? '90%' : '0%',
                            height: 2,
                            backgroundColor: 'secondary.main',
                            borderRadius: 1,
                            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span>{item.label}</span>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.6rem',
                                opacity: 0.7,
                                color: 'secondary.main',
                                lineHeight: 1,
                                mt: 0.2,
                            }}
                        >
                            [{index.toString().padStart(2, '0')}]
                        </Typography>
                    </Box>
                </Button>
            ))}
            <Box
                sx={{
                    ml: 1.5,
                    pl: 1.5,
                    borderLeft: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                }}
            >
                {/* Resume download button */}
                <Button
                    variant="outlined"
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        borderRadius: 2,
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        px: 1.5,
                        py: 0.6,
                        ml: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            borderColor: 'primary.light',
                            background: `${theme.palette.primary.main}18`,
                            boxShadow: `0 0 12px ${theme.palette.primary.main}40`,
                        },
                    }}
                >
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Resume
                </Button>
            </Box>
        </Box>
    );
};

export default DesktopNavigation;
