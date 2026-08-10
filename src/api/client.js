const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("adminToken");
}

async function request(method, path, body = null, isJson = true) {
  const url = `${API_BASE}${path}`;
  const headers = {};

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (isJson && body) {
    headers["Content-Type"] = "application/json";
  }

  const opts = {
    method,
    headers,
  };

  if (body) {
    opts.body = isJson ? JSON.stringify(body) : body;
  }

  const res = await fetch(url, opts);

  if (res.status === 401) {
    // Token expired or invalid — clear auth and reload to login
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin";
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.message || data.error || `${res.status} error`;
    throw new Error(msg);
  }

  return data;
}

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  put: (path, body) => request("PUT", path, body),
  patch: (path, body) => request("PATCH", path, body),
  del: (path) => request("DELETE", path),
  upload: (path, formData) => request("POST", path, formData, false),
};

// Auth helpers
export async function loginAdmin({ email, password }) {
  const data = await api.post("/auth/login", { email, password });
  localStorage.setItem("adminToken", data.token);
  localStorage.setItem("adminUser", JSON.stringify(data.admin));
  return data;
}

export function logoutAdmin() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
}

export function getAdminUser() {
  try {
    return JSON.parse(localStorage.getItem("adminUser") || "null");
  } catch {
    return null;
  }
}
