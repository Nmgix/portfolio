import { TransitionStyles } from "nmgix-components/src";

export const slideTransitionFunction: (sizePX: number) => TransitionStyles = (size) => ({
  entering: { opacity: 0, transform: `translateY(${size}px)` },
  entered: { opacity: 1, transform: "translateY(0px)" },
  exiting: { opacity: 0, transform: `translateY(-${size}px)` },
  exited: { opacity: 0 },
});

export const opacityTransition: TransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1, transition: "all 3s" },
  exited: { opacity: 0 },
};

export const scaleTransition: TransitionStyles = {
  entering: { opacity: 0, scale: "1.1" },
  entered: { opacity: 1, scale: "1" },
};
