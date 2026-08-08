const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function handleResponse(res) {
  if (res.status === 204) return null;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = body?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return body;
}

export async function fetchBrews(method) {
  const query = method ? `?method=${encodeURIComponent(method)}` : "";
  const res = await fetch(`${API_URL}/brews${query}`);
  return handleResponse(res);
}

export async function createBrew(payload) {
  const res = await fetch(`${API_URL}/brews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateBrew(id, payload) {
  const res = await fetch(`${API_URL}/brews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteBrew(id) {
  const res = await fetch(`${API_URL}/brews/${id}`, { method: "DELETE" });
  return handleResponse(res);
}

export async function fetchMethods() {
  const res = await fetch(`${API_URL}/meta/methods`);
  return handleResponse(res);
}
