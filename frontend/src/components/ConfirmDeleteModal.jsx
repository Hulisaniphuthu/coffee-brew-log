export default function ConfirmDeleteModal({ brew, onConfirm, onCancel, deleting }) {
  if (!brew) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-roast-950/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-roast-800 border border-roast-700 rounded-lg shadow-2xl shadow-black/40 p-6">
        <h2 className="font-display text-xl font-semibold text-parchment mb-2">Delete this brew?</h2>
        <p className="font-body text-sm text-parchment-dim mb-6">
          &ldquo;{brew.coffeeName}&rdquo; ({brew.method}) will be removed from your log. This can&apos;t be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-body font-medium text-parchment-dim hover:text-parchment transition-colors focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 text-sm font-body font-semibold rounded-md bg-danger text-parchment hover:bg-danger/80 transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-danger/60 focus:ring-offset-2 focus:ring-offset-roast-800"
          >
            {deleting ? "Deleting\u2026" : "Delete brew"}
          </button>
        </div>
      </div>
    </div>
  );
}
