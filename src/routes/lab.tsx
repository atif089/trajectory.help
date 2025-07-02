import { ClientOnly, createFileRoute } from "@tanstack/react-router";

import Editor from "@/components/Editor";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PDFContainer from "@/components/PDFContainer";

export const Route = createFileRoute("/lab")({
  component: Lab,
  head: () => ({
    meta: [
      {
        title: "Trajectory.help | CV Lab",
      },
      {
        name: "description",
        content: "Trajectory.help - grow your career, CV Lab",
      },
      {
        name: "keywords",
        content: "Trajectory.help, CV Lab, career growth, career development, career advancement, career success",
      },
    ],
  }),
});

function Lab() {
  return (
    <div className="flex h-screen">
      {/* Column 1: Sidebar */}
      <div className="w-20 p-4">
        {/* Icons or 1-word text here */}
        <div>Icon1</div>
      </div>

      {/* Column 2: Inputs */}
      <Editor />

      {/* Column 3: Main Content */}
      <div className="flex-grow p-4">
        <div className="h-1 mb-0 bg-blue-500 loading-bar-animation" style={{ backgroundSize: "200% 100%" }} />
        <ClientOnly>
          <MarkdownRenderer />
          {/* TODO: Figure out download button */}
          {/* <PDFContainer /> */}
        </ClientOnly>
      </div>
    </div>
  );
}

export default Lab;
