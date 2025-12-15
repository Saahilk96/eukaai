import environmentVariables from "../../config/env.js";

export const questionAnswerGenerator = async (question) => {
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
        messages: [
          {
            role: "user",
            content: `Generate answer for this question in 1-2 sentences: '${question}'`,
          },
        ]
      }),
    }
  );
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
};
