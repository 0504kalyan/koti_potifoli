import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { withGeneratedResume } from './resume';
import type { BaseItem, PortfolioContent } from './types';

/** Active, visible items in display order: what the page shows. */
const live = <T extends BaseItem>(items: T[] = []) =>
  items.filter((i) => i.status === 'active' && i.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);

function buildView(content: PortfolioContent) {
  const c = withGeneratedResume(content);
  return {
    ...c,
    modules: live(c.modules),
    processFlows: live(c.processFlows),
    workAreas: live(c.workAreas),
    experience: live(c.experience),
    skillGroups: live(c.skillGroups),
  };
}

export type PortfolioView = ReturnType<typeof buildView>;

const PortfolioContext = createContext<PortfolioView | null>(null);

/** Supplies content to the components: published content on the site, unsaved content in the admin preview. */
export function PortfolioProvider({ content, children }: Readonly<{ content: PortfolioContent; children: ReactNode }>) {
  const view = useMemo(() => buildView(content), [content]);
  return <PortfolioContext.Provider value={view}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioView {
  const view = useContext(PortfolioContext);
  if (!view) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return view;
}
