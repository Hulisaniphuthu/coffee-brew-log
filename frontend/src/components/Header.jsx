export default function Header({ brewCount }) {
  return (
    <header className="border-b border-roast-700/60 pb-6 mb-8 flex items-end justify-between flex-wrap gap-4">
      <div>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-crema-dim mb-2">
          Small-batch &middot; single origin
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-parchment tracking-tight">
          Brews: <span className="text-crema">{brewCount}</span>
        </h1>
      </div>
      <p className="font-body text-sm text-parchment-dim max-w-xs">
        Every cup logged &mdash; dose, water, time, and how it actually tasted.
      </p>
    </header>
  );
}
