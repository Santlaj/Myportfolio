export interface Technology {
    name: string;
    iconColor: string;
    iconType: string;
    featured?: boolean; 
}

export interface TechnicalArea {
    category: string;
    iconType: 'devices' | 'storage' | 'cloud';
    technologies: Technology[];
    description: string;
    descriptionHighlight: string;
}

export interface Experience {
    role: string;
    company: string;
    companyUrl: string;
    period: string;
    description: string[];
    iconType: 'work';
}

export interface AboutMeData {
    title: string;
    lead: string;
    paragraphs: string[];
    academicStatus: {
        institution: string;
        degree: string;
    };
    problemSolving: {
        highlight: string;
        details: string;
    };
}

export const aboutMe: AboutMeData = {
    title: 'About Santlaj',
    lead: 'A FullStack developer focused on building practical, reliable, and scalable software.',
    paragraphs: [
        'Specializes in backend development, full-stack applications, APIs, databases, and problem solving, with hands-on experience building real-world products.',
        'Focused on strong engineering fundamentals, clean architecture, and continuously improving through building and solving.',
    ],
    academicStatus: {
        institution: 'Lovely Professional University (LPU)',
        degree: 'B.Tech Computer Science & Engineering • 3rd Year (5th Semester)',
    },
    problemSolving: {
        highlight: '150+ LeetCode Problems Solved',
        details: 'Data Structures & Algorithms with C++ and Java',
    },
};

export const technicalAreas: TechnicalArea[] = [
    {
        category: 'Programming Languages',
        iconType: 'devices',
        technologies: [
            { name: 'C++', iconColor: '#00599C', iconType: 'cplusplus', featured: true },
            { name: 'JavaScript', iconColor: '#F7DF1E', iconType: 'javascript', featured: true },
            { name: 'SQL', iconColor: '#E48E00', iconType: 'sql', featured: true },
            { name: 'Java (DSA Coursework)', iconColor: '#ED8B00', iconType: 'java', featured: true },
            { name: 'TypeScript', iconColor: '#3178C6', iconType: 'typescript', featured: true },
        ],
        description: 'Core languages for algorithmic problem solving, system logic, and web applications',
        descriptionHighlight: 'From competitive programming in C++ to full-stack systems in JavaScript',
    },
    {
        category: 'Frontend Development',
        iconType: 'devices',
        technologies: [
            { name: 'React', iconColor: '#61DAFB', iconType: 'react', featured: true },
            { name: 'Next.js', iconColor: '#ffffff', iconType: 'nextjs', featured: true },
            { name: 'HTML5', iconColor: '#E34F26', iconType: 'html', featured: true },
            { name: 'CSS3', iconColor: '#1572B6', iconType: 'css', featured: true },
            { name: 'Tailwind CSS', iconColor: '#06B6D4', iconType: 'tailwind', featured: true },
            { name: 'Material UI', iconColor: '#007FFF', iconType: 'mui' },
        ],
        description: 'Modern frontend frameworks, responsive UI architecture, and seamless UX design',
        descriptionHighlight: 'Clean, performant component hierarchies and interactive user experiences',
    },
    {
        category: 'Backend & APIs',
        iconType: 'storage',
        technologies: [
            { name: 'Node.js', iconColor: '#339933', iconType: 'nodejs', featured: true },
            { name: 'Express.js', iconColor: '#ffffff', iconType: 'express', featured: true },
            { name: 'REST APIs', iconColor: '#FF6B6B', iconType: 'rest', featured: true },
            { name: 'Prisma ORM', iconColor: '#2D3748', iconType: 'prisma', featured: true },
            { name: 'Microservices', iconColor: '#4ECDC4', iconType: 'microservices' },
        ],
        description: 'Server-side application logic, robust API design, and asynchronous request handling',
        descriptionHighlight: 'Engineered for resilience, throughput, and clean modular structure',
    },
    {
        category: 'Database & Infrastructure',
        iconType: 'cloud',
        technologies: [
            { name: 'PostgreSQL', iconColor: '#336791', iconType: 'postgresql', featured: true },
            { name: 'Redis', iconColor: '#DC382D', iconType: 'redis', featured: true },
            { name: 'Prisma', iconColor: '#2D3748', iconType: 'prisma', featured: true },
            { name: 'Supabase', iconColor: '#3ECF8E', iconType: 'supabase', featured: true },
            { name: 'Git', iconColor: '#F05032', iconType: 'git', featured: true },
            { name: 'GitHub', iconColor: '#ffffff', iconType: 'github', featured: true },
            { name: 'Docker', iconColor: '#2496ED', iconType: 'docker' },
        ],
        description: 'Relational data modeling, in-memory caching, cloud BaaS, and version control',
        descriptionHighlight: 'High performance data persistence and seamless team collaboration workflows',
    },
    {
        category: 'Problem Solving & DSA',
        iconType: 'storage',
        technologies: [
            { name: 'Data Structures & Algorithms', iconColor: '#7fb069', iconType: 'dsa', featured: true },
            { name: '150+ LeetCode Solved', iconColor: '#FFA116', iconType: 'leetcode', featured: true },
            { name: 'Java DSA Coursework', iconColor: '#ED8B00', iconType: 'java' },
            { name: 'C++ Problem Solving', iconColor: '#00599C', iconType: 'cplusplus' },
        ],
        description: 'Strong foundation in arrays, linked lists, trees, graphs, DP, and algorithmic complexity',
        descriptionHighlight: 'Proven analytical rigor with 150+ problems solved on LeetCode',
    },
];

export const experiences: Experience[] = [
    {
        role: 'Full Stack & Open Source Engineer',
        company: 'StackAudit (Featured Project)',
        companyUrl: 'https://github.com/Santlaj',
        period: '2024 - Present',
        description: [
            'Architected StackAudit — an Open Source Contribution Intelligence Platform helping developers discover issues and analyze repositories;',
            'Implemented GitHub-based repository & issue discovery alongside developer-issue compatibility matching algorithms;',
            'Engineered AI-assisted repository analysis, architectural insights, and relevant-file mapping;',
            'Built high-speed Redis caching for frequently accessed repository endpoints and structured PostgreSQL persistence via Prisma ORM;',
        ],
        iconType: 'work',
    },
    {
        role: 'B.Tech in Computer Science & Engineering',
        company: 'Lovely Professional University (LPU)',
        companyUrl: 'https://www.lpu.in',
        period: '2022 - 2026 (3rd Year, 5th Sem)',
        description: [
            'Pursuing B.Tech CSE focusing on Data Structures & Algorithms, Operating Systems, Database Management Systems, and Software Engineering;',
            'Solved 150+ algorithmic coding problems on LeetCode using C++ and Java;',
            'Active builder in the developer community, translating theoretical CS principles into practical, scalable software systems;',
        ],
        iconType: 'work',
    },
];
