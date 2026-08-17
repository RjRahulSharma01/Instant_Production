import { useEffect, useState } from 'react';

/** Subscribes to a media query and re-renders on change. SSR-safe. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * True on finger-driven devices. Hover, tilt and magnetic effects are
 * meaningless here, and worse, pointer events still fire on touch and leave
 * elements stuck in a hovered state after a tap.
 */
export const useIsTouch = () => useMediaQuery('(hover: none), (pointer: coarse)');

/** Phone-sized viewport. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');

/** Phone or tablet. */
export const useIsSmall = () => useMediaQuery('(max-width: 1023px)');
