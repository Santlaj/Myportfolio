import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    useTheme,
    useMediaQuery,
    useScrollTrigger,
} from '@mui/material';

import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import BrandLogo from './BrandLogo';
import { menuItems, scrollToSection } from './utils';

const NavigationContainer: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setMobileOpen(false);
    };

    const handleBrandClick = () => {
        scrollToSection('#hero');
    };

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'skills', 'certifications', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: trigger
                        ? 'rgba(12, 16, 13, 0.85)'
                        : 'transparent',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: trigger ? '0 4px 20px rgba(0, 0, 0, 0.35)' : 'none',
                    border: 'none',
                    borderBottom: trigger
                        ? '1px solid rgba(127, 176, 105, 0.18)'
                        : '1px solid transparent',
                    transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
            >
                <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }}>
                    <BrandLogo trigger={trigger} onClick={handleBrandClick} />
                    {isMobile ? (
                        <MobileNavigation
                            open={mobileOpen}
                            onToggle={handleDrawerToggle}
                            onMenuClick={handleMenuClick}
                            activeSection={activeSection}
                        />
                    ) : (
                        <DesktopNavigation
                            menuItems={menuItems}
                            activeSection={activeSection}
                            onMenuClick={handleMenuClick}
                        />
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavigationContainer;
