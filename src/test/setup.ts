import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock window APIs that are used in the codebase
if (typeof window !== 'undefined') {
  // Mock requestAnimationFrame and cancelAnimationFrame if they don't exist
  if (!window.requestAnimationFrame) {
    let rafId = 0;
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      const id = rafId++;
      setTimeout(() => callback(performance.now()), 0);
      return id;
    };
    
    window.cancelAnimationFrame = (id: number) => {
      clearTimeout(id);
    };
  }
  
  // Mock performance.now if it doesn't exist
  if (!window.performance?.now) {
    Object.defineProperty(window.performance, 'now', {
      value: () => Date.now(),
      writable: true,
    });
  }
  
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});

