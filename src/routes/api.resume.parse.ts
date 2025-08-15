import { createServerFileRoute } from "@tanstack/react-start/server";
import { json } from "@tanstack/react-start";
import { parseResumeWithLlm } from "@/services/resume-parser";

export const ServerRoute = createServerFileRoute("/api/resume/parse").methods({
  POST: async ({ request }) => {
    const contentType = request.headers.get("content-type");

    if (!contentType || !contentType.startsWith("application/pdf")) {
      return json({ message: "Invalid content type, expected application/pdf" }, { status: 400 });
    }

    const resumeBuffer = await request.arrayBuffer();

    if (!resumeBuffer || resumeBuffer.byteLength === 0) {
      return json({ message: "No file attached" }, { status: 400 });
    }

    const base64EncodedResume = Buffer.from(resumeBuffer).toString("base64");

    const parsedResumeResponse = await parseResumeWithLlm(base64EncodedResume);

    return json(JSON.parse(parsedResumeResponse.text as string));
  },
});
