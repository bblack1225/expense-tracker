"use client";

import {
  createCurrentDateStore,
  CurrentDateStore,
  initCurrentDateStore,
} from "@/stores/current-date-store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type CurrentDateStoreApi = ReturnType<typeof createCurrentDateStore>;

export const CurrentDateStoreContext = createContext<
  CurrentDateStoreApi | undefined
>(undefined);

export interface CurrentDateStoreProviderProps {
  children: ReactNode;
}

export const CurrentDateStoreProvider = ({
  children,
}: CurrentDateStoreProviderProps) => {
  const storeRef = useRef<CurrentDateStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCurrentDateStore(initCurrentDateStore());
  }

  return (
    <CurrentDateStoreContext.Provider value={storeRef.current}>
      {children}
    </CurrentDateStoreContext.Provider>
  );
};

export const useCurrentDateStore = <T,>(
  selector: (store: CurrentDateStore) => T
): T => {
  const currentDateStoreContext = useContext(CurrentDateStoreContext);
  if (!currentDateStoreContext) {
    throw new Error(
      `useCurrentDateStore must be used within CurrentDateStoreProvider`
    );
  }
  return useStore(currentDateStoreContext, selector);
};
