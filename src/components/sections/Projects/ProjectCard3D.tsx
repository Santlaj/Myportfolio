import React, { useRef, useState } from 'react';
import { Card, Box } from '@mui/material';

interface ProjectCard3DProps {
    children: React.ReactNode;
    indexNumber?: string;
    sx?: any;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ children, indexNumber, sx }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({
        rotX: 0,
        rotY: 0,
        glareX: 50,
        glareY: 50,
        isHovered: false,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Max 8 degrees tilt
        const rotX = -((y - centerY) / centerY) * 8;
        const rotY = ((x - centerX) / centerX) * 8;
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setTilt({ rotX, rotY, glareX, glareY, isHovered: true });
    };

    const handleMouseLeave = () => {
        setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50, isHovered: false });
    };

    return (
        <Card
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            sx={{
                position: 'relative',
                transform: tilt.isHovered
                    ? `perspective(1000px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) translateZ(8px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                transition: tilt.isHovered
                    ? 'transform 0.12s ease-out'
                    : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease',
                transformStyle: 'preserve-3d',
                overflow: 'hidden',
                borderRadius: 3,
                backdropFilter: 'blur(16px)',
                ...sx,
                // Moving 3D Specular Glare
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    zIndex: 10,
                    opacity: tilt.isHovered ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    background: `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(127, 176, 105, 0.18) 0%, transparent 80%)`,
                },
            }}
        >
            {/* Watermark 3D Index Number (01, 02...) */}
            {indexNumber && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 18,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '6rem',
                        fontWeight: 900,
                        color: 'rgba(127, 176, 105, 0.05)',
                        lineHeight: 1,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        zIndex: 0,
                    }}
                >
                    {indexNumber}
                </Box>
            )}
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
        </Card>
    );
};

export default ProjectCard3D;
