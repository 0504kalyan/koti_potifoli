import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { profile } from '../data/resume';

type Props = HTMLAttributes<HTMLDivElement> & { src: string; className: string; fallback?: ReactNode };

/** Shows the photo at `src` when it is set and loads; otherwise renders the fallback. */
export function ProfilePhoto({ src, className, fallback = null, ...rest }: Readonly<Props>) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  return (
    <div className={className} {...rest}>
      <img src={src} alt={profile.name} onError={() => setFailed(true)} />
    </div>
  );
}
