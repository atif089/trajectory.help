import { create } from "zustand";

import { Experience } from "~/components/MarkdownRenderer/ExperienceSection";
import { experiences as initialExperiences } from "~/components/MarkdownRenderer/ExperienceSection/sampleData";

export interface CustomBlock {
  id: string;
  enabled: boolean;
  title: string;
  content: string;
}

export type SectionType = "experiences" | "customBlock";

export interface SectionOrder {
  id: string;
  type: SectionType;
  enabled: boolean;
  customBlockId?: string; // For custom block sections
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

  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;

  customBlocks: CustomBlock[];
  addCustomBlock: () => void;
  updateCustomBlock: (id: string, updates: Partial<Omit<CustomBlock, "id">>) => void;
  removeCustomBlock: (id: string) => void;

  sectionOrder: SectionOrder[];
  setSectionOrder: (order: SectionOrder[]) => void;
}

const achievements = `* Delivered order microservice with **99.99% uptime SLA**
* Implemented a CI/CD pipeline for a mobile app, **reducing release time by 50%**
* Engineered a scalable data processing system for a financial institution, handling **100M+ transactions per day**`;

export const useEditorStore = create<EditorState>((set) => ({
  personName: "John M. Doe",
  subTitleText: "Engineering Leader • Austin, TX • +1 (512) 555-5555 • john.doe@example.com",
  setPersonName: (name) => set({ personName: name }),
  setSubTitleText: (text) => set({ subTitleText: text }),

  enableSummary: true,
  summary:
    "Engineering Leader with 15 years of experience in software development and scaling large-scale production infrastructure. Drove reliability efforts including monitoring, alerting, automated deployment pipelines, failure resiliency and capacity management.",
  setSummary: (summary) => set({ summary }),
  setEnableSummary: (enableSummary) => set({ enableSummary }),

  experiences: initialExperiences,
  setExperiences: (experiences) => set({ experiences }),

  customBlocks: [
    {
      id: "block-achievements-1",
      enabled: true,
      title: "Achievements",
      content: achievements,
    },
    {
      id: "block-skills-1",
      enabled: true,
      title: "Skills",
      content:
        "* **Programming Languages**: TypeScript, JavaScript, Python, Java, C#\n* **Tools**: Git, Docker, Kubernetes, Jira, Confluence",
    },
  ],

  sectionOrder: [
    { id: "section-achievements", type: "customBlock", enabled: true, customBlockId: "block-achievements-1" },
    { id: "experiences", type: "experiences", enabled: true },
    { id: "section-skills", type: "customBlock", enabled: true, customBlockId: "block-skills-1" },
  ],

  addCustomBlock: () =>
    set((state) => {
      const newBlockId = `block-${Date.now()}`;
      const newBlock = {
        id: newBlockId,
        enabled: true,
        title: "Section Title",
        content: "Add your section content here",
      };

      return {
        customBlocks: [...state.customBlocks, newBlock],
        sectionOrder: [
          ...state.sectionOrder,
          {
            id: `section-${newBlockId}`,
            type: "customBlock" as SectionType,
            enabled: true,
            customBlockId: newBlockId,
          },
        ],
      };
    }),
  updateCustomBlock: (id, updates) =>
    set((state) => {
      const updatedCustomBlocks = state.customBlocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      );

      // If enabled state changed, update section order too
      let updatedSectionOrder = state.sectionOrder;
      if ("enabled" in updates) {
        updatedSectionOrder = state.sectionOrder.map((section) =>
          section.customBlockId === id ? { ...section, enabled: updates.enabled! } : section
        );
      }

      return {
        customBlocks: updatedCustomBlocks,
        sectionOrder: updatedSectionOrder,
      };
    }),
  removeCustomBlock: (id) =>
    set((state) => ({
      customBlocks: state.customBlocks.filter((block) => block.id !== id),
      sectionOrder: state.sectionOrder.filter((section) => section.customBlockId !== id),
    })),

  setSectionOrder: (order) => set({ sectionOrder: order }),
}));
