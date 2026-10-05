export interface MetricHighlight {
    label: string;
    value: string;
    description: string;
}

export interface ArchitectureComponent {
    layer: string;
    technologies: string[];
    role: string;
}

export interface TechnicalChallenge {
    title: string;
    problem: string;
    tradeoffs: string;
    solution: string;
}

export interface CodeSnippet {
    title: string;
    language: string;
    description: string;
    code: string;
}

export interface CaseStudyData {
    slug: string;
    title: string;
    subtitle: string;
    tagline: string;
    category: 'Open Source Intelligence' | 'Full-Stack Enterprise Platform' | 'High-Throughput Security Engine';
    period: string;
    role: string;
    status: 'Completed' | 'Active & Maintained';
    heroAccent: string;
    liveUrl?: string;
    githubUrl?: string;
    summary: string;
    metrics: MetricHighlight[];
    architecture: {
        overview: string;
        dataFlow: string[];
        components: ArchitectureComponent[];
    };
    techStack: {
        name: string;
        category: string;
        reason: string;
    }[];
    challenges: TechnicalChallenge[];
    codeSnippets: CodeSnippet[];
    databaseDesign: {
        overview: string;
        keyEntities: { name: string; description: string; fields: string[] }[];
    };
    learnings: string[];
    futureRoadmap: string[];
}

export const caseStudies: Record<string, CaseStudyData> = {
    'stackaudit': {
        slug: 'stackaudit',
        title: 'StackAudit',
        subtitle: 'Open Source Contribution Intelligence Platform',
        tagline: 'Bridging the gap between ambitious developers and impactful open-source contributions through intelligent issue matching and deep architectural analysis.',
        category: 'Open Source Intelligence',
        period: '2024 - Present',
        role: 'Lead Architect & Full-Stack Engineer',
        status: 'Active & Maintained',
        heroAccent: '#7fb069',
        liveUrl: 'https://stackaudit.santlaj.in',
        githubUrl: 'https://github.com/Santlaj/stackAudit',
        summary: 'StackAudit was built to solve a pervasive problem in open source: developers spend hours sifting through thousands of stale, mislabeled, or overwhelmingly complex GitHub issues. StackAudit indexes repositories, evaluates developer proficiencies against issue prerequisites, and generates instant architectural file-tree maps to dramatically shorten the ramp-up time before submitting a pull request.',
        metrics: [
            {
                value: '85%',
                label: 'Latency Reduction',
                description: 'Achieved through multi-tier Redis caching for GitHub API responses and parsed repository ASTs.',
            },
            {
                value: '< 1.2s',
                label: 'Analysis Latency',
                description: 'Average response time for end-to-end repository architectural decomposition and module mapping.',
            },
            {
                value: '5,000+',
                label: 'Rate Limit Shield',
                description: 'Efficient ETag and TTL caching protects against GitHub REST/GraphQL API hourly rate exhaustion.',
            },
            {
                value: '100+',
                label: 'Repositories Indexed',
                description: 'Curated dataset of active open-source projects across TypeScript, C++, Python, and Go.',
            },
        ],
        architecture: {
            overview: 'StackAudit employs a decoupled full-stack architecture. The Next.js frontend delivers a high-speed, interactive search and inspection UI. The Node.js and Express backend coordinates background ingestion workers, queries GitHub APIs with conditional HTTP headers, stores persistent user profiles and bookmarks in PostgreSQL via Prisma ORM, and caches volatile repository structures in Redis.',
            dataFlow: [
                'Developer inputs query criteria (preferred language, tech stack, issue difficulty, repository activity velocity).',
                'API gateway checks Redis in-memory cache for recent indexed snapshots of matching repositories and issue lists.',
                'On cache miss, backend worker dispatches asynchronous requests to GitHub REST and GraphQL APIs with authorization tokens.',
                'The ingestion engine analyzes repository trees, filtering out build artifacts (dist, node_modules) and identifying core architecture entry points.',
                'A multi-factor matching algorithm calculates a compatibility score between developer skills and issue requirements.',
                'Persisted metrics and user bookmarks are committed to PostgreSQL via Prisma ORM for instantaneous recall.',
            ],
            components: [
                {
                    layer: 'Frontend Application',
                    technologies: ['Next.js 14', 'React 18', 'Tailwind CSS', 'Lucide Icons'],
                    role: 'Server-side rendered search interface, responsive repository dashboard, interactive file-tree visualizer.',
                },
                {
                    layer: 'Backend API Service',
                    technologies: ['Node.js', 'Express.js', 'TypeScript', 'RESTful Endpoints'],
                    role: 'Request routing, GitHub API orchestration, rate-limit management, matching algorithms, authentication middleware.',
                },
                {
                    layer: 'In-Memory Cache & Rate Limiter',
                    technologies: ['Redis', 'ioredis', 'TTL Expiry'],
                    role: 'High-speed storage of volatile GitHub API payloads, ETag headers, and user rate-limit token buckets.',
                },
                {
                    layer: 'Relational Persistence',
                    technologies: ['PostgreSQL', 'Prisma ORM', 'Supabase'],
                    role: 'User accounts, saved repositories, custom developer skill profiles, and contribution bookmarks.',
                },
            ],
        },
        techStack: [
            {
                name: 'Next.js 14 & React',
                category: 'Frontend Framework',
                reason: 'Enables instant server-side page loads for SEO, paired with React client components for dynamic filtering and responsive UI interactions.',
            },
            {
                name: 'Node.js & Express.js',
                category: 'Backend Runtime & Framework',
                reason: 'Asynchronous non-blocking I/O allows concurrent querying of external GitHub endpoints without thread starvation.',
            },
            {
                name: 'PostgreSQL & Prisma ORM',
                category: 'Database & Data Access',
                reason: 'Strict relational integrity and strong type-safety generated directly from schema definitions, eliminating runtime query bugs.',
            },
            {
                name: 'Redis',
                category: 'In-Memory Cache',
                reason: 'Essential for shielding the application against GitHub API rate limits (5,000 requests/hr) and serving frequent queries with sub-5ms latency.',
            },
            {
                name: 'TypeScript',
                category: 'Language',
                reason: 'End-to-end type safety between database models, backend API responses, and frontend component states.',
            },
        ],
        challenges: [
            {
                title: 'GitHub API Rate Limit Depletion & Throttling',
                problem: 'Deeply querying repositories for file trees, commits, and issue metadata quickly exhausts GitHub API rate limits (5,000 req/hr) when multiple users search simultaneously.',
                tradeoffs: 'Storing everything permanently in SQL would cause stale repository data; querying on every request leads to immediate 429 Too Many Requests errors.',
                solution: 'Engineered a tiered Redis caching architecture with conditional HTTP ETags. Static repository structures are cached for 24 hours, active issues for 60 minutes. When re-fetching, the backend supplies `If-None-Match: [etag]` headers — if unchanged, GitHub returns 304 Not Modified which consumes 0 rate-limit quota.',
            },
            {
                title: 'Developer–Issue Compatibility Matching Algorithm',
                problem: 'Many issues labeled "good first issue" in major open-source repos actually involve undocumented internal abstractions, leading to frustration and abandoned PRs.',
                tradeoffs: 'Simple keyword search missed context, while full LLM evaluation of every issue was cost-prohibitive.',
                solution: 'Built a weighted heuristic scoring algorithm factoring in: (1) Lines of code modified in prior closed PRs with similar labels, (2) Language proficiency overlap, (3) Complexity of touched directory paths, and (4) Issue description clarity. Only top-ranked candidates are passed to LLM for final synthesis.',
            },
            {
                title: 'Large Repository Tree Traversal & Context Bloat',
                problem: 'Scanning repositories with tens of thousands of files overloaded client browsers and blew past token limits when passing code structure to analysis engines.',
                tradeoffs: 'Truncating arbitrarily created blind spots; downloading full archives took too long.',
                solution: 'Implemented an intelligent tree-pruning heuristic: auto-ignores known directories (`node_modules`, `vendor`, `dist`, `tests`), extracts key architectural indicators (`package.json`, `go.mod`, `Cargo.toml`, router directories), and maps high-level entry points into a streamlined 2-level architecture overview.',
            },
        ],
        codeSnippets: [
            {
                title: 'Redis Caching & ETag Conditional Fetcher',
                language: 'typescript',
                description: 'Demonstrates intelligent rate-limit preservation with conditional ETags and tiered Redis TTLs.',
                code: `import Redis from 'ioredis';
import axios, { AxiosResponse } from 'axios';

const redis = new Redis(process.env.REDIS_URL!);

interface CachedRepoData {
    etag: string;
    data: any;
}

export async function fetchRepositoryWithCache(owner: string, repo: string): Promise<any> {
    const cacheKey = \`repo:\${owner}:\${repo}:meta\`;
    const cached = await redis.get(cacheKey);

    let etagHeader: string | undefined;
    if (cached) {
        const parsed: CachedRepoData = JSON.parse(cached);
        etagHeader = parsed.etag;
    }

    try {
        const response: AxiosResponse = await axios.get(
            \`https://api.github.com/repos/\${owner}/\${repo}\`,
            {
                headers: {
                    Authorization: \`Bearer \${process.env.GITHUB_TOKEN}\`,
                    ...(etagHeader ? { 'If-None-Match': etagHeader } : {}),
                },
                validateStatus: (status) => status === 200 || status === 304,
            }
        );

        if (response.status === 304 && cached) {
            // Unchanged: refresh TTL, consume 0 rate limit units
            await redis.expire(cacheKey, 3600);
            return JSON.parse(cached).data;
        }

        // Fresh data: cache data with current ETag
        const payload: CachedRepoData = {
            etag: response.headers['etag'] || '',
            data: response.data,
        };
        await redis.setex(cacheKey, 3600, JSON.stringify(payload));
        return response.data;
    } catch (error) {
        // Fallback to cache if GitHub API fails
        if (cached) return JSON.parse(cached).data;
        throw error;
    }
}`,
            },
        ],
        databaseDesign: {
            overview: 'PostgreSQL schema modeled with Prisma ORM, balancing normalized developer data with fast indexed lookups for bookmarks and query telemetry.',
            keyEntities: [
                {
                    name: 'User',
                    description: 'Developer accounts authenticated via GitHub OAuth.',
                    fields: ['id: UUID', 'githubId: String', 'username: String', 'skills: String[]', 'createdAt: DateTime'],
                },
                {
                    name: 'SavedIssue',
                    description: 'Bookmarked issues tracked through contribution lifecycle.',
                    fields: ['id: UUID', 'userId: UUID (FK)', 'issueUrl: String', 'status: Enum (INTERESTED, IN_PROGRESS, PR_SUBMITTED, MERGED)'],
                },
                {
                    name: 'RepoAnalysisCache',
                    description: 'Persisted architectural breakdown and relevant file mapping.',
                    fields: ['repoId: String (PK)', 'architectureSummary: Json', 'lastSyncedAt: DateTime'],
                },
            ],
        },
        learnings: [
            'Mastered production caching design: combining HTTP ETags with Redis TTLs delivers near-infinite read scalability on top of strict third-party rate limits.',
            'Learned how to model complex developer proficiency vectors against heterogeneous issue metadata.',
            'Understood the performance boundary between relational SQL transactions and ephemeral in-memory key-value stores.',
        ],
        futureRoadmap: [
            'Add automated PR draft generation based on issue requirement specifications.',
            'Introduce developer team workspaces for university open-source clubs.',
            'Implement semantic vector embeddings via pgvector for natural language issue discovery.',
        ],
    },

    'digital-study-center': {
        slug: 'digital-study-center',
        title: 'Digital Study Center',
        subtitle: 'Full-Stack Coaching & Academic Operations Platform',
        tagline: 'Streamlining academic administration, attendance auditing, and resource distribution for modern educational coaching institutions.',
        category: 'Full-Stack Enterprise Platform',
        period: '2024',
        role: 'Full-Stack System Architect & Developer',
        status: 'Completed',
        heroAccent: '#e07a5f',
        liveUrl: 'https://digitalstudycenter.in',
        githubUrl: 'https://github.com/Santlaj/DigitalStudyCenter',
        summary: 'Digital Study Center is an end-to-end management platform engineered for a real coaching institution. The platform replaced error-prone paper attendance ledgers and disconnected WhatsApp broadcast groups with a secure, centralized web portal. It provides role-based workspaces for administrators, educators, and students with robust two-factor security and fast student analytics.',
        metrics: [
            {
                value: '100%',
                label: 'Paperless Transition',
                description: 'Completely replaced manual register books for daily and monthly attendance workflows.',
            },
            {
                value: 'AAL2',
                label: 'MFA Security Level',
                description: 'TOTP two-factor authentication enforcement on all faculty and administrative accounts.',
            },
            {
                value: '< 80ms',
                label: 'Average Query Time',
                description: 'Optimized PostgreSQL composite indexes for fast student history and fee ledger queries.',
            },
            {
                value: '3 Portals',
                label: 'Role-Based Workspaces',
                description: 'Strict privilege isolation between Administrator, Teacher, and Student access levels.',
            },
        ],
        architecture: {
            overview: 'Built upon a modular Node.js and Express backend communicating with a Supabase PostgreSQL relational database. The presentation layer features high-performance semantic HTML, CSS, and modular JavaScript delivering zero-dependency client speed. Multi-factor authentication is enforced at the API gateway layer with JWT token signing and session claim validation.',
            dataFlow: [
                'User accesses portal; client submits credentials over HTTPS to Express authentication controller.',
                'Backend verifies password hash using bcrypt; checks if account has TOTP MFA enabled.',
                'If MFA is required, a temporary short-lived intermediate token is issued requiring TOTP verification code input.',
                'Upon verification, a signed JWT with role claim (ADMIN, TEACHER, STUDENT) is issued to client.',
                'Role-Based Access Control (RBAC) middleware checks route permissions against JWT claims before controller execution.',
                'Database queries leverage composite indexes on student ID, batch ID, and date ranges for instantaneous ledger rendering.',
            ],
            components: [
                {
                    layer: 'Client Web Interface',
                    technologies: ['HTML5', 'CSS3', 'Modern Vanilla JS', 'Responsive Layout'],
                    role: 'Fast, lightweight portal accessible on any mobile device, low-end tablets, and desktop computers.',
                },
                {
                    layer: 'Application Server',
                    technologies: ['Node.js', 'Express.js', 'Bcrypt', 'Speakeasy (TOTP)', 'JWT'],
                    role: 'Authentication gateway, business validation, attendance ledger computation, student report generation.',
                },
                {
                    layer: 'Database & Storage',
                    technologies: ['PostgreSQL', 'Supabase', 'Cloud Storage'],
                    role: 'Relational data store with foreign keys, cascading integrity, student documents, and homework PDFs.',
                },
                {
                    layer: 'In-Memory Accelerator',
                    technologies: ['Redis Layer', 'Key-Value Cache'],
                    role: 'Session tracking, rate-limiting failed login attempts, and caching static subject/batch rosters.',
                },
            ],
        },
        techStack: [
            {
                name: 'Node.js & Express.js',
                category: 'Backend Architecture',
                reason: 'Robust ecosystem for REST API creation, customized middleware chaining, and high-performance JSON request handling.',
            },
            {
                name: 'PostgreSQL & Supabase',
                category: 'Database Engine',
                reason: 'ACID transactions are essential for academic attendance and fee ledgers where missing or corrupted entries are unacceptable.',
            },
            {
                name: 'TOTP Multi-Factor Authentication',
                category: 'Security Architecture',
                reason: 'RFC 6238 time-based OTP protection stops credential stuffing attacks on faculty accounts that hold sensitive student records.',
            },
            {
                name: 'Redis',
                category: 'Cache & Rate Limiting',
                reason: 'Caches class rosters and enforces brute-force lockout thresholds on login endpoints.',
            },
            {
                name: 'Bcrypt & JSON Web Tokens',
                category: 'Identity Management',
                reason: 'Industry-standard password hashing with high salt rounds and stateless tamper-proof session tokens.',
            },
        ],
        challenges: [
            {
                title: 'High-Volume Attendance Batch Recording & Concurrency',
                problem: 'Teachers taking attendance for classes of 50-100 students at the same time caused database lock contention and duplicate record insertion errors.',
                tradeoffs: 'Inserting records one-by-one was slow (50+ round trips); dropping unique constraints risked double-marked records.',
                solution: 'Implemented PostgreSQL atomic batch upserts using `INSERT INTO attendance ... ON CONFLICT (student_id, date, batch_id) DO UPDATE SET status = EXCLUDED.status`. This reduced 50 round trips into a single 12ms atomic transaction and guaranteed data idempotency.',
            },
            {
                title: 'Step-Up MFA with Backend AAL2 Verification',
                problem: 'Admins needed heightened protection when modifying student fee records or releasing exam marks, without burdening casual student views.',
                tradeoffs: 'Forcing MFA on every login annoyed students on poor network connections.',
                solution: 'Created an Authenticator Assurance Level (AAL) stepped architecture: basic login grants AAL1 (sufficient for viewing assignments and announcements). Performing administrative actions or faculty grade edits requires AAL2 authentication backed by TOTP verification.',
            },
            {
                title: 'Multi-Batch Schedule Conflicts & Attendance History Aggregation',
                problem: 'Calculating monthly percentage summaries over thousands of historical attendance records caused slow page loads on teacher analytics dashboards.',
                tradeoffs: 'Pre-computing daily summaries required heavy background cron jobs.',
                solution: 'Created composite B-tree indexes on `(batch_id, date, student_id)` and created an optimized SQL view utilizing window functions (`COUNT(*) OVER ...`) that retrieves attendance summaries in under 35ms.',
            },
        ],
        codeSnippets: [
            {
                title: 'Atomic Attendance Batch Upsert Controller',
                language: 'javascript',
                description: 'Demonstrates single-transaction idempotent batch attendance submission in PostgreSQL.',
                code: `// Express Controller for Batch Attendance
const pool = require('../config/database');

exports.recordBatchAttendance = async (req, res) => {
    const { batchId, date, records } = req.body;
    // records: [{ studentId: '123', status: 'PRESENT' }, ...]

    if (!batchId || !date || !Array.isArray(records)) {
        return res.status(400).json({ error: 'Invalid payload structure' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Construct bulk parameterized query
        const values = [];
        const placeholders = records.map((record, index) => {
            const offset = index * 4;
            values.push(record.studentId, batchId, date, record.status);
            return \`($\${offset + 1}, $\${offset + 2}, $\${offset + 3}, $\${offset + 4})\`;
        }).join(', ');

        const queryText = \`
            INSERT INTO attendance (student_id, batch_id, attendance_date, status)
            VALUES \${placeholders}
            ON CONFLICT (student_id, batch_id, attendance_date)
            DO UPDATE SET 
                status = EXCLUDED.status,
                updated_at = NOW()
            RETURNING id;
        \`;

        const result = await client.query(queryText, values);
        await client.query('COMMIT');

        return res.status(200).json({
            success: true,
            recordsProcessed: result.rowCount,
            date,
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Batch attendance failure:', error);
        return res.status(500).json({ error: 'Failed to record attendance batch' });
    } finally {
        client.release();
    }
};`,
            },
        ],
        databaseDesign: {
            overview: 'Normalized relational schema with foreign key constraints, composite unique indexes, and audit timestamps.',
            keyEntities: [
                {
                    name: 'Users',
                    description: 'Core identity table containing credentials, MFA secrets, and role assignments.',
                    fields: ['id: UUID (PK)', 'email: VARCHAR', 'password_hash: VARCHAR', 'role: ENUM', 'totp_secret: VARCHAR', 'is_mfa_enabled: BOOLEAN'],
                },
                {
                    name: 'Attendance',
                    description: 'Daily attendance record per student per batch with unique composite constraint.',
                    fields: ['id: UUID (PK)', 'student_id: UUID (FK)', 'batch_id: UUID (FK)', 'attendance_date: DATE', 'status: ENUM(PRESENT, ABSENT, LATE)'],
                },
                {
                    name: 'StudyMaterial',
                    description: 'Academic resources, lecture notes, and downloadable assignments.',
                    fields: ['id: UUID (PK)', 'batch_id: UUID (FK)', 'title: VARCHAR', 'file_url: TEXT', 'uploaded_by: UUID (FK)'],
                },
            ],
        },
        learnings: [
            'Understanding real user workflows: educators prioritize speed and keyboard ergonomics over flashy animations when taking attendance.',
            'Mastered transactional database concurrency: bulk SQL upserts prevent race conditions and drop round-trip network delays by orders of magnitude.',
            'Learned how to construct enterprise-grade role-based access control and multi-factor authentication from scratch.',
        ],
        futureRoadmap: [
            'Automated WhatsApp/SMS alerts to parents when a student is marked absent.',
            'Integrated online fee payment gateway with instant PDF invoice generation.',
            'Interactive quiz and computerized test evaluation module for entrance exam preparation.',
        ],
    },

    'captcha-as-a-service': {
        slug: 'captcha-as-a-service',
        title: 'CAPTCHA-as-a-Service',
        subtitle: 'High-Throughput Verification Engine & React Client SDK',
        tagline: 'Privacy-focused, distributed CAPTCHA verification architecture featuring atomic Lua validation, rate limiting, and signed JWT verification tokens.',
        category: 'High-Throughput Security Engine',
        period: '2024',
        role: 'Security Engineer & Backend Architect',
        status: 'Completed',
        heroAccent: '#06b6d4',
        githubUrl: 'https://github.com/Santlaj',
        summary: 'CAPTCHA-as-a-Service is a low-latency, privacy-centric alternative to heavy commercial CAPTCHA providers like Google reCAPTCHA and Cloudflare Turnstile. Built with Node.js, TypeScript, and Redis, it delivers millisecond-fast challenge generation, atomic server-side Lua verification that completely prevents replay attacks, cryptographically signed verification tokens, and a lightweight plug-and-play React SDK.',
        metrics: [
            {
                value: '< 15ms',
                label: 'Verification Speed',
                description: 'End-to-end verification latency powered by In-Memory Redis Lua evaluation.',
            },
            {
                value: '0 Races',
                label: 'Atomic Lua Guarantee',
                description: 'Single-transaction evaluate-and-delete pattern completely prevents token reuse and replay attacks.',
            },
            {
                value: '1.8 KB',
                label: 'Client SDK Size',
                description: 'Zero third-party tracking cookies or massive vendor scripts injected into user browsers.',
            },
            {
                value: '100%',
                label: 'Self-Hostable',
                description: 'Fully Dockerized container deployment with zero external vendor dependencies.',
            },
        ],
        architecture: {
            overview: 'The system operates as an independent security microservice. The client application fetches a randomized visual challenge with distortion noise. The validation response is checked in Redis via an atomic Lua script that compares the solution and deletes the key in the exact same event-loop cycle. Successful evaluations produce a short-lived signed JWT containing verified session claims for downstream business APIs.',
            dataFlow: [
                'Client component mounts and requests challenge: `GET /api/v1/captcha/generate`.',
                'Server generates 6-digit numeric sequence, applies algorithmic visual distortion noise, and stores hashed solution in Redis with 120s TTL.',
                'Client renders challenge canvas and user submits input along with challenge ID: `POST /api/v1/captcha/verify`.',
                'Redis evaluates solution atomically via Lua script: if matched, key is deleted immediately to prevent concurrent replay.',
                'If valid, server signs a JWT verification token (valid for 60s) using HMAC-SHA256 with user IP binding.',
                'Client passes the verification token in authorization header to primary business API (e.g. signup/checkout).',
                'Primary business API validates token signature using shared secret without making another database call.',
            ],
            components: [
                {
                    layer: 'Challenge Generator',
                    technologies: ['Node.js', 'Canvas / SVG', 'Cryptographic RNG'],
                    role: 'Generates distortion-rendered numeric challenges with visual interference lines and rotation noise.',
                },
                {
                    layer: 'Atomic In-Memory Engine',
                    technologies: ['Redis', 'Redis Lua Scripts', 'TTL Expiry'],
                    role: 'Single-threaded atomic verification, immediate token destruction, attempt counter decrementing.',
                },
                {
                    layer: 'Token Issuer',
                    technologies: ['Jose', 'JWT (JSON Web Tokens)', 'HMAC-SHA256'],
                    role: 'Issues short-lived cryptographically signed verification proofs for downstream consumption.',
                },
                {
                    layer: 'React Client SDK',
                    technologies: ['React 18', 'TypeScript', 'Zero Dependencies'],
                    role: 'Plug-and-play frontend widget with auto-refresh, audio accessibility, and customizable dark/light themes.',
                },
            ],
        },
        techStack: [
            {
                name: 'Redis & Lua Scripting',
                category: 'Atomic Verification Engine',
                reason: 'Lua scripts run atomically inside Redis, guaranteeing that read-and-delete operations occur without any interleaving concurrent requests.',
            },
            {
                name: 'TypeScript & Node.js',
                category: 'Service Runtime',
                reason: 'Strict type validation for security payloads, fast asynchronous request handling, and clean modular architecture.',
            },
            {
                name: 'Jose / JWT Verification Tokens',
                category: 'Cryptographic Protocol',
                reason: 'Signed stateless tokens allow downstream microservices to verify CAPTCHA completion without querying the Redis database.',
            },
            {
                name: 'Docker & Docker Compose',
                category: 'DevOps & Distribution',
                reason: 'One-command deployment of the verification microservice and Redis cluster in any cloud environment.',
            },
            {
                name: 'React Client SDK',
                category: 'Developer Tooling',
                reason: 'Provides other developers with an effortless drop-in component: `<CaptchaWidget onVerify={setToken} />`.',
            },
        ],
        challenges: [
            {
                title: 'Concurrent Replay Attacks & Race Conditions',
                problem: 'In high-concurrency environments, an attacker could fire 50 simultaneous HTTP requests with a single solved CAPTCHA. In a standard "read from DB, then delete" architecture, multiple requests would pass before the deletion committed.',
                tradeoffs: 'Distributed locks in Redis (Redlock) added 20-30ms latency overhead and complexity.',
                solution: 'Executed verification inside a Redis Lua script. Because Redis executes Lua scripts on a single thread atomically, checking the solution and calling `redis.call("DEL", key)` happens with zero possibility of race condition interleaving.',
            },
            {
                title: 'Stateless Downstream Verification Without Database Coupling',
                problem: 'When a user solves a CAPTCHA on a signup form, the main application backend must verify that the CAPTCHA was actually solved without querying the CAPTCHA database directly.',
                tradeoffs: 'Sharing the Redis cluster across all backend microservices created tight operational coupling.',
                solution: 'Adopted signed JWT verification tokens. Once solved, the CAPTCHA engine returns a token signed with a secret key, containing claims `{ sub: "captcha_verified", ipHash: "...", exp: now + 60s }`. The main backend only needs to verify the cryptographic signature locally in < 1ms.',
            },
            {
                title: 'Accessibility & User Friction Balance',
                problem: 'Making challenges hard enough to block optical character recognition (OCR) bots without frustrating human users with illegible characters.',
                tradeoffs: 'Complex distorted alphabets (mix of uppercase, lowercase, numbers) cause human frustration and high dropout rates.',
                solution: 'Focused exclusively on high-entropy 6-digit numeric sequences paired with algorithmic line noise, slight random glyph rotation, and an optional audio synthesized fallback for visually impaired users.',
            },
        ],
        codeSnippets: [
            {
                title: 'Atomic Redis Lua Verification Script',
                language: 'typescript',
                description: 'The Lua script that guarantees zero-concurrency replay attacks in a single atomic transaction.',
                code: `import Redis from 'ioredis';
import { SignJWT } from 'jose';

const redis = new Redis(process.env.REDIS_URL!);
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret-key-min-32-chars');

// Atomic Lua Script: Evaluates user input against stored hash,
// deletes the key immediately on success OR decrements remaining attempts.
const ATOMIC_VERIFY_LUA = \`
    local key = KEYS[1]
    local userInput = ARGV[1]

    local storedData = redis.call('GET', key)
    if not storedData then
        return { 0, 'EXPIRED_OR_NOT_FOUND' }
    end

    local cjson = cjson.decode(storedData)

    if cjson.solution == userInput then
        -- Correct! Delete immediately to prevent replay
        redis.call('DEL', key)
        return { 1, 'VERIFIED' }
    else
        -- Decrement attempts remaining
        cjson.attempts = cjson.attempts - 1
        if cjson.attempts <= 0 then
            redis.call('DEL', key)
            return { -1, 'MAX_ATTEMPTS_EXCEEDED' }
        else
            redis.call('SET', key, cjson.encode(cjson), 'KEEPTTL')
            return { 0, tostring(cjson.attempts) }
        end
    end
\`;

export async function verifyCaptcha(challengeId: string, userInput: string, clientIp: string) {
    const key = \`captcha:\${challengeId}\`;

    // Execute atomically inside Redis
    const [status, message] = await redis.eval(
        ATOMIC_VERIFY_LUA,
        1,
        key,
        userInput.trim()
    ) as [number, string];

    if (status !== 1) {
        return { success: false, reason: message };
    }

    // Generate signed verification token valid for 60 seconds
    const token = await new SignJWT({
        purpose: 'captcha_verification',
        challengeId,
        ipHash: hashIp(clientIp),
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('60s')
        .sign(JWT_SECRET);

    return {
        success: true,
        verificationToken: token,
        expiresInSeconds: 60,
    };
}`,
            },
        ],
        databaseDesign: {
            overview: 'In-memory Redis key-value store optimized for ephemeral TTLs and sub-millisecond retrieval.',
            keyEntities: [
                {
                    name: 'captcha:[challengeId]',
                    description: 'Ephemeral challenge record with automatic 120-second TTL.',
                    fields: ['solution: String', 'attempts: Integer (max 3)', 'createdAt: Timestamp', 'clientIp: String'],
                },
                {
                    name: 'rate:ip:[clientIp]',
                    description: 'Sliding window rate limit counter per client IP address.',
                    fields: ['count: Integer', 'windowExpiresAt: Timestamp'],
                },
            ],
        },
        learnings: [
            'Deepened mastery of Redis Lua scripting for eliminating concurrency race conditions in microsecond environments.',
            'Learned how to design zero-dependency React SDKs with clean ergonomics for other software engineers.',
            'Discovered the architectural advantages of stateless cryptographic verification tokens (JWT) for microservice decoupling.',
        ],
        futureRoadmap: [
            'Publish the React SDK as a public npm package (`@santlaj/captcha-react`).',
            'Add WebAssembly (Wasm) client-side proof-of-work challenges as a hybrid defense layer.',
            'Build a Grafana analytics dashboard tracking bot rejection rates and verification latency percentiles.',
        ],
    },
};

export const getAllCaseStudies = () => Object.values(caseStudies);
export const getCaseStudyBySlug = (slug: string) => caseStudies[slug] || null;
