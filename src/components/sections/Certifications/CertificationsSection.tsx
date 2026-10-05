import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    School,
    VerifiedUser,
    Launch,
    WorkspacePremium,
} from '@mui/icons-material';

interface CredentialItem {
    title: string;
    institution: string;
    institutionUrl: string;
    type: string;
    credentialUrl: string;
    description: string;
    badge: string;
    issueDate?: string;
}

const credentials: CredentialItem[] = [
    {
        title: 'Oracle Agentic AI Foundations Associate',
        institution: 'Oracle',
        institutionUrl: 'https://www.oracle.com',
        type: 'Agentic AI & LLMs',
        issueDate: "Aug' 2026",
        credentialUrl: 'https://drive.google.com/file/d/1-2pC6dQ4fMfhjlu3VxNi1AvpaNFiBmSb/view',
        description: 'Certified foundational competency in Autonomous AI Agents, LLM system architecture, tool integration, prompt engineering, and agentic workflows.',
        badge: 'Oracle Certified',
    },
    {
        title: 'DSA with Java',
        institution: 'ApnaCollege',
        institutionUrl: 'https://www.apnacollege.in',
        type: 'Data Structures & Algorithms',
        issueDate: "Aug' 2026",
        credentialUrl: 'https://drive.google.com/file/d/1TkFsCFGSHBBV3BU-RumjNF6UZu-QbUMG/view?usp=sharing',
        description: 'In-depth algorithmic problem solving covering dynamic programming, graph traversal, trees, recursion, and core data structure implementations in Java.',
        badge: 'DSA Certified',
    },
    {
        title: 'Infosys Database Management System',
        institution: 'Infosys',
        institutionUrl: 'https://www.infosys.com',
        type: 'Database Systems & SQL',
        issueDate: "Jul' 2026",
        credentialUrl: 'https://drive.google.com/file/d/1Qhjg6u9g_1vdrdR6K6wpRROo8KTd_GIq/view',
        description: 'Comprehensive relational database engineering covering normalization, schema architecture, complex SQL queries, indexing, and ACID transaction reliability.',
        badge: 'Infosys Certified',
    },
    {
        title: 'Object Oriented Programming',
        institution: 'neocolab',
        institutionUrl: 'https://neocolab.com',
        type: 'OOP & Software Design',
        issueDate: "Jan' 2026",
        credentialUrl: 'https://drive.google.com/file/d/1MVIaPKpbzU77uL1pXLvnn4yIZSGLeQLu/view',
        description: 'Rigorous programming foundations covering OOP pillars — encapsulation, inheritance, polymorphism, abstraction, and clean modular code design patterns.',
        badge: 'neocolab Certified',
    },
];

export const CertificationsSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="section"
            id="certifications"
            sx={{
                py: { xs: 10, md: 16 },
                background: 'transparent',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
            }}
        >
            {/* Glowing Section Header Transition Line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(127,176,105,0.3) 20%, #7fb069 50%, rgba(224,122,95,0.3) 80%, transparent 100%)',
                    boxShadow: '0 0 12px rgba(127,176,105,0.6)',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'primary.main',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.85rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 1.5,
                        }}
                    >
                        // The paperwork behind the work
                    </Typography>

                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: isMobile ? '2.4rem' : '3.6rem',
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #ffffff 40%, #e07a5f 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.15,
                        }}
                    >
                        Certifications & Credentials
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            fontSize: '1.15rem',
                            maxWidth: 680,
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        Formal qualifications and continuous specialization in software engineering and artificial intelligence.
                    </Typography>
                </Box>

                {/* Grid of Credentials */}
                <Grid container spacing={3.5}>
                    {credentials.map((cred, idx) => (
                        <Grid size={{ xs: 12, md: 6 }} key={idx}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: 'rgba(12, 16, 13, 0.75)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(127, 176, 105, 0.25)',
                                    borderRadius: 3,
                                    p: { xs: 2.5, sm: 3 },
                                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        borderColor: '#7fb069',
                                        boxShadow: '0 12px 32px rgba(127, 176, 105, 0.2)',
                                    },
                                }}
                            >
                                <Box>
                                    {/* Top badges */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                                        <Chip
                                            icon={<WorkspacePremium sx={{ fontSize: 16, color: '#7fb069 !important' }} />}
                                            label={cred.badge}
                                            sx={{
                                                background: 'rgba(127, 176, 105, 0.12)',
                                                border: '1px solid rgba(127, 176, 105, 0.4)',
                                                color: '#7fb069',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.72rem',
                                                fontWeight: 700,
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.72rem',
                                                color: 'rgba(255, 255, 255, 0.4)',
                                            }}
                                        >
                                            [0{idx + 1}]
                                        </Typography>
                                    </Box>

                                    {/* Degree / Certification Title */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 700,
                                            fontSize: '1.15rem',
                                            lineHeight: 1.35,
                                            color: '#ffffff',
                                            mb: 1.2,
                                        }}
                                    >
                                        {cred.title}
                                    </Typography>

                                    {/* Institution & Issue Date */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                        <Typography
                                            component="a"
                                            href={cred.institutionUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.82rem',
                                                color: '#e07a5f',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                transition: 'color 0.2s ease',
                                                '&:hover': {
                                                    color: '#ff9a7f',
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            {cred.institution}
                                        </Typography>
                                        {cred.issueDate && (
                                            <Typography
                                                sx={{
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    fontSize: '0.75rem',
                                                    color: 'rgba(255, 255, 255, 0.6)',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    px: 1,
                                                    py: 0.2,
                                                    borderRadius: '6px',
                                                }}
                                            >
                                                {cred.issueDate}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Description */}
                                    <Typography
                                        sx={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: '0.88rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.6,
                                            mb: 3,
                                        }}
                                    >
                                        {cred.description}
                                    </Typography>
                                </Box>

                                {/* Action link */}
                                <Button
                                    variant="outlined"
                                    href={cred.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    endIcon={<Launch sx={{ fontSize: 16 }} />}
                                    sx={{
                                        alignSelf: 'flex-start',
                                        borderRadius: '9999px',
                                        borderColor: 'rgba(127, 176, 105, 0.4)',
                                        color: '#7fb069',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.78rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        px: 2,
                                        py: 0.7,
                                        transition: 'all 0.25s ease',
                                        '&:hover': {
                                            borderColor: '#7fb069',
                                            background: 'rgba(127, 176, 105, 0.15)',
                                            color: '#a8ff78',
                                        },
                                    }}
                                >
                                    View Credential
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default CertificationsSection;
