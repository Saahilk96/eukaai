import environmentVariables from "../../config/env.js";

export const responseLLMGenerator = async (prompt) => {
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
                keyFactsHtml: {
                  type: "string",
                  description: "HTML formatted content of the key facts",
                },
                productFocusHtml: {
                  type: "string",
                  description: "HTML formatted content of the product focus",
                },
                interviewQuestionsByRoundHtml: {
                  type: "string",
                  description:
                    "HTML formatted content of the Interview Questions by Round",
                },
              },
              required: [
                "keyFactsHtml",
                "productFocusHtml",
                "interviewQuestionsByRoundHtml",
              ],
              additionalProperties: false,
            },
          },
        },
      }),
    }
  );
  const data = await response.json();
  return (
    JSON.parse(data.choices?.[0]?.message?.content) || {
      keyFactsHtml: "",
      productFocusHtml: "",
      interviewQuestionsByRoundHtml: "",
    }
  );
};
