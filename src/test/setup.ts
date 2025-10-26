import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) =>
    React.createElement('a', { href: to, ...props }, children),
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
  const createElement = (tag: string, props: Record<string, unknown> = {}, children?: React.ReactNode) => {
    // Filter out framer-motion specific props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { whileHover, whileTap, initial, animate, transition, exit, viewport, ...rest } = props;
    return React.createElement(tag, rest as React.HTMLAttributes<HTMLElement>, children);
  };
  
  return {
    motion: new Proxy({}, {
      get: (_target, prop: string) => (props: Record<string, unknown> = {}) => {
        return createElement(prop as string, props, props.children as React.ReactNode);
      },
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useMotionValue: () => ({ get: () => 0, set: () => {} }),
    useSpring: () => ({ get: () => 0, set: () => {} }),
  };
});

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
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});

