
export const knowTheCompany = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Know the Company",
    prompt: `You are an expert research assistant helping a user prepare for a job interview.

You MUST research ONLY the exact company and role provided in the INPUT. Do NOT mix information from similarly named companies.
If anything is unclear, you must resolve it using the company website domain and job description context.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole}
JOB_DESCRIPTION: ${jobDescription}
USER_RESUME: ${userResume}
---

CRITICAL ACCURACY RULES (follow strictly):
1) COMPANY_NAME is the target. Never switch to another similarly named company.
2) If COMPANY_WEBSITE is provided, treat its DOMAIN as the #1 disambiguation signal.
3) If JOB_DESCRIPTION contains an official website/domain, treat it as COMPANY_WEBSITE too.
4) If COMPANY_NAME and website/domain conflict, prioritize the domain + job description clues and explicitly mention the conflict in output (no guessing).
5) Use web search grounding for ALL factual claims that can change (leadership, products, funding, revenue, headcount, offices, news).
6) If you cannot verify a fact, write "Not publicly available" or "Unable to verify"—never invent.

RESEARCH REQUIREMENTS (must follow):
- Prioritize official website pages: About, Leadership/Team, Products/Services/Solutions, Press/News/Blog, Investors, Careers.
- Then use reputable sources: LinkedIn company page, Crunchbase, SEC/filings (if public), top-tier news outlets, trusted databases.
- Keep the output concise, interview-focused, and verified.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Keep the exact keys/shape shown below. Do NOT add extra top-level keys.
- completed must be 0 for all subModules.
- Each subModule must provide MAXIMUM accuracy and must include at least 2 real, verifiable points. If limited data exists, include "Not publicly available" as a point.
- Every htmlContent MUST use the provided CSS classes EXACTLY so UI renders consistently.

CLASSES / UI RULES (must follow):
- Wrapper: "<div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>"
- Section title: "<h3 class='text-lg font-semibold mb-2 text-gray-900'>"
- Paragraph: "<p class='mb-4 text-gray-600'>"
- List wrapper: "<ul class='list-none space-y-1 mb-4 text-gray-600'>"
- List item: "<li>...</li>"
- Divider: "<hr class='my-4 border-gray-200'>"
- Use <b> only inside <li> for labels.
- Ensure each section has at least 2 list items (or 2 distinct sentences where list isn’t used).


IMPORTANT OUTPUT FORMATTING RULES (STRICT):

- The final response MUST be a valid JSON string.
- Do NOT use raw newlines in the output.
- Wherever a newline is required, use escaped newline characters: \\n
- Do NOT use unescaped double quotes or single quotes inside values.
- All quotes inside strings MUST be escaped using \\\" or \\\'
- The JSON must be parseable using JSON.parse() without errors.
- Do NOT include markdown, code blocks, or explanations.
- Output ONLY the JSON object.

JSON OUTPUT SHAPE (exact):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Company Overview",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Products & Services",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Business Model & Company Financials",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Target Market & Customers",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Competitive Landscape",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Organization Structure & Leadership",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Industry Context, News & Trends",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ],
  "questions": "string"
}

HTML CONTENT TEMPLATES (use these classed layouts):

1) Company Overview htmlContent MUST include 3 sections:
- Company Snapshot (paragraph)
- Mission & Values (list)
- Founding Team (paragraph)

2) Products & Services htmlContent MUST be a list of products/services.

3) Business Model & Company Financials htmlContent MUST include:
- Business Model & Monetization (list)
- Financials & Funding (list; include funding rounds or IPO details)
- Revenue (paragraph)

4) Target Market & Customers htmlContent MUST include:
- Primary Customer Segments (paragraph)
- Key Customer Challenges Solved (list)
- Key Reasons Customers Choose (list)
- Notable Clients (list)

5) Competitive Landscape htmlContent MUST include:
- Main Competitors (list)
- Key Differentiators (list)
- Competitive Strengths (list)
- Potential Weaknesses/Challenges (list)

6) Organization Structure & Leadership htmlContent MUST include:
- Size, Status & Location (paragraph)
- Organizational Structure (paragraph)
- Key Leadership (list with names; if unverified, say unable to verify)

7) Industry Context, News & Trends htmlContent MUST include:
- Key Industry Trends (list)
- Recent News & Key Developments (list; prefer last 1–2 years; include date)

IMPORTANT FOR "questions":
- Generate 5–7 interview questions ONLY (no answers).
- Questions must be specific to:
  Company: ${companyName}
  Role: ${jobRole}
- Include: company alignment, role skills, behavioral, industry trends.
- Mention the company name directly in the questions (avoid placeholders).

IMPORTANT OUTPUT FORMATTING RULES (STRICT):

- The final response MUST be a valid JSON string.
- Do NOT use raw newlines in the output.
- Wherever a newline is required, use escaped newline characters: \\n
- Do NOT use unescaped double quotes or single quotes inside values.
- All quotes inside strings MUST be escaped using \\\" or \\\'
- The JSON must be parseable using JSON.parse() without errors.
- Do NOT include markdown, code blocks, or explanations.
- Output ONLY the JSON object.

Now produce ONLY the final JSON (no extra text) for:
Company: ${companyName}
Website: ${companyWebsite || "Not provided"}
Role: ${jobRole}
`,
  };
};


export const productResearch = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Product Research",
    prompt: `You are an expert product researcher helping a user prepare for a job interview by analyzing the specific product they are most likely to work on.

You MUST focus ONLY on the exact company and role provided in the INPUT. Do NOT mix information from similarly named companies or unrelated products.
If anything is unclear, you must resolve it using the company website domain and job description context.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole}
JOB_DESCRIPTION: ${jobDescription}
USER_RESUME: ${userResume}
---

CRITICAL ACCURACY RULES (follow strictly):
1) COMPANY_NAME is the target. Never switch to another similarly named company.
2) If COMPANY_WEBSITE is provided, treat its DOMAIN as the #1 disambiguation signal for both company identity and product authenticity.
3) If JOB_DESCRIPTION contains an official website/domain, treat it as COMPANY_WEBSITE too.
4) If COMPANY_NAME and website/domain conflict, prioritize the domain + job description clues and explicitly mention the conflict in output (no guessing).
5) Use web search grounding for ALL factual claims that can change (features, pricing, roadmap announcements, competitors, integrations, leadership statements, product updates, partnerships).
6) If you cannot verify a fact from official/reputable sources, write "Not publicly available" or "Unable to verify"—never invent.

IDENTIFY PRIMARY FOCUS PRODUCT (must follow):
- Read JOB_DESCRIPTION carefully and list all products/product lines/teams/platforms mentioned.
- Look for ownership signals (e.g., "own roadmap for X", "lead strategy for Y", "PM for Z").
- Confirm the product exists on the official COMPANY_WEBSITE (preferred) or other official company sources.
- Fallback logic:
  a) If no single product is clear, identify the flagship product most relevant to the role from COMPANY_WEBSITE.
  b) If still unclear, identify the most relevant product category/business line and clearly label it as "Product Category (not a single named product)".
- Output must include ONLY ONE chosen "Primary Focus Product" (or single product category). Other products can be "Contextual Products" but keep them minimal.

RESEARCH REQUIREMENTS (must follow):
- Absolute primary source: official company website pages for the product (Product/Solutions/Pricing/Docs/Blog/Press/Careers).
- Then: official docs, official blog, official case studies, official announcements.
- Then: reputable third-party sources (only when needed for competitors, market context, SWOT).
- Keep output concise, interview-focused, and verified.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Keep the exact keys/shape shown below. Do NOT add extra top-level keys.
- completed must be 0 for all subModules.
- Each section must have at least 2 real, verifiable points. If limited data exists, include "Not publicly available" as a point.
- Every htmlContent MUST use the provided CSS classes EXACTLY so UI renders consistently.

CLASSES / UI RULES (must follow):
- Wrapper: "<div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>"
- Section title: "<h3 class='text-lg font-semibold mb-2 text-gray-900'>"
- Paragraph: "<p class='mb-4 text-gray-600'>"
- List wrapper: "<ul class='list-none space-y-1 mb-4 text-gray-600'>"
- List item: "<li>...</li>"
- Divider: "<hr class='my-4 border-gray-200'>"
- Use <b> only inside <li> for labels.
- Ensure each section has at least 2 list items.

IMPORTANT OUTPUT FORMATTING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT SHAPE (exact):
{
  "primaryFocusProduct": "string",
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Product Overview",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Core Functionality & Value",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "User Focus & Core Needs",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Competitive Landscape (Product-Focused)",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "SWOT Analysis",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ],
  "questions": "string"
}

HTML CONTENT TEMPLATES (use these classed layouts):

1) Product Overview htmlContent MUST include sections:
- What Core Product Does (list)
- Primary Target Market Segment (list)
- Key Problem(s) It Solves for Users (list)
- Unique Value Proposition (UVP) (list)
- Key Differentiators (list)

2) Core Functionality & Value htmlContent MUST include:
- Identified Product Features & Descriptions (list)
- Key Underlying Technology (list)
- Integration & Ecosystem Synergy (list)
- Monetization Strategy & Pricing Approach (list)

3) User Focus & Core Needs htmlContent MUST include:
- Primary Target User Profile(s) (list)
- How Users Engage with the Product (list)
- Fundamental User Needs Addressed (list)

4) Competitive Landscape (Product-Focused) htmlContent MUST include:
- Key Direct Competitors (list)
- Indirect Competition & Alternative Solutions (list)
- Positioning Against Competitors (list)

5) SWOT Analysis htmlContent MUST include:
- Strengths (list)
- Weaknesses (list)
- Opportunities (list)
- Threats (list)

IMPORTANT FOR "questions":
- Generate 5–7 product research interview questions ONLY (no answers).
- Questions must be specific to the Primary Focus Product and company: ${companyName}.
- Include: problem/user value, features/prioritization, competitors, risks/challenges, strategy.
- Mention the product name directly in the questions (avoid placeholders).

Now produce ONLY the final JSON (no extra text) for:
Company: ${companyName}
Website: ${companyWebsite || "Not provided"}
Role: ${jobRole}
`,
  };
};

export const jobDescriptionAnalysis = (data) => {
  return {
    name: "Job Description Analysis",
    prompt: `Analyze ONLY the provided Job Description text below. Do NOT assume or add company facts that are not present in the JD.
Your analysis must be strictly grounded in the JD content. If something is not in the JD, say "Not mentioned in the JD".

---
JOB DESCRIPTION (authoritative input):
${data}
---

CRITICAL RULES (STRICT):
1) Base everything ONLY on the JD text above. No external assumptions.
2) Do NOT invent tools, metrics, teams, reporting lines, tech stack, or responsibilities unless stated or strongly implied by the JD.
3) If a point is inferred, explicitly label it as "Inferred from JD".
4) Do not use any asterisk (*) symbol anywhere in the output.
5) completed must be 0 for every subModule.
6) Output must be concise, readable, and interview-useful.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must contain at least 2 meaningful points in htmlContent (if limited, include "Not mentioned in the JD").
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Follow a modern style inspired by Clerk UI: clean typography, soft shadows, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not include the module title text again inside htmlContent (start directly with points/sections).

IMPORTANT OUTPUT FORMATTING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT FORMAT (RETURN EXACTLY THIS STRUCTURE):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Core Role & Responsibilities",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Required Skills & Experience",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Defining Success & Measuring Impact",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Team, Collaboration & Reporting Structure",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Strategic Context & Role Significance",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Key Themes & Interview Angles",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

CARD-SPECIFIC HTML REQUIREMENTS (Tailwind + Clerk-like UI):
- All htmlContent must:
  - Start with: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
  - Use headings: <h3 class='text-lg font-semibold text-gray-900'>
  - Use text: <p class='text-gray-600'>
  - Use lists when helpful: <ul class='list-disc pl-5 space-y-2 text-gray-600'>
  - Use <hr class='border-gray-200'> between sections
  - Include at least 2 points/sections per card (if not found, use "Not mentioned in the JD").

QUICK SUMMARY INSTRUCTIONS:
- 3–4 sentences only.
- Explicitly state: "This analysis is based only on the provided JD text."
- Include: role purpose, most emphasized skill/experience, how success is measured (explicit/inferred), key collaborators/reporting context (if present; else "Not mentioned in the JD").

Now return ONLY the final JSON (no extra text).`,
  };
};

export const resumeExperienceToStandOut = (data) => {
    const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Resume Experience To StandOut",
    prompt: `Analyze ONLY the provided input below. This module is about RESUME vs JD comparison (resume alignment).
If the input includes both Resume and JD, compare them. If either Resume or JD is missing, clearly state "Missing JD" or "Missing Resume" and base the analysis only on what exists.

---
AUTHORITATIVE INPUT:
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL RULES (STRICT):
1) This output must be based ONLY on the comparison between Resume and JD found inside the provided input.
2) Do NOT invent experiences, projects, achievements, metrics, or tools that are not explicitly present in the resume text.
3) Do NOT add any company facts unless they are explicitly present in the JD or resume text.
4) If a point is inferred, label it as "Inferred from Resume/JD".
5) Do not use any asterisk (*) symbol anywhere in the output.
6) completed must be 0 for every subModule.
7) Keep it interview-useful: focus on what to highlight, how it maps to JD, and how to frame gaps.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must include at least 2 meaningful points in htmlContent (if limited, include "Not mentioned in Resume" or "Not mentioned in JD").
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Follow a modern style inspired by Clerk UI: clean typography, soft shadows, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not include the card title or summary inside htmlContent (start directly with sections/points).

CLASSES / UI RULES (must follow):
- Wrapper: "<div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>"
- Section title: "<h3 class='text-lg font-semibold mb-2 text-gray-900'>"
- Paragraph: "<p class='text-gray-600 mb-2'>"
- Divider: "<hr class='my-4 border-gray-200'>"
- You may use lists when helpful: "<ul class='list-disc pl-5 space-y-2 text-gray-600'>"
- No asterisk symbols anywhere.

IMPORTANT OUTPUT FORMATTING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT FORMAT (RETURN EXACTLY THIS STRUCTURE):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Key Strengths & Alignment",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Potential Gaps & How to Address",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Standout Experiences to Highlight",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

QUICK SUMMARY INSTRUCTIONS:
- 3–4 sentences only.
- Clearly state: "This analysis is based on the comparison between the provided Resume and JD."
- Include: where alignment is strongest, where alignment is partial/missing, and what to emphasize to differentiate.

CARD 1 REQUIREMENTS: Key Strengths & Alignment
- Identify the top alignments between resume and JD.
- Each section must mention the JD requirement and the matching resume evidence (quote or paraphrase).
- Include at least 2 sections if possible.

CARD 2 REQUIREMENTS: Potential Gaps & How to Address
- Identify gaps where JD expects something but resume lacks it.
- Provide framing strategies using transferable skills ONLY from resume.
- Include at least 2 sections.

CARD 3 REQUIREMENTS: Standout Experiences to Highlight
- Pick 2–4 strongest resume accomplishments/projects most relevant to the JD.
- For each: Context, your actions, measurable impact (only if present), and how to tell it in interview.
- Include at least 2 sections.

Now return ONLY the final JSON (no extra text).`,
  };
};

export const recruiterScreenPreperation = (data) => {
    const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Recruiter Screen Preperation",
    prompt: `Act as an expert career coach specializing in early-stage interview preparation.

Analyze the provided input below. The Job Description (JD) is the primary source of truth.
Use the Resume (if available in the input) ONLY to craft the self-introduction pitch. Do not invent resume details.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL RULES (STRICT):
1) Base guidance primarily on the JD text present in the input.
2) Use Resume content ONLY for the introduction pitch, and only if resume text is present.
3) Do NOT invent company facts, salary bands, location, tools, or process details that are not present in the JD.
4) If something is missing, clearly say "Not mentioned in the JD" (or "Resume not provided").
5) Do not use any asterisk (*) symbol anywhere in the output.
6) completed must be 0 for every subModule.
7) Output must be concise, recruiter-screen focused, and actionable.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must include at least 2 meaningful points/sections in htmlContent (if limited, include "Not mentioned in the JD").
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Follow a modern style inspired by Clerk UI: clean typography, soft shadows, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not include the card title/summary text inside htmlContent (start directly with sections/points).

IMPORTANT OUTPUT FORMATTING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT FORMAT (RETURN EXACTLY THIS STRUCTURE):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Call Rubric & Quick Facts",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Craft Your Introduction",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Insightful Questions to Ask",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

MODULE REQUIREMENTS:

Quick Summary:
- 3–5 sentences.
- Say explicitly: "This recruiter-screen prep is based on the JD provided in the input."
- Mention: what recruiters try to confirm, what will matter most for this role, and what the candidate should prepare.

Card 1: Call Rubric & Quick Facts
- Explain the purpose of recruiter screen and typical checks (fit, communication, motivation, logistics).
- Extract from JD: location/remote, salary/range, experience level, employment type, travel, shift timing, notice period, visa/work authorization (only if present).
- If any detail is missing in the JD, state "Not mentioned in the JD".
- Provide a short "30-second role match" checklist the candidate can use.

Card 2: Craft Your Introduction
- Use Past–Present–Future structure.
- Use Resume details ONLY if present. If resume is missing, provide a safe template with placeholders and say "Resume not provided".
- Tailor the pitch to the JD: mirror JD keywords and top requirements.
- Keep the pitch 60–120 seconds.

Card 3: Insightful Questions to Ask
- Provide 10–14 questions grouped under headings:
  - Role & Team
  - Success & Expectations
  - Interview Process
  - Culture & Collaboration
  - JD Clarifications
- Questions must NOT assume facts not present in JD.
- Avoid placeholders like [Company Name]; instead say "the company" or "this team" unless company name is explicitly present in the input.

HTML STYLE REQUIREMENTS:
- Wrapper must be: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section headings: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Body text: <p class='text-gray-600'>
- Lists (if used): <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Dividers: <hr class='my-4 border-gray-200'>

Now return ONLY the final JSON (no extra text).`,
  };
};

export const favouriteProductQuestion = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Favourite Product Question",
    prompt: `You are an expert product interview coach.

This module prepares the candidate to answer: "What’s your favorite product and how would you improve it?"
Tailor guidance to the specific company and role provided. Avoid irrelevant examples that conflict with the company's domain or the job role.
If company and role context is missing, give general best-practice guidance.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL ACCURACY RULES (STRICT):
1) Tailor recommendations to COMPANY_NAME and JOB_ROLE if provided.
2) Do NOT claim anything factual about COMPANY_NAME unless it is explicitly present in the input.
3) If suggesting a "company-specific" variant of the question, reference COMPANY_NAME exactly (if provided), otherwise say "the company".
4) Do not use any asterisk (*) symbol anywhere in the output.
5) completed must be 0 for every subModule.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must include at least 2 meaningful sections in htmlContent.
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Follow a modern style inspired by Clerk UI: clean typography, soft shadows, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not include any asterisk symbols anywhere in htmlContent.

IMPORTANT OUTPUT FORMATTING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT FORMAT (RETURN EXACTLY THIS STRUCTURE):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "What’s Your Favorite Product?",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "5 Steps Framework",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

CONTENT REQUIREMENTS:

Quick Summary:
- 3–5 sentences.
- Explain interviewer intent + what a strong answer demonstrates.
- Mention that examples and framing are tailored for:
  Company: ${companyName || "the company"}
  Role: ${jobRole || "the role"}

Card 1: What’s Your Favorite Product?
Must include:
- Why interviewers ask this question (skills being tested).
- What follow-ups to expect (metrics, trade-offs, prioritization).
- Common variants, including a company-specific version:
  - If COMPANY_NAME provided: mention it by name.
  - If not provided: say "the company".
- How to choose a product that fits the company domain and role:
  - If JOB_DESCRIPTION hints domain (B2B/B2C, fintech, healthcare, devtools, etc.), align product choice.
- A safe improvement example template that avoids claiming company facts:
  - Use generic structure: "Pain → Who → Why now → Solution → Metric → Trade-off".

Card 2: 5 Steps Framework
Must include:
1) Pick the right product (include 3 selection rules + 2 avoid rules).
2) One-sentence product intro.
3) Customer segments + your relationship.
4) Pain-driven analysis (Pain → Feature → Outcome) with 1–2 examples.
5) Improvements:
   - Provide 2 improvement idea patterns (e.g., onboarding + retention, discovery + personalization) plus:
     - metrics to track
     - experiment plan (A/B, rollout)
     - risks/trade-offs
- Add role tailoring:
  - If JOB_ROLE contains PM/PO: emphasize product sense + prioritization.
  - If JOB_ROLE contains engineering: emphasize feasibility + trade-offs + instrumentation.
  - If JOB_ROLE contains design/research: emphasize user insights + UX + qualitative testing.

HTML STYLE REQUIREMENTS:
- Wrapper must be: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section headings: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Body text: <p class='text-gray-600'>
- Lists (if used): <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Dividers: <hr class='my-4 border-gray-200'>

Now return ONLY the final JSON (no extra text).`,
  };
};

export const productDesign = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Product Design",
    prompt: `You are an expert product interview coach focused on product design questions.

This module helps the candidate master product design interview questions with frameworks and tailored practice prompts.
Tailor everything to the provided company and role context. If company context is missing, provide general best-practice guidance without assuming company facts.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL ACCURACY RULES (STRICT):
1) Tailor guidance to COMPANY_NAME and JOB_ROLE if provided.
2) Do NOT claim factual details about COMPANY_NAME (products, users, strategy) unless explicitly present in the input.
3) If JOB_DESCRIPTION suggests an industry/domain (e.g., fintech, healthtech, B2B SaaS), tailor examples to that domain and label it as "Inferred from JD" when applicable.
4) Do not use any asterisk (*) symbol anywhere in the output.
5) completed must be 0 for every subModule.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must include at least 2 meaningful sections in htmlContent.
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Follow a modern style inspired by Clerk UI: clean typography, soft shadows, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Ensure do not use any asterisk symbols anywhere.

IMPORTANT OUTPUT FORMATTING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT FORMAT (RETURN EXACTLY THIS STRUCTURE):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Overview of Product Design Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "How to Answer Product Design Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Company-Context Practice Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Industry-Context Practice Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

CONTENT REQUIREMENTS:

Quick Summary:
- 3–6 sentences.
- Explain what product design questions test and how to answer well.
- Mention that practice prompts are tailored for:
  Company: ${companyName || "the company"}
  Role: ${jobRole || "the role"}
- If JD provides domain hints, mention "Inferred from JD".

Card 1: Overview of Product Design Questions
Must include:
- What to expect (types of prompts).
- What interviewers evaluate (structure, empathy, prioritization, trade-offs).
- Good vs great answer traits.
- Short evaluation rubric with 3 levels (basic, strong, exceptional).

Card 2: How to Answer Product Design Questions
Must provide a step-by-step framework:
1) Clarify prompt and constraints.
2) Define goal and success definition.
3) Identify personas and choose primary persona.
4) Map journey and key moments.
5) List pain points and pick top 1–2 by impact.
6) Brainstorm solutions (breadth then depth).
7) MVP scope and prioritization logic (RICE/MoSCoW).
8) Risks and trade-offs (privacy, abuse, feasibility, ops).
9) Metrics (north star + input metrics) and experiment plan.

Card 3: Company-Context Practice Questions
- Generate 6–10 practice product design prompts that align to the company domain and role.
- If COMPANY_NAME exists, use the exact name in prompts.
- Do NOT assume company products; instead phrase prompts like:
  "Design a feature for ${companyName || "the company"}'s core product that improves X..."
- If JD hints at a domain or product area, align prompts and label "Inferred from JD".

Card 4: Industry-Context Practice Questions
- Identify the most likely industry/domain from the JD (label "Inferred from JD") or use "General digital products" if unclear.
- Generate 4–6 industry-aligned prompts.
- Each prompt must be realistic and include constraints (e.g., offline, privacy, low literacy, B2B approvals).

HTML STYLE REQUIREMENTS:
- Wrapper must be: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section headings: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Body text: <p class='text-gray-600'>
- Lists (if used): <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Dividers: <hr class='my-4 border-gray-200'>

Now return ONLY the final JSON (no extra text).`,
  };
};

export const behavioralAndLeadership = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Behavioral and Leadership",
    prompt: `You are an expert interview coach specializing in behavioral and leadership interviews.

This module must help the candidate prepare behavioral stories and leadership examples that align with the company and role context provided.
If company-specific culture/values are not provided in the input, do NOT invent them. Instead, give a safe culture-research method and clearly label any assumptions as "Not provided in input".

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL ACCURACY RULES (STRICT):
1) Tailor guidance to COMPANY_NAME and JOB_ROLE if provided, but do NOT claim factual company values unless present in the input.
2) If company values/principles are mentioned in JOB_DESCRIPTION or input, use them explicitly.
3) If values are not present, instruct how to find them (careers page, values page, leadership principles, investor letters) and label as "Not provided in input".
4) Use Resume content ONLY if present in the input; do NOT invent stories or metrics. Provide templates when resume is missing.
5) Do not use any asterisk (*) symbol anywhere in the output.
6) completed must be 0 for every subModule.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra explanation text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must include at least 2 meaningful sections in htmlContent.
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Follow a modern style inspired by Clerk UI: clean typography, soft shadows, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not use any asterisk symbols anywhere in htmlContent.

IMPORTANT OUTPUT FORMATTING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT FORMAT (RETURN EXACTLY THIS STRUCTURE):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Understand the Company Culture",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Your Story Bank (SPSIL)",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Practice Techniques That Actually Work",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Behavioral Question Scenarios",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

CONTENT REQUIREMENTS:

Quick Summary:
- 3–6 sentences.
- Mention this is tailored for:
  Company: ${companyName || "the company"}
  Role: ${jobRole || "the role"}
- Explain: culture alignment, story structure (SPSIL), rehearsal plan, and scenario practice.

Card 1: Understand the Company Culture
Must include:
- If company values/principles are present in the input: list them and explain how to align stories to them.
- If not present: provide a step-by-step method to decode culture using official sources (careers, values page, leadership principles, blog) and what signals to extract.
- Provide a "story selection rule": how to pick stories that match the company’s likely interview style (data-driven, customer-led, execution-led) WITHOUT naming companies unless present in input.

Card 2: Your Story Bank (SPSIL)
Must include:
- SPSIL breakdown (Situation, Problem, Solution, Impact, Lessons).
- A "story bank checklist" with 5–7 story themes: conflict, ownership, failure/learning, influencing without authority, ambiguity, execution, customer/user focus.
- If resume exists in input: suggest which resume experiences map to which themes (cite only from resume text).
- If resume not provided: provide fill-in templates for 3 stories.

Card 3: Practice Techniques That Actually Work
Must include:
- How to rehearse (voice memo, timed runs, mock interview).
- How to adapt stories to different prompts.
- How to avoid rambling (time boxes + headline first).
- A 7-day mini practice plan (bulleted, lightweight).

Card 4: Behavioral Question Scenarios
Must include:
- 8–12 scenario prompts grouped under headings (Ownership, Customer Focus, Conflict, Bias for Action, Delivering Results, Learning, Collaboration).
- Each scenario must include 2–3 probing follow-up questions to deepen the story.
- Ensure the scenarios are role-aware:
  - If JOB_ROLE suggests PM: include stakeholder conflict, prioritization, roadmap trade-offs.
  - If JOB_ROLE suggests engineering: include incident response, technical trade-offs, quality.
  - If JOB_ROLE suggests data/analytics: include experiment rigor, metric disagreements.

HTML STYLE REQUIREMENTS:
- Wrapper must be: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section headings: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Body text: <p class='text-gray-600'>
- Lists (if used): <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Dividers: <hr class='my-4 border-gray-200'>

Now return ONLY the final JSON (no extra text).`,
  };
};

export const analyticalEstimation = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Analytical Estimation",
    prompt: `You are an expert interview coach for analytical estimation and execution rounds.

You MUST tailor the guidance to the exact company and role provided in the INPUT. Do NOT mix information from similarly named companies.
If a company website domain is provided, treat it as the primary disambiguation signal for company context. If no domain is provided, do not guess company-specific facts.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL ACCURACY RULES (STRICT):
1) If JOB_DESCRIPTION includes a domain/official website, treat it as COMPANY_WEBSITE too.
2) Do not invent company-specific metrics, products, users, or business context unless explicitly present in the input.
3) If you reference company context, tie it to the JOB_DESCRIPTION text; otherwise label as "Not provided in input".
4) Use Resume content ONLY if present; do not invent achievements, metrics, or timelines.
5) Do not use any asterisk (*) symbol anywhere in the output.
6) completed must be 0 for every subModule.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must have at least 2 meaningful sections in htmlContent.
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Maintain modern UI style: clean typography, soft shadow, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not use any asterisk symbols anywhere in htmlContent.

IMPORTANT OUTPUT ESCAPING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT SHAPE (exact):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "What Is the Analytical Estimation and Execution Round?",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Estimation and Market Sizing",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Defining Metrics and KPIs",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "A/B Test Design and Analysis",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Root Cause Analysis for Metric Drops",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

CONTENT REQUIREMENTS:

Quick Summary:
- 3–6 sentences.
- Mention it is tailored for:
  Company: ${companyName || "the company"}
  Role: ${jobRole || "the role"}
- Emphasize structured quantitative reasoning with incomplete data.
- Mention the 4 focus areas: market sizing, metrics, A/B testing, root cause.

Card 1: What Is the Analytical Estimation and Execution Round?
Must include:
- What interviewers evaluate (structured thinking, assumptions, math, judgment, communication).
- How to handle ambiguity: clarify scope, declare assumptions, sanity check.
- A role-aware note:
  - If JOB_ROLE indicates PM: talk about product trade-offs and business impact.
  - If engineering: talk about performance, reliability, experimentation.
  - If data/analytics: talk about rigor, instrumentation, causal thinking.
If role is unclear: label as "Not provided in input".

Card 2: Estimation and Market Sizing
Must include:
- A 5-step framework (clarify, choose approach, decompose, assumptions, sanity check).
- 2 worked examples with clean steps (no heavy math required, but show structure).
- A checklist of common pitfalls.

Card 3: Defining Metrics and KPIs
Must include:
- Goals → Inputs → Outputs framework (leading vs lagging).
- North Star metric selection guidelines.
- 2 example metric trees (generic if product not provided; if product context appears in JD, adapt to it and state it comes from JD).

Card 4: A/B Test Design and Analysis
Must include:
- Hypothesis, setup, assignment unit, duration, primary metric, guardrails, decision rule.
- How to interpret trade-offs (conversion up but retention down).
- Practical gotchas: novelty, SRM, logging changes, multiple comparisons.

Card 5: Root Cause Analysis for Metric Drops
Must include:
- A systematic RCA flow: verify tracking, segment, isolate funnel step, correlate with releases, external factors.
- A prioritization rule (largest impact segment first).
- A sample walkthrough scenario (generic unless JD provides product/metric context).

HTML STYLE REQUIREMENTS (use these classes exactly):
- Wrapper: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section heading: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Paragraph: <p class='text-gray-600'>
- List: <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Divider: <hr class='my-4 border-gray-200'>
- Use <b> only inside list items for labels.

Now return ONLY the final JSON (no extra text).`,
  };
};

export const productStrategy = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Product Strategy",
    prompt: `You are an expert interview coach specializing in product strategy interviews.

You MUST tailor the guidance to the exact company and role provided in the INPUT. Do NOT mix information from similarly named companies.
If a company website domain is provided, treat it as the primary disambiguation signal for company context. If no domain is provided, do not guess company-specific facts.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL ACCURACY RULES (STRICT):
1) If JOB_DESCRIPTION includes a domain/official website, treat it as COMPANY_WEBSITE too.
2) Do not invent company-specific products, metrics, users, market positions, or financial claims unless explicitly present in the input.
3) If you reference company context, tie it to the JOB_DESCRIPTION text; otherwise label as "Not provided in input".
4) Use Resume content ONLY if present; do not invent achievements, metrics, or timelines.
5) Do not use any asterisk (*) symbol anywhere in the output.
6) completed must be 0 for every subModule.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- Each subModule must have at least 2 meaningful sections in htmlContent.
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Maintain modern UI style: clean typography, soft shadow, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not use any asterisk symbols anywhere in htmlContent.

IMPORTANT OUTPUT ESCAPING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT SHAPE (exact):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "What Actually Is Product Strategy?",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "5-Step Product Strategy Interview Framework",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Practice Product Strategy Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Product Strategy Interview Rubric",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

CONTENT REQUIREMENTS:

Quick Summary:
- 3–6 sentences.
- Mention it is tailored for:
  Company: ${companyName || "the company"}
  Role: ${jobRole || "the role"}
- Explain what strategy interviews test: goal setting, market analysis, options and trade-offs, prioritization, metrics and next steps.
- Make it clear this is based on the provided input; do not imply verified company facts unless present in JD.

Card 1: What Actually Is Product Strategy?
Must include:
- Clear definition: strategy is choosing where to play and how to win.
- Difference vs product design: strategy decides direction, design decides experience.
- What interviewers evaluate: clarity, market reasoning, trade-offs, execution thinking.
- If JD hints at domain or business model, mention it and label as sourced from JD; otherwise say "Not provided in input".

Card 2: 5-Step Product Strategy Interview Framework
Must include:
- Step 1: Clarify the goal and constraints (time horizon, objective, guardrails).
- Step 2: Understand context (users, market, competition, company strengths).
- Step 3: Generate strategic options in 2–4 buckets.
- Step 4: Choose and prioritize with explicit trade-offs and assumptions.
- Step 5: Define metrics, milestones, and an execution plan (MVP, experiments, risks).
- Provide a mini example that is generic unless JD provides a product/domain; if generic, label as generic.

Card 3: Practice Product Strategy Questions
Must include:
- 6–8 practice prompts across themes:
  Growth, Monetization, Retention, Competitive Defense, Market Expansion, Partnerships, Pricing, Platform or Ecosystem strategy.
- At least 2 prompts must reference the specific company and role directly:
  Use ${companyName} and ${jobRole} explicitly.
- If companyName is missing, avoid placeholders like [Company] and write "the company" instead.
- Provide brief "what to cover" hints per question (no answers).

Card 4: Product Strategy Interview Rubric
Must include:
- A rubric with 3 dimensions:
  Structured Thinking, Strategic Insight, Execution and Metrics.
- Each dimension includes four levels:
  Needs Work, Developing, Strong, Exceptional.
- Make rubric language interview-ready and role-aware; if role is not PM, keep it general.

HTML STYLE REQUIREMENTS (use these classes exactly):
- Wrapper: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section heading: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Paragraph: <p class='text-gray-600'>
- List: <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Divider: <hr class='my-4 border-gray-200'>
- Use <b> only inside list items for labels.

Now return ONLY the final JSON (no extra text).`,
  };
};

export const productSense = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Product Sense",
    prompt: `You are an expert interview coach specializing in Product Sense interviews.

You MUST tailor the guidance to the exact company and role provided in the INPUT. Do NOT mix information from similarly named companies.
If a company website domain is provided, treat it as the primary disambiguation signal for company context. If no domain is provided, do not guess company-specific facts.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL ACCURACY RULES (STRICT):
1) If JOB_DESCRIPTION includes a domain/official website, treat it as COMPANY_WEBSITE too.
2) Do not invent company-specific products, users, markets, metrics, traction, partnerships, or financial claims unless explicitly present in the input.
3) If you reference company context, tie it to JOB_DESCRIPTION text; otherwise label as "Not provided in input".
4) Use USER_RESUME only if present and only for tailoring how the candidate can position themselves; do not invent achievements or numbers.
5) Do not use any asterisk (*) symbol anywhere in the output.
6) completed must be 0 for every subModule.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Maintain modern UI style: clean typography, soft shadow, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not include the card title or summary inside htmlContent.
- Do not use any asterisk symbols anywhere in htmlContent.

IMPORTANT OUTPUT ESCAPING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT SHAPE (exact):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "What is Product Sense?",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Company and Role Relevant Product Sense Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "7-Step Product Sense Framework",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Practice Questions with Hints",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

HTML STYLE REQUIREMENTS (use these classes exactly):
- Wrapper: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section heading: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Paragraph: <p class='text-gray-600'>
- List: <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Divider: <hr class='my-4 border-gray-200'>
- Use <b> only inside list items for labels.

CONTENT REQUIREMENTS:

Quick Summary:
- 3–6 sentences.
- Mention it is tailored for:
  Company: ${companyName || "the company"}
  Role: ${jobRole || "the role"}
- Explain what product sense tests: user understanding, product judgment, prioritization, trade-offs, metrics thinking, and communication.
- Make it clear this is based on the provided input; do not imply verified company facts unless present in JD.

Card 1: What is Product Sense?
Must include:
- Clear definition: connecting user needs, product behavior, and business outcomes.
- What interviewers evaluate: clarity, empathy, prioritization, creativity with feasibility, trade-offs.
- Difference vs product design and strategy in one short section.
- A short generic example that does not assume company-specific products unless JD provides them.

Card 2: Company and Role Relevant Product Sense Questions
Must include:
- 10–14 questions total.
- At least 4 questions must explicitly mention ${companyName || "the company"} and/or ${jobRole || "the role"}.
- If companyName is missing, write "the company" (do not use [Company]).
- Include a mix of themes: improve a product, define metrics, diagnose drop, new feature for a segment, onboarding, retention, monetization trade-off, prioritization.
- If JD contains a domain (e.g., B2B SaaS, fintech, health), include 3 domain-aligned prompts and label them as "Based on JD domain" only if domain is actually present; otherwise say "Domain not provided in input" and keep generic.

Card 3: 7-Step Product Sense Framework
Must include:
1) Clarify the prompt and goal
2) Define users and pick a target segment
3) Identify pains and jobs to be done
4) Brainstorm solutions in 2–3 buckets
5) Choose an MVP and prioritize
6) Define success metrics and guardrails
7) Risks, trade-offs, rollout, and recap
Also include a micro-template for answering in interview format (generic, not company-specific unless JD supports).

Card 4: Practice Questions with Hints
Must include:
- 6 prompts with short hints per prompt (no full answers).
- Include at least 2 prompts tailored to ${companyName || "the company"} and ${jobRole || "the role"}.
- Hints must mention segmentation, what metric to pick, and what trade-off to discuss for each prompt.

Now return ONLY the final JSON (no extra text).`,
  };
};

export const technical = (data) => {
  const companyName = data?.companyName?.trim() || "";
  const companyWebsite = data?.companyWebsite?.trim() || "";
  const jobRole = data?.jobRole?.trim() || "";
  const jobDescription = data?.jobDescription?.trim() || "";
  const userResume = data?.userResume?.trim() || "";

  return {
    name: "Technical",
    prompt: `You are an expert Technical Product Manager interview coach.

You MUST tailor the guidance to the exact company and role provided in the INPUT. Do NOT mix information from similarly named companies.
If a company website domain is provided, treat it as the primary disambiguation signal for company context. If no domain is provided, do not guess company-specific facts.

---
INPUT (authoritative):
COMPANY_NAME: ${companyName || "Not provided"}
COMPANY_WEBSITE: ${companyWebsite || "Not provided"}
JOB_ROLE: ${jobRole || "Not provided"}
JOB_DESCRIPTION: ${jobDescription || "Not provided"}
USER_RESUME: ${userResume || "Not provided"}
---

CRITICAL ACCURACY RULES (STRICT):
1) If JOB_DESCRIPTION includes a domain/official website, treat it as COMPANY_WEBSITE too.
2) Do not invent company-specific products, users, markets, architecture, scale, metrics, partnerships, or financial claims unless explicitly present in the input.
3) If you reference company context, tie it to JOB_DESCRIPTION text; otherwise label as "Not provided in input".
4) Use USER_RESUME only if present and only for tailoring how the candidate can position themselves; do not invent achievements or numbers.
5) Do not use any asterisk (*) symbol anywhere in the output.
6) completed must be 0 for every subModule.

OUTPUT FORMAT RULES (STRICT):
- Output MUST be valid JSON ONLY. No markdown. No extra text.
- Use the exact JSON shape below. Do NOT add extra top-level keys.
- HTML must start directly with a <div> (no <html>, <head>, etc.)
- Use Tailwind utility classes only.
- Maintain modern UI style: clean typography, soft shadow, rounded corners, whitespace, logical grouping.
- Use <hr> dividers between sections.
- Do not include the card title or summary inside htmlContent.
- Do not use any asterisk symbols anywhere in htmlContent.

IMPORTANT OUTPUT ESCAPING RULES (STRICT):
- The final response MUST be valid JSON only.
- Do NOT use raw line breaks in the output.
- Wherever a new line is required inside string values (especially htmlContent), use escaped newline characters: \\n
- Do NOT use unescaped quotes inside JSON values.
- All double quotes inside strings MUST be escaped using \\\".
- All single quotes inside strings MUST be escaped using \\\'.
- All HTML inside JSON values MUST also follow the above escaping rules.
- The output must be directly parseable using JSON.parse() without errors.
- Output ONLY the JSON object.

JSON OUTPUT SHAPE (exact):
{
  "quickSummary": "string",
  "subModules": [
    {
      "title": "Overview of Technical PM Interview",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Core Framework to Answer Technical PM Interview Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Systems and Infrastructure Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Data, Metrics, and Debugging Questions",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    },
    {
      "title": "Engineering Collaboration and Stakeholder Alignment",
      "completed": 0,
      "summary": "string",
      "content": "string",
      "htmlContent": "string"
    }
  ]
}

HTML STYLE REQUIREMENTS (use these classes exactly):
- Wrapper: <div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
- Section heading: <h3 class='text-lg font-semibold mb-2 text-gray-900'>
- Paragraph: <p class='text-gray-600'>
- List: <ul class='list-disc pl-5 space-y-2 text-gray-600'>
- Divider: <hr class='my-4 border-gray-200'>
- Use <b> only inside list items for labels.

CONTENT REQUIREMENTS:

Quick Summary:
- 3–6 sentences.
- Mention it is tailored for:
  Company: ${companyName || "the company"}
  Role: ${jobRole || "the role"}
- Explain what technical PM interviews test: technical fluency (not coding), system thinking at the right altitude, asking clarifying questions, trade-offs, data and metrics literacy, and communication with engineers and stakeholders.
- Make it clear this is based on the provided input; do not imply verified company facts unless present in JOB_DESCRIPTION.

Card 1: Overview of Technical PM Interview
Must include:
- Clear explanation: not coding; partnering with engineering.
- What interviewers evaluate: clarity, assumptions, constraints, scalability awareness, reliability/privacy considerations, metrics thinking, and communication.
- A small section: "What to do if you do not know a concept" (how to reason and ask questions).
- Mention how to adapt to company context: reference JD domain only if present; otherwise keep generic.

Card 2: Core Framework to Answer Technical PM Interview Questions
Must include a robust 6-step framework:
1) Listen and clarify
2) Define user goal and business goal
3) Identify constraints and non-goals
4) Propose high-level architecture or approach
5) Trade-offs, risks, and mitigations
6) Metrics, rollout, and recap
Also include a short "answer template" the candidate can reuse.

Card 3: Systems and Infrastructure Questions
Must include:
- Key building blocks with simple definitions: client, server, API, database, cache, queue, CDN, auth, observability.
- A generic example walkthrough (not company-specific unless JD provides product) such as designing "file upload + processing pipeline" or "real-time notifications".
- Mention at least 4 trade-offs: latency vs cost, consistency vs availability, build vs buy, privacy vs personalization.

Card 4: Data, Metrics, and Debugging Questions
Must include:
- A structured approach to metric drops (segment, validate instrumentation, timing, recent changes, external factors).
- A/B testing basics: hypothesis, primary metric, guardrails, sample size thinking at a high level (no formulas), decision criteria.
- A short list of common metrics categories: acquisition, activation, engagement, retention, revenue, reliability.
- Include 6–10 example prompts that are relevant to ${jobRole || "the role"} and optionally the JD domain if present; if domain not present, keep them generic.

Card 5: Engineering Collaboration and Stakeholder Alignment
Must include:
- How to write clear requirements (problem, users, acceptance criteria, edge cases).
- How to run product-engineering rituals: kickoff, grooming, tech review, launch review, incident review.
- Handling conflicts: speed vs quality, tech debt vs features, scope creep, conflicting stakeholder promises.
- A mini playbook for "engineering says 6 months, business wants 6 weeks" with phased MVP.

Now return ONLY the final JSON (no extra text).`,
  };
};
