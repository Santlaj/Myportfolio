import React from 'react';
import { Box, Typography } from '@mui/material';

const FooterSection: React.FC = () => {
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
                ♡ 8 people liked this
            </Typography>
        </Box>
    );
};

export default FooterSection;
