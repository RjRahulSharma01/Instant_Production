// Shared motion language.
// Easing is Expo.out (0.16, 1, 0.3, 1) everywhere so the whole site moves the same way.

export const EASE = [0.16, 1, 0.3, 1];

// Reveal once, shortly after the element's top enters the viewport.
//
// Do NOT use `amount: <number>` here. IntersectionObserver caps
// intersectionRatio at viewportHeight / elementHeight, so for any element
// taller than the screen a threshold like 0.2 can never be met and the
// animation never fires and the element stays at opacity 0 forever. That is
// exactly what happened to the ten-card services grid on mobile.
// `margin` triggers on position instead, which is height-independent.
export const viewport = { once: true, margin: '0px 0px -12% 0px' };

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
