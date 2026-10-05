import React from 'react';
import { ThemeContextProvider } from '../theme';
import Navigation from './Navigation';

const ThemedNavigation: React.FC = () => {
    return (
        <ThemeContextProvider>
            <Navigation />
        </ThemeContextProvider>
    );
};

export default ThemedNavigation;
