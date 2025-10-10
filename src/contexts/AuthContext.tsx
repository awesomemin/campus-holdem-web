import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

const getAccessTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'access_token') {
      return value || null;
    }
  }
  return null;
};

interface User {
  userId: number;
  nickname: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const accessToken = getAccessTokenFromCookie();

    if (storedUser && accessToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    } else if (storedUser && !accessToken) {
      console.log('Access token missing, clearing stored user data');
      localStorage.removeItem('user');
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  // Listen for unauthorized events from API calls
  useEffect(() => {
    const handleUnauthorized = () => {
      console.log('Unauthorized event received, logging out user');
      setUser(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    document.cookie =
      'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
