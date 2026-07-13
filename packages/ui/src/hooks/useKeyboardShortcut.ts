import { useEffect, useCallback } from 'react';

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean } = {}
) {
  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      if (options.ctrl && !event.ctrlKey) return;
      if (options.shift && !event.shiftKey) return;
      if (options.alt && !event.altKey) return;
      if (options.meta && !event.metaKey) return;
      event.preventDefault();
      callback();
    },
    [key, callback, options]
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}