// Base URL of your backend — change this if your API runs elsewhere
// (e.g. during local dev it might be http://localhost:5000)
const API_BASE_URL = "http://localhost:5000";

const TOKEN_KEY = "proai_token";
const TOKEN_EXPIRY_KEY = "proai_token_expiry";
const USER_KEY = "proai_user";

// Saves token + computes expiry timestamp (3 hours from now, matches backend)
const saveSession = (token, user) => {
  const expiryTime = Date.now() + 3 * 60 * 60 * 1000; // 3 hours in ms
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiryTime));
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!token || !expiry) return null;

  // if 3 hours have passed, treat as logged out
  if (Date.now() > Number(expiry)) {
    clearSession();
    return null;
  }

  return token;
};

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const isLoggedIn = () => !!getToken();

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(USER_KEY);
};

export const login = async (phone, password) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  saveSession(data.token, data.user);
  return data.user;
};

export const register = async (fullName, phone, password, confirmPassword) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, phone, password, confirmPassword }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Registration failed");
  }

  saveSession(data.token, data.user);
  return data.user;
};

export const logout = () => {
  clearSession();
};

// Helper for calling protected routes later, e.g. authFetch("/api/auth/me")
export const authFetch = async (path, options = {}) => {
  const token = getToken();
  if (!token) throw new Error("Not logged in");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    clearSession();
    throw new Error("Session expired, please login again");
  }

  return res.json();
};