import { useEffect, useState } from "react";

const EMPTY_FORM = {
  coffeeName: "",
  method: "",
  doseGrams: "",
  waterMl: "",
  brewTimeSeconds: "",
  rating: "",
  notes: "",
};

// Fields the wireframe/spec calls required; "notes" stays optional.
const REQUIRED_FIELDS = ["coffeeName", "method", "doseGrams", "waterMl", "brewTimeSeconds", "rating"];

export default function BrewForm({ methods, initialBrew, onSubmit, onCancel, submitting, submitError }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});

  const isEditing = Boolean(initialBrew);

  useEffect(() => {
    if (initialBrew) {
      setForm({
        coffeeName: initialBrew.coffeeName ?? "",
        method: initialBrew.method ?? "",
        doseGrams: initialBrew.doseGrams ?? "",
        waterMl: initialBrew.waterMl ?? "",
        brewTimeSeconds: initialBrew.brewTimeSeconds ?? "",
        rating: initialBrew.rating ?? "",
        notes: initialBrew.notes ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setTouched({});
  }, [initialBrew]);

  function fieldError(field) {
    const value = form[field];
    if (value === "" || value === null || value === undefined) {
      return "Required";
    }
    return null;
  }

  const hasBlankRequiredField = REQUIRED_FIELDS.some((field) => fieldError(field));

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(
      REQUIRED_FIELDS.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );
    if (hasBlankRequiredField) return;

    onSubmit({
      coffeeName: form.coffeeName.trim(),
      method: form.method,
      doseGrams: Number(form.doseGrams),
      waterMl: Number(form.waterMl),
      brewTimeSeconds: Number(form.brewTimeSeconds),
      rating: Number(form.rating),
      notes: form.notes.trim() || null,
    });
  }

  const inputClass =
    "w-full bg-roast-900 border rounded-md px-3 py-2 text-sm text-parchment font-body placeholder:text-parchment-dim/50 focus:outline-none focus:ring-2 focus:ring-crema/60";

  function borderFor(field) {
    return touched[field] && fieldError(field) ? "border-danger" : "border-roast-600";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-roast-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-roast-800 border border-roast-700 rounded-lg shadow-2xl shadow-black/40 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 pt-6 pb-4 border-b border-roast-700">
            <h2 className="font-display text-2xl font-semibold text-parchment">
              {isEditing ? "Edit brew" : "Log a new brew"}
            </h2>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div>
              <label htmlFor="coffeeName" className="block font-mono text-[11px] uppercase tracking-wide text-parchment-dim mb-1">
                Coffee name
              </label>
              <input
                id="coffeeName"
                type="text"
                placeholder="e.g. Ethiopia Yirgacheffe"
                value={form.coffeeName}
                onChange={(e) => handleChange("coffeeName", e.target.value)}
                onBlur={() => handleBlur("coffeeName")}
                className={`${inputClass} ${borderFor("coffeeName")}`}
              />
              {touched.coffeeName && fieldError("coffeeName") && (
                <p className="text-danger text-xs mt-1">Coffee name is required</p>
              )}
            </div>

            <div>
              <label htmlFor="method" className="block font-mono text-[11px] uppercase tracking-wide text-parchment-dim mb-1">
                Brew method
              </label>
              <select
                id="method"
                value={form.method}
                onChange={(e) => handleChange("method", e.target.value)}
                onBlur={() => handleBlur("method")}
                className={`${inputClass} ${borderFor("method")} cursor-pointer`}
              >
                <option value="" disabled>
                  Select a method&hellip;
                </option>
                {methods.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {touched.method && fieldError("method") && (
                <p className="text-danger text-xs mt-1">Brew method is required</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="doseGrams" className="block font-mono text-[11px] uppercase tracking-wide text-parchment-dim mb-1">
                  Dose (g)
                </label>
                <input
                  id="doseGrams"
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder="18"
                  value={form.doseGrams}
                  onChange={(e) => handleChange("doseGrams", e.target.value)}
                  onBlur={() => handleBlur("doseGrams")}
                  className={`${inputClass} ${borderFor("doseGrams")}`}
                />
                {touched.doseGrams && fieldError("doseGrams") && (
                  <p className="text-danger text-xs mt-1">Required</p>
                )}
              </div>
              <div>
                <label htmlFor="waterMl" className="block font-mono text-[11px] uppercase tracking-wide text-parchment-dim mb-1">
                  Water (ml)
                </label>
                <input
                  id="waterMl"
                  type="number"
                  step="1"
                  min="0.1"
                  placeholder="300"
                  value={form.waterMl}
                  onChange={(e) => handleChange("waterMl", e.target.value)}
                  onBlur={() => handleBlur("waterMl")}
                  className={`${inputClass} ${borderFor("waterMl")}`}
                />
                {touched.waterMl && fieldError("waterMl") && (
                  <p className="text-danger text-xs mt-1">Required</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="brewTimeSeconds" className="block font-mono text-[11px] uppercase tracking-wide text-parchment-dim mb-1">
                  Brew time (s)
                </label>
                <input
                  id="brewTimeSeconds"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="180"
                  value={form.brewTimeSeconds}
                  onChange={(e) => handleChange("brewTimeSeconds", e.target.value)}
                  onBlur={() => handleBlur("brewTimeSeconds")}
                  className={`${inputClass} ${borderFor("brewTimeSeconds")}`}
                />
                {touched.brewTimeSeconds && fieldError("brewTimeSeconds") && (
                  <p className="text-danger text-xs mt-1">Required</p>
                )}
              </div>
              <div>
                <label htmlFor="rating" className="block font-mono text-[11px] uppercase tracking-wide text-parchment-dim mb-1">
                  Rating (1-5)
                </label>
                <select
                  id="rating"
                  value={form.rating}
                  onChange={(e) => handleChange("rating", e.target.value)}
                  onBlur={() => handleBlur("rating")}
                  className={`${inputClass} ${borderFor("rating")} cursor-pointer`}
                >
                  <option value="" disabled>
                    Rate&hellip;
                  </option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                {touched.rating && fieldError("rating") && (
                  <p className="text-danger text-xs mt-1">Required</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block font-mono text-[11px] uppercase tracking-wide text-parchment-dim mb-1">
                Notes <span className="normal-case text-parchment-dim/60">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="Bright, floral, a little sweet toward the end..."
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className={`${inputClass} border-roast-600 resize-none`}
              />
            </div>

            {submitError && (
              <div className="border border-danger/40 bg-danger/10 rounded-md px-3 py-2 text-sm text-danger">
                {submitError}
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-roast-700 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-body font-medium text-parchment-dim hover:text-parchment transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-body font-semibold rounded-md bg-crema text-roast-950 hover:bg-crema-dim hover:text-parchment transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-crema/60 focus:ring-offset-2 focus:ring-offset-roast-800"
            >
              {submitting ? "Saving\u2026" : isEditing ? "Save changes" : "Save brew"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
