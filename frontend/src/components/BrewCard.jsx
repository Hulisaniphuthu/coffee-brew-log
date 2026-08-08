import { getRoastGradient, ratingLabel } from "../utils/roast";

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export default function BrewCard({ brew, onEdit, onDelete }) {
  return (
    <article
      className="relative flex bg-roast-800 border border-roast-700 rounded-lg overflow-hidden shadow-lg shadow-black/20 hover:border-crema/40 transition-colors"
      style={getRoastGradient(brew.rating)}
    >
      <div className="roast-bar w-2 shrink-0" aria-hidden="true" />

      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-parchment leading-snug">
              {brew.coffeeName}
            </h3>
            <span className="inline-block mt-1 font-mono text-[11px] uppercase tracking-wider text-crema border border-crema/30 rounded-full px-2 py-0.5">
              {brew.method}
            </span>
          </div>
          <div className="text-right shrink-0">
            <div className="font-mono text-sm text-parchment-dim">{ratingLabel(brew.rating)}</div>
            <div className="font-mono text-crema text-sm">{"●".repeat(brew.rating)}{"○".repeat(5 - brew.rating)}</div>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-3 font-mono text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-parchment-dim">Dose</dt>
            <dd className="text-parchment">{brew.doseGrams} g</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-parchment-dim">Water</dt>
            <dd className="text-parchment">{brew.waterMl} ml</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-parchment-dim">Time</dt>
            <dd className="text-parchment">{formatTime(brew.brewTimeSeconds)}</dd>
          </div>
        </dl>

        {brew.notes && (
          <p className="mt-4 text-sm text-parchment-dim font-body italic border-t border-roast-700 pt-3">
            &ldquo;{brew.notes}&rdquo;
          </p>
        )}

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onEdit(brew)}
            className="text-xs font-body font-medium text-parchment-dim hover:text-crema transition-colors focus:outline-none focus:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(brew)}
            className="text-xs font-body font-medium text-parchment-dim hover:text-danger transition-colors focus:outline-none focus:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
