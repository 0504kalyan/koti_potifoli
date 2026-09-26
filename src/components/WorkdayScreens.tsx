import { TbCircleCheckFilled, TbFileInvoice, TbNotebook } from 'react-icons/tb';

type Props = Readonly<{ className?: string }>;

/** Illustrative accounting journal (sample data) used as a hero visual. */
export function JournalScreen({ className = '' }: Props) {
  const lines = [
    { account: 'Office Supplies Expense', tags: ['Cost Center', 'Spend Category'], debit: '1,200.00', credit: '' },
    { account: 'Accounts Payable', tags: ['Supplier'], debit: '', credit: '1,200.00' },
  ];

  return (
    <figure className={`screen ${className}`} aria-label="Sample accounting journal">
      <figcaption className="screen__bar">
        <span className="screen__title">
          <TbNotebook aria-hidden="true" /> Accounting Journal
        </span>
        <span className="pill pill--success">Posted</span>
      </figcaption>
      <table className="ledger">
        <thead>
          <tr>
            <th>Ledger account</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.account}>
              <td>
                {l.account}
                <span className="worktags">
                  {l.tags.map((t) => (
                    <span key={t} className="worktag">
                      {t}
                    </span>
                  ))}
                </span>
              </td>
              <td>{l.debit}</td>
              <td>{l.credit}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Balanced</td>
            <td>1,200.00</td>
            <td>1,200.00</td>
          </tr>
        </tfoot>
      </table>
    </figure>
  );
}

/** Illustrative business process approval chain (sample data) used as a hero visual. */
export function ApprovalScreen({ className = '' }: Props) {
  const steps = ['Supplier invoice submitted', 'Approved by Cost Center Manager', 'Posting rules applied'];

  return (
    <figure className={`screen ${className}`} aria-label="Sample business process">
      <figcaption className="screen__bar">
        <span className="screen__title">
          <TbFileInvoice aria-hidden="true" /> Business Process
        </span>
        <span className="pill pill--info">Completed</span>
      </figcaption>
      <ol className="bp-steps">
        {steps.map((s) => (
          <li key={s}>
            <TbCircleCheckFilled aria-hidden="true" /> {s}
          </li>
        ))}
      </ol>
    </figure>
  );
}
