const llm_config = {
  // gemini-2.0-flash-lite-001
  // prompt: Extract all the details from the CV
  // Temperature: 0.2
  // TopP: 0.95
  model: "gemini-2.0-flash-lite-001",
  temperature: 0.2,
  top_p: 0.95,

  // Prompt
  // You are an AI assistant reviewing a CV or resume. Your task is to extract and summarize key information that would help a recruiter or hiring manager quickly understand the candidate's background and achievements.

  // Instructions:
  // Provide a concise summary of the CV in 4–6 bullet points, highlighting:
  // The candidate’s current or most recent role and employer.
  // Total years of experience and primary areas of expertise.
  // Notable achievements, especially with metrics (e.g. revenue impact, % growth, team size).
  // Key skills, tools, or technologies used.
  // Leadership, ownership, or cross-functional contributions.
  // Any standout education, certifications, or awards (if applicable).

  // Use Markdown formatting:
  // Bold key metrics, goals, or business impact using ** (e.g., 25% increase, $10M ARR, launched in 12 countries).
  // Avoid unnecessary verbosity.
  // Focus especially on content in the Profile Summary, Professional Experience, Key Achievements, or Highlights sections of the CV.
  // If the CV is fragmented or visually structured (e.g. in columns), do your best to interpret and unify the information logically.

  // Output format example:
  // - Currently a Senior Product Manager at *TechCo*, leading pricing and catalog products across **66 countries**.
  // - Over **10 years** of experience in e-commerce, SaaS, and B2B platforms.
  // - Drove **$1.2M annual revenue** increase by launching a unified recommendations engine.
  // - Led a team of **5 managers and 45 engineers**, overseeing global transformation initiatives.
  // - Experienced in **Node.js, TypeScript, PostgreSQL, AWS**, and agile product delivery.
  // - Holds a Master's degree in Computer Science; fluent in **English, Dutch**, and **French**.

  // Output Structure
  // prettier-ignore
  output_structure: {
    "type": "object",
    "properties": {
      "Name": {
        "type": "string",
        "description": "Full Name of the person"
      },
      "ResumeHeader": {
        "type": "string",
        "description": "JobTitle, Location, Phone, Email"
      },
      "ProfileSummary": {
        "type": "string",
        "description": "Profile summary in markdown format"
      },
      "Experience": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "CompanyName": {
              "type": "string"
            },
            "JobTitle": {
              "type": "string"
            },
            "StartDate": {
              "type": "string"
            },
            "EndDate": {
              "type": "string"
            },
            "ExperienceSummary": {
              "type": "string"
            },
            "Experience": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "propertyOrdering": [
            "CompanyName",
            "JobTitle",
            "StartDate",
            "EndDate",
            "ExperienceSummary",
            "Experience"
          ],
          "required": [
            "CompanyName",
            "JobTitle",
            "StartDate",
            "EndDate",
            "ExperienceSummary",
            "Experience"
          ]
        }
      },
      "Skills": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "Achievements": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "propertyOrdering": [
      "Name",
      "ResumeHeader",
      "ProfileSummary",
      "Experience",
      "Skills",
      "Achievements"
    ],
    "required": [
      "Name",
      "ResumeHeader",
      "ProfileSummary",
      "Experience",
      "Skills",
      "Achievements"
    ]
  },
};
