const API_BASE = import.meta.env.VITE_API_BASE;

export async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Error en la request: ${res.status}`);
  }
  return res.json();
}

export async function postJSON(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Error en la request: ${res.status}`);
  }
  return res.json();
}

export async function postFormData(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) {
    throw new Error(`Error en la request: ${res.status}`);
  }
  return res.json();
}

export async function deleteJSON(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Error en la request: ${res.status}`);
  }
  return res.json();
}
