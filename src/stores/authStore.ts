import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { ENABLE_MOCK_AUTH, IS_PRODUCTION, warnMockAuth, isValidEmail } from '@/lib/auth-config';
import { logError, getUserErrorMessage } from '@/lib/error-handler';

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
        try {
          // WARNING: This is a MOCK authentication system
          // It accepts any email/password and is for DEVELOPMENT ONLY
          // DO NOT use in production without proper backend authentication
          
          if (!ENABLE_MOCK_AUTH) {
            const errorMsg = 'Mock authentication is disabled. Please implement real authentication.';
            logError({
              context: 'authStore.login',
              message: errorMsg,
              level: 'error',
            });
            toast.error('Authentication is not available. Please contact support.');
            throw new Error(errorMsg);
          }
          
          // Warn in production
          if (IS_PRODUCTION && ENABLE_MOCK_AUTH) {
            console.error('SECURITY WARNING: Mock auth enabled in production! This should never happen.');
          }
          
          // Validate email format
          if (!isValidEmail(email)) {
            const errorMsg = 'Invalid email format';
            logError({
              context: 'authStore.login',
              message: 'Invalid email format provided to mock login',
              metadata: { email },
            });
            toast.error('Please enter a valid email address');
            throw new Error(errorMsg);
          }
          
          // Validate password (even in mock, enforce minimum security)
          if (!password || password.length < 1) {
            const errorMsg = 'Password is required';
            logError({
              context: 'authStore.login',
              message: 'Password validation failed',
              level: 'warn',
            });
            toast.error('Password is required');
            throw new Error(errorMsg);
          }
          
          // Mock authentication - always succeeds
          const user: User = {
            id: Math.random().toString(36).substring(7),
            name: 'John Doe',
            email: email,
            phone: '+90 555 123 4567',
          };
          set({ user, isAuthenticated: true });
          toast.success('Login successful!');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          logError({
            context: 'authStore.login',
            message: errorMessage,
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { email },
          });
          // Only show toast if not already shown
          if (!errorMessage.includes('Please enter') && !errorMessage.includes('is required')) {
            toast.error(getUserErrorMessage(error, 'authStore'));
          }
          throw error;
        }
      },
      logout: () => {
        try {
          set({ user: null, isAuthenticated: false });
          // Clear CSRF token on logout
          import('@/lib/csrf').then(({ invalidateCsrfToken }) => {
            invalidateCsrfToken();
          }).catch((error) => {
            logError({
              context: 'authStore.logout',
              message: 'Failed to clear CSRF token',
              error: error instanceof Error ? error : new Error(String(error)),
              level: 'warn',
            });
          });
          toast.success('Logged out successfully');
        } catch (error) {
          logError({
            context: 'authStore.logout',
            message: 'Logout failed',
            error: error instanceof Error ? error : new Error(String(error)),
          });
          toast.error('Failed to log out. Please try again.');
          throw error;
        }
      },
      updateUser: (userData) => {
        try {
          if (!ENABLE_MOCK_AUTH && IS_PRODUCTION) {
            const errorMsg = 'User updates require real authentication in production';
            logError({
              context: 'authStore.updateUser',
              message: errorMsg,
              level: 'error',
            });
            throw new Error(errorMsg);
          }
          
          // Validate email if being updated
          if (userData.email && !isValidEmail(userData.email)) {
            const errorMsg = 'Invalid email format';
            logError({
              context: 'authStore.updateUser',
              message: 'Invalid email format in user update',
              metadata: { email: userData.email },
            });
            toast.error('Please enter a valid email address');
            throw new Error(errorMsg);
          }
          
          set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null,
          }));
          toast.success('Profile updated successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Update failed';
          logError({
            context: 'authStore.updateUser',
            message: errorMessage,
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { userData },
          });
          // Only show toast if not already shown
          if (!errorMessage.includes('Please enter')) {
            toast.error(getUserErrorMessage(error, 'authStore.updateUser'));
          }
          throw error;
        }
      },
    }),
    { name: 'auth-storage' }
  )
);
