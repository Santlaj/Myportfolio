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
    title: 'Software Engineer & Full-Stack Developer',
    tagline: '{ From real-world problems to scalable, usable systems. }',
    locationTag: 'LPU, India',
    description: `B.Tech CSE student at Lovely Professional University (3rd Year, 5th Sem). Focused on software engineering, backend development, DSA, and building practical software products with C++, JavaScript, React, Next.js, Node.js, Express, PostgreSQL, Redis, and Prisma.`,
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
