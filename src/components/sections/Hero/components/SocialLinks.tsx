import React from 'react';
import { Button, Stack } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

interface SocialLinksProps {
    githubUrl: string;
    linkedinUrl: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ githubUrl, linkedinUrl }) => (
    <Stack direction="row" spacing={2}>
        <Button
            variant="text"
            startIcon={<GitHub />}
            href={githubUrl}
            target="_blank"
            sx={{ color: 'text.secondary' }}
        >
            GitHub
        </Button>
        <Button
            variant="text"
            startIcon={<LinkedIn />}
            href={linkedinUrl}
            target="_blank"
            sx={{ color: 'text.secondary' }}
        >
            LinkedIn
        </Button>
    </Stack>
);

export default SocialLinks;
