import React from 'react';
import { ThemeContextProvider } from '../theme';
import { HeroSection } from '../sections/Hero';

const ThemedHeroSection: React.FC = () => {
    return (
        <ThemeContextProvider>
            <HeroSection />
        </ThemeContextProvider>
    );
};

export default ThemedHeroSection;
