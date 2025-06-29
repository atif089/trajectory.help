import { create } from "zustand";

interface EditorState {
  personName: string;
  subTitleText: string;
  setPersonName: (name: string) => void;
  setSubTitleText: (text: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  personName: "John M. Doe",
  subTitleText: "Engineering Leader | +1 (512) 555-5555",
  setPersonName: (name) => set({ personName: name }),
  setSubTitleText: (text) => set({ subTitleText: text }),
}));
