import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const FooterSection: React.FC = () => {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateLikes = () => {
                const savedLikes = localStorage.getItem('portfolio_likes');
                if (savedLikes) setLikes(parseInt(savedLikes, 10));
            };
            updateLikes();
            // Listen for storage changes (when like button is clicked)
            window.addEventListener('storage', updateLikes);
            // Also poll briefly to catch same-tab updates
            const interval = setInterval(updateLikes, 1000);
            return () => {
                window.removeEventListener('storage', updateLikes);
                clearInterval(interval);
            };
        }
    }, []);

    return (
        <Box
            component="footer"
            sx={{
                background: 'transparent',
                borderTop: '1px solid rgba(127, 176, 105, 0.15)',
                py: 6,
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
            }}
        >
            <Typography
                sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                    mb: 0.8,
                }}
            >
                $ exit 0
            </Typography>
            <Typography
                sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                    opacity: 0.7,
                    mb: 2.5,
                }}
            >
                &gt; Session terminated. Thanks for scrolling.
            </Typography>

            <Typography
                sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#7fb069',
                    mb: 1.5,
                }}
            >
                santlaj<span style={{ color: '#e07a5f' }}>.kumar</span>
            </Typography>

            <Typography
                sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                    opacity: 0.6,
                }}
            >
                {likes > 0 ? `♥ ${likes} ${likes === 1 ? 'person' : 'people'} liked this` : '♡ Be the first to like this'}
            </Typography>
        </Box>
    );
};

export default FooterSection;
