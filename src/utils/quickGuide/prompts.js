export const quickGuide = (data) => {
  return `
${data}
    -----
    *Role*: You are an expert Career Strategist and Senior Technical Recruiter specializing in "${data.companyName}" and high-growth tech firms.
*Objective*: Analyze the provided Company Name, Job Title, Job Description (JD), and Resume to generate a JSON object containing three fields: keyFactsHtml, productFocusHtml, and interviewQuestionsByRound.
Constraints for HTML & Styling:
Use only valid HTML tags.
Use only Tailwind CSS classes for all styling (do not use style blocks or external CSS).
Design for a modern, clean, professional UI (use slate or gray palettes with high-contrast text).
Do not include <html>, <head>, or <body> tags. Provide only the inner <div> content.
Content Requirements:
*keyFactsHtml*:
A summary paragraph of the company’s mission.
A 2x2 grid (using grid grid-cols-2) showing: Founded, Employees, Headquarters, and Status.
Style: Use bg-white/50, p-4, rounded-lg, and border border-slate-200.
*productFocusHtml*:
Identify the top 4 product pillars or revenue drivers for this company based on the JD.
Format: Use a vertical list with flex items. Each item should have a bold title and a short description.
Include a relevant SVG icon placeholder (using Tailwind icons or simple shapes) for each.
*interviewQuestionsByRoundHtml*:
Structure: Exactly 5 rounds (Recruiter Screen, Resume Deep Dive, Product Sense, Situation-Based, Behavioral).
Content: 5 questions per round.
Personalization: Tailor the "Resume Deep Dive" and "Situation-Based" questions specifically to the gaps or strengths found when comparing my Resume to the Job Description.
Format: Each question must be followed by a "Coach’s Tip" in a smaller, lighter font (e.g., text-slate-500 italic).
Input Data:
Company Name: "${data.companyName}"
Job Title: "${data.jobRole}"
Job Description: "${data.jobDescription}"
My Resume: "${data.userResume}"
Output Format:
Return ONLY a valid JSON object with this structure:
code
JSON
{
  "keyFactsHtml": "<div class='...'>...</div>",
  "productFocusHtml": "<div class='...'>...</div>",
  "interviewQuestionsByRoundHtml": "<div class='space-y-8'>...</div>"
}
`;
};
