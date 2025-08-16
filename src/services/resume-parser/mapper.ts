import { useEditorStore } from "@/store/editor.store";
import { Experience } from "@/components/MarkdownRenderer/ExperienceSection";

export interface ResumeDto {
  Name: string;
  ResumeHeader: string;
  ProfileSummary: string;
  Experience: {
    CompanyName: string;
    JobTitle: string;
    StartDate: string;
    EndDate: string;
    ExperienceSummary: string;
    Experience: string[];
  }[];
  Skills: string[];
  Achievements: string[];
}

export const mapResumeDtoToEditorState = (dto: ResumeDto) => {
  useEditorStore.setState((state) => {
    const experiences: Experience[] = dto.Experience.map((exp) => {
      const bullets = exp.Experience.map((e) => `* ${e}`).join("\n");
      const experienceSummary = `${exp.ExperienceSummary}\n\n${bullets}`;
      return {
        company: exp.CompanyName,
        position: exp.JobTitle,
        location: "",
        from: exp.StartDate,
        to: exp.EndDate,
        experienceSummary,
      };
    });

    const achievementsContent = dto.Achievements.map((a) => `* ${a}`).join("\n");
    const skillsContent = dto.Skills.map((s) => `* ${s}`).join("\n");

    const customBlocks = state.customBlocks.map((b) => {
      const title = b.title.toLowerCase();
      if (title.includes("achievement")) {
        return { ...b, content: achievementsContent };
      }
      if (title.includes("skill")) {
        return { ...b, content: skillsContent };
      }
      return b;
    });

    return {
      personName: dto.Name,
      subTitleText: dto.ResumeHeader,
      summary: dto.ProfileSummary,
      enableSummary: Boolean(dto.ProfileSummary),
      experiences,
      customBlocks,
    };
  });
};
