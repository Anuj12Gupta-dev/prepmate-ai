import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add Authorization Bearer token to every request
axiosInstance.interceptors.request.use(async (config) => {
  // Clerk v5 exposes the client globally in the browser
  const clerk = window.Clerk;

  if (clerk && clerk.session) {
    const token = await clerk.session.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;
