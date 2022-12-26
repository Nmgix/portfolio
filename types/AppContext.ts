import { AlertRef } from "nmgix-components/src/components/AlertComponentsGroup/types";
import { PopupRef } from "nmgix-components/src/components/PopupComponentsGroup";
import { ReactNode } from "react";

export type AppContext = {
  popupsControl: React.RefObject<PopupRef>;
  alertsControl: React.RefObject<AlertRef>;
};

export type AppControllerProps = {
  children: ReactNode;
};
