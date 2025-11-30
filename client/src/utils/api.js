const API_BASE = import.meta.env.VITE_API_BASE;

export async function getJSON(path, requireAuth = false) {
  const headers = {};

  if (requireAuth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
  });
  if (!res.ok) {
    throw new Error(`Error en la request: ${res.status}`);
  }
  return res.json();
}

export async function postJSON(path, data, requireAuth = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
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

export async function putFormData(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
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
