export interface MenuItem {
    label: string;
    href: string;
}

export const menuItems: MenuItem[] = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
];

export const scrollToSection = (sectionId: string) => {
    const cleanId = sectionId.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
        const navbarHeight = window.innerWidth < 900 ? 64 : 72; // Match Toolbar heights
        const additionalOffset = 24; // Extra breathing room
        const totalOffset = navbarHeight + additionalOffset;
        
        const lenis = typeof window !== 'undefined' ? (window as any).lenis : null;
        if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(element, { offset: -totalOffset, duration: 1.2 });
        } else {
            const rect = element.getBoundingClientRect();
            const elementPosition = rect.top + window.scrollY - totalOffset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
};

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
