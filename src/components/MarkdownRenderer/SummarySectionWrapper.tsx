import { marked } from "marked";

type SummarySectionWrapperProps = {
  enableSummary: boolean;
  summary: string;
};

const SummarySectionWrapper: React.FC<SummarySectionWrapperProps> = ({ enableSummary, summary }) => {
  return (
    enableSummary && (
      <section className="mb-4">
        {summary && <div className="mt-2" dangerouslySetInnerHTML={{ __html: marked.parse(summary) }}></div>}
      </section>
    )
  );
};

export default SummarySectionWrapper;
