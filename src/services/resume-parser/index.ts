import { GoogleGenAI } from "@google/genai";

import llm_config from "@/services/resume-parser/config";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export const parseResumeWithLlm = async (base64EncodedResume: string) => {
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
