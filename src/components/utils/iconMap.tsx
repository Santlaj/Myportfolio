import React from 'react';
import {
    Storage,
    Devices,
    Cloud,
    Work,
} from '@mui/icons-material';
import {
    SiReact,
    SiTypescript,
    SiMui,
    SiJest,
    SiNextdotjs,
    SiNodedotjs,
    SiSharp,
    SiDotnet,
    SiGraphql,
    SiPostgresql,
    SiAmazon,
    SiSonarqube,
    SiVuedotjs,
    SiPhp,
    SiMysql,
    SiMongodb,
    SiSequelize,
    SiTypeorm,
    SiZapier,
    SiWebflow,
    SiZendesk,
    SiStrapi,
    SiNestjs,
    SiAdonisjs,
    SiJavascript,
    SiAstro,
    SiTailwindcss,
    SiRedux,
    SiWebpack,
    SiSass,
    SiHtml5,
    SiCss3,
    SiExpress,
    SiPrisma,
    SiDocker,
    SiLinux,
    SiGit,
    SiGithub,
    SiSwagger,
    SiCplusplus,
    SiRedis,
    SiSupabase,
    SiLeetcode,
} from 'react-icons/si';
import { FaServer, FaDatabase, FaJava, FaBrain, FaCode } from 'react-icons/fa';

export const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
        case 'devices':
            return <Devices />;
        case 'storage':
            return <Storage />;
        case 'cloud':
            return <Cloud />;
        case 'work':
            return <Work />;
        default:
            return <Devices />;
    }
};

export const getTechnologyIcon = (iconType: string, color: string) => {
    const style = { color };

    switch (iconType) {
        case 'react':
            return <SiReact style={style} />;
        case 'typescript':
            return <SiTypescript style={style} />;
        case 'javascript':
            return <SiJavascript style={style} />;
        case 'mui':
            return <SiMui style={style} />;
        case 'jest':
            return <SiJest style={style} />;
        case 'nextjs':
            return <SiNextdotjs style={style} />;
        case 'astro':
            return <SiAstro style={style} />;
        case 'tailwind':
            return <SiTailwindcss style={style} />;
        case 'redux':
            return <SiRedux style={style} />;
        case 'recoil':
            return <SiReact style={style} />;
        case 'webpack':
            return <SiWebpack style={style} />;
        case 'sass':
            return <SiSass style={style} />;
        case 'html':
            return <SiHtml5 style={style} />;
        case 'css':
            return <SiCss3 style={style} />;
        case 'nodejs':
            return <SiNodedotjs style={style} />;
        case 'express':
            return <SiExpress style={style} />;
        case 'nestjs':
            return <SiNestjs style={style} />;
        case 'adonis':
            return <SiAdonisjs style={style} />;
        case 'csharp':
            return <SiSharp style={style} />;
        case 'dotnet':
            return <SiDotnet style={style} />;
        case 'php':
            return <SiPhp style={style} />;
        case 'graphql':
            return <SiGraphql style={style} />;
        case 'vue':
            return <SiVuedotjs style={style} />;
        case 'postgresql':
            return <SiPostgresql style={style} />;
        case 'mysql':
            return <SiMysql style={style} />;
        case 'mongodb':
            return <SiMongodb style={style} />;
        case 'mssql':
            return <FaDatabase style={style} />;
        case 'sequelize':
            return <SiSequelize style={style} />;
        case 'typeorm':
            return <SiTypeorm style={style} />;
        case 'prisma':
            return <SiPrisma style={style} />;
        case 'docker':
            return <SiDocker style={style} />;
        case 'aws':
            return <SiAmazon style={style} />;
        case 'linux':
            return <SiLinux style={style} />;
        case 'git':
            return <SiGit style={style} />;
        case 'sonarqube':
            return <SiSonarqube style={style} />;
        case 'swagger':
            return <SiSwagger style={style} />;
        case 'zapier':
            return <SiZapier style={style} />;
        case 'webflow':
            return <SiWebflow style={style} />;
        case 'zendesk':
            return <SiZendesk style={style} />;
        case 'strapi':
            return <SiStrapi style={style} />;
        case 'cplusplus':
        case 'cpp':
            return <SiCplusplus style={style} />;
        case 'java':
            return <FaJava style={style} />;
        case 'redis':
            return <SiRedis style={style} />;
        case 'supabase':
            return <SiSupabase style={style} />;
        case 'github':
            return <SiGithub style={style} />;
        case 'leetcode':
            return <SiLeetcode style={style} />;
        case 'dsa':
        case 'algorithms':
            return <FaBrain style={style} />;
        case 'sql':
            return <FaDatabase style={style} />;
        case 'rest':
        case 'microservices':
        case 'spa':
        case 'solid':
        case 'scrum':
        case 'server':
            return <FaServer style={style} />;
        case 'database':
            return <FaDatabase style={style} />;
        default:
            return <FaCode style={style} />;
    }
};
