import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import PDFWebView from "@/components/pdf-web-view";
import { useEditorStore } from "@/store/editor.store";

const PDF_REFRESH_UPDATE_INTERVAL = 3000;

export const Route = createFileRoute("/lab")({
  component: Lab,
});

const FormField = ({ fieldTitle, children }: { fieldTitle: string; children: React.ReactNode }) => {
  return (
    <div className="editor_field__wrapper mb-4">
      <label className="block text-xs mb-2 font-medium text-gray-700" htmlFor="personName">
        {fieldTitle}
      </label>
      {children}
    </div>
  );
};

function Lab() {
  const {
    personName,
    subTitleText,
    enableSummary,
    summary,
    setPersonName,
    setSubTitleText,
    setEnableSummary,
    setSummary,
  } = useEditorStore();
  const debouncedPersonName = useDebounce(personName, PDF_REFRESH_UPDATE_INTERVAL);
  const debouncedSubTitleText = useDebounce(subTitleText, PDF_REFRESH_UPDATE_INTERVAL);
  const debouncedSummary = useDebounce(summary, PDF_REFRESH_UPDATE_INTERVAL);
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div className="flex h-screen">
      {/* Column 1: Sidebar */}
      <div className="w-20 p-4">
        {/* Icons or 1-word text here */}
        <div>Icon1</div>
      </div>

      {/* Column 2: Inputs */}
      <div
        className="w-full max-w-md m-4 p-4 rounded-lg bg-white border shadow-lg border-gray-200"
        style={{ maxWidth: "800px" }}
      >
        <FormField fieldTitle="Name">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mb-2 border border-gray-200 rounded"
            value={personName}
            onChange={(e) => {
              setPersonName(e.target.value);
              setAnimationKey((prevKey) => prevKey + 1);
            }}
          />
        </FormField>
        <FormField fieldTitle="Subtitle">
          <input
            type="text"
            placeholder="Your Subtitle"
            className="w-full p-2 mb-2 border border-gray-200 rounded"
            value={subTitleText}
            onChange={(e) => {
              setSubTitleText(e.target.value);
              setAnimationKey((prevKey) => prevKey + 1);
            }}
          />
        </FormField>
        <FormField fieldTitle="Summary">
          <input type="checkbox" checked={enableSummary} onChange={(e) => setEnableSummary(e.target.checked)} />
          <textarea
            placeholder="Your Summary"
            className="w-full p-2 mb-2 border border-gray-200 rounded"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
              setAnimationKey((prevKey) => prevKey + 1);
            }}
          />
        </FormField>
      </div>

      {/* Column 3: Main Content */}
      <div className="flex-grow p-4">
        <div
          key={animationKey}
          className="h-1 mb-0 bg-blue-500 loading-bar-animation"
          style={{ backgroundSize: "200% 100%" }}
        />
        <ClientOnly>
          <PDFWebView
            personName={debouncedPersonName}
            subTitleText={debouncedSubTitleText}
            enableSummary={enableSummary}
            summary={summary}
          />
        </ClientOnly>
      </div>
    </div>
  );
}

export default Lab;
