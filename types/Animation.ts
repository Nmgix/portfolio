import { CSSProperties } from "react";

export type InjectedProps = {
  enterCount: number;
  inViewport: boolean;
  leaveCount: number;
};

export type TransitionStyles = {
  entering: CSSProperties;
  entered: CSSProperties;
  exiting?: CSSProperties;
  exited?: CSSProperties;
};
