import { createStore } from "zustand";
import type { TCandidate } from "../types/candidates.types";

export type CandidatesState = {
  selectedCandidates: TCandidate[];
};

export type CandidatesActions = {
  selectCandidate: (candidate: TCandidate) => void;
  deselectCandidate: (camdidate: TCandidate) => void;
};

export type CandidatesStore = CandidatesState & CandidatesActions;

export const defaultInitState: CandidatesState = {
  selectedCandidates: [],
};

export const createCandidatesStore = (
  initState: CandidatesState = defaultInitState,
) =>
  createStore<CandidatesStore>()((set) => ({
    ...initState,
    
    selectCandidate: (candidate: TCandidate) =>
      set((state) => ({
        selectedCandidates: [...state.selectedCandidates, candidate],
      })),

    deselectCandidate: (candidate: TCandidate) =>
      set((state) => ({
        selectedCandidates: state.selectedCandidates.filter(
          (c) => c.id !== candidate.id,
        ),
      })),
  }));
