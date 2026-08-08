import BrewCard from "./BrewCard";

export default function BrewList({ brews, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p className="font-mono text-sm text-parchment-dim">Loading brews&hellip;</p>;
  }

  if (error) {
    return (
      <div className="border border-danger/40 bg-danger/10 rounded-md px-4 py-3 text-sm text-danger font-body">
        {error}
      </div>
    );
  }

  if (brews.length === 0) {
    return (
      <div className="border border-dashed border-roast-600 rounded-lg px-6 py-16 text-center">
        <p className="font-display text-xl text-parchment mb-1">No brews logged yet</p>
        <p className="font-body text-sm text-parchment-dim">
          Pull your first shot, click &ldquo;New brew&rdquo; and get it on record.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {brews.map((brew) => (
        <BrewCard key={brew.id} brew={brew} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
