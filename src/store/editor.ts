import { create } from "zustand";

interface EditorState {
  personName: string;
  setPersonName: (name: string) => void;

  subTitleText: string;
  setSubTitleText: (text: string) => void;

  enableSummary: boolean;
  summary: string;
  setSummary: (summary: string) => void;
  setEnableSummary: (enableSummary: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  personName: "John M. Doe",
  subTitleText: "Engineering Leader | +1 (512) 555-5555",
  setPersonName: (name) => set({ personName: name }),
  setSubTitleText: (text) => set({ subTitleText: text }),

  enableSummary: true,
  summary: "Engineering Leader with 15 years of experience in software development.",
  setSummary: (summary) => set({ summary }),
  setEnableSummary: (enableSummary) => set({ enableSummary }),
}));
