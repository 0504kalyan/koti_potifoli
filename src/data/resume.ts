// All site content lives in this file. See CONTENT-GUIDE.md for what each value controls.
// Content is taken from Doppalapudi_Koteswara_Rao_Workday_FSCM_Consultant_ATS_95Plus_Final.docx.

export const profile = {
  name: 'Koteswara Rao Doppalapudi',
  shortName: 'Koteswara Rao',
  // Two letters in the logo mark.
  initials: 'KR',
  role: 'Workday Finance / FSCM Functional Consultant',
  email: '1999koti@gmail.com',
  phone: '+91 8464096717',
  // Leave linkedin or location empty ('') to hide them.
  linkedin: 'https://www.linkedin.com/in/doppalapudi-koteswara-rao-3528b024b/',
  location: '',
  experience: '3.3',
  resumeFile: '/Resume-Koteswara-Rao-Doppalapudi.pdf',
  currentClient: 'Unity 3D',
  // Profile photo in /public.
  photo: '/profile.png',
};

export const hero = {
  headline:
    'I configure and support Workday Financials end to end, from ledgers and posting rules to approvals, security, data loads and reporting.',
};

export const contactIntro =
  "Looking for a Workday Finance consultant for an implementation, enhancement or production support? I'd be glad to hear from you.";

export const summary: string[] = [
  "I'm an MCA post graduate and a thorough, tenacious Workday FSCM Functional Consultant with 3.3 years of experience across the Workday Financials modules: General Ledger, Accounts Payable, Accounts Receivable, Fixed Assets, Procurement and Expenses. I bring a deep understanding of client business requirements, with a flair for results and problem solving.",
  'At Swift Solution Private Limited I implement and support Workday Financials for Unity 3D: companies, ledgers and account posting rule sets, worktags and organization hierarchies, financial business processes and approval workflows, security roles, EIB data loads and custom reports.',
  'I am skilled in functional design, unit testing and user acceptance testing, and provide post-production support with issue analysis and root cause identification within SLA. I have excellent client interaction skills and work well independently as well as in a team.',
];

/** The six Workday Financials modules, shown as tiles. `name` must match a skill in skillIcons.tsx for its icon. */
export const modules: { name: string; code: string; text: string }[] = [
  { name: 'General Ledger', code: 'GL', text: 'Companies, ledgers, calendars, ledger accounts and account posting rule sets.' },
  { name: 'Accounts Payable', code: 'AP', text: 'Supplier invoices, supplier categories, bank accounts and settlement runs.' },
  { name: 'Accounts Receivable', code: 'AR', text: 'Customer invoices, customer categories, sales items and revenue categories.' },
  { name: 'Fixed Assets', code: 'FA', text: 'Asset books, depreciation profiles, transfers, disposal and impairment.' },
  { name: 'Procurement', code: 'PRC', text: 'Requisitions, purchase orders, purchase items and the supplier portal.' },
  { name: 'Expenses', code: 'EXP', text: 'Expense items and spend categories for employee spend.' },
];

export type FlowStep = { title: string; items: string[] };
export type ProcessFlow = { key: string; name: string; caption: string; steps: FlowStep[] };

/** End-to-end finance processes, each step listing what was configured for it. */
export const processFlows: ProcessFlow[] = [
  {
    key: 'p2p',
    name: 'Procure-to-Pay',
    caption: 'From a requisition to a paid supplier and a posted journal.',
    steps: [
      { title: 'Requisition', items: ['Requisition business process', 'Purchase items', 'Spend categories'] },
      { title: 'Purchase Order', items: ['PO business process', 'Approval workflows'] },
      { title: 'Supplier Invoice', items: ['Supplier Invoice business process', 'Supplier categories', 'Supplier Invoice EIB'] },
      { title: 'Payment', items: ['Bank accounts', 'Payment types', 'Settlement runs'] },
      { title: 'Accounting', items: ['Account posting rule sets', 'Worktags'] },
    ],
  },
  {
    key: 'r2r',
    name: 'Record-to-Report',
    caption: 'Journals posted to the right ledger accounts, allocated and reported.',
    steps: [
      { title: 'Accounting Journal', items: ['Journal business process', 'Journal sources', 'Journal EIB'] },
      { title: 'Posting', items: ['Ledger accounts', 'Account posting rule sets'] },
      { title: 'Allocations', items: ['Allocation definitions', 'Custom validations'] },
      { title: 'Intercompany', items: ['Intercompany processing'] },
      { title: 'Reporting', items: ['Custom reports', 'Scheduled reports', 'Dashboards'] },
    ],
  },
  {
    key: 'o2c',
    name: 'Order-to-Cash',
    caption: 'Customers invoiced with the right sales items and revenue categories.',
    steps: [
      { title: 'Customer', items: ['Customer categories', 'Customer master data'] },
      { title: 'Sales Item', items: ['Sales items', 'Revenue categories'] },
      { title: 'Customer Invoice', items: ['Customer Invoice business process', 'Customer Invoice EIB'] },
      { title: 'Revenue', items: ['Revenue recognition', 'Accruals & adjustments'] },
    ],
  },
  {
    key: 'assets',
    name: 'Asset Lifecycle',
    caption: 'Assets registered, depreciated, moved and retired.',
    steps: [
      { title: 'Register', items: ['Asset books', 'Asset Register EIB'] },
      { title: 'Depreciate', items: ['Depreciation profiles'] },
      { title: 'Transfer', items: ['Asset transfers'] },
      { title: 'Retire', items: ['Impairment', 'Disposal', 'Dispose Asset EIB'] },
    ],
  },
];

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: 'Workday Financials',
    items: ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Fixed Assets', 'Procurement', 'Expenses'],
  },
  {
    title: 'Configuration',
    items: [
      'Business Process Framework',
      'Account Posting Rule Sets',
      'Worktags & Financial Dimensions',
      'Organization Hierarchies',
      'Allocation Definitions',
      'Intercompany',
      'Custom Validations',
      'Bank Setup & Settlement Runs',
    ],
  },
  {
    title: 'Security',
    items: ['Role Creation', 'Security Groups', 'User-Based Groups', 'Domain Security Policies'],
  },
  {
    title: 'Data & Integration',
    items: ['EIB (Inbound & Outbound)', 'Financial Data Migration', 'XSLT'],
  },
  { title: 'Reporting', items: ['Custom Reports', 'Scheduled Reports', 'Dashboards'] },
  {
    title: 'Accounting',
    items: ['Journal Entries', 'Accruals', 'Adjustments', 'Revenue Recognition'],
  },
  {
    title: 'Delivery',
    items: ['Functional Design', 'Unit Testing', 'UAT', 'Production Support', 'Root Cause Analysis'],
  },
];

/** One Workday work area from the engagement, shown as a card in #expertise. */
export type WorkArea = {
  slug: string;
  name: string;
  tagline: string;
  tech: string[];
  description: string;
  responsibilities: string[];
  /** Colour of the card's icon and tags. */
  accent: string;
};

export const workAreas: WorkArea[] = [
  {
    slug: 'general-ledger',
    name: 'General Ledger',
    tagline: 'Ledgers, posting rules & allocations',
    tech: ['Companies', 'Ledgers', 'Calendars', 'Ledger Accounts', 'Account Posting Rule Sets', 'Journal Sources', 'Allocations', 'Intercompany'],
    description:
      'Accounting foundation of the Workday tenant: companies, ledgers, fiscal calendars and ledger accounts, with account posting rule sets that turn each business transaction into the right journal lines, plus allocation definitions and intercompany processing.',
    responsibilities: [
      'Created Companies, Ledgers, Calendars and Ledger Accounts.',
      'Defined Account Posting Rule Sets for various transactions.',
      'Created custom validations and allocation definitions.',
      'Set up allocation definitions and intercompany processing.',
      'Configured the Accounting Journal business process.',
      'Created Accounting Journal EIBs for bulk journal uploads.',
    ],
    accent: '#6d28d9',
  },
  {
    slug: 'procure-to-pay',
    name: 'Procure-to-Pay',
    tagline: 'AP, Procurement & Expenses',
    tech: ['Supplier Invoice', 'Requisition', 'Purchase Order', 'Supplier Categories', 'Supplier Portal', 'Purchase Items', 'Expense Items', 'Settlement Runs'],
    description:
      'From requisition to payment: requisition, purchase order and supplier invoice business processes, supplier master data and portal, purchase and expense items, and the bank accounts, payment types and settlement runs that pay suppliers.',
    responsibilities: [
      'Configured business processes for Supplier Invoice, Requisition and Purchase Order.',
      'Set up Supplier categories and supplier master data.',
      'Implemented Supplier External Site and portal enhancements.',
      'Created Purchase Items and Expense Items.',
      'Set up Bank Accounts, Routing Rule Sets, payment types and settlement runs.',
      'Created Supplier Invoice EIBs for bulk uploads.',
    ],
    accent: '#1d4ed8',
  },
  {
    slug: 'accounts-receivable',
    name: 'Accounts Receivable',
    tagline: 'Customers, invoices & revenue',
    tech: ['Customer Invoice', 'Customer Categories', 'Sales Items', 'Revenue Categories', 'Revenue Recognition'],
    description:
      'Order-to-cash setup: customer master data and categories, sales items and revenue categories, and the customer invoice business process, grounded in revenue recognition and accrual concepts.',
    responsibilities: [
      'Set up Customer categories and customer master data.',
      'Created Sales Items and mapped Revenue Categories.',
      'Configured the Customer Invoice business process.',
      'Created Customer Invoice EIBs for bulk uploads.',
      'Applied accounting concepts: journal entries, accruals, adjustments and revenue recognition.',
    ],
    accent: '#15803d',
  },
  {
    slug: 'fixed-assets',
    name: 'Fixed Assets',
    tagline: 'Asset books & depreciation',
    tech: ['Asset Books', 'Depreciation Profiles', 'Asset Transfers', 'Disposal', 'Impairment', 'Asset Register EIB'],
    description:
      'Full asset lifecycle in Workday: asset books and depreciation profiles, transfers between organizations, disposal and impairment, with the asset register loaded and maintained through EIBs.',
    responsibilities: [
      'Managed Asset Books and Depreciation Profiles.',
      'Handled Asset Transfers, Disposal and Impairment.',
      'Created Asset Register and Dispose Asset EIBs for bulk data loads.',
    ],
    accent: '#b45309',
  },
  {
    slug: 'worktags-organizations',
    name: 'Worktags & Organizations',
    tagline: 'Financial dimensions & hierarchies',
    tech: ['Spend Categories', 'Revenue Categories', 'Cost Centers', 'Projects', 'Locations', 'Custom Worktags'],
    description:
      'The dimensions every transaction is tagged with: spend and revenue categories, cost centers, projects and custom worktags, organized into company, cost center, location and project hierarchies for reporting and security.',
    responsibilities: [
      'Configured Worktags: Spend Categories, Revenue Categories, Cost Centers and Projects.',
      'Mapped financial dimensions across spend, revenue, cost center and project.',
      'Created Cost Center, Project and Location hierarchies.',
      'Set up Company organizational hierarchies.',
    ],
    accent: '#be123c',
  },
  {
    slug: 'security-business-processes',
    name: 'Security & Business Processes',
    tagline: 'Roles, domains & approval workflows',
    tech: ['Business Process Framework', 'Condition Rules', 'Approval Workflows', 'Security Roles', 'User-Based Groups', 'Domain Security Policies'],
    description:
      'Who can do what, and who approves it: business process definitions with condition rules and approval chains for financial transactions, backed by security roles, user-based groups and domain security policies.',
    responsibilities: [
      'Configured financial business processes and approval workflows.',
      'Built business process condition rules.',
      'Created and assigned security roles and user-based groups.',
      'Maintained domain security policies.',
    ],
    accent: '#0f766e',
  },
  {
    slug: 'eib-data-migration',
    name: 'EIB Data Migration',
    tagline: 'Inbound & outbound data loads',
    tech: ['EIB Inbound', 'EIB Outbound', 'XSLT', 'Journals', 'Supplier Invoices', 'Customer Invoices', 'Assets'],
    description:
      'Moving financial data in and out of Workday with Enterprise Interface Builder: bulk loads for journals, supplier and customer invoices and assets, and outbound extracts, with XSLT transformations where needed.',
    responsibilities: [
      'Created EIBs for bulk data uploads: Journal, Supplier Invoice, Asset Register and Dispose Asset.',
      'Created Accounting Journal, Supplier Invoice and Customer Invoice EIBs.',
      'Performed financial data migration with inbound and outbound EIBs.',
      'Used XSLT for data transformation.',
    ],
    accent: '#c2410c',
  },
  {
    slug: 'reporting-support',
    name: 'Reporting & Support',
    tagline: 'Reports, testing & production support',
    tech: ['Custom Reports', 'Scheduled Reports', 'Dashboards', 'Unit Testing', 'UAT', 'SLA Support'],
    description:
      'Keeping finance running after go-live: custom reports and dashboards scheduled to business needs, functional design and testing for new deliverables, and post-production support with root cause analysis.',
    responsibilities: [
      'Developed custom reports and scheduled them as per business requirements.',
      'Configured financial reporting and dashboards.',
      'Wrote functional designs and ran unit testing and user acceptance testing.',
      'Provided post-production support and resolved financial issues as per SLA.',
      'Performed issue analysis and root cause identification.',
    ],
    accent: '#4338ca',
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  project?: { name: string; client: string; role: string; teamSize: number };
  highlights: string[];
};

export const experience: Job[] = [
  {
    company: 'Swift Solution Private Limited',
    role: 'Workday Consultant',
    period: 'June 2023 - Present',
    current: true,
    project: { name: 'Workday Development and Support', client: 'Unity 3D', role: 'Workday Finance Consultant', teamSize: 5 },
    highlights: [
      'Implemented and supported Workday Financial modules (GL, AP, AR, FA).',
      'Configured Workday GL, AP, AR and Procurement modules.',
      'Configured financial business processes and approval workflows.',
      'Created EIBs for bulk data uploads: Journal, Supplier Invoice, Asset Register and Dispose Asset.',
      'Developed custom reports and scheduled them as per business requirements.',
      'Provided post-production support and resolved financial issues as per SLA.',
    ],
  },
];

export const education: { degree: string; university: string; year: string; score?: string } = {
  degree: 'MCA',
  university: 'Acharya Nagarjuna University',
  year: '2023',
};

export const coreConcepts: string[] = [
  'Workday architecture and tenant setup',
  'Organizational structures: company, cost center, location and project hierarchies',
  'Business Process Framework: creation, configuration and condition rules',
  'Security groups, user-based groups and domain policies',
  'Worktags and financial dimensions: spend categories, revenue categories, custom worktags',
  'Ledger and accounting setup: ledger accounts, account posting rule sets, journal sources',
  'Allocation definitions and financial reporting structures',
  'Data migration using EIB (inbound and outbound)',
];
