import { createStore } from "zustand";
import type { TCandidate } from "../types/candidates.types";

export type CandidatesState = {
  selectedCandidates: TCandidate[];
};

export type CandidatesActions = {};

export type CandidatesStore = CandidatesState & CandidatesActions;

export const defaultInitState: CandidatesState = {
  selectedCandidates: [],
};

export const createCandidatesStore = (
  initState: CandidatesState = defaultInitState,
) =>
  createStore<CandidatesStore>()((set, get) => ({
    ...initState,
    getSelectedCandidates: () => get().selectedCandidates,
  }));
