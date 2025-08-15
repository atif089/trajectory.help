import { createServerFileRoute } from "@tanstack/react-start/server";
import { json } from "@tanstack/react-start";

import llm_config from "@/services/llm-service/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export const ServerRoute = createServerFileRoute("/api/cv/parse").methods({
  POST: async ({ request }) => {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.startsWith("application/pdf")) {
      return json({ message: "Invalid content type, expected application/pdf" }, { status: 400 });
    }
    const fileBuffer = await request.arrayBuffer();
    if (!fileBuffer || fileBuffer.byteLength === 0) {
      return json({ message: "No file attached" }, { status: 400 });
    }
    const base64EncodedResume = Buffer.from(fileBuffer).toString("base64");

    const modelResponse = await getModelResumeParsingResponse(base64EncodedResume);

    return json(JSON.parse(modelResponse.text as string));
  },
});

const getModelResumeParsingResponse = async (base64EncodedResume: string) => {
  const modelResponse = await ai.models.generateContent({
    model: llm_config.model,
    config: {
      temperature: llm_config.temperature,
      topP: llm_config.top_p,
      responseMimeType: "application/json",
      responseSchema: llm_config.output_structure,
      systemInstruction: llm_config.prompt,
    },
    contents: [
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64EncodedResume,
        },
      },
    ],
  });
  return modelResponse;
};
