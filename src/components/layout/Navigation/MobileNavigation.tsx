import React from 'react';
import MobileMenuButton from './MobileMenuButton';
import MobileDrawer from './MobileDrawer';
import { menuItems } from './utils';

interface MobileNavigationProps {
    open: boolean;
    onToggle: () => void;
    onMenuClick: (sectionId: string) => void;
    activeSection: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
    open,
    onToggle,
    onMenuClick,
    activeSection,
}) => {
    return (
        <>
            <MobileMenuButton onClick={onToggle} />
            <MobileDrawer
                open={open}
                onClose={onToggle}
                menuItems={menuItems}
                activeSection={activeSection}
                onMenuClick={onMenuClick}
            />
        </>
    );
};

export default MobileNavigation;
