import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param dirty - The potentially unsafe HTML string
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li'],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitizes plain text content
 * @param input - The potentially unsafe text
 * @returns Sanitized text string
 */
export function sanitizeText(input: string): string {
  return DOMPurify.sanitize(input, { USE_PROFILES: { html: false } });
}

/**
 * Validates and sanitizes URLs to prevent malicious links
 * @param url - The URL to validate
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  try {
    // Basic URL validation
    if (!url || typeof url !== 'string') return '';
    
    const trimmed = url.trim();
    if (trimmed.length === 0) return '';
    
    // Check for dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];
    const lowerUrl = trimmed.toLowerCase();
    
    for (const protocol of dangerousProtocols) {
      if (lowerUrl.startsWith(protocol)) {
        return '';
      }
    }
    
    // Try to create a URL object to validate
    const urlObj = new URL(trimmed);
    
    // Only allow http and https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    
    return urlObj.toString();
  } catch {
    return '';
  }
}

/**
 * Validates and sanitizes email addresses
 * @param email - The email to validate
 * @returns Sanitized email or empty string if invalid
 */
export function sanitizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase();
  
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmed)) {
    return '';
  }
  
  // Remove any potentially malicious characters but keep basic email chars
  return trimmed.replace(/[<>\"']/g, '');
}

/**
 * Sanitizes search queries by removing potentially dangerous patterns
 * @param query - The search query to sanitize
 * @returns Sanitized search query with max length of 200
 */
export function sanitizeSearchQuery(query: string): string {
  const maxLength = 200;
  
  if (!query || typeof query !== 'string') return '';
  
  // Remove SQL-like injection patterns
  const sanitized = query
    .trim()
    .substring(0, maxLength)
    .replace(/[<>\"']/g, '') // Remove dangerous HTML chars
    .replace(/[';\-]/g, ''); // Remove SQL-like chars (escape dash to use literally)
  
  return sanitized;
}

/**
 * Removes non-printable characters that could be used for attacks
 * @param input - The string to clean
 * @returns Clean string without control characters
 */
export function removeControlCharacters(input: string): string {
  return input.replace(/[\x00-\x1F\x7F]/g, '');
}

