import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthContextValue, AuthUser } from "../types";

const TOKEN_STORAGE_KEY = "givr_admin_token";

interface DecodedToken {
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeAuthUser(token: string): AuthUser {
  const decoded = jwtDecode<DecodedToken>(token);
  return {
    email: decoded.email,
    role: decoded.role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) {
      return null;
    }

    try {
      return decodeAuthUser(storedToken);
    } catch {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }
  });

  const login = (nextToken: string): void => {
    const nextUser = decodeAuthUser(nextToken);
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = (): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
