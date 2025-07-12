import axios from "../api/axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAxios = () => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  // Cria uma instância exclusiva para esse hook
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    withCredentials: true,
  });

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = instance.interceptors.request.use(config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      res => res,
      async error => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/refresh-token")
        ) {
          originalRequest._retry = true;
          try {
            const res = await instance.post("/refresh-token");
            setAccessToken(res.data.token);
            originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
            return instance(originalRequest);
          } catch (err) {
            navigate("/login");
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup para remover interceptors quando componente desmontar
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, navigate, setAccessToken]);

  return instance;
};

export default useAxios;
