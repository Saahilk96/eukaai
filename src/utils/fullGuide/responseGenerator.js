import environmentVariables from "../../config/env.js";

export const responseLLMGenerator = async (prompt) =>{
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${environmentVariables.openrouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite", // :online enables web search
        messages: [{ role: "user", content: prompt }],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "course_summary",
            none: true,
            schema: {
              type: "object",
              properties: {
                quickSummary: {
                  type: "string",
                  description: "Overall summary of the module or topic",
                },
                subModules: {
                  type: "array",
                  description: "List of submodules under the main topic",
                  items: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string",
                        description: "Title of the submodule",
                      },
                      completed: {
                        type: "boolean",
                        description: "Indicates if the submodule is completed",
                      },
                      summary: {
                        type: "string",
                        description:
                          "Short summary of what this submodule covers",
                      },
                      htmlContent: {
                        type: "string",
                        description: "HTML formatted content of the submodule",
                      },
                    },
                    required: ["title", "completed", "summary", "htmlContent"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["quickSummary", "subModules"],
              additionalProperties: false,
            },
          },
        },
      }),
    }
  );
  const data = await response.json();
  return JSON.parse(data.choices?.[0]?.message?.content) || {subModules:[]}
}

export const responseLLMGeneratorWithSources = async (prompt) =>{
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${environmentVariables.openrouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite:online", // :online enables web search
        messages: [{ role: "user", content: prompt }],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "course_summary",
            none: true,
            schema: {
              type: "object",
              properties: {
                quickSummary: {
                  type: "string",
                  description: "Overall summary of the module or topic",
                },
                subModules: {
                  type: "array",
                  description: "List of submodules under the main topic",
                  items: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string",
                        description: "Title of the submodule",
                      },
                      completed: {
                        type: "boolean",
                        description: "Indicates if the submodule is completed",
                      },
                      summary: {
                        type: "string",
                        description:
                          "Short summary of what this submodule covers",
                      },
                      htmlContent: {
                        type: "string",
                        description: "HTML formatted content of the submodule",
                      },
                    },
                    required: ["title", "completed", "summary", "htmlContent"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["quickSummary", "subModules"],
              additionalProperties: false,
            },
          },
        },
      }),
    }
  );
  const data = await response.json();
  if(data.choices?.[0]?.message?.content && data.choices?.[0]?.message?.annotations)
    return {...JSON.parse(data.choices?.[0]?.message?.content),sources:data.choices?.[0]?.message?.annotations.map(annotation=>annotation.url_citation)}
  return  {subModules:[],sources:[]}
}

export const responseSummaryLLMGenerator = async (prompt) =>{
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${environmentVariables.openrouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite", // :online enables web search
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );
  const data = await response.json();
  return data.choices?.[0]?.message?.content || ""
}