import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import BrewList from "./components/BrewList";
import BrewForm from "./components/BrewForm";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { fetchBrews, fetchMethods, createBrew, updateBrew, deleteBrew } from "./api/brews";

export default function App() {
  const [brews, setBrews] = useState([]);
  const [methods, setMethods] = useState([]);
  const [activeMethod, setActiveMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingBrew, setEditingBrew] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadBrews = useCallback(async (method) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchBrews(method || undefined);
      setBrews(res.data);
    } catch (err) {
      setError(err.message || "Could not load brews. Is the API running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMethods()
      .then((res) => setMethods(res.data))
      .catch(() => setMethods([]));
  }, []);

  useEffect(() => {
    loadBrews(activeMethod);
  }, [activeMethod, loadBrews]);

  useEffect(() => {
    document.title = `Brews: ${brews.length}`;
  }, [brews.length]);

  function openNewBrewForm() {
    setEditingBrew(null);
    setSubmitError(null);
    setFormOpen(true);
  }

  function openEditForm(brew) {
    setEditingBrew(brew);
    setSubmitError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingBrew(null);
    setSubmitError(null);
  }

  async function handleSubmit(payload) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      if (editingBrew) {
        await updateBrew(editingBrew.id, payload);
      } else {
        await createBrew(payload);
      }
      closeForm();
      await loadBrews(activeMethod);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong saving this brew.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteBrew(pendingDelete.id);
      setPendingDelete(null);
      await loadBrews(activeMethod);
    } catch (err) {
      setError(err.message || "Could not delete this brew.");
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 max-w-6xl mx-auto">
      <Header brewCount={brews.length} />

      <Toolbar
        methods={methods}
        activeMethod={activeMethod}
        onFilterChange={setActiveMethod}
        onNewBrew={openNewBrewForm}
      />

      <BrewList
        brews={brews}
        loading={loading}
        error={error}
        onEdit={openEditForm}
        onDelete={setPendingDelete}
      />

      {formOpen && (
        <BrewForm
          methods={methods}
          initialBrew={editingBrew}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitting={submitting}
          submitError={submitError}
        />
      )}

      <ConfirmDeleteModal
        brew={pendingDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
        deleting={deleting}
      />

      <footer className="mt-16 pt-6 border-t border-roast-700/60 text-center font-mono text-[11px] uppercase tracking-widest text-parchment-dim/60">
        Roasted in small batches &middot; logged one cup at a time
      </footer>
    </div>
  );
}
