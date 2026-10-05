import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Typography,
    IconButton,
    Chip,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Code,
    Terminal,
} from '@mui/icons-material';

interface MenuItem {
    label: string;
    href: string;
}

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
    menuItems: MenuItem[];
    activeSection: string;
    onMenuClick: (href: string) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
    open,
    onClose,
    menuItems,
    activeSection,
    onMenuClick,
}) => {
    const theme = useTheme();

    const drawer = (
        <Box
            sx={{
                width: 280,
                backgroundColor: 'background.paper',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Tech-style background pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.15,
                    backgroundImage: theme.palette.mode === 'dark'
                        ? `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`
                        : `radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.08) 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    borderBottom: `2px solid ${theme.palette.primary.main}20`,
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`
                        : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}03 100%)`,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Terminal sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                fontFamily: 'monospace',
                            }}
                        >
                            santlaj.kumar
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: 'text.primary',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Chip
                    icon={<Code />}
                    label="Currently coding"
                    variant="outlined"
                    size="small"
                    sx={{
                        alignSelf: 'flex-start',
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        '& .MuiChip-icon': {
                            color: 'secondary.main',
                        },
                    }}
                />
            </Box>

            {/* Navigation Menu */}
            <List sx={{ p: 2, position: 'relative', zIndex: 1 }}>
                {menuItems.map((item, index) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            onClick={() => onMenuClick(item.href)}
                            sx={{
                                borderRadius: 2,
                                p: 2,
                                transition: 'all 0.3s ease',
                                border: `1px solid transparent`,
                                '&:hover': {
                                    backgroundColor: `${theme.palette.primary.main}10`,
                                    borderColor: theme.palette.primary.main,
                                    transform: 'translateX(8px)',
                                },
                                backgroundColor: activeSection === item.href.replace('#', '')
                                    ? `${theme.palette.primary.main}15`
                                    : 'transparent',
                                borderColor: activeSection === item.href.replace('#', '')
                                    ? theme.palette.primary.main
                                    : 'transparent',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={{
                                            color: activeSection === item.href.replace('#', '')
                                                ? 'primary.main'
                                                : 'text.primary',
                                            fontWeight: 600,
                                            fontFamily: 'monospace',
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'secondary.main',
                                        fontFamily: 'monospace',
                                        opacity: activeSection === item.href.replace('#', '') ? 1 : 0.5,
                                    }}
                                >
                                    [{index.toString().padStart(2, '0')}]
                                </Typography>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: 'background.paper',
                    backgroundImage: 'none',
                    borderLeft: `2px solid ${theme.palette.primary.main}30`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? `0 0 50px ${theme.palette.primary.main}30`
                        : `0 0 50px ${theme.palette.primary.main}20`,
                },
            }}
        >
            {drawer}
        </Drawer>
    );
};

export default MobileDrawer;
