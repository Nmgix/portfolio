import React, { createContext, createRef, ReactNode, useContext } from "react";
import styles from "./_app.controller.module.scss";

import { AlertStack } from "nmgix-components/src";
import { ThemeWrapper } from "nmgix-components/src";
import { PopupStack } from "nmgix-components/src";

import { AlertStackSettings } from "nmgix-components/src/components/AlertComponentsGroup/AlertStack";
import { AlertRef } from "nmgix-components/src/components/AlertComponentsGroup/types";
import { PopupRef } from "nmgix-components/src/components/PopupComponentsGroup";
import { ThemeRef } from "nmgix-components/src/components/ThemeWrapperComponent";

type AppContext = {
  popupsControl: PopupRef;
  alertsControl: AlertRef;
};
const AppContext = createContext<AppContext | undefined>(undefined);

type AppControllerProps = {
  children: ReactNode;
};

const AppController: React.FC<AppControllerProps> = ({ children }) => {
  const popupsRef = createRef<PopupRef>();

  const alertsRef = createRef<AlertRef>();
  const alertSettings: Omit<AlertStackSettings, "alerts"> = {
    timeout: 5000,
    windowFixed: true,
  };

  const themeRef = createRef<ThemeRef>();

  return (
    <AppContext.Provider value={{ alertsControl: alertsRef.current, popupsControl: popupsRef.current }}>
      <PopupStack ref={popupsRef} />
      <AlertStack ref={alertsRef} alerts={[]} {...alertSettings} />
      <ThemeWrapper ref={themeRef} />
      <div className={styles.appController}>{children}</div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Контекст приложения не создался");
  }

  return context;
};

export default AppController;
