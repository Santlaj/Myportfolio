import React from 'react';
import { ThemeContextProvider } from '../theme';
import { FooterSection } from '../sections/Footer';

const ThemedFooterSection: React.FC = () => {
    return (
        <ThemeContextProvider>
            <FooterSection />
        </ThemeContextProvider>
    );
};

export default ThemedFooterSection;
