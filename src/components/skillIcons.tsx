import type { IconType } from 'react-icons';
import {
  TbAdjustments,
  TbArrowsExchange,
  TbArrowsSplit2,
  TbBook2,
  TbBug,
  TbBuildingBank,
  TbBuildingWarehouse,
  TbCalendarTime,
  TbChartBar,
  TbChecklist,
  TbCircleCheck,
  TbCode,
  TbDatabaseImport,
  TbFileCode,
  TbFileDescription,
  TbFileDollar,
  TbFileInvoice,
  TbHeadset,
  TbHierarchy2,
  TbKey,
  TbLayoutDashboard,
  TbListCheck,
  TbLock,
  TbNotebook,
  TbPlusMinus,
  TbReceipt2,
  TbReportAnalytics,
  TbRoute,
  TbSearch,
  TbShieldLock,
  TbShoppingCart,
  TbTags,
  TbTestPipe,
  TbTrendingUp,
  TbUserShield,
  TbUsersGroup,
  TbCalendarDollar,
} from 'react-icons/tb';

/** An icon plus its colour (tuned for a light background). */
export type SkillIcon = { icon: IconType; color: string };

const PURPLE = '#6d28d9';
const BLUE = '#1d4ed8';
const GREEN = '#15803d';
const YELLOW = '#b45309';
const RED = '#be123c';
const CYAN = '#0f766e';
const ORANGE = '#c2410c';

/** Exact skill name (case-insensitive) → icon. Add an entry here to give a new skill its own icon. */
const byName: Record<string, SkillIcon> = {
  // Workday Financials
  'general ledger': { icon: TbBook2, color: PURPLE },
  'accounts payable': { icon: TbFileInvoice, color: BLUE },
  'accounts receivable': { icon: TbFileDollar, color: GREEN },
  'fixed assets': { icon: TbBuildingWarehouse, color: YELLOW },
  procurement: { icon: TbShoppingCart, color: BLUE },
  expenses: { icon: TbReceipt2, color: ORANGE },
  // Configuration
  'business process framework': { icon: TbRoute, color: CYAN },
  'account posting rule sets': { icon: TbListCheck, color: PURPLE },
  'worktags & financial dimensions': { icon: TbTags, color: RED },
  'organization hierarchies': { icon: TbHierarchy2, color: RED },
  'allocation definitions': { icon: TbArrowsSplit2, color: PURPLE },
  intercompany: { icon: TbArrowsExchange, color: PURPLE },
  'custom validations': { icon: TbCircleCheck, color: GREEN },
  'bank setup & settlement runs': { icon: TbBuildingBank, color: BLUE },
  // Security
  'role creation': { icon: TbUserShield, color: CYAN },
  'security groups': { icon: TbShieldLock, color: CYAN },
  'user-based groups': { icon: TbUsersGroup, color: CYAN },
  'domain security policies': { icon: TbLock, color: CYAN },
  // Data & Integration
  'eib (inbound & outbound)': { icon: TbDatabaseImport, color: ORANGE },
  'financial data migration': { icon: TbArrowsExchange, color: ORANGE },
  xslt: { icon: TbFileCode, color: ORANGE },
  // Reporting
  'custom reports': { icon: TbReportAnalytics, color: YELLOW },
  'scheduled reports': { icon: TbCalendarTime, color: YELLOW },
  dashboards: { icon: TbLayoutDashboard, color: YELLOW },
  // Accounting
  'journal entries': { icon: TbNotebook, color: PURPLE },
  accruals: { icon: TbCalendarDollar, color: GREEN },
  adjustments: { icon: TbPlusMinus, color: GREEN },
  'revenue recognition': { icon: TbTrendingUp, color: GREEN },
  // Delivery
  'functional design': { icon: TbFileDescription, color: BLUE },
  'unit testing': { icon: TbTestPipe, color: GREEN },
  uat: { icon: TbChecklist, color: GREEN },
  'production support': { icon: TbHeadset, color: RED },
  'root cause analysis': { icon: TbSearch, color: RED },
};

/** Keyword fallbacks so new skills still get a sensible icon without a code change. */
const byKeyword: [RegExp, SkillIcon][] = [
  [/security|domain|role/i, { icon: TbKey, color: CYAN }],
  [/report|dashboard/i, { icon: TbChartBar, color: YELLOW }],
  [/eib|integration|migration/i, { icon: TbDatabaseImport, color: ORANGE }],
  [/test|uat/i, { icon: TbTestPipe, color: GREEN }],
  [/issue|defect|support/i, { icon: TbBug, color: RED }],
  [/config|setup/i, { icon: TbAdjustments, color: PURPLE }],
];

const fallback: SkillIcon = { icon: TbCode, color: PURPLE };

export function getSkillIcon(skill: string): SkillIcon {
  const key = skill.trim().toLowerCase();
  return byName[key] ?? byKeyword.find(([re]) => re.test(key))?.[1] ?? fallback;
}
