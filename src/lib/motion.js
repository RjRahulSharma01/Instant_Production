// Shared motion language.
// Easing is Expo.out (0.16, 1, 0.3, 1) everywhere so the whole site moves the same way.

export const EASE = [0.16, 1, 0.3, 1];

// Reveal once, when ~20% of the element is on screen.
export const viewport = { once: true, amount: 0.2 };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

// Parent wrapper: children reveal in sequence.
export const stagger = (each = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: each, delayChildren },
  },
});

// Card entrance used by the Services / Industries / Portfolio grids.
export const cardIn = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

// Standard section reveal props. Spread onto a motion element.
export const revealSection = {
  initial: 'hidden',
  whileInView: 'show',
  viewport,
  variants: fadeUp,
};

// Hover lift shared by all interactive cards.
export const hoverLift = {
  whileHover: { y: -8, scale: 1.01, transition: { duration: 0.25, ease: EASE } },
  whileTap: { scale: 0.985 },
};
