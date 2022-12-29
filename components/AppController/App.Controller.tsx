import React, { createContext, createRef, CSSProperties, ReactNode, useContext, useEffect } from "react";
import { AppContext, AppControllerProps } from "types/AppContext";
import styles from "./_app.controller.module.scss";

import { AlertStack } from "nmgix-components/src";
import { ThemeWrapper } from "nmgix-components/src";
import { PopupStack } from "nmgix-components/src";

import { AlertStackSettings } from "nmgix-components/src/components/AlertComponentsGroup/AlertStack";
import { AlertRef } from "nmgix-components/src/components/AlertComponentsGroup/types";
import { PopupRef } from "nmgix-components/src/components/PopupComponentsGroup";
import { ThemeRef } from "nmgix-components/src/components/ThemeWrapperComponent";

const AppContext = createContext<AppContext | undefined>(undefined);

const AppController: React.FC<AppControllerProps> = ({ children }) => {
  const popupsRef = createRef<PopupRef>();
  const themeRef = createRef<ThemeRef>();

  const alertsRef = createRef<AlertRef>();
  const alertSettings: Omit<AlertStackSettings, "alerts"> = {
    timeout: 5000,
    windowFixed: true,
  };

  const alertStyles: CSSProperties = {
    top: "5%",
    right: "5%",
  };

  return (
    <div className={styles.widthWrapper}>
      <AppContext.Provider value={{ alertsControl: alertsRef, popupsControl: popupsRef }}>
        <PopupStack ref={popupsRef} />
        <AlertStack ref={alertsRef} alerts={[]} {...alertSettings} customStyles={alertStyles} />
        <ThemeWrapper ref={themeRef} />
        <div className={styles.appController}>{children}</div>
      </AppContext.Provider>
    </div>
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
