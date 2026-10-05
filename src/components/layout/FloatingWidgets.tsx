import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

export const FloatingWidgets: React.FC = () => {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLikes = localStorage.getItem('portfolio_likes');
            const savedHasLiked = localStorage.getItem('portfolio_has_liked');
            if (savedLikes) setLikes(parseInt(savedLikes, 10));
            if (savedHasLiked === 'true') setHasLiked(true);
        }
    }, []);

    const handleLike = () => {
        if (hasLiked) {
            setLikes((l) => l - 1);
            setHasLiked(false);
            localStorage.setItem('portfolio_likes', (likes - 1).toString());
            localStorage.setItem('portfolio_has_liked', 'false');
        } else {
            setLikes((l) => l + 1);
            setHasLiked(true);
            localStorage.setItem('portfolio_likes', (likes + 1).toString());
            localStorage.setItem('portfolio_has_liked', 'true');
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '1.75rem',
                right: '1.75rem',
                zIndex: 60,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                alignItems: 'center',
            }}
        >
            {/* Like Button Counter */}
            <Button
                onClick={handleLike}
                sx={{
                    minWidth: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: hasLiked
                        ? 'linear-gradient(135deg, rgba(224, 122, 95, 0.35), rgba(127, 176, 105, 0.25))'
                        : 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(12px)',
                    border: hasLiked
                        ? '1px solid #e07a5f'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                    color: hasLiked ? '#e07a5f' : 'rgba(255, 255, 255, 0.8)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    p: 0,
                    boxShadow: hasLiked
                        ? '0 0 16px rgba(224, 122, 95, 0.4)'
                        : '0 4px 16px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                        transform: 'scale(1.08)',
                        background: 'rgba(224, 122, 95, 0.2)',
                        borderColor: '#e07a5f',
                        boxShadow: '0 0 20px rgba(224, 122, 95, 0.5)',
                    },
                }}
            >
                <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>{hasLiked ? '♥' : '♡'}</span>
                <span style={{ fontSize: '0.62rem', lineHeight: 1, marginTop: 2 }}>{likes}</span>
            </Button>
        </Box>
    );
};

export default FloatingWidgets;
