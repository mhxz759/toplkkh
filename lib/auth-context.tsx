"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: "client" | "professional";
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string, userType: "client" | "professional") => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "comuni_users";
const CURRENT_USER_KEY = "comuni_current_user";

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getStoredUsers(): Record<string, { user: User; password: string }> {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { user: User; password: string }>) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session only on client
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    userType: "client" | "professional"
  ): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    if (users[normalizedEmail]) {
      return { success: false, error: "Este email ja esta cadastrado. Tente fazer login." };
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      email: normalizedEmail,
      full_name: fullName,
      phone: phone,
      user_type: userType,
      created_at: new Date().toISOString(),
    };

    // Save user
    users[normalizedEmail] = { user: newUser, password };
    saveUsers(users);
    
    // Set current user
    setCurrentUser(newUser);
    setUser(newUser);

    return { success: true };
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const userData = users[normalizedEmail];
    if (!userData) {
      return { success: false, error: "Email ou senha incorretos. Tente novamente." };
    }

    if (userData.password !== password) {
      return { success: false, error: "Email ou senha incorretos. Tente novamente." };
    }

    // Set current user
    setCurrentUser(userData.user);
    setUser(userData.user);

    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
