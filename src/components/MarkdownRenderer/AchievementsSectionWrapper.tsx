import { marked } from "marked";

type AchievementsSectionWrapperProps = {
  enableAchievements: boolean;
  achievementsSectionTitle: string;
  achievements: string;
};

const AchievementsSectionWrapper: React.FC<AchievementsSectionWrapperProps> = ({
  enableAchievements,
  achievementsSectionTitle,
  achievements,
}) => {
  return (
    enableAchievements && (
      <section className="mb-4">
        <h2 className="text-[14pt] font-bold">{achievementsSectionTitle}</h2>

        {achievements && <div className="mt-2" dangerouslySetInnerHTML={{ __html: marked.parse(achievements) }}></div>}
      </section>
    )
  );
};

export default AchievementsSectionWrapper;
