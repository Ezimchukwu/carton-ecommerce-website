
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock authentication - no backend integration
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: 'mock-user-id',
        email,
        firstName: 'Demo',
        lastName: 'User'
      };
      
      setUser(mockUser);
      localStorage.setItem('mock-user', JSON.stringify(mockUser));
      console.log('Mock login successful:', email);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const mockUser: User = {
        id: 'mock-user-id',
        email,
        firstName,
        lastName
      };
      
      setUser(mockUser);
      localStorage.setItem('mock-user', JSON.stringify(mockUser));
      console.log('Mock signup successful:', email);
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      console.log('Mock Google sign in...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful Google sign in
      const mockUser: User = {
        id: 'mock-google-user-id',
        email: 'demo@google.com',
        firstName: 'Google',
        lastName: 'User'
      };
      
      setUser(mockUser);
      localStorage.setItem('mock-user', JSON.stringify(mockUser));
      console.log('Mock Google sign in successful');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock-user');
    console.log('Mock logout successful');
  };

  // Check for existing user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mock-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('mock-user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      googleSignIn,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
