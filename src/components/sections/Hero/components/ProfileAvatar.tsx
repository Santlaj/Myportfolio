import React from 'react';
import { Box, Avatar, useTheme, Typography, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { LinkedIn, GitHub, ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface ProfileAvatarProps {
    isMobile: boolean;
    profileImage: string;
    name: string;
    initials: string;
    githubUrl?: string;
    linkedinUrl?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
    isMobile,
    profileImage,
    name,
    initials,
    githubUrl,
    linkedinUrl,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                mb: isMobile ? 3 : 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: isMobile ? 350 : 450,
                width: '100%',
                maxWidth: isMobile ? 350 : 600,
                mx: 'auto',
                px: isMobile ? 6 : 8,
                py: isMobile ? 2 : 4,
            }}
        >
            {/* Background decorative circles */}
            <Box
                sx={{
                    position: 'absolute',
                    width: isMobile ? 280 : 350,
                    height: isMobile ? 280 : 350,
                    borderRadius: '50%',
                    border: theme.palette.mode === 'dark'
                        ? `3px dashed ${theme.palette.primary.main}`
                        : `4px dashed ${theme.palette.primary.main}`,
                    opacity: theme.palette.mode === 'dark' ? 0.3 : 0.6,
                    animation: 'rotate 20s linear infinite',
                    '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                    },
                }}
            />

            {/* Inner decorative circle */}
            <Box
                sx={{
                    position: 'absolute',
                    width: isMobile ? 220 : 280,
                    height: isMobile ? 220 : 280,
                    borderRadius: '50%',
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}30)`
                        : `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.secondary.main}35)`,
                    opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
                }}
            />

            {/* Years of Experience Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    left: isMobile ? 5 : -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    textAlign: 'center',
                    zIndex: 2,
                    minWidth: isMobile ? 40 : 70,
                    '@media (max-width: 480px)': {
                        left: 10,
                        minWidth: 35,
                    },
                    '@media (max-width: 360px)': {
                        left: 15,
                        minWidth: 30,
                    },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        color: 'primary.main',
                        fontSize: isMobile ? '1.2rem' : '3rem',
                        lineHeight: 1,
                        textShadow: theme.palette.mode === 'dark'
                            ? `2px 2px 4px ${theme.palette.primary.main}40`
                            : `3px 3px 6px ${theme.palette.primary.main}60`,
                        filter: theme.palette.mode === 'dark' ? 'none' : 'drop-shadow(0 2px 4px rgba(74, 103, 65, 0.3))',
                        '@media (max-width: 480px)': {
                            fontSize: '1rem',
                        },
                        '@media (max-width: 360px)': {
                            fontSize: '0.9rem',
                        },
                    }}
                >
                    05
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: isMobile ? '0.4rem' : '0.6rem',
                        lineHeight: 1.2,
                        display: 'block',
                        transform: isMobile ? 'none' : 'rotate(-90deg)',
                        transformOrigin: 'center',
                        whiteSpace: 'nowrap',
                        mt: isMobile ? 0.5 : 1,
                        '@media (max-width: 480px)': {
                            fontSize: '0.35rem',
                        },
                        '@media (max-width: 360px)': {
                            fontSize: '0.3rem',
                        },
                    }}
                >
                    {isMobile ? 'YRS' : 'YEARS'}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: isMobile ? '0.6rem' : '0.7rem',
                        lineHeight: 1.2,
                        display: 'block',
                        ml: !isMobile ? 2 : 0,
                        transform: isMobile ? 'none' : 'rotate(-90deg)',
                        transformOrigin: 'center',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {isMobile ? 'EXP' : 'EXPERIENCE'}
                </Typography>
            </Box>

            {/* Main Avatar */}
            <Avatar
                sx={{
                    width: isMobile ? 160 : 220,
                    height: isMobile ? 160 : 220,
                    border: theme.palette.mode === 'dark'
                        ? `5px solid ${theme.palette.background.paper}`
                        : `6px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? `0 20px 40px ${theme.palette.primary.main}40, 0 10px 20px rgba(0,0,0,0.3)`
                        : `0 25px 50px ${theme.palette.primary.main}50, 0 15px 30px rgba(74, 103, 65, 0.4), 0 0 0 2px ${theme.palette.primary.main}20`,
                    position: 'relative',
                    zIndex: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: theme.palette.mode === 'dark'
                            ? `0 25px 50px ${theme.palette.primary.main}50, 0 15px 30px rgba(0,0,0,0.4)`
                            : `0 30px 60px ${theme.palette.primary.main}60, 0 20px 40px rgba(74, 103, 65, 0.5), 0 0 0 3px ${theme.palette.primary.main}30`,
                    }
                }}
                src={profileImage}
                alt={name}
            >
                {initials}
            </Avatar>

            {/* Floating Social Links Card */}
            <Card
                sx={{
                    position: 'absolute',
                    right: isMobile ? -25 : -50,
                    top: isMobile ? 40 : 0,
                    minWidth: isMobile ? 120 : 140,
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.dark}20 100%)`
                        : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}15 100%)`,
                    backdropFilter: 'blur(12px)',
                    border: theme.palette.mode === 'dark'
                        ? `1px solid ${theme.palette.primary.main}30`
                        : `2px solid ${theme.palette.primary.main}40`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? `0 8px 32px ${theme.palette.primary.main}40`
                        : `0 12px 40px ${theme.palette.primary.main}50, 0 4px 12px rgba(74, 103, 65, 0.3)`,
                    zIndex: 4,
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-10px)' },
                    },
                }}
            >
                <CardContent sx={{ p: isMobile ? 1.5 : 2, '&:last-child': { pb: isMobile ? 1.5 : 2 } }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            display: 'block',
                            mb: 1.5,
                            textAlign: 'center'
                        }}
                    >
                        {isMobile ? 'Connect' : 'Let\'s Connect'}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        {githubUrl && (
                            <Tooltip title="GitHub" placement="bottom">
                                <IconButton
                                    component="a"
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary',
                                        backgroundColor: theme.palette.mode === 'dark'
                                            ? `${theme.palette.primary.main}20`
                                            : `${theme.palette.primary.main}25`,
                                        border: theme.palette.mode === 'dark'
                                            ? 'none'
                                            : `1.5px solid ${theme.palette.primary.main}30`,
                                        size: isMobile ? 'small' : 'medium',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            transform: 'scale(1.15)',
                                            boxShadow: theme.palette.mode === 'dark'
                                                ? `0 4px 12px ${theme.palette.primary.main}50`
                                                : `0 6px 16px ${theme.palette.primary.main}60`,
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <GitHub sx={{ fontSize: isMobile ? 16 : 20 }} />
                                </IconButton>
                            </Tooltip>
                        )}

                        {linkedinUrl && (
                            <Tooltip title="LinkedIn" placement="bottom">
                                <IconButton
                                    component="a"
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary',
                                        backgroundColor: theme.palette.mode === 'dark'
                                            ? `${theme.palette.secondary.main}20`
                                            : `${theme.palette.secondary.main}25`,
                                        border: theme.palette.mode === 'dark'
                                            ? 'none'
                                            : `1.5px solid ${theme.palette.secondary.main}30`,
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            color: 'white',
                                            transform: 'scale(1.15)',
                                            boxShadow: theme.palette.mode === 'dark'
                                                ? `0 4px 12px ${theme.palette.secondary.main}50`
                                                : `0 6px 16px ${theme.palette.secondary.main}60`,
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <LinkedIn sx={{ fontSize: isMobile ? 16 : 20 }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </CardContent>
            </Card>

            {/* Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    right: isMobile ? -15 : -70,
                    bottom: isMobile ? 20 : 40,
                    textAlign: 'right',
                    zIndex: 2,
                    minWidth: isMobile ? 100 : 150,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 300,
                        color: 'text.secondary',
                        fontSize: isMobile ? '1.2rem' : '2.5rem',
                        fontStyle: 'italic',
                        lineHeight: 1,
                        opacity: 0.8,
                    }}
                >
                    Digital
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontSize: isMobile ? '1.2rem' : '2.5rem',
                        lineHeight: 1,
                        textShadow: theme.palette.mode === 'dark'
                            ? `1px 1px 2px ${theme.palette.primary.main}40`
                            : `2px 2px 4px ${theme.palette.primary.main}50`,
                        filter: theme.palette.mode === 'dark' ? 'none' : 'drop-shadow(0 2px 4px rgba(74, 103, 65, 0.2))',
                    }}
                >
                    Revolutionary.
                </Typography>
            </Box>

            {/* Decorative arrows */}
            {!isMobile && (
                <>
                    <ArrowUpward
                        sx={{
                            position: 'absolute',
                            top: 20,
                            left: '30%',
                            color: 'primary.main',
                            opacity: theme.palette.mode === 'dark' ? 0.6 : 0.8,
                            fontSize: 20,
                            filter: theme.palette.mode === 'dark' ? 'none' : 'drop-shadow(0 2px 4px rgba(74, 103, 65, 0.3))',
                            animation: 'bounce 2s ease-in-out infinite',
                            '@keyframes bounce': {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-5px)' },
                            },
                        }}
                    />
                    <ArrowDownward
                        sx={{
                            position: 'absolute',
                            bottom: 20,
                            right: '30%',
                            color: 'secondary.main',
                            opacity: theme.palette.mode === 'dark' ? 0.6 : 0.8,
                            fontSize: 20,
                            filter: theme.palette.mode === 'dark' ? 'none' : 'drop-shadow(0 2px 4px rgba(231, 111, 81, 0.3))',
                            animation: 'bounce 2s ease-in-out infinite 1s',
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default ProfileAvatar;
