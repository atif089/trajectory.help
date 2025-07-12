import { create } from "zustand";

import { Experience } from "@/components/ExperienceSection";
import { experiences as initialExperiences } from "@/components/ExperienceSection/sampleData";

interface EditorState {
  personName: string;
  setPersonName: (name: string) => void;

  subTitleText: string;
  setSubTitleText: (text: string) => void;

  enableSummary: boolean;
  summary: string;
  setSummary: (summary: string) => void;
  setEnableSummary: (enableSummary: boolean) => void;

  enableAchievements: boolean;
  achievements: string[];
  setAchievements: (achievements: string[]) => void;
  setEnableAchievements: (enableAchievements: boolean) => void;

  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
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

  enableAchievements: true,
  achievements: ["Achievement 1", "Achievement 2", "Achievement 3"],
  setAchievements: (achievements) => set({ achievements }),
  setEnableAchievements: (enableAchievements) => set({ enableAchievements }),

  experiences: initialExperiences,
  setExperiences: (experiences) => set({ experiences }),
}));
