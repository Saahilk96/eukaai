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
Style: Use bg-white/50, p-4, rounded-lg, and border border-slate-200. and follow class "text-xl font-bold mb-4" for h2.
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
Return ONLY a valid JSON object with this structure e.g.:
code
JSON
{
  "keyFactsHtml": "<div class="rounded-xl border bg-card text-card-foreground shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6">
  <h2 class="text-xl font-semibold text-gray-900 mb-4">
    Key Facts
  </h2>

  <p class="text-gray-700 leading-relaxed mb-4">
    Google is....
  </p>

  <div class="grid grid-cols-2 gap-4 mb-6">
    <div>
      <p class="text-gray-600 text-sm mb-1">Founded</p>
      <p class="text-gray-900 font-medium">1998</p>
    </div>

    <div>
      <p class="text-gray-600 text-sm mb-1">Employees</p>
      <p class="text-gray-900 font-medium">190,000+</p>
    </div>

    <div>
      <p class="text-gray-600 text-sm mb-1">Headquarters</p>
      <p class="text-gray-900 font-medium">Mountain View, CA</p>
    </div>

    <div>
      <p class="text-gray-600 text-sm mb-1">Status</p>
      <p class="text-gray-900 font-medium">Public (GOOGL)</p>
    </div>
  </div>
</div>",
  "productFocusHtml": "<div class="rounded-xl border bg-card text-card-foreground shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">
    Product Focus
  </h3>

  <ul class="space-y-2">
    <li class="flex items-start gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
      <span class="text-gray-700">
        Search engine ...
      </span>
    </li>

    <li class="flex items-start gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
      <span class="text-gray-700">
        Google Cloud Platform and enterprise solutions (fastest-growing segment)
      </span>
    </li>

    <li class="flex items-start gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
      <span class="text-gray-700">
        Android OS and mobile ecosystem
      </span>
    </li>

    <li class="flex items-start gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
      <span class="text-gray-700">
        YouTube and content platforms with expanding commerce features
      </span>
    </li>
  </ul>
</div>
",
  "interviewQuestionsByRoundHtml": "<div class="px-6 pb-6 space-y-6">
  <div>
    <h4 class="font-semibold text-gray-900 mb-3">Round 1: Recruiter Screen</h4>
    <ul class="space-y-2 text-sm text-gray-700">
      <li class="flex items-start gap-2">
        <span class="text-gray-400">1.</span>
        <span>
          Walk me through your background and why you're interested in Google.
          <span class="text-gray-500 italic"> Focus on alignment with mission</span>
        </span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-gray-400">2.</span>
        <span>
          What do you know about this role and team?
          <span class="text-gray-500 italic"> Show research depth</span>
        </span>
      </li>
      ... 
    </ul>
  </div>

  <div>
    <h4 class="font-semibold text-gray-900 mb-3">Round 2: Resume Deep Dive</h4>
    <ul class="space-y-2 text-sm text-gray-700">
      <li class="flex items-start gap-2">
        <span class="text-gray-400">1.</span>
        <span>
          Tell me about the most impactful product you've built.
          <span class="text-gray-500 italic"> Include metrics and trade-offs</span>
        </span>
      </li>
     .... 
    </ul>
  </div>

  ... 
</div>
"
}
`;
};
