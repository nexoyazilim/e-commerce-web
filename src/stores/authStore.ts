import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ENABLE_MOCK_AUTH, IS_PRODUCTION, warnMockAuth, isValidEmail } from '@/lib/auth-config';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, _password: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Warn about mock auth on store initialization
warnMockAuth();

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        // WARNING: This is a MOCK authentication system
        // It accepts any email/password and is for DEVELOPMENT ONLY
        // DO NOT use in production without proper backend authentication
        
        if (!ENABLE_MOCK_AUTH) {
          console.error('Mock authentication is disabled. Please implement real authentication.');
          return;
        }
        
        // Warn in production
        if (IS_PRODUCTION && ENABLE_MOCK_AUTH) {
          console.error('SECURITY WARNING: Mock auth enabled in production! This should never happen.');
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
          console.warn('Invalid email format provided to mock login');
          throw new Error('Invalid email format');
        }
        
        // Validate password (even in mock, enforce minimum security)
        if (!password || password.length < 1) {
          console.warn('Password is required');
          throw new Error('Password is required');
        }
        
        // Mock authentication - always succeeds
        const user: User = {
          id: Math.random().toString(36).substring(7),
          name: 'John Doe',
          email: email,
          phone: '+90 555 123 4567',
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        // Clear CSRF token on logout
        import('@/lib/csrf').then(({ invalidateCsrfToken }) => {
          invalidateCsrfToken();
        });
      },
      updateUser: (userData) => {
        if (!ENABLE_MOCK_AUTH && IS_PRODUCTION) {
          console.error('User updates require real authentication in production');
          return;
        }
        
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    { name: 'auth-storage' }
  )
);
