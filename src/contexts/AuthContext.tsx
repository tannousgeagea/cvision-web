import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/hooks/useAuth';
import { User } from '@/types/membership';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API for demo purposes
// const mockAuthAPI = {
  // login: async (email: string, password: string): Promise<{ user: User; token: string; refreshToken: string }> => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // In a real app, validate credentials with backend
  //       if (email && password) {
  //         resolve({
  //           user: { id: '1', email, username: 'VisionNest User' },
  //           token: 'mock-jwt-token',
  //           refreshToken: 'mock-refresh-token'
  //         });
  //       } else {
  //         reject(new Error('Invalid credentials'));
  //       }
  //     }, 800);
  //   });
  // },
//   refreshToken: async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
//           refreshToken: localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken') || ''
//         });
//       }, 500);
//     });
//   }
// };

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if we have a token in storage on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const refreshTokenValue = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
        
        if (storedUser && token && refreshTokenValue) {
            setUser(JSON.parse(storedUser));
            await refreshToken();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear any invalid tokens
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);


  // ✅ Automatic token refresh effect
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;
  
    const expiryString = localStorage.getItem('tokenExpiry') || sessionStorage.getItem('tokenExpiry');
    if (!expiryString) return;

    const expiryTime = new Date(expiryString).getTime();
    const now = Date.now();
    const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
    const interval = expiryTime - now - bufferTime;

    if (interval <= 0) {
      console.warn('Token already expired or too close to expiry!');
      return;
    }
    
    console.log("Exprity Time: ", interval)
    const refreshInterval = setInterval(() => {
      refreshToken();
    }, interval); // 15 minutes

    return () => clearInterval(refreshInterval);
  }, [user]);

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { token, refreshToken, expires_at } = await authService.login(email, password);
      const user = await authService.getUser(token);
      
      // Store auth data in the appropriate storage
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('refreshToken', refreshToken);
      storage.setItem('user', JSON.stringify(user));
      storage.setItem('tokenExpiry', expires_at);
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
    
    setUser(null);
    navigate('/login');
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const currentRefreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
      
      if (!currentRefreshToken) {
        return false;
      }
      
      const { token, refreshToken: newRefreshToken, expires_at } = await authService.refreshToken(currentRefreshToken)
      console.log("Refreshing Token")
      // Update token in the storage that currently has it
      if (localStorage.getItem('refreshToken')) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('tokenExpiry', expires_at);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('refreshToken', newRefreshToken);
        sessionStorage.setItem('tokenExpiry', expires_at);
      }
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, log the user out
      logout();
      return false;
    }
  };

  const isAuthenticated = !!user;
  
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};