import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { TbFileTypeDocx, TbFileTypePdf } from 'react-icons/tb';
import { usePortfolio } from '../content/PortfolioContext';

const extOf = (url: string) => url.split(/[?#]/)[0].split('.').pop()?.toLowerCase() ?? '';

/** "PDF", "Word (.docx)"… from a file's extension. */
function formatLabel(url: string): string {
  const ext = extOf(url);
  if (ext === 'pdf') return 'PDF';
  if (ext === 'docx' || ext === 'doc') return `Word (.${ext})`;
  return ext ? ext.toUpperCase() : 'File';
}

/**
 * A "Download CV" button. With one file it's a plain download link; with a second format
 * (profile.resumeAltUrl) it opens a small menu asking which format to download.
 */
export function CvDownload({ className, children }: Readonly<{ className: string; children: ReactNode }>) {
  const { profile } = usePortfolio();
  const files = [profile.resumeUrl, profile.resumeAltUrl]
    .filter(Boolean)
    // PDF first: anyone can open it in a browser.
    .sort((a, b) => Number(extOf(b) === 'pdf') - Number(extOf(a) === 'pdf'));
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => root.current?.contains(e.target as Node) || setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (files.length < 2) {
    return (
      <a className={className} href={files[0]} download>
        {children}
      </a>
    );
  }

  return (
    <div className="cv-menu" ref={root}>
      <button type="button" className={className} aria-haspopup="menu" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((o) => !o)}>
        {children}
      </button>
      {open && (
        <div className="cv-menu__list" id={menuId} role="menu" aria-label="Download CV as">
          <span className="cv-menu__title">Download as</span>
          {files.map((url) => {
            const Icon = extOf(url) === 'pdf' ? TbFileTypePdf : TbFileTypeDocx;
            return (
              <a key={url} role="menuitem" className="cv-menu__item" href={url} download onClick={() => setOpen(false)}>
                <Icon aria-hidden="true" /> {formatLabel(url)}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
