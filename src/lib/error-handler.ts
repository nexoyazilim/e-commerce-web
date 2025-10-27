/**
 * Error Handling Utilities
 * 
 * Centralized error handling with logging, user-friendly messages,
 * and structured error information for debugging.
 */

export type ErrorLevel = 'error' | 'warn' | 'info';

export interface ErrorLogEntry {
  timestamp: string;
  level: ErrorLevel;
  context: string;
  message: string;
  error?: Error;
  metadata?: Record<string, unknown>;
}

/**
 * User-friendly error messages mapped to error types
 */
export const ERROR_MESSAGES = {
  validation: {
    required: 'Please fill in all required fields',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    length: 'Input is too long',
  },
  storage: {
    quota: 'Storage quota exceeded. Please clear some data and try again.',
    access: 'Unable to access storage. Please check your browser settings.',
    save: 'Failed to save data. Please try again.',
  },
  auth: {
    login: 'Login failed. Please check your credentials.',
    logout: 'Failed to log out. Please try again.',
    unauthorized: 'You must be logged in to perform this action.',
  },
  cart: {
    add: 'Failed to add item to cart. Please try again.',
    remove: 'Failed to remove item from cart. Please try again.',
    update: 'Failed to update cart. Please try again.',
    empty: 'Your cart is empty.',
  },
  order: {
    create: 'Failed to create order. Please try again.',
    validate: 'Order data is invalid. Please check your information.',
  },
  review: {
    submit: 'Failed to submit review. Please try again.',
    validate: 'Please provide a valid rating and comment.',
    length: 'Review text is too long. Please shorten your review.',
  },
  favorites: {
    add: 'Failed to add to favorites. Please try again.',
    remove: 'Failed to remove from favorites. Please try again.',
  },
  network: {
    timeout: 'Request timed out. Please try again.',
    offline: 'You are offline. Please check your connection.',
    server: 'Server error. Please try again later.',
  },
  general: {
    unexpected: 'An unexpected error occurred. Please try again.',
    retry: 'Something went wrong. Please try again.',
  },
};

/**
 * Logs an error with structured information
 */
export function logError(config: {
  context: string;
  message: string;
  level?: ErrorLevel;
  error?: Error;
  metadata?: Record<string, unknown>;
}): void {
  const entry: ErrorLogEntry = {
    timestamp: new Date().toISOString(),
    level: config.level || 'error',
    context: config.context,
    message: config.message,
    error: config.error,
    metadata: config.metadata,
  };

  const logMessage = `[${entry.timestamp}] ${entry.level.toUpperCase()} [${entry.context}]: ${entry.message}`;
  
  if (config.error) {
    console.error(logMessage, {
      error: config.error,
      stack: config.error.stack,
      ...config.metadata,
    });
  } else {
    console[entry.level](logMessage, config.metadata);
  }

  // In production, this could send to an error tracking service
  if (import.meta.env.PROD) {
    // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
  }
}

/**
 * Formats error messages for user display
 */
export function getUserErrorMessage(error: unknown, context: string): string {
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('timeout') || error.message.includes('network')) {
      return ERROR_MESSAGES.network.timeout;
    }
    if (error.message.includes('offline')) {
      return ERROR_MESSAGES.network.offline;
    }
    
    // Storage errors
    if (error.message.includes('quota') || error.message.includes('QuotaExceeded')) {
      return ERROR_MESSAGES.storage.quota;
    }
    if (error.message.includes('access') || error.message.includes('AccessDenied')) {
      return ERROR_MESSAGES.storage.access;
    }

    // Validation errors
    if (error.message.includes('required') || error.message.includes('Required')) {
      return ERROR_MESSAGES.validation.required;
    }
    if (error.message.includes('email') || error.message.includes('Email')) {
      return ERROR_MESSAGES.validation.email;
    }
    if (error.message.includes('phone')) {
      return ERROR_MESSAGES.validation.phone;
    }
    if (error.message.includes('length') || error.message.includes('too long')) {
      return ERROR_MESSAGES.validation.length;
    }

    // Context-specific errors
    if (context.includes('auth')) {
      return ERROR_MESSAGES.auth.login;
    }
    if (context.includes('cart')) {
      return ERROR_MESSAGES.cart.add;
    }
    if (context.includes('order')) {
      return ERROR_MESSAGES.order.create;
    }
    if (context.includes('review')) {
      return ERROR_MESSAGES.review.submit;
    }
    if (context.includes('favorite')) {
      return ERROR_MESSAGES.favorites.add;
    }

    // Return specific error message if it's user-friendly
    if (error.message.length < 100 && !error.message.includes('Error:')) {
      return error.message;
    }
  }

  // Default error message
  return ERROR_MESSAGES.general.unexpected;
}

/**
 * Wraps an async function with error handling
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context: string,
  userMessage?: string
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    logError({
      context,
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error instanceof Error ? error : new Error(String(error)),
    });

    if (error instanceof Error) {
      throw new Error(userMessage || getUserErrorMessage(error, context));
    }
    throw error;
  }
}

/**
 * Validates a value is not null or undefined
 */
export function assertNotNull<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new Error(message || 'Expected value is null or undefined');
  }
  return value;
}

/**
 * Safely executes a function and returns a result or error
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  fallback?: T
): Promise<{ success: boolean; data?: T; error?: Error }> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return { success: false, error: err, data: fallback };
  }
}

