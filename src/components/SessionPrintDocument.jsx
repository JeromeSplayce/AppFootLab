import Pitch from './Pitch';

function chunk(items, size) {
  const pages = [];

  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }

  return pages.length > 0 ? pages : [[]];
}

function InfoSection({ title, children }) {
  return (
    <div className="pdf-info-section">
      <div className="pdf-info-title">{title}</div>
      <div className="pdf-info-content">{children || '—'}</div>
    </div>
  );
}

function ExerciseBlock({ item, index }) {
  if (!item.exercise) {
    return (
      <section className="pdf-exercise-block">
        <div className="pdf-exercise-heading">
          <div>
            <strong>Exercice {index + 1}</strong>
            <span>Exercice supprimé</span>
          </div>
          <div className="pdf-duration">—</div>
        </div>

        <div className="pdf-missing-exercise">
          Cet exercice n’existe plus dans la bibliothèque Footlab.
        </div>
      </section>
    );
  }

  const exercise = item.exercise;

  return (
    <section className="pdf-exercise-block">
      <div className="pdf-exercise-heading">
        <div>
          <strong>
            Exercice {index + 1} — {exercise.title || 'Sans titre'}
          </strong>
          <span>
            {exercise.category || 'Exercice'}
            {exercise.playersCount
              ? ` • ${exercise.playersCount} joueurs`
              : ''}
          </span>
        </div>

        <div className="pdf-duration">
          <small>Durée</small>
          <strong>{exercise.duration || 0}'</strong>
        </div>
      </div>

      <div className="pdf-exercise-content">
        <div className="pdf-pitch-column">
          <div className="pdf-column-title">Organisation</div>
          <div className="pdf-pitch-wrapper">
            <Pitch
              positions={exercise.positions || []}
              pitchType={exercise.pitchType || 'full'}
              showLabels
            />
          </div>
        </div>

        <div className="pdf-details-column">
          <div className="pdf-column-title">Organisation et animation</div>

          <InfoSection title="Objectifs">
            {exercise.objectives}
          </InfoSection>

          <InfoSection title="Explications et consignes">
            {exercise.description}
          </InfoSection>

          <div className="pdf-meta-grid">
            <div>
              <span>Catégorie</span>
              <strong>{exercise.category || '—'}</strong>
            </div>
            <div>
              <span>Intensité</span>
              <strong>{exercise.intensity || '—'}</strong>
            </div>
            <div>
              <span>Joueurs</span>
              <strong>{exercise.playersCount || '—'}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SessionPrintDocument({
  session,
  sessionItems = [],
  totalDuration = 0,
}) {
  if (!session) return null;

  const pages = chunk(sessionItems, 2);

  return (
    <div className="footlab-print-document" aria-hidden="true">
      <style>{`
        .footlab-print-document {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }

          html,
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          body * {
            visibility: hidden !important;
          }

          .footlab-print-document,
          .footlab-print-document * {
            visibility: visible !important;
          }

          .footlab-print-document {
            display: block !important;
            position: absolute;
            inset: 0;
            width: 100%;
            color: #111827 !important;
            background: white !important;
            font-family: Arial, Helvetica, sans-serif;
          }

          .pdf-page {
            width: 100%;
            min-height: 277mm;
            box-sizing: border-box;
            background: white;
            break-after: page;
            page-break-after: always;
          }

          .pdf-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          .pdf-session-header {
            border: 1.5px solid #1f2937;
            margin-bottom: 4mm;
          }

          .pdf-session-kicker {
            padding: 1.5mm 3mm;
            font-size: 8pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border-bottom: 1px solid #1f2937;
          }

          .pdf-session-main {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: stretch;
          }

          .pdf-session-title {
            padding: 3mm 4mm;
            background: #dbeafe;
          }

          .pdf-session-title h1 {
            margin: 0;
            font-size: 15pt;
            line-height: 1.1;
            text-transform: uppercase;
          }

          .pdf-session-title p {
            margin: 1.5mm 0 0;
            font-size: 8.5pt;
            white-space: pre-wrap;
          }

          .pdf-session-summary {
            min-width: 42mm;
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-left: 1px solid #1f2937;
          }

          .pdf-session-summary div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2mm 3mm;
          }

          .pdf-session-summary div + div {
            border-left: 1px solid #1f2937;
          }

          .pdf-session-summary span {
            font-size: 7pt;
            text-transform: uppercase;
          }

          .pdf-session-summary strong {
            margin-top: 1mm;
            font-size: 12pt;
          }

          .pdf-exercise-block {
            border: 1.5px solid #1f2937;
            margin-bottom: 4mm;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .pdf-exercise-heading {
            min-height: 13mm;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #1f2937;
          }

          .pdf-exercise-heading > div:first-child {
            flex: 1;
            padding: 2mm 3mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .pdf-exercise-heading strong {
            font-size: 10pt;
          }

          .pdf-exercise-heading span {
            margin-top: 0.7mm;
            font-size: 7.5pt;
          }

          .pdf-duration {
            width: 24mm;
            border-left: 1px solid #1f2937;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .pdf-duration small {
            font-size: 7pt;
          }

          .pdf-duration strong {
            font-size: 12pt;
          }

          .pdf-exercise-content {
            display: grid;
            grid-template-columns: 48% 52%;
            min-height: 103mm;
          }

          .pdf-pitch-column {
            padding: 2.5mm;
            border-right: 1px solid #1f2937;
          }

          .pdf-details-column {
            display: flex;
            flex-direction: column;
          }

          .pdf-column-title,
          .pdf-info-title {
            background: #60a5fa;
            color: #0f172a;
            text-align: center;
            font-weight: 800;
            border-bottom: 1px solid #1f2937;
          }

          .pdf-column-title {
            padding: 1.4mm 2mm;
            font-size: 9pt;
            margin: -2.5mm -2.5mm 2.5mm;
          }

          .pdf-details-column > .pdf-column-title {
            margin: 0;
          }

          .pdf-pitch-wrapper {
            width: 100%;
          }

          .pdf-pitch-wrapper > div {
            border-radius: 0 !important;
            border: 1px solid #14532d !important;
            padding: 2mm !important;
            background: #166534 !important;
          }

          .pdf-pitch-wrapper svg {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .pdf-info-section {
            border-bottom: 1px solid #1f2937;
          }

          .pdf-info-title {
            padding: 1mm 2mm;
            font-size: 7.5pt;
          }

          .pdf-info-content {
            min-height: 13mm;
            padding: 2mm 3mm;
            font-size: 8pt;
            line-height: 1.35;
            white-space: pre-wrap;
          }

          .pdf-meta-grid {
            margin-top: auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-top: 1px solid #1f2937;
          }

          .pdf-meta-grid > div {
            padding: 1.5mm 2mm;
            text-align: center;
          }

          .pdf-meta-grid > div + div {
            border-left: 1px solid #1f2937;
          }

          .pdf-meta-grid span,
          .pdf-meta-grid strong {
            display: block;
          }

          .pdf-meta-grid span {
            font-size: 6.5pt;
            text-transform: uppercase;
          }

          .pdf-meta-grid strong {
            margin-top: 0.5mm;
            font-size: 7.5pt;
          }

          .pdf-missing-exercise {
            height: 103mm;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8mm;
            color: #991b1b;
            background: #fef2f2;
            font-size: 10pt;
            font-weight: 700;
            text-align: center;
          }

          * {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
      `}</style>

      {pages.map((pageItems, pageIndex) => {
        const pageStartIndex = pageIndex * 2;

        return (
          <div className="pdf-page" key={`page-${pageIndex}`}>
            <header className="pdf-session-header">
              <div className="pdf-session-kicker">
                FOOTLAB — Fiche de séance
              </div>

              <div className="pdf-session-main">
                <div className="pdf-session-title">
                  <h1>{session.title}</h1>
                  {session.description && <p>{session.description}</p>}
                </div>

                <div className="pdf-session-summary">
                  <div>
                    <span>Exercices</span>
                    <strong>{sessionItems.length}</strong>
                  </div>
                  <div>
                    <span>Durée</span>
                    <strong>{totalDuration}'</strong>
                  </div>
                </div>
              </div>
            </header>

            {pageItems.map((item, localIndex) => (
              <ExerciseBlock
                key={`${item.id}-${pageStartIndex + localIndex}`}
                item={item}
                index={pageStartIndex + localIndex}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
