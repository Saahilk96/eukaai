import environmentVariables from "../../config/env.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const BASE_HEADERS = {
  Authorization: `Bearer ${environmentVariables.openrouterApiKey}`,
  "Content-Type": "application/json",
};

const SUBMODULE_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string", description: "Title of the submodule" },
    completed: { type: "boolean", description: "Indicates if the submodule is completed" },
    summary: { type: "string", description: "Short summary of what this submodule covers" },
    htmlContent: { type: "string", description: "HTML formatted content of the submodule" },
  },
  required: ["title", "completed", "summary", "htmlContent"],
  additionalProperties: false,
};

const GUIDE_SCHEMA = {
  type: "object",
  properties: {
    quickSummary: { type: "string", description: "Overall summary of the module or topic" },
    subModules: {
      type: "array",
      description: "List of submodules under the main topic",
      items: SUBMODULE_SCHEMA,
    },
  },
  required: ["quickSummary", "subModules"],
  additionalProperties: false,
};

const SUMMARY_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string", description: "full summary html of the module" },
  },
  required: ["summary"],
  additionalProperties: false,
};

async function callLLM(prompt, { online = false, schema = GUIDE_SCHEMA } = {}) {
  const model = online
    ? "google/gemini-2.5-flash-lite:online"
    : "google/gemini-2.5-flash-lite";

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      response_format: {
        type: "json_schema",
        json_schema: { name: "course_summary", schema },
      },
      plugins: [{ id: "response-healing" }],
    }),
  });

  const data = await response.json();
  return { data, content: data.choices?.[0]?.message?.content, annotations: data.choices?.[0]?.message?.annotations };
}

export const responseLLMGenerator = async (prompt) => {
  const { content } = await callLLM(prompt);
  return JSON.parse(content) || { quickSummary: "", subModules: [] };
};

export const responseLLMGeneratorWithSources = async (prompt) => {
  const { content, annotations } = await callLLM(prompt, { online: true });
  if (content && annotations) {
    return {
      ...JSON.parse(content),
      sources: annotations.map((a) => a.url_citation),
    };
  }
  return { subModules: [], sources: [] };
};

export const responseSummaryLLMGenerator = async (prompt) => {
  const { content } = await callLLM(prompt, { schema: SUMMARY_SCHEMA });
  return JSON.parse(content).summary || "";
};
