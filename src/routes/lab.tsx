import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";

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
      <div className="w-20 p-4 mt-2 flex flex-col">
        {/* Icons or 1-word text here */}
        <Link to="/lab">
          <div className="flex flex-col items-center justify-center rounded-full w-[50px] h-[50px] text-violet-500 ">
            <FontAwesomeIcon icon={faNewspaper} className="text-violet-500" />
            <span className="text-xs mt-2 font-semibold">Editor</span>
          </div>
        </Link>
      </div>

      {/* Column 2: Inputs */}
      <div
        className="w-full max-w-md my-4 p-4 pt-8 rounded-lg bg-white border shadow-lg border-gray-200 overflow-y-auto"
        style={{ maxWidth: "800px" }}
      >
        <Editor />
      </div>

      {/* Column 3: Main Content */}
      <div className="flex-grow p-4">
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
