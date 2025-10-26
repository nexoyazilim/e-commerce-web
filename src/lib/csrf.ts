/**
 * CSRF Protection Utilities
 * 
 * Generates and validates CSRF tokens for form submissions.
 * Note: In a real application, tokens should be managed server-side.
 */

/**
 * Generates a random CSRF token
 * @returns A random token string
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Stores the current CSRF token in memory
 */
let currentToken: string | null = null;

/**
 * Gets the current CSRF token or generates a new one
 * @returns The current CSRF token
 */
export function getCsrfToken(): string {
  if (!currentToken) {
    currentToken = generateCsrfToken();
  }
  return currentToken;
}

/**
 * Validates a provided token against the current token
 * @param providedToken - The token to validate
 * @returns true if the token is valid
 */
export function validateCsrfToken(providedToken: string): boolean {
  return currentToken !== null && currentToken === providedToken;
}

/**
 * Invalidates the current token (for security on logout)
 */
export function invalidateCsrfToken(): void {
  currentToken = null;
}

/**
 * Regenerates the CSRF token
 */
export function regenerateCsrfToken(): string {
  currentToken = generateCsrfToken();
  return currentToken;
}

