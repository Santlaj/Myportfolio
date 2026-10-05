import React from 'react';
import { ThemeContextProvider } from '../theme';
import Navigation from './Navigation';
import { ThreeScene3D } from './ThreeScene3D';
import { RightScrollIndicator } from './RightScrollIndicator';
import { FloatingWidgets } from './FloatingWidgets';
import { HeroSection } from '../sections/Hero';
import { AboutSection } from '../sections/About';
import { SkillsSection } from '../sections/Skills';
import { CertificationsSection } from '../sections/Certifications';
import { ContactSection } from '../sections/Contact';
import { FooterSection } from '../sections/Footer';

const App: React.FC = () => {
    return (
        <ThemeContextProvider>
            {/* Global Interactive 3D WebGL Background Scene */}
            <ThreeScene3D />

            {/* Navigation Header */}
            <Navigation />

            {/* Right Edge Section Progress Line */}
            <RightScrollIndicator />

            {/* Floating Corner Actions (Like counter & Scroll to top) */}
            <FloatingWidgets />

            <main style={{ position: 'relative', zIndex: 1 }}>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <CertificationsSection />
                <ContactSection />
            </main>
            <FooterSection />
        </ThemeContextProvider>
    );
};

export default App;
