/**
 * Authentication Configuration
 * 
 * This file manages authentication configuration and environment checks.
 * In production, this would connect to a real authentication service.
 */

/**
 * Environment check to determine if we're in production
 */
export const IS_PRODUCTION = import.meta.env.MODE === 'production';

/**
 * Whether mock authentication is enabled
 * In production, this should ALWAYS be false
 */
export const ENABLE_MOCK_AUTH = import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'false';

/**
 * Logs a warning when mock auth is being used
 */
export function warnMockAuth() {
  if (IS_PRODUCTION && ENABLE_MOCK_AUTH) {
    console.warn(
      '⚠️ WARNING: Mock authentication is enabled in production! ' +
      'This is a security risk. Disable mock auth immediately.'
    );
  } else if (ENABLE_MOCK_AUTH && !IS_PRODUCTION) {
    console.info(
      'ℹ️ INFO: Mock authentication is active (development mode only).'
    );
  }
}

/**
 * Email format validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address format
 * @param email - The email to validate
 * @returns true if the email format is valid
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates password strength
 * @param password - The password to validate
 * @returns Object with validity and error message
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  
  return { valid: true };
}

/**
 * Gets the authentication configuration based on environment
 */
export function getAuthConfig() {
  return {
    isProduction: IS_PRODUCTION,
    mockAuthEnabled: ENABLE_MOCK_AUTH,
    apiUrl: import.meta.env.VITE_API_URL || '',
  };
}

