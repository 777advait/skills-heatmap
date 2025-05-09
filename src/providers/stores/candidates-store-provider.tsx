"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  type CandidatesStore,
  createCandidatesStore,
} from "~/utils/stores/candidates.store";

export type CandidatesStoreApi = ReturnType<typeof createCandidatesStore>;
export const CandidatesStoreContext = createContext<
  CandidatesStoreApi | undefined
>(undefined);

export const useCandidatesStore = <T,>(
  selector: (store: CandidatesStore) => T,
): T => {
  const candidatesStoreContext = useContext(CandidatesStoreContext);

  if (!candidatesStoreContext) {
    throw new Error(
      "useCandidatesStore must be used within a CandidatesStoreProvider",
    );
  }

  return useStore(candidatesStoreContext, selector);
};

export function CandidatesStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<CandidatesStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createCandidatesStore();
  }

  return (
    <CandidatesStoreContext.Provider value={storeRef.current}>
      {children}
    </CandidatesStoreContext.Provider>
  );
}
