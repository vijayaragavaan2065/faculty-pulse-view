import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse } from '../types';
import { api, endpoints } from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Check if we're in mock mode or if backend is not available
          const isMockMode = import.meta.env.VITE_MOCK_MODE === 'true' || true; // Default to mock mode for demo
          
          if (isMockMode) {
            // Mock authentication for demo purposes
            const mockUsers = {
              'faculty@example.com': {
                id: '1',
                name: 'Dr. John Smith',
                email: 'faculty@example.com',
                role: 'faculty' as const,
                department_id: 'cs',
                department_name: 'Computer Science',
              },
              'hod@example.com': {
                id: '2',
                name: 'Dr. Sarah Johnson',
                email: 'hod@example.com',
                role: 'hod' as const,
                department_id: 'cs',
                department_name: 'Computer Science',
              },
              'director@example.com': {
                id: '3',
                name: 'Dr. Michael Brown',
                email: 'director@example.com',
                role: 'director' as const,
                department_id: null,
                department_name: 'Administration',
              },
              'registrar@example.com': {
                id: '4',
                name: 'Ms. Emily Davis',
                email: 'registrar@example.com',
                role: 'registrar' as const,
                department_id: null,
                department_name: 'Academic Office',
              },
              'admin@example.com': {
                id: '5',
                name: 'Mr. David Wilson',
                email: 'admin@example.com',
                role: 'admin' as const,
                department_id: null,
                department_name: 'IT Department',
              },
            };

            const mockUser = mockUsers[email as keyof typeof mockUsers];
            
            if (mockUser && password === 'password123') {
              const mockToken = 'mock-jwt-token-' + Date.now();
              
              // Store token and user data
              localStorage.setItem('access_token', mockToken);
              localStorage.setItem('user', JSON.stringify(mockUser));

              set({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                isLoading: false,
              });
              return;
            } else {
              throw new Error('Invalid credentials');
            }
          }

          // Real API call (when backend is available)
          const response = await api.post<AuthResponse>(endpoints.auth.login, {
            email,
            password,
          });

          const { access_token, user } = response.data;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('user', JSON.stringify(user));

          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.message || 'Login failed. Please check your credentials.');
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      refreshUser: async () => {
        try {
          const response = await api.get<User>(endpoints.auth.me);
          const user = response.data;

          // Update stored user data
          localStorage.setItem('user', JSON.stringify(user));

          set({ user });
        } catch (error) {
          // If refresh fails, logout user
          get().logout();
          throw error;
        }
      },

      setUser: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user and token
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // Rehydrate function to sync with localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          const token = localStorage.getItem('access_token');
          const userStr = localStorage.getItem('user');
          
          if (token && userStr) {
            try {
              const user = JSON.parse(userStr);
              state.user = user;
              state.token = token;
              state.isAuthenticated = true;
            } catch (error) {
              // Clear invalid data
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              state.user = null;
              state.token = null;
              state.isAuthenticated = false;
            }
          }
        }
      },
    }
  )
);

// Custom hook for easier access to auth functions
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, refreshUser, setUser } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
    setUser,
    // Helper function to check if user has specific role
    hasRole: (role: string) => user?.role === role,
    // Helper function to check if user has any of the specified roles
    hasAnyRole: (roles: string[]) => roles.includes(user?.role || ''),
  };
};