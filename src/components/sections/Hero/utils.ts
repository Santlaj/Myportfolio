export const scrollToSection = (sectionId: string) => {
    const cleanId = sectionId.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
        const navbarHeight = window.innerWidth < 900 ? 64 : 72; // Match Toolbar heights
        const additionalOffset = 24; 
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

export const PERSONAL_INFO = {
    name: 'Santlaj Kumar',
    firstName: 'Santlaj',
    lastName: 'Kumar',
    title: 'Software Developer',
    tagline: 'Building scalable software, backend systems and developer-focused products.',
    locationTag: 'India',
    description: `Software developer focused on backend systems, full-stack applications, APIs, databases, and developer tools. Building practical, reliable, and scalable software products with C++, JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, Redis, and Prisma.`,
    profileImage: '/profile-photo.png',
    initials: 'SK',
    skills: [
        'C++', 'JavaScript', 'React', 'Next.js', 'Node.js',
        'Express.js', 'PostgreSQL', 'Redis', 'Prisma', 'SQL', 'DSA'
    ],
    social: {
        github: 'https://github.com/Santlaj',
        linkedin: 'https://www.linkedin.com/in/santlaj-kumar-mehta-23541a320/',
        email: 'mailto:santlaj.dev@gmail.com',
    }
} as const;
