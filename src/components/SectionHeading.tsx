type Props = Readonly<{ eyebrow: string; title: string; intro?: string; light?: boolean }>;

export function SectionHeading({ eyebrow, title, intro, light = false }: Props) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      <span className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}
