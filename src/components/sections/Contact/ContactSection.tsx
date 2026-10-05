import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
    IconButton,
    Snackbar,
    Alert,
    Chip,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Email,
    LinkedIn,
    GitHub,
    Send,
    LocationOn,
} from '@mui/icons-material';
import siteConfig from '../../../config/site';

const ContactSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            _subject: `[Portfolio Contact] ${formData.subject || 'Message from ' + formData.name}`,
            message: formData.message,
            _captcha: 'false',
            _template: 'table',
        };

        try {
            // Send directly via fetch in background
            const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json().catch(() => null);

            if (response.ok || (data && data.success !== false && data.success !== 'false')) {
                setSnackbar({
                    open: true,
                    message: 'Message sent directly! Check your inbox soon.',
                    severity: 'success',
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
                return;
            } else if (data && data.message && (data.message.includes('authorize') || data.message.includes('confirm') || data.message.includes('activation'))) {
                setSnackbar({
                    open: true,
                    message: `Verification link sent to ${siteConfig.email}! Please click 'Activate Form' in your email once.`,
                    severity: 'success',
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
                return;
            } else {
                throw new Error(data?.message || 'AJAX submission failed');
            }
        } catch (err) {
            console.warn('Direct fetch encountered an issue, submitting via background iframe:', err);
            // Submit natively through hidden iframe - NEVER opens Outlook!
            try {
                const hiddenForm = document.createElement('form');
                hiddenForm.action = `https://formsubmit.co/${siteConfig.email}`;
                hiddenForm.method = 'POST';
                hiddenForm.target = 'hidden_contact_iframe';

                Object.entries(payload).forEach(([k, v]) => {
                    const inp = document.createElement('input');
                    inp.type = 'hidden';
                    inp.name = k;
                    inp.value = v;
                    hiddenForm.appendChild(inp);
                });

                document.body.appendChild(hiddenForm);
                hiddenForm.submit();
                document.body.removeChild(hiddenForm);

                setSnackbar({
                    open: true,
                    message: 'Message transmitted directly! Check your inbox soon.',
                    severity: 'success',
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } catch (fallbackErr) {
                console.error('Submission error:', fallbackErr);
                setSnackbar({
                    open: true,
                    message: 'Could not transmit. Please reach out directly to ' + siteConfig.email,
                    severity: 'error',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <Email />,
            label: 'Email',
            value: siteConfig.email,
            link: `mailto:${siteConfig.email}`,
        },
        {
            icon: <LocationOn />,
            label: 'Location',
            value: 'Lovely Professional University, Punjab, India',
            link: '',
        },
    ];

    const socialLinks = [
        {
            icon: <GitHub />,
            label: 'GitHub',
            url: siteConfig.github,
        },
        {
            icon: <LinkedIn />,
            label: 'LinkedIn',
            url: siteConfig.linkedin,
        },
        {
            icon: <Email />,
            label: 'Email',
            url: `mailto:${siteConfig.email}`,
        },
    ];

    return (
        <Box
            component="section"
            id="contact"
            sx={{
                py: { xs: 8, md: 12 },
                background: 'transparent',
                position: 'relative',
                overflow: 'hidden',
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

            {/* Background decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '-5%',
                    width: 350,
                    height: 350,
                    borderRadius: '50%',
                    background: theme.palette.mode === 'dark'
                        ? `radial-gradient(circle, ${theme.palette.primary.dark}12 0%, transparent 70%)`
                        : `radial-gradient(circle, ${theme.palette.primary.light}08 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    animation: 'float 8s ease-in-out infinite',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '-8%',
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    background: theme.palette.mode === 'dark'
                        ? `radial-gradient(circle, ${theme.palette.secondary.dark}12 0%, transparent 70%)`
                        : `radial-gradient(circle, ${theme.palette.secondary.light}08 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    animation: 'float 6s ease-in-out infinite reverse',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Section badge */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Chip
                        icon={<Email />}
                        label="LET'S CONNECT"
                        sx={{
                            backgroundColor: theme.palette.mode === 'dark'
                                ? theme.palette.primary.dark + '40'
                                : theme.palette.primary.light + '20',
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            border: `1px solid ${theme.palette.primary.main}40`,
                        }}
                    />
                </Box>

                <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                        mb: 2,
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        fontWeight: 700,
                        background: theme.palette.mode === 'dark'
                            ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`
                            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: theme.palette.mode === 'dark' ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                >
                    Get In Touch
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        mb: 8,
                        color: theme.palette.text.secondary,
                        fontSize: '1.2rem',
                        maxWidth: 700,
                        mx: 'auto',
                        lineHeight: 1.6,
                        fontWeight: 400,
                    }}
                >
                    I'm always interested in new opportunities and exciting projects.
                    Whether you have a question or just want to say hi, feel free to reach out!
                </Typography>

                <Grid container spacing={isMobile ? 3 : 4}>
                    {/* Contact Form */}
                    <Grid size={{ xs: 12, sm: 12, md: 7, lg: 8 }}>
                        <Card
                            sx={{
                                background: theme.palette.mode === 'dark'
                                    ? `linear-gradient(145deg, rgba(18, 23, 20, 0.9) 0%, rgba(22, 27, 34, 0.8) 100%)`
                                    : `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}06 50%, ${theme.palette.secondary.light}04 100%)`,
                                backdropFilter: 'blur(20px)',
                                border: theme.palette.mode === 'dark'
                                    ? `1px solid ${theme.palette.primary.main}30`
                                    : `1px solid ${theme.palette.primary.main}15`,
                                borderRadius: 3,
                                overflow: 'hidden',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? `0 8px 32px ${theme.palette.primary.dark}20`
                                    : `0 8px 32px ${theme.palette.primary.main}10`,
                            }}
                        >
                            {/* Terminal window header */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 3,
                                    py: 1.5,
                                    borderBottom: theme.palette.mode === 'dark'
                                        ? `1px solid ${theme.palette.primary.main}20`
                                        : `1px solid ${theme.palette.primary.main}15`,
                                    background: theme.palette.mode === 'dark'
                                        ? 'rgba(12, 16, 13, 0.7)'
                                        : 'rgba(240, 240, 240, 0.6)',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27c93f' }} />
                                    <Typography
                                        sx={{
                                            ml: 1.5,
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.8rem',
                                            color: theme.palette.text.secondary,
                                            fontWeight: 500,
                                        }}
                                    >
                                        contact@santlaj.kumar ~ $ ./send_message.sh
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.75rem',
                                        color: theme.palette.primary.main,
                                        opacity: 0.8,
                                    }}
                                >
                                    status: online
                                </Typography>
                            </Box>

                            <CardContent sx={{ p: 4 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 3,
                                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                                        fontWeight: 600,
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    Send me a message
                                </Typography>

                                <Box component="form" id="portfolio-contact-form" onSubmit={handleSubmit}>
                                    <iframe
                                        name="hidden_contact_iframe"
                                        id="hidden_contact_iframe"
                                        style={{ display: 'none', width: 0, height: 0, border: 'none' }}
                                        title="hidden_contact_submission"
                                    />
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: theme.palette.mode === 'dark'
                                                                ? theme.palette.primary.main + '40'
                                                                : theme.palette.primary.main + '30',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary,
                                                    },
                                                }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Your Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: theme.palette.mode === 'dark'
                                                                ? theme.palette.primary.main + '40'
                                                                : theme.palette.primary.main + '30',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary,
                                                    },
                                                }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: theme.palette.mode === 'dark'
                                                                ? theme.palette.primary.main + '40'
                                                                : theme.palette.primary.main + '30',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary,
                                                    },
                                                }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Your Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: theme.palette.mode === 'dark'
                                                                ? theme.palette.primary.main + '40'
                                                                : theme.palette.primary.main + '30',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: theme.palette.text.primary,
                                                    },
                                                }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={loading}
                                                startIcon={<Send sx={{ fontSize: '1.1rem !important' }} />}
                                                sx={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: theme.palette.primary.contrastText,
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    fontWeight: 700,
                                                    letterSpacing: '0.5px',
                                                    py: 1.5,
                                                    px: 5,
                                                    borderRadius: 2,
                                                    boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.primary.dark,
                                                        boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                                                        transform: 'translateY(-2px)',
                                                    },
                                                    '&:disabled': {
                                                        backgroundColor: theme.palette.action.disabledBackground,
                                                        color: theme.palette.action.disabled,
                                                    },
                                                }}
                                            >
                                                {loading ? '$ transmitting...' : '$ send_message'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Contact Info */}
                    <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4 }}>
                        <Stack spacing={isMobile ? 2 : 3}>
                            {/* Contact Information */}
                            <Card
                                sx={{
                                    background: theme.palette.mode === 'dark'
                                        ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.dark}08 100%)`
                                        : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}05 100%)`,
                                    border: theme.palette.mode === 'dark'
                                        ? `1px solid ${theme.palette.primary.main}20`
                                        : `1px solid ${theme.palette.primary.main}15`,
                                    borderRadius: 2,
                                }}
                            >
                                <CardContent sx={{ p: isMobile ? 2.5 : 3 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 3,
                                            fontWeight: 600,
                                            color: 'primary.main',
                                            fontSize: isMobile ? '1.4rem' : '1.5rem',
                                            textAlign: isMobile ? 'center' : 'left',
                                        }}
                                    >
                                        Contact Information
                                    </Typography>

                                    <Stack spacing={2.5}>
                                        {contactInfo.map((info, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: isMobile ? 'center' : 'center',
                                                    gap: 2,
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                        flexShrink: 0,
                                                        alignSelf: isMobile ? 'center' : 'flex-start',
                                                    }}
                                                >
                                                    {info.icon}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontSize: '0.875rem',
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {info.label}
                                                    </Typography>
                                                    {info.link ? (
                                                        <Typography
                                                            component="a"
                                                            href={info.link}
                                                            variant="body1"
                                                            sx={{
                                                                color: 'text.primary',
                                                                textDecoration: 'none',
                                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                                                wordBreak: 'break-word',
                                                                lineHeight: 1.4,
                                                                display: 'block',
                                                                '&:hover': {
                                                                    color: 'primary.main',
                                                                },
                                                            }}
                                                        >
                                                            {info.value}
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: 'text.primary',
                                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                                                wordBreak: 'break-word',
                                                                lineHeight: 1.4,
                                                            }}
                                                        >
                                                            {info.value}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card
                                sx={{
                                    background: theme.palette.mode === 'dark'
                                        ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.dark}08 100%)`
                                        : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.light}05 100%)`,
                                    border: theme.palette.mode === 'dark'
                                        ? `1px solid ${theme.palette.secondary.main}20`
                                        : `1px solid ${theme.palette.secondary.main}15`,
                                    borderRadius: 2,
                                }}
                            >
                                <CardContent sx={{ p: isMobile ? 2.5 : 3 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 3,
                                            fontWeight: 600,
                                            color: theme.palette.secondary.main,
                                            fontSize: isMobile ? '1.4rem' : '1.5rem',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Let's Connect
                                    </Typography>

                                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                                        {socialLinks.map((social, index) => (
                                            <IconButton
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    backgroundColor: theme.palette.mode === 'dark'
                                                        ? theme.palette.secondary.dark + '20'
                                                        : theme.palette.secondary.light + '20',
                                                    color: theme.palette.secondary.main,
                                                    border: `1px solid ${theme.palette.secondary.main}40`,
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.secondary.main,
                                                        color: theme.palette.secondary.contrastText,
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 12px ${theme.palette.secondary.main}40`,
                                                    },
                                                }}
                                            >
                                                {social.icon}
                                            </IconButton>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            {/* Snackbar for form feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactSection;
