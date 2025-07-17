import { create } from "zustand";

import { Experience } from "@/components/ExperienceSection";
import { experiences as initialExperiences } from "@/components/ExperienceSection/sampleData";

export interface CustomBlock {
  id: string;
  enabled: boolean;
  title: string;
  content: string;
}

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
  achievements: string;
  setAchievements: (achievements: string) => void;
  setEnableAchievements: (enableAchievements: boolean) => void;

  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
  
  customBlocks: CustomBlock[];
  addCustomBlock: () => void;
  updateCustomBlock: (id: string, updates: Partial<Omit<CustomBlock, 'id'>>) => void;
  removeCustomBlock: (id: string) => void;
}

const achievements = `* Delivered order microservice with **99.99% uptime SLA**.
* Implemented a CI/CD pipeline for a mobile app, **reducing release time by 50%**.
* Engineered a scalable data processing system for a financial institution, handling **100M+ transactions per day**.`;

export const useEditorStore = create<EditorState>((set) => ({
  personName: "John M. Doe",
  subTitleText: "Engineering Leader | +1 (512) 555-5555",
  setPersonName: (name) => set({ personName: name }),
  setSubTitleText: (text) => set({ subTitleText: text }),

  enableSummary: true,
  summary:
    "Engineering Leader with 15 years of experience in software development and scaling large-scale production infrastructure. Drove reliability efforts including monitoring, alerting, automated deployment pipelines, failure resiliency and capacity management.",
  setSummary: (summary) => set({ summary }),
  setEnableSummary: (enableSummary) => set({ enableSummary }),

  enableAchievements: true,
  achievements,
  setAchievements: (achievements) => set({ achievements }),
  setEnableAchievements: (enableAchievements) => set({ enableAchievements }),

  experiences: initialExperiences,
  setExperiences: (experiences) => set({ experiences }),
  
  customBlocks: [],
  addCustomBlock: () => set((state) => ({
    customBlocks: [
      ...state.customBlocks,
      {
        id: `block-${Date.now()}`,
        enabled: true,
        title: 'Custom Block',
        content: 'Add your content here'
      }
    ]
  })),
  updateCustomBlock: (id, updates) => set((state) => ({
    customBlocks: state.customBlocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    )
  })),
  removeCustomBlock: (id) => set((state) => ({
    customBlocks: state.customBlocks.filter(block => block.id !== id)
  }))
}));
