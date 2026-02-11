export const knowTheCompany = (data) => {
  return {
    name: "Know the Company",
    prompt: `You are an expert research assistant helping a user prepare for a job interview.
Your task is to identify the company, research it thoroughly, and generate a detailed JSON output containing key information relevant for interview preparation.
${data}
----

*INSTRUCTIONS:*

1. Identify Company:
    - Start with the 'COMPANY NAME' provided in the input as the primary candidate.
    - **Crucially, use the 'COMPANY WEBSITE' (if available in the input) to disambiguate this name.** Analyze its domain to distinguish this specific company from others that might share a similar name. This step is vital for pinpointing the exact entity the user is referring to.
    - Further refine and confirm the specific company identity by analyzing the 'JOB DESCRIPTION'. Look for contextual clues (industry, services mentioned, specific technologies, location if relevant) that align with the website information and the provided company name, helping to resolve any remaining ambiguity.
    - Your objective is to accurately determine and confirm the single, specific company entity intended by the user for subsequent research.

Research: **Using the identified company name, leverage your general knowledge base for a foundational understanding of the company (e.g., its industry, general product categories, common perceptions). However, to ensure the highest accuracy and up-to-date information for specific factual and potentially time-sensitive details, you **must prioritize and actively employ your searching grounding (searching the internet) capabilities.** Aim for comprehensive information, using search to validate, update, or find details that are likely to be current or highly specific.This approach is especially critical for gathering precise information on:

- Mission & Values
- Founding Team - Company founding date & Key founder(s)
- Products & Services
- Business Model & Market Footprint
- Recent funding rounds (including amounts, dates, and key investors, if publicly available)
- Key recent events (e.g., significant news, major product launches, acquisitions, strategic partnerships, ideally within the last 1-2 years)
- Current key leadership roles and names (e.g., CEO, CPO, CTO)
- Specific financial details (e.g., revenue trends if public, latest valuation if reported)
- Notable clients/customers (verifying publicly acknowledged relationships)

-----

REQUIRED INFORMATION CATEGORIES (Map these to the JSON structure):

- ***Quick Summary:*** High-impact overview (~2 mins) covering: What the company does, its primary product/service, key customer segment & problem solved & company's advantage
- **Company Overview:**
    - **Company Snapshot:** 3–4 sentence summary explaining what the company does, its core product or service, key innovation, and why it matters in its industry
    - **Mission & Values: Instruction - This information should not be inferred or guessed, it should be searched on the web for the most accurate result**
        - Mission: 1 sentence stating the mission statement of the company, if available
        - Vision: 1 sentence stating the vision statement of the company, if available
        - Values/Principles: List all the values/principles of the company, if available
    - **Founding Team:** String (In 1-2 sentences, state the *year* company_name was founded and list *all the names* *e.g. name(job title)* of its founders entirely from web search) e.g. *The founders of company_name are name1(job title), name2(job title), name3(job title),etc.*
- **Products & Services: Instruction:** - Your primary task here is to thoroughly search the web, especially the company's official website (navigating their "Products," "Services," "Solutions," or equivalent sections), to identify and list all of the company's *main, distinct* products and/or service lines.
    - **Distinguishing Main Products from Features:** If a company offers a primary product that has many features or sub-components, list the *main product* as the offering. Only list sub-components or features as separate "Product/Service" entries if the company markets and presents them as distinct, standalone offerings. The goal is to reflect how the company categorizes and presents its offerings to the market.
    - **Handling Numerous Offerings:** For companies with an extensive portfolio of many distinct products/services, strive to list all *major* or *primary* offerings. If the list becomes exceptionally long (e.g., dozens of minor variations), prioritize those that appear most strategically important, are highlighted by the company, or (if a job description is part of the input) are most relevant to the role. However, the initial goal should be to capture the breadth of their main offerings.
    - **Description:** For each distinct product or service identified, provide its name followed by a concise 1-2 line description detailing what it is and its core function or benefit.
    - **Source Verification:** This information MUST be actively searched and verified online. Prioritize the company's official website and reputable industry sources. Do not rely solely on general knowledge, as product portfolios change.
    Example Format (to be followed for each entry in the JSON subPoints):
    - [Product/Service Name 1:** [Concise 1-2 sentence description of Product/Service 1.]
    - [Product/Service Name 2:** [Concise 1-2 sentence description of Product/Service 2.] ad keep repeat for all offerings found
- **Business Model & Company Financials:**
    - **Business Model & Monetization: 1- 3 points outlining what is the b primary business model of the company**
    - **- **Financials & Funding: Instructions for Research and Formatting:**
    - **General Goal:** Provide a concise overview of the company's recent funding history. All information must be sourced from reliable web searches.
    - **For Privately Held Companies:**
        - **Objective:** Provide a comprehensive list of funding rounds, with a primary focus on the last 5 years, and also capturing essential earlier rounds if funding history is sparse.
        - **Instruction:** Actively search for all known funding rounds.
            - **Your primary goal is to list ALL distinct funding rounds announced in the past 5 years.** For each round, include its type (e.g., Seed, Series A, Pre-seed), amount, date (Month/Year or Q#/Year), and key/lead investors. Include all rounds found within this 5-year period, regardless of how many there are.
            - **Additionally, if the company has had very few funding rounds in total (e.g., only 1-2 rounds ever) and these foundational rounds are older than 5 years, ensure these are also listed.** The aim is to provide a complete funding picture where possible.
        - **Example for a subPoint string (to be used for each funding round listed in the JSON subPoints):** "Series C - $120M - May 2023 - led by Sequoia, participation from Accel."
    - **For Publicly Traded Companies (e.g., those that have had an IPO):**
        - **First subPoint string should typically state:** The company's public status, its stock ticker, the exchange it trades on, and its IPO date and key details (e.g., "Went public via IPO on NASDAQ (Ticker: GOOGL) on August 19, 2004, raising $1.67 billion.").
        - **Subsequent subPoint strings (if applicable and significant recent events exist):** Detail any major post-IPO financing events like significant secondary offerings, large debt financing rounds, or major investments received. If no such recent, distinct "funding rounds" exist post-IPO, this can be briefly stated, or the IPO information might be the primary focus for funding history.
        - **Avoid generic placeholders.** If specific post-IPO funding events aren't prominent, focus on the IPO details and current public market funding.
    - **Formatting in JSON:** Each piece of funding information (whether a private round or a public company detail) should be a single string within the *subPoints* array for "Financials & Funding".
    - **Revenue:** List the most up to date revenue available of the company. Do not guess this number, if its not publicly available then mention as such. For companies that are public this number should be easily available. If the company is private focus on reputable news sources.
- **Target Market & Customers:**
    - Primary Customer Segments: Provide a 3-5 sentence summary of key industries, sectors or target market that the company serves, if they serve multiple industries then focus on the main industry they serve with the product mentioned in the job description. A
    - Key Customer Challenges Solved: Problems/needs addressed by products/services.
    - Key Reasons Customers Choose: Top 2-3 USPs/differentiators.
    - Notable Clients: 5-7 significant clients that the company has worked with (publicly known)
- **Competitive Landscape:**
    - Main Competitors: List 5-7 significant competitors. These can be direct or indirect competitors
    - Key Differentiators (USPs): 1-3 points making the differentiates the company from its competitors. Focus on the things that the company does that sets it apart from its competitors and is the reason companies prefer the company over the competitors
    - Competitive Strengths: 1-3 core advantages (e.g., technology, brand).
    - Potential Weaknesses/Challenges: 1-3 potential vulnerabilities relative to competitors.
- **Organization Structure & Leadership:**
    - Size, Status & Location: Approx Employee Count, Public/Private, HQ, Key Offices.
    - Organizational Structure: Parent Company, Key Subsidiaries/Divisions, recent restructuring.
    - Key Leadership: CEO, CPO/Product Head, CTO/Engineering Head, other relevant VPs/Heads (provide names).
- **Industry Context, News & Trends**
    - **Key Industry Trends:** List all the key trends in the company’s primary industry that the company
    - **Recent News & Key Developments:** 3-5 significant events from the last 5 years (funding, product launches, acquisitions, partnerships, milestones reached etc.). Summarize each factually in one sentence (e.g., "Acquired Company Y, expanding its market presence in Asia, in Q3 2023.")
    -----

    **The JSON Output should be in this format only and ensure atleast *2 subPoints* should,must be filled in each object of subModules and the 'completed' must be '0' only:**
    {
  "quickSummary": "[A comprehensive 5–6 paragraph overview covering what the company does, its products/services, customer segments, problems solved, competitive advantage, recent momentum, and industry relevance.]",
  "subModules": [
    {
      "title": "Company Overview",
      "completed": 0,
      "summary": "This module offers a concise yet comprehensive overview of the company, detailing its core operations, mission, values, and foundational history to provide a clear understanding of its identity and purpose.",
      "content": "Delve into the company's essence with a snapshot of its business, explore its guiding mission and core values, and discover the vision that drives its future. This section also introduces the pivotal individuals who founded the company, marking its origins.",
      "htmlContent": "<div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Company Snapshot</h3>
  <p class='mb-4 text-gray-600'>
    String (3–4 sentence summary explaining what the company does, core product/service, key innovation, and relevance)
  </p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Mission & Values</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>Mission: string (Mission of the company. Must be sourced, not inferred.)</li>
    <li>Vision: string (Vision of the company. Must be sourced, not inferred.)</li>
    <li>Values/Principles: string, string, string (List of values/Principles; must be sourced, not inferred.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Founding Team</h3>
  <p class='text-gray-600'>
    String (In 1-2 sentences, state the year company_name was founded and list all the names e.g. name(job title) of its founders entirely from web search)
  </p>
</div>
"
    },
    {
      "title": "Products & Services",
      "completed": 0,
      "summary": "This module provides an in-depth look at the company's diverse product and service offerings, highlighting their core functionalities and how they address specific customer needs. It offers a clear picture of the value proposition each offering brings to the market.",
      "content": "Explore the range of innovative products and essential services provided by the company. Understand their core functions, the specific benefits they offer to users, and how they collectively contribute to solving key market problems and delivering value.",
      "htmlContent": "<div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Product & Service List</h3>
  <ul class='list-none space-y-2 text-gray-600'>
    <li><b>Product/Service A:</b> string (Concise 1–2 sentence description of what it is and does)</li>
    <li><b>Product/Service B:</b> string (Same format, repeat as needed)</li>
  </ul>
</div>
"
    },
    {
      "title": "Business Model & Company Financials",
      "completed": 0,
      "summary": "This module outlines the company's strategic approach to generating revenue, provides insights into its financial health, including recent funding rounds and public market status, and details its overall financial trajectory.",
      "content": "Discover how the company monetizes its offerings through a detailed look at its business model. This section also covers its funding history, including significant investment rounds or public market information, and provides an overview of its most recent revenue figures to give a complete financial picture.",
      "htmlContent": "<div class='p-4 rounded-xl space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Business Model & Monetization</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (e.g., “Subscription-based SaaS platform for enterprise analytics”)</li>
    <li>String (e.g., “Freemium pricing for individual users with tiered enterprise plans”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Financials & Funding</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Detail of a specific funding event or relevant financial milestone. Example: “Series C – $120M – May 2023 – led by Sequoia”)</li>
    <li>String (Further funding details or milestones as applicable)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Revenue</h3>
  <p class='text-gray-600'>
    Latest available revenue: string (e.g., “$210M in 2023” or “Revenue not publicly available”)
  </p>
</div>
"
    },
    {
      "title": "Target Market & Customers",
      "completed": 0,
      "summary": "This module clearly defines the company's target audience, detailing the specific segments it serves, the key challenges its products and services aim to resolve, and the distinct reasons why customers choose its solutions over alternatives.",
      "content": "Identify the primary customer segments that the company focuses on, understanding their unique needs and the core problems that the company's offerings are designed to solve. Learn about the compelling reasons and unique selling propositions that attract and retain its notable clients.",
      "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Primary Customer Segments</h3>
  <p class='mb-4 text-gray-600'>String (3–5 sentences on key industries, sectors, or personas served)</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Customer Challenges Solved</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (List of core problems solved by the company’s products/services)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Reasons Customers Choose</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (1–2 sentence point on USP 1)</li>
    <li>String (USP 2)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Notable Clients</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>Client 1</li>
    <li>Client 2</li>
  </ul>
</div>"
    },
    {
      "title": "Competitive Landscape",
      "completed": 0,
      "summary": "This module provides a strategic overview of the company's competitive environment, identifying key rivals and outlining the critical differentiators that set the company apart, as well as potential weaknesses in the market.",
      "content": "Gain a clear understanding of the company's main competitors, both direct and indirect. This section highlights the unique selling propositions that differentiate the company in the market, its core competitive strengths, and any potential vulnerabilities or challenges it faces in relation to its rivals.",
      "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Main Competitors</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>Competitor A</li>
    <li>Competitor B</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Differentiators (USPs)</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Point 1)</li>
    <li>String (Point 2)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Competitive Strengths</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (e.g., “Proprietary AI engine that automates analysis 30% faster”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Potential Weaknesses/Challenges</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>String (e.g., “Limited geographic reach compared to global competitors”)</li>
  </ul>
</div>"
    },
    {
      "title": "Organization Structure & Leadership",
      "completed": 0,
      "summary": "This module provides insights into the company's organizational framework, detailing its size, public or private status, key locations, and the hierarchical structure including its leadership team and significant divisions.",
      "content": "Understand the company's scale and structure, from its approximate employee count and public/private status to its headquarters and key global offices. This section also outlines its organizational hierarchy, including any parent companies or subsidiaries, and introduces the vital members of its leadership team.",
      "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Size, Status & Location</h3>
  <p class='mb-4 text-gray-600'>String (e.g., “Approx 1,500 employees, private company, HQ in San Francisco, regional offices in London and Bangalore”)</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Organizational Structure</h3>
  <p class='mb-4 text-gray-600'>String (e.g., “Wholly-owned subsidiary of XYZ Group, with 3 business divisions: Consumer, Enterprise, Research”)</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Leadership</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>CEO: Full Name</li>
    <li>CPO: Full Name</li>
    <li>CTO: Full Name</li>
    <li>Other Key Heads: Role – Name</li>
  </ul>
</div>"
    },
    {
      "title": "Industry Context, News & Trends",
      "completed": 0,
      "summary": "This module provides essential context by highlighting prevalent trends within the company's industry and detailing recent news and significant developments that have shaped its trajectory and market position.",
      "content": "Explore the broader industry landscape affecting the company, including key trends that are driving change and innovation. This section also covers recent news and pivotal developments, such as major product launches, strategic partnerships, or acquisitions, that demonstrate the company's response to or influence on these trends.",
      "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Industry Trends</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>Trend 1</li>
    <li>Trend 2</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Recent News & Key Developments</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>Event 1: string (e.g., “Acquired Company Y, expanding its market presence in Asia, in Q3 2023”)</li>
    <li>Event 2: string (Description of another significant event)</li>
  </ul>
</div>"
    }
  ],
  "questions":"You are an expert interviewer. Your task is to generate relevant and insightful interview questions for a candidate applying for a [job_role] position at [company]. **IMPORTANT:** Do not generate any answers, only the questions. Please generate 5-7 distinct interview questions that cover a range of areas crucial for evaluating a candidate for this role. These should include: * **Company Knowledge & Alignment:** Questions that assess their understanding of [company]'s business model, mission, values, and how their aspirations align. * **Role-Specific Skills & Experience:** Questions tailored to the core responsibilities and technical or functional skills required for a [job_role]. * **Behavioral & Situational Scenarios:** Questions that uncover their problem-solving abilities, teamwork experience, leadership potential, and how they handle challenges or setbacks. * **Industry & Future Trends:** Questions about current trends, challenges, or the future direction of the industry relevant to [company] and the [job_role]'s field. Ensure all questions are open-ended, designed to encourage detailed and thoughtful responses. --- **Replace [
    company
  ] with the actual company name** (e.g., \"Google\", \"Microsoft\", \"Tata Consultancy Services\") and **[
    job_role
  ] with the specific job role** (e.g., \"Software Engineer\", \"Marketing Manager\", \"Data Scientist\")."
}
`,
  };
};

export const productResearch = (data) => {
  return {
    name: "Product Research",
    prompt: `You are an expert Researcher helping a user prepare for a job interview by analyzing a specific product.
Your task is to identify the primary product the candidate will be working on based on the Job Description (JD), company name and company website, research it thoroughly using primarily the provided company website, other official company sources, reputed website and your own knowledge base and generate a detailed JSON output containing key information relevant for interview preparation.
    ${data} Description (JD)
    ----
    *INSTRUCTIONS:*

1. Identify Primary Focus Product:
    - Start by carefully reading the **'JOB DESCRIPTION (JD)'** provided in the input to identify ALL specific products, product lines, platforms, or teams mentioned (e.g., "Search", "Maps", "Assistant", "Cloud Platform").
    - Analyze the JD for **PM Responsibility Signals**: Look specifically within "Responsibilities", "What You'll Do", etc., for keywords indicating direct ownership or primary focus for the PM role (e.g., "own the roadmap for [Product X]", "define the strategy for [Product X]").
    - **Crucially, use the 'COMPANY Name or Company WEBSITE URL' (provided in the input) to confirm the existence and details of any product(s) identified from the JD.** This step is vital for pinpointing the exact product offering.
    - **Fallback Logic:** If no specific product is clearly identified for PM ownership in the JD, attempt to identify the company's main/flagship product relevant to the role from the **'COMPANY WEBSITE'**. If still unclear, identify the most relevant product category/business line from the website.
    - Your objective is to accurately determine and confirm the single, **Primary Focus Product** (or product category) for subsequent research. Other mentioned products can be considered **Contextual Products**.
2. Research Product Details: **Using the identified Primary Focus Product, conduct your deep research.**
    - **The 'COMPANY WEBSITE ' provided in the input is your ABSOLUTE PRIMARY AND AUTHORITATIVE SOURCE for all specific product details.** This includes its features, functionality, target audience, value proposition, and monetization.
    - You **MUST prioritize and actively use information directly from the provided 'COMPANY WEBSITE', official company sources (e.g., company blogs, official product documentation linked from the main website), reputable sources, and your knowledge base.** This ensures the highest accuracy and up-to-date information. Please ensure the information is as up-to-date as it can be.
    - **For information NOT typically found on a product page (e.g., names of direct competitors not mentioned by the company, broad market trends for SWOT analysis), you may supplement with your general knowledge or web searching capabilities, but clearly state if the information is not from the official company website.**

---

REQUIRED INFORMATION CATEGORIES (Map these to the JSON structure for the **Primary Focus Product**):

- ***Quick Summary (Product Focus):*** High-impact overview (at least 260 words) covering: What the [Primary Focus Product] does, its primary user segment & key problem solved, its unique value proposition & key differentiators.
- **Card 1: Product Overview:**
    - **What Core Product Does:** Clear, concise functional description.
    - **Primary Target Market Segment:** The specific market/industry category the product primarily serves.
    - **Key Problem(s) It Solves for Users:** Core pain points it addresses.
    - **Unique Value Proposition (UVP):** Its distinct promise and most significant benefit.
    - ** Key Differentiators:** Standout aspects setting it apart.
- **Card 2: Core Functionality:**
    - Identified Product Features & Descriptions: List all significant product features with a 1-2 line summary of what each does and its benefit.
    - Key Underlying Technology: Any specific tech fundamental to its performance or UVP.
    - Integration & Ecosystem Synergy: Critical integrations and how they enhance value.
    - Monetization Strategy & Pricing Approach: How the product generates revenue and its pricing model.
- **Card 3: User Focus & Core Needs:**
    - **Primary Target User Profile(s):** Detailed description of the main users.
    - **How Users Engage with the Product:** Common workflows or tasks.
    - **Fundamental User Needs Addressed:** Core 'jobs' or aspirations the product helps users fulfill.
- **Card 4: Competitive Landscape (Product-Focused):**
    - **Key Direct Competitors:** Who offers similar solutions?
    - **Indirect Competition & Alternative Solutions for the problem [Primary Focus Product] solves.**
    - **Positioning Against Competitors:** How it aims to win.
- **Card 5: SWOT Analysis:**
    - **Strengths:** Internal positives of the product.
    - **Weaknesses:** Internal negatives/limitations of the product.
    - **Opportunities:** External favorable factors for the product.
    - **Threats:** External negative conditions for the product.
    
    ---
    
    **The JSON Output should be in this format only and ensure atleast *2 subPoints* should,must be filled in each object of subModules and the 'completed' must be '0' only:**
    {
    "quickSummary": "[A comprehensive 5–6 paragraph overview covering what the Primary Focus Product does, its key features, target users, problems solved, unique value proposition, differentiators, and its role within the company's ecosystem.]",
    "subModules": [
    {
    "title": "Product Overview",
    "completed": 0,
    "summary": "This section provides a high-level overview of the product, detailing its core purpose, the main market it serves, the key problems it addresses for users, its unique value proposition, and what sets it apart from competitors. This summary is crucial for a quick understanding of the product's fundamental identity and market position.",
    "content": "Delve into the foundational aspects of the product, understanding its primary function, the specific market segment it targets, and the essential problems it aims to solve. This card also highlights the product's unique value proposition and key differentiators that make it stand out in the competitive landscape, emphasizing information derived directly from official company sources.",
    "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>What Core Product Does</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Concise overview of the product's primary function and capabilities, e.g., “An advanced analytics platform for processing and visualizing large datasets.”)</li>
    <li>String (The main activity or process it enables for users, according to the company website.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Primary Target Market Segment</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (The specific market or industry category the product primarily serves, e.g., “Enterprise B2B SaaS companies,” as defined on the company website.)</li>
    <li>String (Further details on the segment if available, e.g., “Focuses on medium to large enterprises within the financial services and healthcare sectors.”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Problem(s) It Solves for Users</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Top critical user pain point or business challenge the product resolves, as highlighted on the company website.)</li>
    <li>String (Another significant problem it addresses, or details on how it provides a solution.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Unique Value Proposition (UVP)</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (The core, compelling reason customers choose this product over alternatives, using language from the company website.)</li>
    <li>String (The most significant benefit or outcome it distinctively delivers, if stated on the company website.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Differentiators</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>String (A standout aspect – feature, technology, etc. – that sets it apart, as presented on the company website.)</li>
    <li>String (Another key differentiator, e.g., “Offers [Unique Aspect A], unlike most competitors who focus on [Common Aspect B].”)</li>
  </ul>
</div>"
    },
    {
    "title": "Core Functionality & Value",
    "completed": 0,
    "summary": "This module provides a detailed breakdown of the product's essential features, the underlying technology that powers it, how it integrates with other systems, and its revenue generation strategy. This information is critical for understanding the product's operational mechanics and business model.",
    "content": "Explore the intricate mechanics of the product by examining its identified features and their descriptions, revealing what the product does for its users. Understand the key underlying technologies that drive its performance and unique capabilities. Discover how it integrates within a broader ecosystem to enhance value, and analyze its monetization strategy and pricing approach to see how it generates revenue.",
    "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Identified Product Features & Descriptions</h3>
  <ul class='list-none space-y-2 mb-4 text-gray-600'>
    <li><b>Feature 1: [Feature Name]</b> – String (A 1–2 line summary of what the feature does and its primary user benefit or value, as described on the company website.)</li>
    <li><b>Feature 2: [Feature Name]</b> – String (Similar detailed description for another feature.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Underlying Technology</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Description of specific technology fundamental to its performance or UVP, if detailed on the company website, e.g., “Leverages proprietary machine learning models for advanced predictive analytics.”)</li>
    <li>String (If standard tech or not detailed, statement like “Built on a robust and scalable modern tech stack, focusing on reliable delivery of features,” or “Specific underlying technology details are not highlighted on the website.”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Integration & Ecosystem Synergy</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Key integrations critical to user workflows, e.g., with other company products or essential third-party services, as mentioned on the company website.)</li>
    <li>String (How these integrations extend functionality or streamline user experience, e.g., “Offers seamless data synchronization with [Contextual Product], enabling a unified workflow for X and Y,” based on website details.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Monetization Strategy & Pricing Approach</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>String (How the product generates revenue, e.g., “Tiered subscription model: Basic, Pro, Enterprise,” as stated on the company website.)</li>
    <li>String (Brief overview of its pricing model or common tiers, e.g., “Pricing is per user per month, with volume discounts for larger teams,” if available on the website. If not, state that pricing details are not publicly available on the site.)</li>
  </ul>
</div>"
    },
    {
    "title": "User Focus & Core Needs",
    "completed": 0,
    "summary": "This module delves into the primary users of the product, describing their profiles, common engagement patterns, and the fundamental needs or aspirations the product helps them achieve. This user-centric view is essential for understanding the product's impact.",
    "content": "Understand the heart of the product's design by exploring its primary target user profiles, detailing who uses it and why. Discover how users typically interact with the product through common workflows, and uncover the fundamental needs and aspirations that the product helps them fulfill, all based on insights from official sources.",
    "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Primary Target User Profile(s)</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Detailed description of the most important user segment or persona, e.g., “Marketing Managers in mid-sized technology companies requiring advanced campaign analytics,” as defined on the company website.)</li>
    <li>String (Key characteristics, roles, daily tasks, and motivations of another primary user profile relevant to the product, based on website information.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>How Users Engage with the Product</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Scenario 1: Description of a common workflow or task a user performs with the product, e.g., “To optimize ad spend, a user first ingests campaign data from multiple sources, then utilizes the platform's attribution modeling feature to identify high-performing channels, and finally generates a comprehensive report for stakeholders.”)</li>
    <li>String (Scenario 2: Similar detailed description for another key interaction or use case, as described or inferred from the company website.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Fundamental User Needs Addressed</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>String (A core underlying need or “job” the product helps users accomplish, e.g., “To gain actionable insights from complex datasets to make data-driven business decisions,” inferred from website information.)</li>
    <li>String (Another fundamental need or aspiration the product fulfills, framed as the progress users are trying to make, e.g., “To streamline collaborative project management and improve team productivity on complex initiatives.”)</li>
  </ul>
</div>"
    },
    {
    "title": "Competitive Landscape (Product-Focused)",
    "completed": 0,
    "summary": "This module examines the competitive environment surrounding the product, identifying both direct and indirect rivals, and detailing the product's strategic positioning and approach to winning in the market. Understanding this landscape is crucial for strategic product development.",
    "content": "Analyze the product's standing within its market by identifying key direct competitors and exploring indirect competition and alternative solutions that address the same user problems. This card details how the product strategically positions itself against these competitors, highlighting its competitive advantages and aspirations for market leadership, drawing on official and general market information.",
    "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Direct Competitors</h3>
  <ul class='list-none space-y-2 mb-4 text-gray-600'>
    <li><b>Competitor A: [Name].</b> String (Known for [Their main strength/focus area]. If competitor details are from general knowledge, state so. If from company website, cite that.)</li>
    <li><b>Competitor B: [Name].</b> String (Similar detailed description for another direct competitor and its known strengths.)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Indirect Competition & Alternative Solutions</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (Other ways users currently address the core problem the Primary Focus Product solves, e.g., “Utilizing generic spreadsheet software for data analysis, which lacks specialized features but is widely accessible,” inferred from product descriptions or general market understanding.)</li>
    <li>String (Description of another alternative solution or type of indirect competitor, e.g., “Developing custom in-house tools, which offer tailored functionality but require significant development resources and ongoing maintenance.”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Positioning Against Competitors</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>String (How the product aims to win against direct competitors, e.g., “By offering a more intuitive user interface and significantly faster data processing speeds, as highlighted by its UVP and differentiators from the company website.”)</li>
    <li>String (Its key competitive advantage in the current landscape, e.g., “Its unique focus on seamless integration with the broader [Company Name] ecosystem provides a unified user experience not easily matched by standalone competitors.”)</li>
  </ul>
</div>"
    },
    {
    "title": "SWOT Analysis",
    "completed": 0,
    "summary": "This module provides a strategic SWOT analysis of the product, detailing its internal strengths and weaknesses, along with external opportunities and threats. This comprehensive assessment is vital for understanding the product's current standing and future strategic direction.",
    "content": "Engage in a critical analysis of the product's strategic position through a SWOT framework. Uncover its internal strengths and weaknesses, leveraging insights primarily from company official sources. Simultaneously, explore external opportunities for growth and potential threats that could impact its trajectory, drawing on both official information and broader market knowledge.",
    "htmlContent": "<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Strengths</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (A key internal advantage, e.g., “Leverages [Company Name]'s strong brand reputation and existing enterprise customer base for market penetration,” derived from website and JD analysis.)</li>
    <li>String (Another core competency, e.g., “Possesses proprietary algorithms for [specific function] that deliver demonstrably superior accuracy compared to alternatives, as evidenced by case studies on the company website.”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Weaknesses</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (An internal limitation, e.g., “The product currently has a steeper learning curve for non-technical users, potentially hindering wider adoption in certain segments,” inferred cautiously from website or JD.)</li>
    <li>String (Another area for improvement, e.g., “Perceived as having a higher price point compared to some newer, more narrowly focused competitors, which could be a barrier for smaller businesses.”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Opportunities</h3>
  <ul class='list-none space-y-1 mb-4 text-gray-600'>
    <li>String (A significant external market opportunity, e.g., “The rapidly growing market demand for AI-powered automation in [target industry] presents a significant expansion opportunity for the product’s advanced capabilities.”)</li>
    <li>String (Another potential opportunity, e.g., “The increasing need for robust data privacy and compliance features offers a chance to further differentiate by enhancing its existing security architecture.”)</li>
  </ul>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Threats</h3>
  <ul class='list-none space-y-1 text-gray-600'>
    <li>String (A key external threat, e.g., “Intense competition from both established players and agile startups introducing innovative features at a rapid pace, requiring continuous product development.”)</li>
    <li>String (Another potential challenge, e.g., “Potential shifts in technology standards or user preferences towards open-source alternatives could impact long-term market share if not proactively addressed.”)</li>
  </ul>
</div>"
    }
    ],
    "questions":"You are an expert product analyst and interviewer. Your task is to generate a set of relevant and insightful product research questions for a thorough analysis of [product_name]. **IMPORTANT:** Do not generate any answers; provide only the questions. Please generate 5-7 distinct questions that cover the following areas of product research: * **Problem and User Value:** Questions about the core problem the product solves, its target users, and the value it delivers. * **Competitive Landscape:** Questions focused on how the product stands out from competitors. * **Feature Analysis & Prioritization:** Questions about existing features, their effectiveness, and potential future improvements. * **Risks and Challenges:** Questions that explore potential obstacles to the product's success. Ensure the questions are open-ended and designed to elicit detailed, analytical responses from a product expert. --- **Replace [product_name] with the actual name of the product you want to analyze** (e.g., \"Google Maps\", \"Slack\", \"Netflix\", \"ChatGPT\")."
    }
    
    `,
  };
};

export const jobDescriptionAnalysis = (data) => {
  return {
    name: "Job Description Analysis",
    prompt: `Analyse this entire ${data}
     ----
    # Job Description Analysis —> Decode The Role (JD Analysis)

**Updated Plain Text Breakdown (Module 3: Decode the Role - 4 Cards):**

**Module Title:** Decode the Role

Quick Summary Instructions:

    Generate a concise (3-4 sentence) overview.

    Explicitly state that this analysis is based only on the provided JD text.

    Synthesize the role's core purpose, the most critical skill/experience emphasized, the primary way success appears to be measured, and the main organizational context (reporting line or key collaborators).

---

Card 1: Core Role & Responsibilities

    Title: Core Role & Responsibilities

    Summary: Analysis of the main purpose of the role and key tasks specified in the JD, interpreted for their significance.

    htmlContent:

        - Wrap the entire content in a '<div>' with proper padding and spacing.
- Use modern UI practices inspired by Clerk UI: soft shadows, rounded corners, spacing between sections, clean typography, and logical layout grouping.
- Use Tailwind utility classes only for layout, text, cards, dividers, tables, etc.
- Include:
  - Headings for each main point (e.g., “Primary Mission / Underlying Need”)
  - Sub-points as bullet lists or brief paragraphs depending on their content
  - Tables if grouping helps clarity
  - Dividers ('<hr>') between sections
- Ensure good use of whitespace and spacing to avoid clutter
- All points must be converted into attractive, modern, readable HTML
- Do not add any asterisk symbols anywhere
- Begin the HTML directly with a '<div>' tag (do not include <html>', '<head>', etc.)
- Do not include title "Core Role & Responsibilities" and description just start with points
- Include proper spacing classes between list,etc.


Card 2: Required Skills & Experience

    Title: Required Skills & Experience

    Summary: Interpretation of the essential and preferred qualifications sought, explaining their relevance to the role's demands.

    htmlContent:
    - Begin directly with a <div> tag (do not include <html>, <head>, etc.)
- Wrap the entire content in a properly padded and spaced <div>
- Use a card-style layout with rounded corners, subtle shadows, and good spacing
- Use headings for the card title and section titles (e.g., “Essential Hard Skills / Technical Requirements”)
- Use readable font sizes, consistent spacing, and neutral color palette like Clerk UI
- Use bullet points or paragraphs for sub-points
- Use dividers (<hr>) between each main section
- Include explanation text for each sub-point where applicable
- Do not add any asterisk symbol anywhere in the entire HTML
- Do not include title "Required Skills & Experience" and description just start with points
- Include proper spacing classes between list,etc.


Card 3: Defining Success & Measuring Impact

    Title: Defining Success & Measuring Impact

    Summary: Analysis of how performance will be measured and the expected tangible outcomes of the role, based on explicit and inferred JD points.

    htmlContent:

        - Begin the content directly with a <div> (no <html>, <head>, etc.)
- Wrap the card in a max-width container with padding, rounded corners, and soft shadows
- Use section headers (e.g., “Explicitly Stated Success Metrics / KPIs”) as bold, readable titles
- Render summary as a short paragraph below the card title
- Format sub-points as bullet lists or concise paragraphs, styled with good spacing and readability
- Insert horizontal dividers (<hr>) between sections
- Maintain a minimal, neutral color scheme with Tailwind classes for text, background, spacing, and layout
- Use whitespace, padding, and font-weight to create a clear hierarchy
- Do not add any asterisk symbols anywhere
- Do not include title "Defining Success & Measuring Impact" and description just start with points
- Include proper spacing classes between list,etc.


Card 4: Team, Collaboration & Reporting Structure

    Title: Team, Collaboration & Reporting Structure

    Summary: Analysis of the organizational context, including reporting lines, key partners, and the expected style and challenges of collaboration.

    htmlContent:
    - Start directly with a <div> tag (do not include <html>, <head>, etc.)
- Wrap everything inside a container with padding, rounded corners, and soft shadows
- Use well-structured headings for card title and section titles
- Display the summary as a short paragraph under the card title
- Present sub-points as clearly formatted text or bullet points
- Insert <hr> elements between main sections for separation
- Use neutral, readable typography with good spacing and layout
- Follow a professional style similar to Clerk UI (spaced layout, minimalist design, soft shadows)
- Avoid any use of asterisk symbols
- Do not include title "Team, Collaboration & Reporting Structure" and description just start with points
- Include proper spacing classes between list,etc.


Card 5: Strategic Context & Role Significance

    Title: Strategic Context & Role Significance

    Summary: Places the role within the broader company and product strategy, interpreting why this position is important now and its potential impact.

    htmlContent:

        - Begin the HTML directly with a <div> tag (no <html>, <head>, etc.)
- Use a card-style container with padding, rounded corners, shadows, and max width
- The title should be prominent with large, bold font
- Display the summary (if any) or introductory sentence using muted text under the title
- For each main point:
  - Use a clear subheading (e.g., “The Company's Need for this Role”)
  - Present sub-points as paragraphs or bullet points with soft text color
- Use <hr> to separate main points
- Follow professional UI/UX principles like good whitespace, text hierarchy, and spacing
- Make everything visually clean, responsive, and styled like Clerk UI
- Do not include any asterisk symbols anywhere in the HTML
- Do not include title "Strategic Context & Role Significance" and description just start with points
- Include proper spacing classes between list,etc.


Card 6: Key Themes & Interview Angles

    Title: Key Themes & Interview Angles

    Summary: Synthesizes overarching themes from the JD and suggests areas to focus on during interview preparation and discussion.

    htmlContent:
    - Start the content directly with a <div> (no <html> or <head>)
- Use a card-style layout with appropriate padding, spacing, and rounded corners
- Include a bold, clear card title and a paragraph summary at the top
- For each main point:
  - Use a subheading with distinct font size and color
  - Display sub-points as readable paragraphs or lists
- Insert horizontal <hr> elements to visually separate each main section
- Maintain a soft color palette, readable font, good whitespace, and balanced spacing — like Clerk UI
- The layout should be fully responsive and clean without visual clutter
- Do not use any asterisk symbol anywhere
- Do not include title "Key Themes & Interview Angles" and description just start with points
- Include proper spacing classes between list,etc.

----
in each sub module the completed must be 0 only

---
    ----
    Give me response in this JSON format only and do not add any asterisk symbol in subPoints:
    {
    "quickSummary": "Very long information description that summarizes all of these cards or sub modules",
    "subModules": [
        {
        "title": "Core Role & Responsibilities",
"completed":0,
        "summary": "This module dissects the job description to pinpoint the fundamental purpose of the role, the primary responsibilities, and the specific activities a successful candidate will undertake. It provides a foundational understanding of the day-to-day expectations and strategic impact of the position.",
        "content": "Gain a deep understanding of the role's core mission and the underlying need it addresses within the organization. This section outlines the key responsibility areas, highlighting the specific product management activities, and identifies areas of particular emphasis or complexity as indicated in the job description.",
        "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Primary Mission / Underlying Need</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Responsibility Areas & PM Activities</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Areas of Specific Emphasis or Complexity</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>some main title</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>some main title</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>some main title</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
        },
        {
        "title": "Required Skills & Experience",
"completed":0,
        "summary": "This module deciphers the essential and preferred qualifications from the job description, providing a clear understanding of the technical, soft, and experiential skills required for success. It clarifies the relevance of each requirement to the demands of the role.",
        "content": "Explore the critical blend of essential hard skills and technical requirements necessary for this role, alongside the crucial soft skills and attributes that enable effective collaboration and leadership. This section also outlines the required experience level and specific domain knowledge, concluding with an overview of preferred or standout qualifications that can set a candidate apart.",
        "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Essential Hard Skills / Technical Requirements</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Critical Soft Skills & Attributes</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Required Experience Level & Domain</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Preferred / Standout Qualifications</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
        },
        {
        "title": "Defining Success & Measuring Impact",
"completed":0,
        "summary": "This module analyzes how success in the role is defined, detailing both explicit metrics and implied indicators of performance. It also explains the expected business and product impact, providing a clear picture of how contributions will be measured and valued within the organization.",
        "content": "Understand the key performance indicators and explicitly stated success metrics that will define achievement in this role. Discover the implied success indicators and the expected business or product impact derived from the job description. This section also offers guidance on how to connect your past achievements to these success criteria for interview examples.",
        "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Explicitly Stated Success Metrics / KPIs</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Implied Success Indicators</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Expected Business / Product Impact</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Connecting Success to Interview Examples</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
        },
        {
        "title": "Team, Collaboration & Reporting Structure",
"completed":0,
        "summary": "This module offers an in-depth look at the role's organizational context, including its reporting lines, key internal and external collaborators, and the anticipated collaboration style. It also highlights potential challenges to effective teamwork, providing a holistic view of the social and structural dynamics of the position.",
        "content": "Understand where this role fits within the organizational hierarchy by examining its reporting structure. Identify key internal collaborators and stakeholders you'll work closely with, as well as crucial external relationships. This section also sheds light on the implied collaboration style and potential challenges, preparing you for the interpersonal dynamics of the role.",
        "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Reporting Structure</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key Internal Collaborators / Stakeholders</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Key External Collaborators / Relationships</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Implied Collaboration Style & Potential Challenges</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
        },
        {
        "title": "Strategic Context & Role Significance",
"completed":0,
        "summary": "This module positions the role within the broader strategic landscape of the company and its product portfolio. It clarifies the organization's current need for this specific role, how it contributes to overarching company and product strategies, and the potential impact a successful candidate can have.",
        "content": "Discover the strategic importance of this role by understanding the company's current need and how this position contributes to the broader product and company strategy. Explore potential strategic challenges or opportunities the role might face, and assess the level of autonomy and influence you can expect to have within the organization.",
        "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>The Company's Need for this Role</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Contribution to Broader Product / Company Strategy</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Potential Strategic Challenges or Opportunities</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Role Autonomy and Influence Level</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
        },
          {
        "title": "Key Themes & Interview Angles",
"completed":0,
        "summary": "This module distills the job description into overarching themes and suggests specific angles for interview preparation. It highlights areas likely to be deeply probed during interviews and provides guidance on how to effectively align your experience and formulate insightful questions to ask the interviewer.",
        "content": "Identify the overarching themes and priorities embedded within the job description, guiding your overall interview strategy. This section pinpoints areas likely to be deeply probed by interviewers and offers actionable advice on how to effectively align your experience with the role's requirements. Finally, it suggests insightful questions to ask, demonstrating your engagement and understanding.",
        "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Overarching Themes & Priorities</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Areas Likely to be Deeply Probed</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>How to Align Your Experience</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Insightful Questions to Ask</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div"
        }
    ]
    }

    `,
  };
};

export const resumeExperienceToStandOut = (data) => {
  return {
    name: "Resume Experience To StandOut",
    prompt: `Analyse this entire ${data}
    ----
# Resume Experience You Can Highlight to Stand Out — Module 4

**Updated Plain Text Breakdown (Module 4: Resume Alignment & Differentiators - 3 Cards):**

**Module Title:** Resume Experience You Can Highlight to Stand Out

Quick Summary Instructions:

    Generate a concise (3–4 sentence) overview.
    Clearly state this is based on the comparison between Resume and JD.
    Synthesize where the candidate is strongest, where alignment is partial or missing, and which achievements should be emphasized to differentiate.

---

Card 1: Key Strengths & Alignment

    Title: Key Strengths & Alignment

    Summary: Pinpoints where the resume aligns directly with the JD, surfacing the most relevant strengths and how they map to the job expectations.

    htmlContent:
    - Begin directly with a <div> tag (no <html>, <head>, etc.)
- Wrap everything in a padded, clean container with rounded corners and modern layout
- Use readable fonts and logical structure with good spacing
- Use Tailwind classes for layout, spacing, text, and visual grouping
- Use headings for each major theme (e.g., “Highly Relevant Technical Skills”)
- Present sub-points as bullet lists or short paragraphs
- Use <hr> between key groupings
- Do not include the card title or summary in the HTML output
- Do not use any asterisk symbol anywhere
- Include proper spacing classes between list, sections, etc.

---

Card 2: Potential Gaps & How to Address

    Title: Potential Gaps & How to Address

    Summary: Identifies where the resume may fall short of JD expectations, and gives framing strategies to bridge these during interviews.

    htmlContent:
    - Start directly with a <div> tag (no <html>, <head>, etc.)
- Use soft, professional visual styling: padding, shadows, neutral color palette, readable text
- Headings for each type of gap or concern
- Under each heading, list action-oriented advice or framing strategies as bullets or paragraphs
- Ensure spacing between sections using Tailwind classes
- Use <hr> between each main section
- Do not include title or description in the HTML output
- Do not use any asterisk symbols
- Maintain modern layout structure (Clerk UI–like)

---

Card 3: Standout Experiences to Highlight

    Title: Standout Experiences to Highlight

    Summary: Identifies 2–4 specific accomplishments from your resume that are particularly impactful for this role, with guidance on how to frame them during interviews.

    htmlContent:
    - Begin directly with a <div> tag (no <html>, <head>, etc.)
- Wrap in a card-style layout with padding, rounded corners, good spacing
- Use bold subheadings for each experience or grouping
- Under each, list supporting points, explanations, or talking points
- Use Tailwind utility classes for structure and readability
- Insert <hr> tags between major sections
- Avoid visual clutter and maintain whitespace
- Do not include card title or summary in HTML
- No asterisk symbols anywhere
- Include proper spacing between sections

----

In each sub module the completed must be 0 only

----
Give me response in this JSON format only and do not add any asterisk symbol in subPoints:
{
"quickSummary": "Very long information description that summarizes all of these cards or sub modules",
"subModules": [
    {
    "title": "Key Strengths & Alignment",
    "completed": 0,
    "summary": "This module pinpoints the direct alignments between your resume and the job description, highlighting your most relevant strengths. It showcases how your experience, skills, and knowledge directly map to the role's expectations, providing a solid foundation for your candidacy.",
    "content": "Identify highly relevant technical skills that match the JD, showcase your business and domain knowledge fit, and detail experience that aligns perfectly with the scope of the role. Emphasize your readiness for team collaboration, highlight communication or leadership strengths, and reveal any unique background or edge that makes you stand out.",
    "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Highly Relevant Technical Skills</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Business/Domain Knowledge Fit</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Experience That Matches Scope</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Team/Collaboration Readiness</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Communication or Leadership Strengths</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Unique Background or Edge</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
    },
    {
    "title": "Potential Gaps & How to Address",
    "completed": 0,
    "summary": "This module identifies potential areas where your resume might not fully meet the job description's expectations. It also provides strategic advice and framing techniques to effectively address these gaps during interviews, turning potential weaknesses into opportunities for discussion.",
    "content": "Recognize missing specific tool or technology experience, address shorter durations in similar roles, and acknowledge limited exposure to certain business models. Crucially, learn effective ways to frame your transferable skills and experiences to bridge any perceived gaps during your interview.",
    "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Missing Specific Tool/Technology Experience</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Shorter Duration in Similar Roles</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Limited Exposure to Certain Business Models</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Ways to Frame Transferable Skills</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
    },
    {
    "title": "Standout Experiences to Highlight",
    "completed": 0,
    "summary": "This module identifies your most impactful accomplishments from your resume that resonate strongly with the job's requirements. It provides guidance on how to effectively frame these experiences during interviews, ensuring they demonstrate your unique value and differentiate you from other candidates.",
    "content": "Pinpoint specific projects or initiatives that showcase your capabilities, such as Project/Initiative 1 and Project/Initiative 2, detailing their context and your contributions. Additionally, identify impactful experience 3 that demonstrates your unique value, and articulate your unique contribution or edge that sets you apart from other candidates.",
    "htmlContent":"<div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Project/Initiative 1 (Title/Context)</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Project/Initiative 2 (Title/Context)</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Impactful Experience 3 (Title/Context)</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
  <hr class='my-4 border-gray-200'>
  <h3 class='text-lg font-semibold mb-2 text-gray-900'>Unique Contribution or Edge</h3>
  <p class='text-gray-600 mb-2'>information description 1</p>
  <p class='text-gray-600'>information description 2</p>
</div>"
    }
]}`,
  };
};

export const recruiterScreenPreperation = (data) => {
  return {
    name: "Recruiter Screen Preperation",
    prompt: `Analyse this entire ${data}
    ----
Act as an expert career coach specializing in early-stage interview 
preparation. Analyze the provided Job Description (JD) and typical 
recruiter screen objectives to generate a comprehensive guide for the
candidate's first call with a recruiter.

This guide includes 4 modules designed to ensure the candidate is 
well-prepared, confident, and aligned with the expectations set forth 
by the JD. The insights are tailored using the JD as the primary source 
of truth and only use the Resume (if available) for crafting the introduction pitch.

----
Give me response in this JSON format only and do not include asterisk symbols in subPoints:

{
"quickSummary": "This module equips candidates with a recruiter-specific prep strategy based on the JD provided. It outlines expected recruiter screening goals, provides quick facts, helps shape a tailored self-introduction, anticipates common recruiter questions, and suggests thoughtful questions the candidate should ask. All content is structured to boost candidate clarity, confidence, and conversational readiness in early-stage calls.",
"subModules": [
    {
    "title": "Call Rubric & Quick Facts",
    "completed": 0,
    "summary": "This card describes the purpose and structure of the recruiter screen, offering a clear view of how the candidate will be evaluated. It summarizes what recruiters typically look for, and extracts JD-specific logistics like salary and location when available.",
    "content": "A comprehensive breakdown of call goals, key fit checks, and recruiter-facing evaluation themes.",
    "htmlContent":"\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>Purpose of the Recruiter Screen</h2>
  <p class='text-gray-700'>To assess a candidate's overall fit for the role based on their qualifications, communication skills, enthusiasm for the position, and logistical alignment with job requirements. This initial call helps recruiters determine if the candidate should move forward in the interview process.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Key Evaluation Areas</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Relevance of Experience:</span> Does the candidate's professional background align with the core responsibilities and requirements outlined in the JD?</li>
    <li><span class='font-medium'>Communication Skills:</span> Can the candidate articulate their experiences and thoughts clearly and concisely?</li>
    <li><span class='font-medium'>Interest and Enthusiasm:</span> Is the candidate genuinely interested in this specific role and the company, demonstrating that they have researched both?</li>
    <li><span class='font-medium'>Logistical Alignment:</span> Are salary expectations, location preferences, and availability in line with what the role offers?</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Salary Information from JD</h2>
  <p class='text-gray-700'>Salary information was not explicitly provided in the Job Description. Candidates should be prepared to discuss their salary expectations based on market research for similar roles.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Location & Remote Status from JD</h2>
  <p class='text-gray-700'>The Job Description did not clearly specify the exact location or remote work status for this role. It's important to clarify this with the recruiter during the call.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Other Logistical Details</h2>
  <p class='text-gray-700'>No specific logistical or compliance constraints, such as required travel percentage, specific work hours, or security clearances, were mentioned in the Job Description. Candidates should be prepared to address any standard logistical questions.</p>
</div>"
    }},
    {
    "title": "Craft Your Introduction",
    "completed": 0,
    "summary": "This card provides a structured yet flexible framework for the candidate to deliver a concise and compelling self-introduction. It guides them in connecting their past experiences and present skills with the expectations outlined in the Job Description, ensuring their pitch resonates with the recruiter’s objectives.",
    "content": "This card empowers the candidate to deliver a confident 'Tell me about yourself' answer using the Past-Present-Future model, ensuring it's tailored to the specific role and company, making an immediate positive impression.",
    "htmlContent":"\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>Strategy for Tailoring Your Pitch</h2>
  <p class='text-gray-700'>
    Employ the <span class='font-medium'>Past-Present-Future</span> framework to structure your introduction, ensuring it’s concise, relevant, and compelling. Start with your journey, explain your current role and key contributions, and conclude by connecting your aspirations to this specific opportunity. Integrate themes, skills, and values emphasized in the Job Description.
  </p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Key Elements to Highlight (Based on JD & Resume)</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Relevant Experience:</span> Showcase projects or roles where you managed responsibilities directly aligned with the job’s scope (e.g., product launch, feature development, market analysis).</li>
    <li><span class='font-medium'>Specific Skills and Tools:</span> Highlight any technical skills, software proficiency, or methodologies explicitly mentioned in the JD (e.g., agile methodologies, data analytics tools, specific programming languages).</li>
    <li><span class='font-medium'>Impactful Outcomes:</span> Quantify your achievements where possible (e.g., 'increased user engagement by X%', 'reduced operational costs by Y%').</li>
    <li><span class='font-medium'>Collaboration and Leadership:</span> If the JD emphasizes teamwork, cross-functional collaboration, or leadership, provide examples that demonstrate these capabilities.</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Connecting Your Experience to the Role</h2>
  <p class='text-gray-700'>
    Actively use keywords and phrases from the Job Description when describing your past experiences. For instance, if the JD emphasizes 'cross-functional collaboration,' explicitly state how you've 'successfully collaborated cross-functionally' in previous roles. This demonstrates direct alignment and attention to detail.
  </p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Practice and Timing</h2>
  <p class='text-gray-700'>
    Keep your introduction to an ideal length of <span class='font-medium'>2-3 minutes</span>. Rehearse it multiple times to ensure clarity, conciseness, and a confident, natural delivery. Practice in front of a mirror or record yourself to refine your pacing and tone.
  </p>
</div>"
    }},
    {
    "title": "Insightful Questions to Ask",
    "completed": 0,
    "summary": "This card offers a curated list of insightful questions for the candidate to ask the recruiter. These questions are designed to demonstrate genuine interest, strategic thinking, and a proactive approach, while also helping the candidate gather crucial information about the role, team, and company culture.",
    "content": "This module prepares the candidate with a set of smart, strategic questions to ask the recruiter, categorized for ease of access and designed to elicit valuable information while showcasing the candidate's preparation and critical thinking.",
    "htmlContent":"\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>Questions About the Role & Team</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Immediate Priorities:</span> 'What would be the top 2-3 immediate priorities for someone stepping into this role in the first 3-6 months?' This helps understand initial focus and expectations.</li>
    <li><span class='font-medium'>Team Dynamics:</span> 'Could you tell me a bit more about the team this role sits within? How large is it, and what are its key functions?' This provides context on collaboration and structure.</li>
    <li><span class='font-medium'>Success Measurement:</span> 'How is success typically measured for someone in this position within the first year?' This clarifies performance benchmarks.</li>
    <li><span class='font-medium'>Growth Opportunities:</span> 'What are the potential career growth or development opportunities associated with this role?' This indicates long-term potential.</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Questions About the Interview Process</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Next Steps:</span> 'What does the remainder of the interview process look like, and what can I expect in terms of timelines?' This sets expectations for the candidate.</li>
    <li><span class='font-medium'>Role Fill Timeline:</span> 'Are you looking to fill this role by a specific date, or is the timeline more flexible?' This provides insight into urgency.</li>
    <li><span class='font-medium'>Key Stakeholders:</span> 'Who are the key individuals I would be meeting in subsequent rounds, and what are their roles?' This helps the candidate prepare for future interviews.</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Questions About Culture and Team Environment</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Company Culture:</span> 'How would you describe the overall culture at [Company Name], particularly within the team for this role?' This helps assess cultural fit.</li>
    <li><span class='font-medium'>Success Traits:</span> 'In your experience, what are some common traits or qualities you've observed in individuals who thrive in this company/team environment?' This offers insights into desired characteristics.</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Clarifying JD Details</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Specific Responsibility Clarification:</span> 'In the Job Description, it mentions "strategic impact on product roadmap." Could you elaborate on what that typically entails for this role?' This demonstrates attention to detail in the JD.</li>
    <li><span class='font-medium'>Technology/Tool Usage:</span> 'The JD lists [specific technology/tool]. Can you describe how frequently this tool is used, or its significance to daily tasks?' This helps understand practical application.</li>
  </ul>
</div>"
    }}
]
}`,
  };
};

export const favouriteProductQuestion = (data) => {
  return {
    name: "Favourite Product Question",
    prompt: `Analyse this entire ${data}
  ----
This module helps you confidently answer one of the most common product management interview questions — “What’s your favorite product and how would you improve it?” It breaks down interviewer intent, question types, and gives a powerful 5-step framework to structure your response with depth and clarity.

----
Give me response in this JSON format only and do not include any asterisk symbols in htmlContent:

{
"quickSummary": "This guide offers structured preparation to tackle the popular 'Favorite Product' interview question. It explains the reasoning behind the question, what follow-ups to expect, how to select a meaningful product, and how to suggest intelligent improvements. The second card introduces a 5-step framework to organize your answer clearly, show empathy for users, and demonstrate product thinking in action.",
"subModules": [
    {
    "title": "What’s Your Favorite Product?",
    "completed": 0,
    "summary": "This section delves into the 'Favorite Product' interview question, explaining the interviewer's motivations and various question formats. It offers practical advice on selecting a compelling product and framing insightful improvements, ensuring a well-rounded and impactful response.",
    "content": "This module helps demystify a common interview favorite, offering techniques to build a high-impact response grounded in personal insight and structured thinking.",
    "htmlContent":"\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>Why Do Interviewers Ask This?</h2>
  <p class='text-gray-700'>Interviewers use this question as a low-pressure entry point to assess several key product management skills. They want to evaluate your product thinking abilities, your capacity for user empathy, and the clarity of your communication. It also provides insight into how you analyze product tradeoffs and the types of products you personally engage with and appreciate.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>What to Expect</h2>
  <p class='text-gray-700'>This question is typically asked early in product management interviews, often as an icebreaker. Expect it to lead into a 5–10 minute casual conversation. Common follow-up questions include “How would you improve it?” or “How would you measure the success of your proposed improvements?”</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Common Variants</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Company-Specific:</span> “What’s your favorite Google product (or a product from our competitor)?”</li>
    <li><span class='font-medium'>Negative Framing:</span> “What’s a product you hate that others love, and why?”</li>
    <li><span class='font-medium'>Future-Oriented:</span> “What’s a product with untapped potential, and how would you unlock it?”</li>
    <li><span class='font-medium'>Alternative:</span> “Tell me about a product that has profoundly impacted your daily life.”</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>How to Choose a Good Product</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Genuine Interest:</span> Pick something you genuinely care about and have formed strong opinions on. Your passion will shine through.</li>
    <li><span class='font-medium'>Complexity & Nuance:</span> Choose products that have meaningful pros and cons, allowing you to discuss trade-offs and design decisions.</li>
    <li><span class='font-medium'>Avoid Direct Competitors:</span> Steer clear of products that are direct competitors of the interviewing company, unless you can offer a highly diplomatic and constructive critique.</li>
    <li><span class='font-medium'>Depth over Simplicity:</span> Avoid overly simple or trivial products that don't allow for in-depth product analysis or improvement suggestions.</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Example Product Improvement</h2>
  <p class='text-gray-700'>“One specific area I’d focus on for Notion is enhancing its search experience. While functional, it could be greatly improved by introducing a lightweight, intelligent tagging system. This system would dynamically group and surface related content based on tags, making it significantly easier for users to synthesize information and quickly find what they need across their vast workspaces.”</p>
</div>"
    },
    {
    "title": "5 Steps Framework",
    "completed": 0,
    "summary": "This section presents a robust 5-step framework for structuring your 'Favorite Product' answer. It guides you from selecting the right product to defining its users, identifying pain points, and proposing thoughtful improvements, all while demonstrating product empathy and user-centric thinking.",
    "content": "This framework ensures your response includes product empathy, user-centric thinking, and actionable improvement ideas, making your answer comprehensive and impressive.",
    "htmlContent":"\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>1. Pick the Right Product</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Prepare a Portfolio:</span> Have 3-4 products ready, ideally a mix of digital (e.g., app, software, website) and at least 1 physical product. This shows versatility.</li>
    <li><span class='font-medium'>Strategic Choices:</span> Avoid products that are either culturally niche (unless you have a compelling, widely understandable reason) or overly common (like Google Search) unless you have a truly unique, insightful take on them.</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>2. Introduce the Product in One Sentence</h2>
  <p class='text-gray-700'>Start with a crisp, clear, and concise description that immediately tells the interviewer what the product does. For example: <span class='font-medium'>“My favorite product is Waze, a navigation app that helps users get to their destination efficiently by leveraging real-time crowd-sourced traffic data.”</span></p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>3. Define Customer Segments & Your Relation</h2>
  <p class='text-gray-700'>Identify 2-4 key user segments for the product. Then, share which segment you personally relate to the most and why. This demonstrates user empathy and personal connection. Example: <span class='font-medium'>“Waze serves daily commuters, long-distance travelers, and professional drivers. As a new parent, I particularly value Waze because it helps me avoid unpredictable traffic, ensuring smoother and less stressful drives with my baby.”</span></p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>4. Explain Pain-Driven Features</h2>
  <p class='text-gray-700'>Describe how the product addresses specific user pain points through its features. Use a clear structure: <span class='font-medium'>Pain → Feature → Outcome.</span> Provide 1-2 examples. Example: <span class='font-medium'>“The pain point is the stress and unpredictability of getting stuck in traffic with kids in the car. Waze’s key feature is its real-time rerouting based on live user reports and traffic conditions. The outcome for me is that I can stay calm, avoid significant delays, and reach my destination faster and more reliably.”</span></p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>5. Suggest Improvements & Justify</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Mission Alignment:</span> Ensure your proposed improvement aligns with the company's overall mission and the product's core value proposition.</li>
    <li><span class='font-medium'>Address Unmet Needs:</span> Focus on an unmet user need or an existing pain point that isn't fully resolved.</li>
    <li><span class='font-medium'>Leverage Technology:</span> Consider how new technologies or existing capabilities could enhance the product.</li>
    <li><span class='font-medium'>Enhance User Journey:</span> Think about improving the end-to-end user experience, perhaps through better integration with other services (e.g., media streaming, calendar syncing).</li>
    <li><span class='font-medium'>Prioritization & Trade-offs:</span> Briefly mention how you'd prioritize this improvement and any potential trade-offs (e.g., engineering effort, impact on other features).</li>
  </ul>
</div>"
    }}
]
}`,
  };
};

export const productDesign = (data) => {
  return {
    name: "Product Design",
    prompt: `Analyse this entire ${data}
  ----
This module helps candidates master product design interview questions. It includes an overview of what to expect, how to think through structured responses, and practice with example questions aligned to a company's domain or industry.

----
Give me response in this JSON format only and ensure do not use any asterisk symbols anywhere:

{
"quickSummary": "This comprehensive module prepares you for product design interview questions. It breaks down how to approach these questions, what interviewers evaluate, and how to elevate your response from good to great. You’ll learn a step-by-step framework including clarifying the prompt, identifying users, understanding their pain points, brainstorming solutions, and defining success metrics. It also provides company-specific sample questions to help you simulate real interviews.",
"subModules": [
    {
    "title": "Overview of Product Design Questions",
    "completed": 0,
    "summary": "This card provides a foundational understanding of product design interviews. It covers expectations, what interviewers assess, sample responses, and a rubric to distinguish between performance levels.",
    "content": "Get familiar with how product design questions work, why they’re asked, and how to recognize the difference between an average and an outstanding answer.",
    "htmlContent": "\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>What to Expect</h2>
  <p class='text-gray-700'>Product design interview questions are typically open-ended and challenge your problem-solving abilities. You can expect prompts such as “Design X for Y” or “Improve Z.” Your responses will be evaluated on your ability to structure your thoughts, demonstrate creativity, and show genuine user empathy. A typical response flow involves: Clarifying the problem -> Defining Users -> Identifying Pain Points -> Brainstorming Solutions -> Defining Success Metrics.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>What Interviewers are Looking For</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium'>Product Sense and Structured Thinking:</span> Your ability to break down complex problems into manageable parts and approach them logically.</li>
    <li><span class='font-medium'>User Empathy and Prioritization:</span> Understanding user needs deeply and prioritizing which problems to solve first based on impact and feasibility.</li>
    <li><span class='font-medium'>Creativity Balanced with Feasibility:</span> Generating innovative ideas while considering technical, business, and operational constraints.</li>
    <li><span class='font-medium'>Strong Communication and Decision Rationale:</span> Clearly articulating your thought process, assumptions, and the reasoning behind your choices.</li>
  </ul>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Sample Answers: Good vs. Great</h2>
  <p class='text-gray-700'>A <span class='font-medium'>“Good”</span> answer will typically follow a basic framework, outlining users and solutions, but may lack depth in insight or justification for prioritization. It might address the prompt but without significant innovation or deep user understanding. A <span class='font-medium'>“Great”</span> answer, however, uses a robust framework, thoroughly prioritizes pain points with clear rationale, explains trade-offs thoughtfully, and demonstrates a profound understanding of user needs, business goals, and technical considerations. It also includes clear success metrics.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Why do companies ask Product Design questions</h2>
  <p class='text-gray-700'>These questions are designed to simulate real-world product challenges and assess how you perform under pressure. They reveal your capacity to define problems, empathize with different user segments, ideate creative and practical solutions, and consider the feasibility and measurable success of your proposals. It helps interviewers understand your end-to-end product thinking process.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>Evaluation Rubric</h2>
  <p class='text-gray-700'>Interviewers typically evaluate your answer across several dimensions: your ability to frame the problem, the logical structure of your response, the creativity of your solutions, the clarity of your communication, and how well your proposed solutions align with user needs and business objectives. Performance levels might range from <span class='font-medium'>Poor</span> (disorganized, lacks user focus), to <span class='font-medium'>Good</span> (structured but generic), to <span class='font-medium'>Great</span> (insightful, well-prioritized, practical, and clearly communicated with strong rationale).</p>
</div>"
    },
    {
    "title": "How to Answer Product Design Questions",
    "completed": 0,
    "summary": "This card details a comprehensive, step-by-step framework for answering product design questions. It guides you from clarifying the initial prompt to defining success metrics, ensuring your responses are user-centered, well-reasoned, and clearly articulated.",
    "content": "Learn the full structure to solve product design questions, starting with clarifying the context and ending with success metrics.",
    "htmlContent": "\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>1. Clarify and Get Context</h2>
  <p class='text-gray-700'>Before diving into solutions, ask clarifying questions to ensure you and the interviewer are on the same page. Key questions include: 'Who are we solving for specifically?', 'What is the primary goal of this design challenge?', 'Are there any specific constraints (e.g., budget, time, technology)?', 'Is this intended for a mobile app, web platform, or another medium?' Clarifying upfront helps align your solution with the interviewer's expectations and demonstrates thoughtful problem-solving.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>2. Mission/Vision Alignment</h2>
  <p class='text-gray-700'>If the question pertains to a known company, tie your proposed solution back to its overarching mission and vision. This shows you understand the company's strategic direction. If it's a hypothetical scenario or an unknown company, state your assumptions about its mission clearly. For example, 'I will assume the mission is to connect people through shared experiences.' This establishes a guiding principle for your design.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>3. Define Personas (User Groups)</h2>
  <p class='text-gray-700'>Identify 2-4 distinct user types who would interact with your product. For each persona, consider their goals, motivations, behaviors, and pain points. Prioritize these personas based on factors like their need intensity, frequency of use, or alignment with overall business goals. For example: 'For a trail-finding app, our primary personas might be: avid hikers seeking challenging routes, casual walkers looking for scenic strolls, and tourists interested in local landmarks.'</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>4. User Journey</h2>
  <p class='text-gray-700'>Map out the typical user's flow through the product, from their initial interaction to achieving their goal. This helps identify key touchpoints and potential areas of friction. For example, for an e-commerce platform, the user journey might be: Search -> Filter -> View Product Details -> Add to Cart -> Checkout -> Receive Order -> Review Product.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>5. Identify User Pain Points and Opportunities</h2>
  <p class='text-gray-700'>Based on your user journey, pinpoint specific points of friction, unmet needs, or frustrations that users might experience. These are your pain points, which represent opportunities for improvement or new features. Focus on the high-impact problems that, if solved, would significantly improve the user experience or align with business objectives. For instance, 'Users struggle with inaccurate filters leading to irrelevant search results,' or 'There's no easy way to save favorite items for later.'</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>6. Brainstorm Possible Solutions</h2>
  <p class='text-gray-700'>Once pain points are clear, brainstorm a range of potential solutions. Don't limit yourself initially; think broadly from simple tweaks to innovative new features. After brainstorming, evaluate each idea for its feasibility (technical, resource, time), alignment with the product's mission, and potential measurable impact on users and business. This often involves discussing trade-offs.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>7. Define a Product Vision</h2>
  <p class='text-gray-700'>Before prioritizing specific features, articulate a concise product vision or a 'north star' statement. This summarizes the overarching goal of your proposed design. Example: 'Our product vision is to create a mobile-first trail finder that empowers users of all experience levels to easily discover and navigate personalized hiking routes, fostering a community through social recommendations.'</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>8. Prioritize Features</h2>
  <p class='text-gray-700'>Given your brainstormed solutions, prioritize which features to build first, especially for an Minimum Viable Product (MVP). Use common frameworks like RICE (Reach, Impact, Confidence, Effort) or MoSCoW (Must have, Should have, Could have, Won't have for now). Select features that deliver significant value quickly, address critical pain points, and allow for learning and iteration. Clearly explain your prioritization rationale.</p>
  <hr class='my-4 border-gray-200'>

  <h2 class='text-xl font-semibold text-gray-900'>9. Success Metrics</h2>
  <p class='text-gray-700'>Define how you will measure the success of your proposed design. Choose relevant metrics that align with your product vision and address the pain points you aimed to solve. Consider a mix of quantitative (e.g., engagement rate, retention rate, task completion rate, conversion rate) and qualitative (e.g., Net Promoter Score (NPS), user feedback) metrics. Differentiate between initial MVP success metrics and long-term full rollout metrics.</p>
</div>"
    },
    {
    "title": "Sample product design question for [company]",
    "completed": 0,
    "summary": "This section generates company-specific product design questions, leveraging the provided job role and product domain. This helps you tailor your practice to scenarios directly relevant to the company you're interviewing with.",
    "content": "This card helps simulate questions aligned to the company and industry you’re targeting. Tailor your prep based on actual user groups and business context.",
    "htmlContent": "\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>Sample Product Design Question for [Company]</h2>
  <p class='text-gray-700'>“Imagine [Company] is looking to enhance its B2B SaaS platform for project management. Design a new feature or significant improvement that helps team leads better manage cross-functional dependencies and potential bottlenecks in large-scale projects.”</p>

  <h2 class='text-xl font-semibold text-gray-900'>What This Tests</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium text-gray-900'>User Empathy:</span> Your ability to understand the complex needs and pain points of team leads and project managers in a B2B context.</li>
    <li><span class='font-medium text-gray-900'>System Thinking:</span> How you balance various factors like project complexity, team communication, and reporting within a SaaS platform.</li>
    <li><span class='font-medium text-gray-900'>Problem Solving:</span> Your approach to identifying and addressing critical pain points related to project dependencies and bottlenecks.</li>
    <li><span class='font-medium text-gray-900'>Definition of Success:</span> How you would define and measure the success of such a feature, considering both user adoption and business impact (e.g., project completion rates, efficiency gains).</li>
  </ul>
</div>"
    },
    {
    "title": "Sample product design question for [industry]",
    "completed": 0,
    "summary": "This section focuses on creating industry-aligned design prompts. It tests your ability to apply general product design knowledge in specific industry contexts, relevant to your job goals and target customer needs.",
    "content": "Great for practicing industry-specific scenarios like edtech, fintech, healthtech, etc., aligned with job goals and customer needs.",
    "htmlContent": "\
    <div class='p-4 rounded-xl  space-y-6 bg-white text-gray-800'>
  <h2 class='text-xl font-semibold text-gray-900'>Industry-Aligned Design Prompt: Healthtech</h2>
  <p class='text-gray-700'>“Design a digital solution (e.g., a mobile app feature or a standalone platform) to help elderly patients, who may have limited digital literacy, consistently track their medications and dosage compliance at home, especially in areas with limited internet connectivity.”</p>

  <h2 class='text-xl font-semibold text-gray-900'>Why This Is Relevant</h2>
  <ul class='list-none space-y-2 text-gray-700'>
    <li><span class='font-medium text-gray-900'>User Segmentation and Prioritization:</span> This requires you to carefully consider the specific needs of elderly users and prioritize features for ease of use and accessibility.</li>
    <li><span class='font-medium text-gray-900'>Creativity Under Constraints:</span> It tests your ability to innovate solutions while working within significant constraints like low digital literacy and intermittent connectivity.</li>
    <li><span class='font-medium text-gray-900'>Demands Practical Definition of Success and Trade-offs:</span> You'll need to define what success looks like for medication adherence and discuss the trade-offs involved in designing for accessibility and reliability in challenging environments.</li>
    <li><span class='font-medium text-gray-900'>Ethical Considerations:</span> It implicitly touches on the importance of privacy and data security in health-related applications.</li>
  </ul>
</div>"
    }
]
}`,
  };
};

export const behavioralAndLeadership = (data) => {
  return {
    name: "Behavioral and Leadership",
    prompt: `Analyse this entire ${data}
  ----
This module helps candidates master behavioral and leadership interview questions. It includes an overview of how to align your personal stories with company culture, the SPSIL framework for structuring responses, practical rehearsal techniques, and deep dives into core leadership principles.

----
Give me response in this JSON format only and ensure do not use any asterisk symbols anywhere:

{
  "quickSummary": "This guide helps candidates prepare for behavioral interviews by aligning leadership examples to the company's culture and values. It introduces the SPSIL story format, gives practical rehearsal techniques, and dives into core leadership principles like Ownership, Customer Obsession, and Delivering Results with deep questions to reflect on.",
  "subModules": [
    {
      "title": "Understand the Company Culture",
      "completed": 0,
      "summary": "Leadership isn't one-size-fits-all. The leadership that thrives at Amazon (structured, narrative-driven) is different from the leadership that thrives at Meta (fast, bottom-up). This interview is your chance to prove you are the right kind of leader for them. Your goal is to align your personal story with their company values.",
      "content": "Learn how to research a company's leadership principles and decision-making processes to tailor your behavioral stories, ensuring they resonate with the interviewer's framework for success. Understand the difference between leadership styles at various companies to better align your narrative.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900'>How to Decode Their Culture</h2>\\
  <ol class='list-decimal pl-6 space-y-2 text-gray-700'>\\
  <li><span class='font-medium'>Research Their Principles:</span> Go beyond the mission statement. Read their leadership principles (like Amazon's 14 LPs) or engineering blogs. What behaviors do they explicitly celebrate? Is it 'Bias for Action' or 'Think Big'?</li>\\
  <li><span class='font-medium'>Understand PM Influence:</span> How do decisions <i>actually</i> get made? Is it through data-driven arguments (Google, Meta), detailed written narratives (Amazon), or strong design-led vision (Apple)?</li>\\
  <li><span class='font-medium'>Align Your Narrative:</span> Intentionally choose stories from your past that reflect their values.</li>\\
  </ol>\\
  <ul class='list-disc pl-6 space-y-2 text-gray-700'>\\
  <li><span class='font-medium'>Interviewing at Meta?</span> Tell the story of the fast, scrappy experiment you launched in two weeks to get data, not the one about the year-long waterfall project.</li>\\
  <li><span class='font-medium'>Interviewing at Amazon?</span> Talk about a time you started with the customer's problem and worked backward, or when you had to dive deep into data to make a tough call.</li>\\
  </ul>\\
  <p class='text-gray-700'>Show them you not only understand their culture but that you've already lived it.</p>\\
</div>"
    },
    {
      "title": "Your Story Bank",
      "completed": 0,
      "summary": "Forget STAR and try using SPSIL for your next behavioral interview. It’s crucial to have a series of stories you have practiced prior to the interview for the most common behavioral interview. This framework will support you to craft a handful of powerful stories that will demonstrate your character, leadership and motivation to your interviewer.",
      "content": "This module introduces the SPSIL framework for crafting compelling behavioral interview stories. Learn how to structure your responses to effectively showcase your character, leadership, and motivation, going beyond basic frameworks with a focus on introspective lessons learned.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900'>SPSIL Framework</h2>\\
  <p class='text-gray-700'>You need 3–5 powerful stories you can adapt to any behavioral question. The SPSIL format is more effective than STAR because there is a \"Lessons\" part that demonstrates introspection and key learnings from your role to show true leadership.</p>\\
  <ul class='list-disc pl-6 space-y-2 text-gray-700'>\\
  <li><span class='font-medium'>S - Situation:</span> One sentence. Minimal context.</li>\\
  <li><span class='font-medium'>P - Problem:</span> The core challenge or conflict.</li>\\
  <li><span class='font-medium'>S - Solution:</span> What you specifically did. Use \"I\" statements.</li>\\
  <li><span class='font-medium'>I - Impact:</span> Quantify the result. Use numbers.</li>\\
  <li><span class='font-medium'>L - Lessons:</span> What you learned about yourself or your process.</li>\\
  </ul>\\
  <h2 class='text-lg font-semibold text-gray-900'>Sample story of leadership & influence</h2>\\
  <p class='text-gray-700'>My team was assigned to build a \"pet project\" from a senior VP. The team was demotivated because the project had no clear user need and would distract from our core goals. I built a simple opportunity cost model showing that the project would delay our main roadmap by 2 months, putting our $5M revenue goal at risk. I presented this data to the VP, acknowledging his idea's potential but framing it against our primary commitments. He agreed to de-prioritize the project, saving the team from months of wasted work and keeping our core goals on track. I learned that the most effective way to influence up is to frame the discussion around shared goals and objective data, not opinions.</p>\\
</div>"
    },
    {
      "title": "Practice Techniques That Actually Work",
      "completed": 0,
      "summary": "There are five main themes of questions you will get asked about during your behavioral interview. The practical tips is here to help you practice delivering your SPSIL stories during the interview.",
      "content": "Discover effective rehearsal techniques to master your SPSIL stories for common behavioral interview themes. Learn to adapt your stories on the fly, identify and eliminate filler words, and simulate interview pressure through peer mock interviews.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900'>Map SPSIL Stories to Common Themes</h2>\\
  <ol class='list-decimal pl-6 space-y-2 text-gray-700'>\\
  <li><span class='font-medium'>Drive & Motivation:</span> Why Product Management? Why this company?</li>\\
  <li><span class='font-medium'>Leading & Managing Conflict:</span> Tell me about a time you disagreed with a stakeholder? How do you handle difficult teammates?</li>\\
  <li><span class='font-medium'>Driving Results:</span> Tell me about a time you had to deliver with limited resources or data.</li>\\
  <li><span class='font-medium'>Growth & Learning:</span> What's a major failure you've had? Tell me about a time you had to learn a new skill quickly.</li>\\
  <li><span class='font-medium'>Cross-Functional Collaboration:</span> How do you align multiple teams? Tell me about a project that involved marketing, sales, and engineering.</li>\\
  </ol>\\
  <h2 class='text-lg font-semibold text-gray-900'>Rehearsal Techniques</h2>\\
  <ul class='list-disc pl-6 space-y-2 text-gray-700'>\\
  <li><span class='font-medium'>Whiteboard / Sticky Notes:</span> Write your core stories (just the SPSIL bullet points) on sticky notes. Have a friend ask you random behavioral questions. Practice grabbing the right story and adapting it on the fly. This builds mental flexibility and stops you from sounding like a robot.</li>\\
  <li><span class='font-medium'>Voice Memo Playback:</span> Record yourself answering a question. Play it back. This is the fastest way to catch filler words (\"um,\" \"like,\" \"you know\"), rambling, and awkward pacing. It's painful but incredibly effective.</li>\\
  <li><span class='font-medium'>Peer Mock Interviews:</span> Find another PM who is also prepping. Use the prompts in this guide and give each other honest, direct feedback. This is the best way to simulate the pressure of a live interview.</li>\\
  <li><span class='font-medium'>The Leadership Grid (Pro Tip):</span> Create a spreadsheet. Make the rows your SPSIL stories. Make the columns the company's leadership principles (e.g., Amazon's LPs). This forces you to map every story to a value, ensuring you're always communicating in a way that resonates with the interviewer's own framework for success.</li>\\
  </ul>\\
</div>"
    },
    {
      "title": "Behavioral Question Scenario",
      "completed": 0,
      "summary": "This section will help you exercise key muscles for your behavioral interview and guide your thinking to choose a solid example. This is very comprehensive so only choose the sections that seem most relevant to the company’s values.",
      "content": "This module provides detailed scenarios and probing questions for key behavioral principles like Customer Obsession and Ownership. It helps you reflect deeply on past experiences to choose strong, relevant examples that align with a company's values, preparing you for comprehensive self-reflection.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900'>Customer Obsession</h2>\\
  <p class='text-gray-700'>Think about a time you put the customer first, even when it wasn’t easy or convenient. This is about working vigorously to earn and keep customer trust.</p>\\
  <p class='text-gray-700'>To help you choose a strong moment, consider these questions:</p>\\
  <ul class='list-disc pl-6 space-y-2 text-gray-700'>\\
  <li>Was this a situation with a single, high-stakes customer, or did your actions impact a broad group of users?</li>\\
  <li>What was the central conflict? Were you balancing the customer's needs against a technical limitation, a business policy, or a tight deadline?</li>\\
  <li>What was the risk if you failed to act? Losing the customer, damaging the brand's reputation, or missing a key opportunity?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'>\\
  <h2 class='text-lg font-semibold text-gray-900'>Ownership</h2>\\
  <p class='text-gray-700'>Recall a time you stepped up and took full ownership, acting on behalf of the entire company, not just your own team. Let's get specific:</p>\\
  <ol class='list-decimal pl-6 space-y-2 text-gray-700'>\\
  <li>Was this a project or task that no one else wanted, or was it something that had been dropped or was failing?</li>\\
  <li>What was the potential negative outcome if you hadn't taken responsibility?</li>\\
  <li>Did you have to make a decision or take a risk without a clear green light from your manager?</li>\\
  </ol>\\
  <hr class='my-6 border-gray-300'>\\
</div>"
    }
  ]
}
`,
  };
};

export const analyticalEstimation = (data) => {
  return {
    name: "Analytical Estimation",
    prompt: `Analyse this entire ${data}
  ----
This module prepares candidates for analytical estimation and execution interview rounds. It covers market sizing, metrics definition, A/B testing design and analysis, and root cause investigation for metric drops. The focus is on demonstrating structured quantitative reasoning and problem-solving with incomplete data.

----
Give me response in this JSON format only and ensure do not use any asterisk symbols anywhere:

{
  "quickSummary": "The analytical estimation round assesses your quantitative reasoning, problem-solving with incomplete data, and structured decision-making. It covers market sizing, metrics, A/B testing, and root cause analysis, focusing on your thought process over the 'right' answer.",
  "subModules": [
    {
      "title": "What Is the Analytical Estimation/Execution Round?",
      "completed": 0,
      "summary": "The analytical estimation or 'execution' round tests your ability to think quantitatively, solve problems with incomplete data, and make structured decisions under pressure. This is where companies assess whether you can handle the data-driven aspects of product management.",
      "content": "Understand the core skills interviewers evaluate in analytical estimation rounds, including structured thinking, quantitative reasoning, and data interpretation. Explore common question types like market sizing, metrics, A/B testing, and root cause analysis, and learn why this round is crucial for modern, data-driven Product Managers.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>What Interviewers Are Testing</h2>\\
  <p class='text-gray-700'><strong>Core Skills Being Evaluated:</strong></p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><span class='font-medium'>Structured thinking</span> - Can you break down complex problems logically?</li>\\
  <li><span class='font-medium'>Quantitative reasoning</span> - Are you comfortable working with numbers and making calculations?</li>\\
  <li><span class='font-medium'>Data interpretation</span> - Can you analyze information and draw meaningful insights?</li>\\
  <li><span class='font-medium'>Business judgment</span> - Do you understand what drives business value?</li>\\
  <li><span class='font-medium'>Clear communication</span> - Can you explain your thinking process clearly?</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Key Point:</strong> Interviewers care more about how you think than getting the \"right\" answer.</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Common Question Types</h2>\\
  <h3 class='text-lg font-semibold text-gray-800'>Market Sizing</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"How many Uber rides happen in NYC daily?\"</li>\\
  <li>\"What's the market size for meal delivery apps?\"</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Metrics & KPIs</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"How would you measure success for Instagram Stories?\"</li>\\
  <li>\"Our engagement is down 15% - how do you investigate?\"</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>A/B Testing</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"Test A has 10% higher conversion but 20% lower revenue per user. What do you do?\"</li>\\
  <li>\"How would you test a new checkout flow?\"</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Business Analysis</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"Should we prioritize the mobile app or desktop feature first?\"</li>\\
  <li>\"If we cut prices 30%, how much must conversions increase to break even?\"</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Root Cause Analysis</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"Daily active users dropped 25% last month. Walk me through your investigation.\"</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Why This Round Matters</h2>\\
  <p class='text-gray-700'>Modern PMs must be data-driven. You'll regularly need to:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Build business cases with quantitative backing</li>\\
  <li>Design and interpret experiments</li>\\
  <li>Define success metrics for features</li>\\
  <li>Make trade-off decisions between competing priorities</li>\\
  <li>Communicate findings to technical and non-technical stakeholders</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Sample Questions with Context</h2>\\
  <h3 class='text-lg font-semibold text-gray-800'>Market Sizing Example:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"Estimate the number of pizza deliveries in Chicago on a Friday night.\"</li>\\
  <li><i>What they're testing:</i> Problem decomposition, reasonable assumptions, mathematical thinking.</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Metrics Example:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"You launch a 'Save for Later' feature on an e-commerce site. What metrics would you track?\"</li>\\
  <li><i>What they're testing:</i> Understanding of user behavior, business impact, leading vs. lagging indicators.</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>A/B Test Example:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"Version B increases sign-ups by 12% but decreases 30-day retention by 5%. Both results are statistically significant. Your recommendation?\"</li>\\
  <li><i>What they're testing:</i> Ability to weigh trade-offs, understand long-term vs. short-term impact, make decisions with competing data.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Quick Tips for Success</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Think out loud</strong> - Share your reasoning process</li>\\
  <li><strong>Ask clarifying questions</strong> - Show you understand the problem scope</li>\\
  <li><strong>Make reasonable assumptions</strong> - State them clearly and explain why</li>\\
  <li><strong>Structure your approach</strong> - Use frameworks to organize your thinking</li>\\
  <li><strong>Check your math</strong> - Do quick sanity checks on your calculations</li>\\
  </ul>\\
  </div>"
    },
    {
      "title": "Estimation & Market Sizing Questions",
      "completed": 0,
      "summary": "Market sizing questions ask you to estimate quantities without any data - like 'How many cups of coffee are sold in NYC daily?' or 'How many people buy glasses in the US each year?' These questions test your ability to break down ambiguous problems and make reasonable assumptions. The interviewer doesn't care about the exact answer - they want to see your structured thinking process.",
      "content": "Master the 5-step framework for market sizing questions, covering clarification, approach selection, decomposition, clear assumptions, and sanity checks. Practice with examples like estimating daily coffee sales in NYC and annual glasses purchases in the US, focusing on structured thinking and reasonable assumptions.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>The 5-Step Framework</h2>\\
  <ol class='list-decimal pl-6 space-y-2 text-gray-700'>\\
  <li>\\
  <p><span class='font-medium'>Clarify the question</span></p>\\
  <p>\"Are we including all of NYC or just Manhattan? Coffee shops only or all coffee sales?\"</p>\\
  </li>\\
  <li>\\
  <p><span class='font-medium'>Choose your approach</span></p>\\
  <ul class='list-disc pl-6 space-y-1'>\\
  <li><strong>Top-down:</strong> Start with population, narrow down</li>\\
  <li><strong>Bottom-up:</strong> Count suppliers/locations, estimate volume</li>\\
  </ul>\\
  </li>\\
  <li>\\
  <p><span class='font-medium'>Break into pieces</span></p>\\
  <p>Don't estimate one huge number. Break it into smaller, manageable chunks.</p>\\
  </li>\\
  <li>\\
  <p><span class='font-medium'>State assumptions clearly</span></p>\\
  <p>\"I'm assuming 70% of people drink coffee and average 2 cups per day\"</p>\\
  </li>\\
  <li>\\
  <p><span class='font-medium'>Sanity check</span></p>\\
  <p>Does your final number make sense? Quick gut check.</p>\\
  </li>\\
  </ol>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Example: \"How many cups of coffee sold in NYC daily?\"</h2>\\
  <p class='text-gray-700'><strong>Clarify:</strong> All five boroughs, all coffee sales</p>\\
  <p class='text-gray-700'><strong>Approach:</strong> Top-down (population-based)</p>\\
  <p class='text-gray-700'><strong>Break it down:</strong></p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>NYC population: 8.5M</li>\\
  <li>Daily commuters: 1.5M</li>\\
  <li>Tourists: 0.2M</li>\\
  <li>Total people in NYC daily: ~10M</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Assumptions:</strong></p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>70% of people drink coffee</li>\\
  <li>Average 2 cups per day</li>\\
  <li>10M × 0.7 × 2 = 14M cups daily</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Sanity check:</strong> 1.4 cups per person seems reasonable</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Example: \"How many people buy glasses in US annually?\"</h2>\\
  <p class='text-gray-700'><strong>Break it down:</strong></p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>US population: 330M</li>\\
  <li>60% wear prescription glasses: 200M</li>\\
  <li>Replace every 2.5 years on average</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Calculate:</strong> 200M ÷ 2.5 = 80M purchases annually</p>\\
  <p class='text-gray-700'><strong>Sanity check:</strong> 1 in 4 Americans buy glasses yearly - makes sense</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Key Tips</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Use round numbers (10M not 9.7M)</li>\\
  <li>Think out loud - show your process</li>\\
  <li>Make reasonable assumptions - don't get stuck on precision</li>\\
  <li>Segment when needed (urban vs rural, age groups)</li>\\
  <li>Always sanity check your final answer</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Common Mistakes</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Overthinking precision</li>\\
  <li>Getting stuck on unknowns</li>\\
  <li>Forgetting to check if answer makes sense</li>\\
  <li>Not stating assumptions clearly</li>\\
  </ul>\\
  </div>"
    },
    {
      "title": "Defining Product Metrics",
      "completed": 0,
      "summary": "Metric definition questions ask you to identify how to measure success for a product or feature. The key is connecting business goals to measurable outcomes. Here is a concrete sample that can help you to structure your responses.",
      "content": "Learn the 'Goals → Leading → Lagging' framework for defining product metrics. Understand how to connect business goals to measurable outcomes, differentiating between early signals and final success indicators. Practice with an example of defining metrics for a video sharing feature.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>Framework: Goals → Leading → Lagging</h2>\\
  <h3 class='text-lg font-semibold text-gray-800'>1. Understand the goal</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>What is this product/feature trying to achieve?</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>2. Define leading indicators</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Early signals that predict success (user behavior, engagement)</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>3. Define lagging indicators</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Final outcomes that prove success (revenue, retention, growth)</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Example: Video Sharing Feature</h2>\\
  <p class='text-gray-700'><strong>Goal:</strong> Increase user engagement and content creation</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Leading metrics:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Video upload rate</li>\\
  <li>Share button clicks</li>\\
  <li>Time spent watching videos</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Lagging metrics:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Monthly active users</li>\\
  <li>User retention (7-day, 30-day)</li>\\
  <li>Revenue per user</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Answer structure:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"I'd track video uploads daily as a leading indicator of content creation, and 30-day retention as a lagging indicator of whether the feature drives long-term engagement.\"</li>\\
  </ul>\\
  </div>"
    },
    {
      "title": "Diagnosing Metric Drops",
      "completed": 0,
      "summary": "One of the analytical questions can pose you to diagnose why certain metrics dropped for a feature or a product. When a key metric drops unexpectedly in a given problem, use the following systematic approach to find the root cause.",
      "content": "Utilize the PUTE framework (Product, User, Technical, External) to systematically diagnose unexpected metric drops. Learn how to segment data, check timing, investigate potential causes, and prioritize your investigation to find the root cause effectively.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>The PUTE Framework</h2>\\
  <p class='text-gray-700'>Think through what recent changes could affect the metrics. Use the following framework as reference to diagnose the problem. Think through the:</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Product changes</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Recent feature launches</li>\\
  <li>A/B tests running</li>\\
  <li>Algorithm changes</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>User behavior change</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Seasonal patterns</li>\\
  <li>Cohort differences</li>\\
  <li>Geographic variations</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Technical issues</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Bugs or outages</li>\\
  <li>Performance problems</li>\\
  <li>Tracking errors</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>External factors</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Competitor actions</li>\\
  <li>Market changes</li>\\
  <li>PR/news events</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>For example if \"DAU dropped 20% overnight\"</h2>\\
  <h3 class='text-lg font-semibold text-gray-800'>Step 1: Segment the data</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Which user groups are affected?</li>\\
  <li>What platforms/regions?</li>\\
  <li>New vs returning users?</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Step 2: Check timing</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>When exactly did it start?</li>\\
  <li>Gradual or sudden drop?</li>\\
  <li>Any releases that day?</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Step 3: Investigate causes</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Product:</strong> \"Did we launch anything new?\"</li>\\
  <li><strong>Technical:</strong> \"Any outages or bugs reported?\"</li>\\
  <li><strong>User behavior:</strong> \"Any changes in usage patterns?\"</li>\\
  <li><strong>External:</strong> \"Any competitor launches or news?\"</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Step 4: Prioritize investigation</h3>\\
  <p class='text-gray-700'>Start with most likely causes based on timing and magnitude. With enough practice, these concepts will become easier and there will be less interview anxiety.</p>\\
  </div>"
    },
    {
      "title": "A/B Test Design & Analysis",
      "completed": 0,
      "summary": "In PM interviews, A/B testing questions test your ability to design experiments and make decisions from data. Keep it simple and business-focused.",
      "content": "Master the 4-step framework for A/B test design (Hypothesis, Setup, Success Metrics, Decision Criteria) and analysis. Learn to formulate clear hypotheses, define primary and guardrail metrics, and interpret results to make sound business judgments.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>4-Step Test Design</h2>\\
  <h3 class='text-lg font-semibold text-gray-800'>1. Hypothesis</h3>\\
  <p class='text-gray-700'>\"If [change], then [metric] will [improve X%] because [user reason]\"</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>2. Setup</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Control:</strong> Current version</li>\\
  <li><strong>Treatment:</strong> Your change</li>\\
  <li><strong>Users:</strong> How many per group</li>\\
  <li><strong>Duration:</strong> How long to run</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>3. Success metrics</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Primary:</strong> What you're optimizing</li>\\
  <li><strong>Guardrails:</strong> What you can't break</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>4. Decision criteria</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>What result makes you ship vs. kill the deal?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Example: Testing Simplified Signup Flow</h2>\\
  <p class='text-gray-700'><strong>Hypothesis:</strong> \"If we reduce signup from 5 fields to 3, conversion will increase 20% because less friction\"</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Setup:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Control:</strong> 5-field form</li>\\
  <li><strong>Treatment:</strong> 3-field form</li>\\
  <li>2,000 users per group, 1 week</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Metrics:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Primary:</strong> Signup completion rate</li>\\
  <li><strong>Guardrails:</strong> Profile completeness, user quality</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Decision:</strong> Ship if >10% improvement with no guardrail issues</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Analyzing Results</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Is the issue big enough? Does the improvement matter for business goals?</li>\\
  <li>Are there any side effects? For instance, check your guardrail metrics stayed stable.</li>\\
  <li>Always check if it works for everyone. Segment by user type, device, etc.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>What Interviewers Want to See</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Clear hypothesis with business rationale</li>\\
  <li>Thoughtful metric selection - primary + guardrails</li>\\
  <li>Practical considerations - sample size, timing</li>\\
  <li>Sound interpretation of results</li>\\
  <li>Business judgment on what to do next</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Quick Reminders</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Don't test everything at once</li>\\
  <li>Run tests long enough for reliable data</li>\\
  <li>Always check guardrail metrics</li>\\
  <li>Tie results back to business impact</li>\\
  <li>Have a plan before you start testing</li>\\
  </ul>\\
  </div>"
    }
  ]
}
`,
  };
};

export const productStrategy = (data) => {
  return {
    name: "Product Strategy",
    prompt: `Analyse this entire ${data}
  ----
This module focuses on preparing candidates for product strategy interviews, which assess high-level decision-making for business growth. It covers understanding what product strategy entails, a 5-step framework for answering strategy questions, practice questions covering various strategic themes, and a detailed rubric for self-evaluation.

----
Give me response in this JSON format only and ensure do not use any asterisk symbols anywhere:

{
  "quickSummary": "Product strategy interviews assess your ability to make high-level decisions that drive business growth, acting almost like a founder. You'll need to define goals, analyze markets, evaluate strategic options with trade-offs, and prioritize with clear metrics and next steps. It's less about specific features and more about the 'why' and 'where to next' for a product or company.",
  "subModules": [
    {
      "title": "What Actually Is Product Strategy?",
      "completed": 0,
      "summary": "Product strategy is just a fancy way of saying: can you zoom out and make decisions that actually move the business forward and not just add shiny features?. In a PM interview, strategy questions test whether you can think almost like a founder or exec. You're not being asked to wireframe a button. You're being asked: Where should the team go next and why does it matter?",
      "content": "Understand why product strategy is crucial in PM interviews and how it differs from product design. Learn what top companies seek in strategic thinking, including tackling open-ended problems, making smart trade-offs, and connecting product decisions to business outcomes. Review common product strategy questions.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>Why This Shows Up in Interviews</h2>\\
  <p class='text-gray-700'>The best PMs don’t just ship features — they think:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>“What bets are worth making right now?”</li>\\
    <li>“Where is the market going and how do we stay relevant?”</li>\\
    <li>“What actually helps the company grow?”</li>\\
  </ul>\\
  <p class='text-gray-700'>That's strategy. And it matters because companies don’t want a task-doer — they want someone who knows where to steer the ship. These questions help interviewers see if you can:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>Tackle open-ended problems without freaking out</li>\\
    <li>Make smart trade-offs under constraints</li>\\
    <li>Connect product decisions to business outcomes</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>How is Product Strategy different from Product Design?</h2>\\
  <p class='text-gray-700'>Product strategy focuses on <strong>what</strong> should be built and <strong>why</strong> — the big-picture thinking, product-market fit, growth strategy, and goals. Strategy is the <strong>map</strong>.</p>\\
  <p class='text-gray-700'>Product design focuses on <strong>how</strong> to build the product — user experience, usability, UX flows, and delight. Design is <strong>how smooth the ride is once you’re on the road</strong>.</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>What Top Companies Are Really Looking For</h2>\\
  <p class='text-gray-700'>Places like Meta, Stripe, Amazon, and Spotify want to see if you can:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>Stay calm in the chaos (there’s never one “right” answer)</li>\\
    <li>Build a logical, compelling case for your ideas</li>\\
    <li>Think about the customer and the business</li>\\
    <li>Make decisions even when data is fuzzy</li>\\
  </ul>\\
  <p class='text-gray-700'>They’re not testing if you have a PhD in product management. They’re testing if you can think clearly, prioritize well, and justify your decisions.</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Common Real Product Strategy Questions</h2>\\
  <p class='text-gray-700'>Some examples I’ve seen and practiced with:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>“You’re the PM for YouTube Shorts. What would you prioritize to grow usage?”</li>\\
    <li>“Spotify wants to expand into audiobooks. How would you evaluate that opportunity?”</li>\\
    <li>“Meta’s ad revenue is flat — what should the Ads team do next?”</li>\\
    <li>“Should Google Maps launch a premium subscription?”</li>\\
    <li>“How should Amazon grow Prime in new international markets?”</li>\\
  </ul>\\
  <p class='text-gray-700'>These all boil down to: <i>Can you connect product work to real goals and explain your thinking in a structured way?</i></p>\\
</div>"
    },
    {
      "title": "5-Step Product Strategy Interview Framework",
      "completed": 0,
      "summary": "Product strategy interviews can feel overwhelming, but having a structured approach makes all the difference. This framework keeps you organized, shows strategic thinking, and demonstrates how you balance business needs with execution reality. Use this as your north star for any product strategy question.",
      "content": "Learn a 5-step framework to tackle any product strategy question: Clarify the Goal, Analyze the Market, Evaluate Strategic Options, Prioritize with Trade-Offs, and Define Success Metrics & Next Steps. This framework emphasizes structured thinking, business acumen, and the ability to connect strategy to execution.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>Step 1: Clarify the Goal</h2>\\
  <p class='text-gray-700'><strong>What it is:</strong> Before diving into solutions, nail down exactly what success looks like. Most candidates jump straight to brainstorming, but the best PMs spend time upfront ensuring they're solving the right problem.</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Key Questions to Ask:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"What's the primary business objective we're trying to achieve?\"</li>\\
  <li>\"What's our timeline for seeing results?\"</li>\\
  <li>\"Are there any constraints I should be aware of - budget, resources, technical limitations?\"</li>\\
  <li>\"How does this fit into the broader company strategy?\"</li>\\
  <li>\"What would success look like in 6 months vs. 2 years?\"</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Example:</strong> Interviewer: <i>\"How would you grow our marketplace platform?\"</i></p>\\
  <p class='text-gray-700'><strong>Your Response:</strong> \"Before I dive into growth strategies, let me clarify a few things. When you say 'grow,' are we primarily focused on user acquisition, revenue growth, or engagement? What's our current biggest bottleneck - supply side, demand side, or conversion? And what's the timeline we're working with - are we looking for quick wins or sustainable long-term growth?\"</p>\\
  <p class='text-gray-700'>This shows you think strategically and don't make assumptions.</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Step 2: Analyze the Market</h2>\\
  <p class='text-gray-700'><strong>What it is:</strong> Demonstrate market awareness by analyzing the competitive landscape, user behavior, and market dynamics. This isn't about showing off. It's about grounding your strategy in reality.</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Framework to Use:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Market Size & Trends:</strong> What's the TAM? Is the market growing or contracting?</li>\\
  <li><strong>Competition:</strong> Who are the key players? What are their strengths/weaknesses?</li>\\
  <li><strong>User Behavior:</strong> How do customers currently solve this problem? What are their pain points?</li>\\
  <li><strong>External Forces:</strong> Regulatory changes, technology shifts, economic factors</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Example:</strong> <i>Sample answer for a food delivery app growth question:</i></p>\\
  <p class='text-gray-700'>\"Let me analyze the current market landscape. The food delivery market is still growing but slowing post-COVID, with increased competition from DoorDash, Uber Eats, and regional players. Users are becoming more price-sensitive and demanding faster delivery times. I'm seeing trends toward ghost kitchens and vertical integration. Our key advantage seems to be [X], but we're facing pressure on [Y]. This context will shape which growth strategies make sense.\"</p>\\
  <p class='text-gray-700'><strong>Pro Tip:</strong> If you don't know specific market details, be honest but show your thinking process: \"I'd want to research the exact market size, but based on general trends I'm seeing...\"</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Step 3: Evaluate Strategic Options</h2>\\
  <p class='text-gray-700'><strong>What it is:</strong> Generate 2-3 distinct strategic buckets and evaluate each one systematically. Don't just list options. Show how you think through trade-offs.</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Evaluation Criteria:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Impact:</strong> How much will this move the needle on our goal?</li>\\
  <li><strong>Feasibility:</strong> Can we actually execute this with our resources/timeline?</li>\\
  <li><strong>Strategic Fit:</strong> Does this align with our core competencies and long-term vision?</li>\\
  <li><strong>Risk:</strong> What could go wrong and how likely is it?</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Example Structure:</strong> <i>For growing a B2B SaaS product:</i></p>\\
  <p class='text-gray-700'>\"I see three main strategic options:</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Option 1: Expand Market Reach</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Focus on new customer segments or geographic markets</li>\\
  <li>High impact potential, moderate feasibility</li>\\
  <li>Requires new go-to-market capabilities</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Option 2: Deepen Customer Value</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Add new features or product lines for existing customers</li>\\
  <li>Moderate impact, high feasibility</li>\\
  <li>Leverages existing relationships and product knowledge</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Option 3: Platform Strategy</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Build integrations and become central to customer workflows</li>\\
  <li>High long-term impact, low short-term feasibility</li>\\
  <li>Significant technical investment required</li>\\
  </ul>\\
  <p class='text-gray-700'>Each has different resource requirements and risk profiles...\"</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Step 4: Prioritize with Trade-Offs</h2>\\
  <p class='text-gray-700'><strong>What it is:</strong> Make a clear recommendation and explain your reasoning. The best PMs don't just pick an option. They articulate why they chose that option over alternatives and how they'd mitigate risks.</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>How to Frame Trade-Offs:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>\"I'm recommending [X] over [Y] because...\"</li>\\
  <li>\"The main trade-off is [short-term cost] for [long-term benefit]\"</li>\\
  <li>\"This comes with risks around [Z], which I'd address by...\"</li>\\
  <li>\"We're betting that [key assumption] holds true\"</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Example in Action:</h3>\\
  <p class='text-gray-700'>\"I'm recommending we focus on deepening customer value (option 2) over expanding market reach. Here's my reasoning:</p>\\
  <p class='text-gray-700'><strong>Why this over market expansion:</strong> While new markets have higher upside, our current customer retention rate of 85% suggests we're not maximizing value from existing relationships. It's typically 5-7x cheaper to expand existing accounts than acquire new ones.</p>\\
  <p class='text-gray-700'><strong>Key Trade-Off:</strong> We're trading potential rapid growth for sustainable, profitable growth. This is the right choice given our current burn rate and the need to show unit economics improvement.</p>\\
  <p class='text-gray-700'><strong>Risk Mitigation:</strong> The main risk is that we hit a ceiling on expansion within existing accounts. I'd mitigate this by setting clear expansion metrics and having a 'pivot trigger' - if we don't see 20% expansion revenue within 6 months, we re-evaluate.\"</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Step 5: Define Success Metrics & Next Steps</h2>\\
  <p class='text-gray-700'><strong>What it is:</strong> Show you can translate strategy into measurable outcomes and concrete next steps. This demonstrates you can execute, not just strategize.</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Metrics Framework:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Leading Indicators:</strong> What metrics predict success? (e.g., trial signups, feature adoption)</li>\\
  <li><strong>Lagging Indicators:</strong> What metrics confirm success? (e.g., revenue, retention)</li>\\
  <li><strong>Business Metrics:</strong> Revenue, market share, customer lifetime value</li>\\
  <li><strong>Product Metrics:</strong> User engagement, feature adoption, conversion rates</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Example Structure:</strong> For the customer value expansion strategy:</p>\\
  <p class='text-gray-700'>\"Here's how I'd measure success and roll this out:</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Success Metrics:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Leading:</strong> Feature adoption rate, customer health score, expansion conversations initiated</li>\\
  <li><strong>Lagging:</strong> Expansion revenue, net revenue retention, customer satisfaction scores</li>\\
  <li><strong>Target:</strong> 25% of existing customers adopt new features within 90 days, driving 15% increase in annual revenue per user</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>MVP Approach:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>Month 1:</strong> Ship basic version to 10% of customers (our highest-value segment)</li>\\
  <li><strong>Month 2:</strong> Iterate based on feedback, expand to 25% of customers</li>\\
  <li><strong>Month 3:</strong> Full rollout with refined onboarding and support processes</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Key Assumptions to Test:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Customers will pay for additional value (validate with pricing research)</li>\\
  <li>Our support team can handle increased complexity (monitor ticket volume)</li>\\
  <li>Integration doesn't cannibalize existing revenue (track replacement vs. additive usage)\"</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Putting It All Together</h2>\\
  <p class='text-gray-700'>This framework works because it:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li>Shows structured thinking instead of random brainstorming</li>\\
  <li>Demonstrates business acumen by connecting strategy to outcomes</li>\\
  <li>Reveals how you handle ambiguity through clarifying questions</li>\\
  <li>Proves you can execute with concrete metrics and next steps</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Practice Tip:</strong> Don't memorize this framework but do internalize the logic. Do some mock interviews with friends and with enough practice goals, context, options, trade-offs, and measurement will become natural ways of thinking. Use this structure as training wheels until it becomes second nature.</p>\\
  <p class='text-gray-700'>Remember, interviewers aren't looking for the \"right\" answer. They want to see how you think through complex problems and make decisions with incomplete information. This framework gives you a reliable way to showcase that thinking process.</p>\\
</div>"
    },
    {
      "title": "5 Practice Product Strategy Interview Questions",
      "completed": 0,
      "summary": "There are broadly 5 types of product strategy questions. These mock questions will help you practice different muscles needed to creatively think through your strategy for monetization, growth, competition, market expansion and the portfolio of products. The hints are here simply as suggestions, so don’t be afraid to take your own creative path to test your strategy skills.",
      "content": "Practice with five types of product strategy questions: Monetization, Growth, Competitive Defense, Market Expansion, and Product Portfolio. Each question includes hints to guide your strategic thinking, encouraging creative approaches to problem-solving.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <ol class='list-decimal pl-6 space-y-4 text-gray-700'>\\
  <li>\\
  <h2 class='text-xl font-bold text-gray-900'>Monetization Strategy:</h2>\\
  <p class='text-gray-700'><i>\"How would you monetize a product like Google Maps?\"</i></p>\\
  <p class='text-gray-700'><i><b>Hint:</b></i> <span class='text-gray-500'>Think about who uses it (consumers, businesses), who pays today (advertisers, API users), and where untapped value might lie. Consider freemium models, partnerships, or upsells for high-intent users.</span></p>\\
  </li>\\
  <li>\\
  <h2 class='text-xl font-bold text-gray-900'>Growth Strategy:</h2>\\
  <p class='text-gray-700'><i>\"Instagram usage is declining among Gen Z. What would you do?\"</i></p>\\
  <p class='text-gray-700'><i><b>Hint:</b></i> <span class='text-gray-500'>Start with why. Do discovery: is it product fatigue, competition, cultural shift? Segment users by behavior and platform. Then brainstorm features, partnerships, or changes in positioning to re-engage that group.</span></p>\\
  </li>\\
  <li>\\
  <h2 class='text-xl font-bold text-gray-900'>Competitive Defense:</h2>\\
  <p class='text-gray-700'><i>\"Spotify’s podcast dominance is being challenged by YouTube. What’s your strategy?\"</i></p>\\
  <p class='text-gray-700'><i><b>Hint:</b></i> <span class='text-gray-500'>Think in layers: product experience, creator ecosystem, monetization. Where is YouTube stronger? Where is Spotify better? Consider exclusive content, algorithm upgrades, and creator incentives.</span></p>\\
  </li>\\
  <li>\\
  <h2 class='text-xl font-bold text-gray-900'>Market Expansion:</h2>\\
  <p class='text-gray-700'><i>\"How would you expand Duolingo into a new international market?\"</i></p>\\
  <p class='text-gray-700'><i><b>Hint:</b></i> <span class='text-gray-500'>Pick a specific country. Think about language demand, mobile access, cultural attitudes toward learning, and local competitors. Then outline a go-to-market plan (product, pricing, partnerships, promotion).</span></p>\\
  </li>\\
  <li>\\
  <h2 class='text-xl font-bold text-gray-900'>Product Portfolio Strategy:</h2>\\
  <p class='text-gray-700'><i>\"You’re PM at Amazon. Should Prime Gaming be bundled or spun out as its own service?\"</i></p>\\
  <p class='text-gray-700'><i><b>Hint:</b></i> <span class='text-gray-500'>Use a decision framework. What’s the business goal? Retention, revenue, user growth or something else? Evaluate the pros and cons of bundling (cross-sell potential, complexity, cost). Then recommend based on customer value and business alignment.</span></p>\\
  </li>\\
  </ol>\\
</div>"
    },
    {
      "title": "Product Strategy Interview Rubric",
      "completed": 0,
      "summary": "Most top tech companies like Google, Meta, and Amazon use structured rubrics to evaluate how you think, not just what you say. Let’s break down the 3 core areas they care about most, and what separates a “meh” answer from a great one. Take a look at the rubric. It breaks down the categories into structured thinking, product creativity and strategy, and tech and execution. Broadly it can be scored into four categories—needs improvement, somewhat okay, strong responses, and exceptional responses.",
      "content": "Understand how top tech companies evaluate product strategy interviews using a structured rubric. This module breaks down assessment into three core areas: Structured Thinking, Product Creativity & Strategy, and Tech & Execution Insight, with clear distinctions between 'Needs Improvement,' 'Mixed,' 'Strong,' and 'Exceptional' responses.",
      "htmlContent": "\\
    <div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>Category: Structured Thinking</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>1/4 - Needs Improvement:</strong> No clear structure, jumps into solutions, rambles, or backtracks.</li>\\
  <li><strong>2/4 - Mixed:</strong> Has some structure, but it's shaky or incomplete. Misses key step like clarifying goals.</li>\\
  <li><strong>3/4 - Strong:</strong> Organized, walks through logical buckets, clarifies assumptions.</li>\\
  <li><strong>4/4 - Exceptional:</strong> Crystal clear framing, goal-first, structured like a consultant. Prioritizes effectively and drives the convo with confidence.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Category: Product Creativity & Strategy</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>1/4 - Needs Improvement:</strong> Generic ideas, lacks understanding of user or business value.</li>\\
  <li><strong>2/4 - Mixed:</strong> Ideas are obvious or surface-level, with limited strategic tradeoff discussion.</li>\\
  <li><strong>3/4 - Strong:</strong> Strong ideas rooted in user needs or business logic. Prioritizes reasonably.</li>\\
  <li><strong>4/4 - Exceptional:</strong> Insightful, innovative ideas tied to users, competition, and growth. Shows big-picture product vision + practical strategy.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Category: Tech & Execution Insight</h2>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
  <li><strong>1/4 - Needs Improvement:</strong> Ignores feasibility, suggests unrealistic features.</li>\\
  <li><strong>2/4 - Mixed:</strong> Aware of build vs. buy, but vague about technical constraints or data needs.</li>\\
  <li><strong>3/4 - Strong:</strong> Thinks in MVPs, mentions trade-offs, rollout plans, or data signals.</li>\\
  <li><strong>4/4 - Exceptional:</strong> Demonstrates deep intuition for what’s technically feasible, how to experiment fast, and how to collaborate with engineering or data science.</li>\\
  </ul>\\
</div>"
    }
  ]
}
`,
  };
};

export const productSense = (data) => {
  return {
    name: "Product Sense",
    prompt: `Analyse this entire ${data}
  ----
This product sense module gives a deep dive into how candidates can show their understanding of user needs, product behavior, and business strategy. It includes foundational explanations of product sense, real interview questions by top companies, and a structured 7-step framework to confidently solve product problems. By mastering product sense, candidates can think like builders, propose thoughtful solutions, and demonstrate empathy, creativity, and product judgment in interviews.

----
Give me response in this JSON format only and ensure do not use any asterisk symbols anywhere:

{
  "quickSummary": "This product sense module gives a deep dive into how candidates can show their understanding of user needs, product behavior, and business strategy. It includes foundational explanations of product sense, real interview questions by top companies, and a structured 7-step framework to confidently solve product problems. By mastering product sense, candidates can think like builders, propose thoughtful solutions, and demonstrate empathy, creativity, and product judgment in interviews.",
  "subModules": [
    {
      "title": "What is Product Sense?",
      "completed": 0,
      "summary": "Product sense is your ability to look at a product and confidently say: “Here’s what makes it work, here’s what’s missing, and here’s how I’d make it better.” It’s how you connect the dots between user needs, product design, and business impact and it’s one of the most important skills interviewers look for in a PM candidate.",
      "content": "Product sense allows you to identify how a product works, what's lacking, and how to improve it. It blends empathy, creativity, and judgment to align product experience with user needs and business outcomes. Understand why it matters and the core traits interviewers look for.",
      "htmlContent": "<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Why It Matters</h2>\\
  <p class='text-gray-700'>Great PMs don’t just ship features — they solve real problems. Product sense shows that you:</p>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>Understand real user needs</li>\\
    <li>Prioritize what matters most</li>\\
    <li>Think creatively but practically</li>\\
    <li>Make smart trade-offs</li>\\
  </ul>\\
  <p class='text-gray-700'>Strong product sense proves that you care not just about what gets built, but why it matters.</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Core Traits Interviewers Look For</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li><strong>Empathy:</strong> You understand what users care about, what frustrates them, and how they behave even when they don’t say it.</li>\\
    <li><strong>Creativity:</strong> You propose thoughtful solutions based on user needs, not just UI elements.</li>\\
    <li><strong>Domain Knowledge:</strong> You understand the product’s space, competitors, constraints, and trade-offs.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Example: Notion</h2>\\
  <p class='text-gray-700'>“One of my favorite products is Notion. I use it to track books I’m reading, plan projects, and connect ideas. It’s modular and keeps my brain organized. But search can be frustrating. I’d add smart tagging or semantic search to help resurface content.”</p>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>Clear user context (you)</li>\\
    <li>A genuine pain point</li>\\
    <li>A creative, relevant improvement</li>\\
    <li>Understanding of the product's value</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Takeaway</h2>\\
  <p class='text-gray-700'><strong>Product sense = empathy + creativity + judgment.</strong></p>\\
  <p class='text-gray-700'>Show interviewers: \"I don’t just use products. I understand them. And I know how to make them better.”</p>\\
</div>"
    },
    {
      "title": "Top Product Sense Questions",
      "completed": 0,
      "summary": "A curated list of real-world product sense interview questions from companies like Meta, Google, Amazon, and more. These help candidates practice user-centric thinking, product improvements, and strategic planning for tech products.",
      "content": "Use these company-specific questions to practice framing answers around user needs, product metrics, and improvement ideas. These scenarios help you generalize product sense strategies across various tech products and domains.",
      "htmlContent": "\\
<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Meta</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>How would you measure Instagram Reels success?</li>\\
    <li>Which metrics define Facebook Group health?</li>\\
    <li>How to boost WhatsApp Business in emerging markets?</li>\\
    <li>Stories vs Reels: where to invest more?</li>\\
    <li>What would you build for high schoolers on Instagram?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Google</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>Google Search satisfaction indicators?</li>\\
    <li>YouTube creator engagement metrics?</li>\\
    <li>Improve Google Maps for tourists?</li>
    <li>Redesign Gmail for Gen Z?</li>\\
    <li>Grow YouTube Shorts usage?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Amazon</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>Retaining Prime members?</li>\\
    <li>Grow Amazon Marketplace sellers?</li>\\
    <li>Design Alexa for seniors?</li>\\
    <li>Make packaging more sustainable?</li>\\
    <li>Balance delivery speed vs cost?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Netflix</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>Evaluate Netflix recommendation engine?</li>\\
    <li>Renew/cancel show metrics?</li>\\
    <li>Fix teen viewership drop?</li>\\
    <li>Improve offline mode?</li>\\
    <li>Expand globally to non-English markets?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>OpenAI</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>How to measure ChatGPT user satisfaction?</li>\\
    <li>Track API growth?</li>\\
    <li>Reduce hallucinations in LLMs?</li>\\
    <li>Increase AI Copilot enterprise adoption?</li>\\
    <li>Design trust-building features in AI?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Microsoft</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>Boost usage of Teams collaboration features?</li>\\
    <li>Redesign Outlook for college students?</li>\\
    <li>Enhance Excel Copilot for analysts?</li>\\
    <li>Grow Bing market share on mobile?</li>\\
    <li>Increase Xbox social engagement?</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Stripe</h2>\\
  <ul class='list-disc pl-5 space-y-1 text-gray-700'>\\
    <li>Improve checkout conversions?</li>\\
    <li>Evaluate new fraud detection models?</li>\\
    <li>Support emerging market merchants?</li>\\
    <li>Design for solo entrepreneurs?</li>\\
    <li>Track dashboard usability improvements?</li>\\
  </ul>\\
</div>"
    },
    {
      "title": "7-Step Product Sense Framework",
      "completed": 0,
      "summary": "A structured framework to approach product sense interview questions. Includes steps like clarifying the problem, user segmentation, pain points, brainstorming, product vision, MVP prioritization, and recap — helping you think like a PM from start to finish.",
      "content": "This 7-step framework guides you through solving product sense questions: Clarify the Problem, Define Users & Segment, Identify Pain Points, Brainstorm Solutions, Define Product Vision, Prioritize MVP, and Evaluate & Recap. It ensures a user-first, solution-driven, and impact-aware approach.",
      "htmlContent": "\\
<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Steps Summary</h2>\\
  <ul class='list-decimal pl-5 space-y-1 text-gray-700'>\\
    <li><strong>Clarify the Problem:</strong> Understand the question’s true intent before proposing anything.</li>\\
    <li><strong>Define Users & Segment:</strong> Identify and select a target user segment to design for.</li>\\
    <li><strong>Identify Pain Points:</strong> Dig deep into what frustrates or limits user success.</li>
    <li><strong>Brainstorm Solutions:</strong> Ideate multiple solutions, balancing creativity and feasibility.</li>\\
    <li><strong>Define Product Vision:</strong> Craft a one-liner vision that reflects user value and strategic goal.</li>\\
    <li><strong>Prioritize MVP:</strong> Choose 2–3 high-impact, low-effort features aligned to the journey.</li>\\
    <li><strong>Evaluate & Recap:</strong> Summarize the solution, acknowledge risks, and define success metrics.</li>\\
  </ul>\\
  <p class='mt-4 text-gray-700'>Use this structure to show how you think like a product manager — user-first, solution-driven, and impact-aware.</p>\\
</div>"
    },
    {
      "title": "Practice Questions with Hints",
      "completed": 0,
      "summary": "This module gives you a set of example product sense interview prompts, complete with helpful hints, and teaches you how to elevate your answers from solid to standout. You’ll also learn common mistakes to avoid so you can walk in prepared and confident.",
      "content": "Practice with example product sense interview prompts across different domains, each with helpful hints. Learn how to elevate your answers from solid to standout by focusing on deeper insights, thoughtful segmentation, and impactful solutions. Understand common mistakes to avoid for a confident performance.",
      "htmlContent": "<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Practice Questions with Hints</h2>\\
  <p class='text-gray-700'>Here are 5 prompts across different domains with light guidance to help you warm up your thinking:</p>\\
  <ul class='list-disc pl-5 space-y-2 text-gray-700'>\\
    <li><strong>1. Redesign Instagram DMs:</strong> How would you improve Instagram’s direct messaging experience? <br/><i class='text-gray-500'>Hint:</i> <span class='text-gray-700'>Consider use cases like group chats, creator-fan interaction, spam filtering, or cross-platform communication.</span></li>\\
    <li><strong>2. Build a feature for Uber drivers:</strong> Imagine you’re building a new feature for Uber’s driver app. What would you build and why? <br/><i class='text-gray-500'>Hint:</i> <span class='text-gray-700'>Think about driver pain points—earnings transparency, safety, downtime, navigation, etc.</span></li>\\
    <li><strong>3. Design a learning feature for Duolingo:</strong> You’re launching a new feature for Duolingo to help intermediate learners stay engaged. What do you build? <br/><i class='text-gray-500'>Hint:</i> <span class='text-gray-700'>Look at retention challenges, gamification, habit loops, or social accountability.</span></li>\\
    <li><strong>4. Improve LinkedIn for job seekers:</strong> How would you improve LinkedIn’s job search experience for college seniors? <br/><i class='text-gray-500'>Hint:</i> <span class='text-gray-700'>Think about segmentation by confidence level, guidance needs, or industries. Consider emotional barriers too.</span></li>\\
    <li><strong>5. Build a productivity tool for remote teams:</strong> You’ve been asked to build a new tool to help remote teams feel more connected. What’s your idea? <br/><i class='text-gray-500'>Hint:</i> <span class='text-gray-700'>Think async vs sync, calendar fatigue, spontaneous connection, or rituals that build team identity.</span></li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Elevate Your Product Sense Thinking</h2>\\
  <p class='text-gray-700'>Good product sense shows structure. Great product sense shows insight. Here’s how to level up each part of your answer:</p>\\
  <ul class='list-disc pl-5 space-y-2 text-gray-700'>\\
    <li><strong>Product Motivation</strong><br/>\\
      Good: “People want to message more easily.”<br/>\\
      Great: “As messaging has become the default mode of connection, people expect fluid, contextual interactions. Instagram’s DMs haven’t evolved to support creator/audience dynamics or signal prioritization.”\\
    </li>\\
    <li><strong>Segmentation</strong><br/>\\
      Good: “Let’s look at Instagram users.”<br/>\\
      Great: “I’ll break users into three groups: power users (creators, sellers), socializers (friends, groups), and passive viewers. I’ll focus on creators because they struggle most with filtering engagement.”\\
    </li>\\
    <li><strong>Problem Identification</strong><br/>\\
      Good: “Users don’t like the UI.”<br/>\\
      Great: “The core problem is signal-to-noise. Creators can’t easily filter for high-value messages or respond at scale, which limits their ability to grow community.”\\
    </li>\\
    <li><strong>Solution</strong><br/>\\
      Good: “Let’s add folders.”<br/>\\
      Great: “Let’s introduce a ‘Smart Inbox’ with auto-categorization (fans, brand inquiries, spam), reply templates, and insights for high-ROI conversations—leveraging ML and existing Instagram data.”\\
    </li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-lg font-semibold text-gray-900 mb-2'>Common Mistakes to Avoid</h2>\\
  <ul class='list-disc pl-5 space-y-2 text-gray-700'>\\
    <li>Jumping to solutions too early → You need a deep problem before a good solution.</li>\\
    <li>Designing for yourself → Don’t assume your use case is universal. Anchor in real segments.</li>\\
    <li>Ignoring trade-offs → Highlight what you’re not solving and why.</li>\\
    <li>Shallow thinking → Add a “why now” angle, industry trend, or strategic impact to show business sense.</li>\\
    <li>Missing creativity → Add a surprising, delightful twist that shows you think like a builder, not just a fixer.</li>\\
  </ul>\\
</div>"
    },
    {
      "title": "Recap How to Improve Product Sense",
      "completed": 0,
      "summary": "Product sense is one of the most important skills for product managers — and one of the hardest to define. At its core, product sense is your ability to identify real user problems, design thoughtful solutions, and prioritize what truly matters. You don’t need to be a genius to develop great product sense. But you do need to practice three key things: Empathy, Domain Knowledge, and Creativity. This module breaks down how to improve each area with practical habits, helpful tools, and go-to resources — and wraps with common mistakes to avoid in product sense interviews.",
      "content": "This module provides a comprehensive recap on improving product sense by focusing on three key areas: Empathy, Domain Knowledge, and Creativity. It offers practical habits, helpful tools, and go-to resources for each area, alongside common mistakes to avoid in product sense interviews, ensuring a holistic development approach.",
      "htmlContent": "\\
        <div class='p-6 rounded-xl  space-y-6 bg-[#08090A] text-gray-200'>\\
  <h2 class='text-xl font-bold text-gray-50'>Build Strong User Empathy</h2>\\
  <p class='text-gray-300'>Great product managers don’t just guess what users want — they understand their users’ goals, pain points, and behavior.</p>\\
  <h3 class='font-semibold text-gray-100 mt-4'>What to Do:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li>Talk to users regularly: Schedule user interviews. Ask questions that reveal context, not just opinions.</li>\\
    <li>Listen to support calls: You’ll hear pain points directly, in users’ own words.</li>\\
    <li>Map their journey: Use empathy maps or user journey maps to understand how users feel at each step.</li>\\
  </ul>\\
  <h3 class='font-semibold text-gray-100 mt-4'>Tools:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li>Lookback, Maze, Dovetail (for user interviews and research synthesis)</li>\\
    <li>Notion, FigJam, or Miro for mapping insights</li>\\
  </ul>\\
  <h3 class='font-semibold text-gray-100 mt-4'>Resources:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li><i class='text-gray-400'>The Mom Test</i> – how to ask better product questions</li>\\
    <li>IDEO’s Human-Centered Design Kit – practical frameworks for empathy building</li>\\
  </ul>\\
  <hr class='my-6 border-gray-700'/>\\
  <h2 class='text-xl font-bold text-gray-50'>Grow Your Domain Knowledge</h2>\\
  <p class='text-gray-300'>You can’t build great products without understanding the industry, the trends, and the customer landscape.</p>\\
  <h3 class='font-semibold text-gray-100 mt-4'>What to Do:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li>Stay updated on your industry: Set up Google Alerts for key terms in your domain.</li>\\
    <li>Follow relevant thought leaders: Stay active on LinkedIn, Substack, or Twitter/X for real-world insights.</li>\\
    <li>Study competitors: Break down what they’ve built and why it works (or doesn’t).</li>\\
  </ul>\\
  <h3 class='font-semibold text-gray-100 mt-4'>Tools:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li>Google Alerts, Feedly (RSS reader), podcast apps</li>\\
    <li>Product teardown templates (Notion or Google Docs)</li>\\
  </ul>\\
  <h3 class='font-semibold text-gray-100 mt-4'>Resources:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li>Lenny’s Newsletter</li>\\
    <li>Stratechery (deep dives into business models and tech)</li>\\
    <li>a16z Podcast (industry trend coverage)</li>\\
  </ul>\\
  <hr class='my-6 border-gray-700'/>\\
  <h2 class='text-xl font-bold text-gray-50'>Practice Creative Product Thinking</h2>\\
  <p class='text-gray-300'>Creativity isn’t just about blue-sky ideas — it’s about solving problems in scrappy, clever, or resourceful ways.</p>\\
  <h3 class='font-semibold text-gray-100 mt-4'>What to Do:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li>Run “what-if” sprints: Choose a constraint (“What if we could only build this for Gen Z?”) and explore ideas.</li>\\
    <li>Reverse-engineer products: Take a feature from a product you use daily. What problem was it designed to solve?</li>\\
    <li>Design low-effort MVPs: Practice reducing big ideas down to simple testable versions.</li>\\
  </ul>\\
  <h3 class='font-semibold text-gray-100 mt-4'>Tools:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li>Figma (mocking ideas)</li>\\
    <li>Miro/Whimsical (for solution mapping)</li>\\
  </ul>\\
  <h3 class='font-semibold text-gray-100 mt-4'>Resources:</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-300'>\\
    <li><i class='text-gray-400'>Sprint</i> by Jake Knapp – structured product testing</li>\\
    <li><i class='text-gray-400'>Creative Confidence</i> by the Kelley brothers – building creative habits</li>\\
    <li>Product Hunt – inspiration for creative product ideas</li>\\
  </ul>\\
  <hr class='my-6 border-gray-700'/>\\
  <h2 class='text-xl font-bold text-gray-50'>Common Product Sense Interview Mistakes (And How to Avoid Them)</h2>\\
  <ul class='list-disc pl-6 space-y-3 text-gray-300'>\\
    <li><strong>Mistake: Jumping to solutions too early</strong><br/><span class='text-gray-600'>Why: Wanting to impress with ideas. <br/>Avoid: Start with user goals and pain points before brainstorming.</span></li>\\
    <li><strong>Mistake: Vague or generic user definition</strong><br/><span class='text-gray-600'>Why: “This is for everyone.” <br/>Avoid: Segment by behavior or context, not just age/location.</span></li>\\
    <li><strong>Mistake: No tradeoff thinking</strong><br/><span class='text-gray-600'>Why: Trying to solve every problem. <br/>Avoid: Clearly explain what you’d leave out and why.</span></li>\\
    <li><strong>Mistake: Overcomplicating MVPs</strong><br/><span class='text-gray-600'>Why: Trying to show ambition. <br/>Avoid: Describe a v0 version that’s testable, scrappy, and focused.</span></li>\\
    <li><strong>Mistake: Ignoring business impact</strong><br/><span class='text-gray-600'>Why: Focusing only on the user. <br/>Avoid: Tie ideas to core metrics: retention, engagement, revenue.</span></li>\\
    <li><strong>Mistake: Lack of prioritization</strong><br/><span class='text-gray-600'>Why: Listing too many features. <br/>Avoid: Pick the top 1–2 features and justify their value.</span></li>\\
  </ul>\\
  <hr class='my-6 border-gray-700'/>\\
  <h2 class='text-xl font-bold text-gray-50'>Final Thought</h2>\\
  <p class='text-gray-300'>Improving your product sense isn’t about memorizing answers. It’s about training your brain to think like a builder and a user at the same time. If you work on empathy, learn your space, and stretch your creativity, the insights will come naturally.</p>\\
  <p class='mt-4 text-gray-300'><strong>Practice Prompt:</strong> “How would you improve a learning app for students who lose motivation after the first week?”</p>\\
</div>"
    }
  ]
}
`,
  };
};

export const technical = (data) => {
  return {
    name: "Technical",
    prompt: `Analyse this entire ${data}
  ----
The technical PM interview evaluates your ability to partner effectively with engineers, focusing on product sense through a technical lens. It's not about coding, but understanding technical concepts, asking clarifying questions, making smart trade-offs, and communicating complex ideas clearly. Key areas include technical understanding, data literacy, metrics fluency, and strong communication, ensuring you can lead a team to build the right thing, the right way.

----
Give me response in this JSON format only and ensure do not use any asterisk symbols anywhere:

{
  "quickSummary": "The technical PM interview evaluates your ability to partner effectively with engineers, focusing on product sense through a technical lens. It's not about coding, but understanding technical concepts, asking clarifying questions, making smart trade-offs, and communicating complex ideas clearly. Key areas include technical understanding, data literacy, metrics fluency, and strong communication, ensuring you can lead a team to build the right thing, the right way.",
  "subModules": [
    {
      "title": "Overview of Technical PM Interview",
      "completed": 0,
      "summary": "Let's demystify the technical PM interview. If the thought of a \"technical\" round at Google, Meta, or Stripe makes you nervous because you don't have a computer science degree, take a breath. This module is designed to show you that these interviews aren't about your ability to write code. They're about your ability to build great products with people who do. The goal isn't to turn you into an engineer. It's to equip you with the fluency to be an effective partner to engineers. By the end of this module, you'll understand what interviewers are truly looking for and the key areas where you need to shine.",
      "content": "Demystify the technical PM interview, understanding that it's about partnering with engineers to build great products, not coding. Learn the six key areas interviewers assess: Technical Understanding, Data Literacy, Metrics Fluency, Clarifying Questions, Evaluating Trade-offs, and Communication, all through a product sense lens.",
      "htmlContent": "<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>What Are Interviewers Looking For?</h2>\\
  <p class='text-gray-700'>Let's get straight to the point. When an interviewer at Meta or Google asks you to \"Design a system for photo tagging,\" they aren't expecting you to write a single line of Python. They're looking for a few key things:</p>\\
  <p class='text-gray-700'>They are testing your ability to be the engineering team's most valuable partner. They want to know:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>Can you understand technical concepts well enough to have a credible conversation?</li>\\
    <li>Do you ask thoughtful questions before jumping to a solution?</li>\\
    <li>Can you grasp technical constraints and make smart trade-offs?</li>\\
    <li>Can you communicate complex ideas clearly to both technical and non-technical audiences?</li>\\
  </ul>\\
  <p class='text-gray-700'>At its core, the technical interview assesses your <strong>product sense through a technical lens.</strong> It's about proving you can lead a team to build the <strong>right thing</strong> in the <strong>right way.</strong> Your ability to be a strong technical partner is measured across six interconnected areas. Let's break down what they are and what they mean for you.</p>\\
  <h3 class='text-lg font-bold text-gray-900'>1. Technical Understanding</h3>\\
  <p class='text-gray-700'>This isn’t about knowing specific programming languages. It’s about grasping foundational concepts. Think about systems at a high level: What’s a front-end vs. a back-end? What’s an API and why is it useful? What’s the basic idea of a database? You need to show you can conceptualize how a product is built, from the user's screen all the way to the servers that power it.</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Example Question:</strong> <i>\"Walk me through what happens when a user types 'google.com' into their browser and hits Enter.\"</i></li>\\
  </ul>\\
  <h3 class='text-lg font-bold text-gray-900'>2. Data Literacy</h3>\\
  <p class='text-gray-700'>This is your ability to think critically about data. It’s not just reading a chart; it's asking the right questions about it. Where did this data come from? What biases might exist? What data <em>don't</em> we have? Interviewers want to see that you can use data to form a hypothesis, identify what you need to measure, and understand the \"so what\" behind the numbers.</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Example Question:</strong> <i>\"How would you measure the success of a new feature on Google Maps?\"</i></li>\\
  </ul>\\
  <h3 class='text-lg font-bold text-gray-900'>3. Metrics Fluency</h3>\\
  <p class='text-gray-700'>This is the next level of data literacy. It’s about defining what success looks like in quantifiable terms. You need to be able to identify a North Star Metric, propose supporting metrics, and crucially identify counter-metrics that prevent you from optimizing for the wrong thing. This shows you understand how your product creates value for both the user and the business.</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Example Question:</strong> <i>\"What would be the North Star Metric for Instagram Reels? What are two counter-metrics you'd monitor closely?\"</i></li>\\
  </ul>\\
  <h3 class='text-lg font-bold text-gray-900'>4. Clarifying Questions</h3>\\
  <p class='text-gray-700'>This is one of the most critical skills. A great PM never accepts a prompt at face value. Before you design anything, you must understand the goals, the constraints, the user, and the problem. Asking clarifying questions shows the interviewer that you are structured, thoughtful, and avoid making assumptions. It's the first thing you should do in almost any PM interview question.</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Example in Action:</strong> Interviewer: <i>\"Design a smart fridge.\"</i> You: <i>\"Great question. Before I dive in, can I ask a few clarifying questions? Who is the target user for this fridge? What is the primary problem we are trying to solve for them. Is it reducing food waste, simplifying grocery shopping, or something else?\"</i></li>\\
  </ul>\\
  <h3 class='text-lg font-bold text-gray-900'>5. Evaluating Trade-offs</h3>\\
  <p class='text-gray-700'>Product management is the art of making decisions with incomplete information. There is never enough time, money, or people. The technical interview is designed to see how you navigate these real-world constraints. Can you weigh the pros and cons of launching quickly with tech debt versus building a more scalable, long-term solution? Your ability to articulate your reasoning behind a trade-off is more important than the final choice you make.</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Example Question:</strong> <i>Your engineering lead tells you that building the ideal version of a feature will take 6 months, but the marketing team wants to launch something in 2 months. What do you do?</i></li>\\
  </ul>\\
  <h3 class='text-lg font-bold text-gray-900'>6. Communication</h3>\\
  <p class='text-gray-700'>Finally, this skill ties everything together. Can you explain a complex technical trade-off to a business stakeholder in simple terms? Can you have a productive debate with an engineer about system architecture without overstepping? They are testing your ability to translate, persuade, and align. Clear, structured communication is the ultimate sign of a PM who can lead.</p>\\
  <p class='text-gray-700'>By mastering these six areas, you'll be prepared to demonstrate that you have the technical fluency and systems thinking required to succeed. You don't need to be an engineer, but you do need to show you'd be a fantastic PM for them to work with. In the next module, we'll give you the structured framework to do exactly that.</p>\\
</div>"
    },
    {
      "title": "Core Framework to Answer Technical PM Interview Questions",
      "completed": 0,
      "summary": "Now that you know what technical interviews test, let's talk about how to answer. The good news is you don't need a different strategy for every type of question. A single, robust framework will help you structure your thoughts, demonstrate your logic, and confidently handle anything they throw at you. Don’t worry about having to memorize the \"right\" answer. The interviewer is far more interested in your thought process.",
      "content": "Master the 6-step framework for answering technical PM interview questions: Listen & Clarify, Define Scope & Goals, Structure the System (High-Level), Explain Components (Step-by-Step), Identify Trade-offs & Risks, and Summarize & Check-in. This framework ensures a structured approach to any technical problem, prioritizing your thought process over memorized answers.",
      "htmlContent": "<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>The 6-Step Technical Framework</h2>\\
  <p class='text-gray-700'>This structured approach ensures you hit key areas interviewers are looking for.</p>\\
  <ol class='list-decimal pl-6 space-y-2 text-gray-700'>\\
    <li>\\
      <p><strong>Listen & Clarify:</strong> Start by listening carefully to the entire prompt. Before you say anything else, ask clarifying questions to remove ambiguity. This is the single most important step. It shows you're thoughtful and don't jump to assumptions.</p>\\
    </li>\\
    <li>\\
      <p><strong>Define the Scope & Goals:</strong> Restate the problem in your own words and define what a successful outcome looks like. What is the core user problem we're solving? What are the business goals? This frames the entire discussion.</p>\\
    </li>\\
    <li>\\
      <p><strong>Structure the System (High-Level):</strong> Outline the major components of the system. Think in broad strokes: What does the user interact with (front-end)? What does the processing (back-end)? Where is the information stored (database/data storage)? This provides a high-level map before you dive into the details.</p>\\
    </li>\\
    <li>\\
      <p><strong>Explain the Components (Step-by-Step):</strong> Walk the interviewer through how the system works, following a logical path (e.g., the user's journey). Explain what each component from Step 3 does. This is where you explain the \"how.\"</p>\\
    </li>\\
    <li>\\
      <p><strong>Identify Trade-offs & Risks:</strong> This is where you elevate your answer from good to great. No system is perfect. Discuss the decisions you made and their consequences. What are the potential bottlenecks, scalability issues, or risks? This demonstrates senior-level product thinking.</p>\\
    </li>\\
    <li>\\
      <p><strong>Summarize & Check-in:</strong> Briefly recap your solution and the key trade-offs you considered. End by checking in with the interviewer, treating them like a partner. <i>\"This is my high-level approach. What do you think?\"</i> or <i>\"What areas would you like to explore in more detail?\"</i></p>\\
    </li>\\
  </ol>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Sample Example: \"How does Google Maps calculate ETA?\"</h2>\\
  <p class='text-gray-700'><strong>Interviewer:</strong> “Can you walk me through how Google Maps calculates a user's Estimated Time of Arrival (ETA)?”</p>\\
  <p class='text-gray-700'><strong>Step 1: Listen & Clarify</strong></p>\\
  <p class='text-gray-700'>Great question. To make sure I answer what you're looking for, can I ask a few things? Are we talking about ETA for driving, walking, or public transit? And are we focused on the real-time calculation for an active trip, or the initial estimate before a user starts driving?</p>\\
  <p class='text-gray-700'><i>(Let's assume the interviewer says \"real-time ETA for driving.\")</i></p>\\
  <p class='text-gray-700'><strong>Step 2: Define the Scope & Goals</strong></p>\\
  <p class='text-gray-700'>\"Okay, so we're focused on calculating a real-time driving ETA. The primary goal is to provide the user with an accurate and constantly updated arrival time to build trust and help them plan. The system needs to be fast, reliable, and account for changing conditions.\"</p>\\
  <p class='text-gray-700'><strong>Step 3: Structure the System (High-Level)</strong></p>\\
  <p class='text-gray-700'>\"At a high level, the system needs three things:\"</p>\\
  <ol class='list-decimal pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Data Inputs:</strong> Information about the route and current road conditions.</li>\\
    <li><strong>A Processing Engine:</strong> A back-end service that takes this data and runs a calculation.</li>\\
    <li><strong>An Output:</strong> The final ETA delivered back to the user's app.</li>\\
  </ol>\\
  <p class='text-gray-700'><strong>Step 4: Explain the Components (Step-by-Step)</strong></p>\\
  <p class='text-gray-700'>\"Let's walk through the journey:\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>First, for <strong>Data Inputs</strong>, the system needs several pieces of information. It needs the road network itself like the map, speed limits, and connections. Critically, it needs real-time traffic data, which Google gets anonymously from other users' phones that have location services enabled. It also uses historical traffic data to predict patterns (e.g., rush hour on a Friday).</li>\\
    <li>Next, this data is fed into the <strong>Processing Engine.</strong> This engine uses a sophisticated routing algorithm, something like A* (A-star), to find the most efficient path. It doesn't just look for the shortest distance, but the <strong>fastest</strong> time, weighing different road segments based on the current and predicted traffic.</li>\\
    <li>Finally, the <strong>Output.</strong> The calculated ETA is sent from Google's servers back to the user's device through an API call, and the app's front-end displays it. This process repeats every few moments to keep the ETA fresh.\"</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Step 5: Identify Trade-offs & Risks</strong></p>\\
  <p class='text-gray-700'>\"This system involves some critical trade-offs:\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Accuracy vs. Speed:</strong> A perfectly accurate calculation using every data point might take too long to be useful. The system has to trade a tiny bit of precision for near-instantaneous results.</li>\\
    <li><strong>Data Freshness vs. Cost:</strong> Constantly pinging every phone for location data would drain user batteries and create massive server costs. Google has to sample data intelligently to get a clear picture without overwhelming the system.</li>\\
    <li><strong>A key risk:</strong> is a 'black swan' event, like a sudden accident that blocks a highway. The model might not react instantly, leading to an inaccurate ETA until enough user data signals a new traffic jam. This could temporarily erode user trust.</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Step 6: Summarize & Check-in</strong></p>\\
  <p class='text-gray-700'>\"So, to summarize, the system calculates ETA by combining a map of the road network with real-time and historical traffic data, using a routing algorithm to find the fastest path. It's a system built on balancing the trade-off between accuracy and speed. Does that high-level overview make sense, or is there any part you'd like to dive deeper into?\"</p>\\
</div>\\
"
    },
    {
      "title": "Systems + Infrastructure Questions",
      "completed": 0,
      "summary": "This is the module that often causes the most anxiety: the \"system design\" question. When an interviewer asks you to \"design the backend for Spotify\" or explain \"how Google Docs works,\" it's easy to feel like you're being interviewed for the wrong role. You are not being interviewed for an engineering role. The interviewer knows you're a PM. They want to see how you think about systems, how you prioritize user needs, and how you would collaborate with the engineering team that actually builds it. Your job is to stay at the right altitude: high enough to see the whole picture, but detailed enough to be credible.",
      "content": "Address system design questions by focusing on your role as a PM: start with the user, define system goals, use building blocks (not blueprints), and prioritize trade-offs. Learn essential technical concepts like Client/Front-end, Server/Back-end, API, Database, and Cache/CDN with simple analogies. Practice with an example of 'How Google Docs works' using the 6-step framework.",
      "htmlContent": "<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>Your Job as a PM in System Design</h2>\\
  <p class='text-gray-700'>Typically the following four areas are the expected focus areas for PMs:</p>\\
  <ol class='list-decimal pl-6 space-y-2 text-gray-700'>\\
    <li>\\
      <p><strong>Start with the User:</strong> What problem are we solving? What does a great user experience look like? (e.g., \"For Google Docs, the user needs to see their edits appear instantly and never lose their work.\")</p>\\
    </li>\\
    <li>\\
      <p><strong>Define the System's Goals:</strong> Based on the user experience, what must the system do? (e.g., \"It needs to be real-time, highly reliable, and support collaboration.\")</p>\\
    </li>\\
    <li>\\
      <p><strong>Use Building Blocks, Not Blueprints:</strong> You don't need to know <em>how</em> to build a database. You need to know <em>that you need one</em> and <em>what it's for</em>. Think in terms of major components and what they do.</p>\\
    </li>\\
    <li>\\
      <p><strong>Focus on the Trade-offs:</strong> This is your home turf. Every design choice has a consequence. Your most important job is to identify and articulate these trade-offs from a product perspective (e.g., speed vs. cost, consistency vs. availability).</p>\\
    </li>\\
  </ol>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Your Technical Toolkit: Key Concepts Explained Simply</h2>\\
  <p class='text-gray-700'>To talk about system components, you just need a basic vocabulary. Here are the essentials.</p>\\
  <h3 class='text-lg font-semibold text-gray-900'>Concept: Client / Front-end</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>What It Is (A Simple Analogy):</strong> The part the user sees and interacts with (the app on your phone, the website in your browser).</li>\\
    <li><strong>Why It Matters to a PM:</strong> This directly drives the user experience. You own the requirements for what the client must do.</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-900'>Concept: Server / Back-end</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>What It Is (A Simple Analogy):</strong> The powerful computer that does all the heavy lifting: processing data, running logic, and storing information.</li>\\
    <li><strong>Why It Matters to a PM:</strong> This is the \"engine\" of your product. Its performance impacts speed, reliability, and scale.</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-900'>Concept: API (Application Programming Interface)</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>What It Is (A Simple Analogy):</strong> A waiter that takes orders from the Client and brings them to the Server (the kitchen) to be fulfilled.</li>\\
    <li><strong>Why It Matters to a PM:</strong> APIs define how different parts of a system talk to each other. A good API allows your product to be a platform for others.</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-900'>Concept: Database</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>What It Is (A Simple Analogy):</strong> The library or filing cabinet where all the information is stored (user profiles, photos, comments, etc.).</li>\\
    <li><strong>Why It Matters to a PM:</strong> The choice of database impacts how quickly you can retrieve information and how your product can scale.</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-900'>Concept: Cache / CDN</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>What It Is (A Simple Analogy):</strong> A shortcut. A cache is a small, super-fast memory that stores frequently accessed data so the server doesn't have to look it up every time. A CDN is a geographically distributed cache for large files (like images or videos).</li>\\
    <li><strong>Why It Matters to a PM:</strong> Caching dramatically improves speed and responsiveness, which is critical for user engagement. Using a CDN makes your app feel fast for users anywhere in the world.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Sample Example: \"How does Google Docs work?\"</h2>\\
  <p class='text-gray-700'>Let's use our 6-step framework from the previous module.</p>\\
  <p class='text-gray-700'><strong>Step 1: Clarify</strong></p>\\
  <p class='text-gray-700'>\"Good question. To focus my answer, are you most interested in the real-time collaboration feature where multiple users can type at once, or another aspect like offline mode?\"</p>\\
  <p class='text-gray-700'><i>(Interviewer: \"Let's focus on the real-time collaboration.\")</i></p>\\
  <p class='text-gray-700'><strong>Step 2: Define Scope & Goals</strong></p>\\
  <p class='text-gray-700'>\"Okay, so we're designing the core real-time collaboration for Google Docs. The user goal is that users can see each other's changes instantly and the document always stays in sync. No work should ever be lost. The system goal is that the system must have very low latency (be fast), be highly available (never go down), and ensure data consistency (everyone sees the same version).\"</p>\\
  <p class='text-gray-700'>User Goal: Users can see each other's changes instantly and the document always stays in sync. No work should ever be lost.</p>\\
  <p class='text-gray-700'>System Goal: The system must have very low latency (be fast), be highly available (never go down), and ensure data consistency (everyone sees the same version).</p>\\
  <p class='text-gray-700'><strong>Step 3: Structure the System (High-Level)</strong></p>\\
  <p class='text-gray-700'>\"At a high level, we'll have:\"</p>\\
  <ol class='list-decimal pl-6 space-y-1 text-gray-700'>\\
    <li>The <strong>Client:</strong> The user's web browser, running the Google Docs front-end.</li>\\
    <li>The <strong>Server:</strong> A back-end system that manages document state and user changes.</li>\\
    <li>A <strong>Database:</strong> To permanently store the documents.</li>\\
  </ol>\\
  <p class='text-gray-700'><strong>Step 4: Explain the Components (Step-by-Step)</strong></p>\\
  <p class='text-gray-700'>\"When a user opens a doc, the <strong>Client</strong> (their browser) loads the document from the <strong>Server.</strong>\"</p>\\
  <p class='text-gray-700'>To handle real-time edits, the Client establishes a persistent connection to the Server. When User A types 'hello,' their Client immediately sends that tiny change (e.g., 'insert H at position 5') to the Server via an <strong>API.</strong></p>\\
  <p class='text-gray-700'>The <strong>Server</strong> receives this change, validates it, and then broadcasts it out to all other connected clients (like User B's browser). User B's browser inserts 'H' at position 5 on their screen. The server then saves this new document version to the <strong>Database</strong> for permanent storage.</p>\\
  <p class='text-gray-700'><strong>Step 5: Identify Trade-offs & Risks</strong></p>\\
  <p class='text-gray-700'>\"Here's where the interesting product decisions are:\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Consistency vs. Speed:</strong> What if two users type in the same spot at the exact same time? The system needs a rule to resolve this conflict (called 'operational transforms'). We prioritize a consistent view for everyone over showing an edit that might later be undone, which would be confusing.</li>\\
    <li><strong>Risk - Network Connection:</strong> What if a user goes offline briefly? The client should save changes locally and sync with the <strong>Server</strong> once the connection is back. This ensures no data is lost.</li>\\
    <li><strong>Cost vs. Performance:</strong> Maintaining constant connections for every user is expensive. We trade cost for the magical real-time experience, which is Google Docs' key differentiator.</li>\\
  </ul>\\
  <p class='text-gray-700'><strong>Step 6: Summarize & Check-in</strong></p>\\
  <p class='text-gray-700'>\"So, in summary, Google Docs creates its real-time experience using a persistent connection between the client and server, allowing tiny changes to be sent and broadcast instantly. The core challenge is managing trade-offs between consistency, performance, and cost to create a seamless and reliable user experience. Is there any part you'd like to discuss further?\"</p>\\
</div>\\
"
    },
    {
      "title": "Common Technical Interview Questions",
      "completed": 0,
      "summary": "This module provides concise playbooks for five common technical PM interview questions. The goal is to see our frameworks in action and learn to deliver structured, high-impact answers.",
      "content": "Explore concise playbooks for five common technical PM interview questions: 'Explain a Concept,' 'Explain a System,' 'System Design,' 'Debugging / Data,' and 'Non-Technical Communication.' Each playbook offers hints and sample answers to help you deliver structured, high-impact responses.",
      "htmlContent": "<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>The \"Explain a Concept\" Question</h2>\\
  <p class='text-gray-700'>\"How does an API work?\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Hint:</strong> Use a simple, relatable analogy. The \"waiter in a restaurant\" is the gold standard.</li>\\
    <li><strong>Sample Answer Gist:</strong> \"An API is like a waiter. It's a messenger that takes a request from one application (the customer) and delivers it to another (the kitchen), then brings the response back. It allows different systems to talk to each other in a standard way without needing to know the messy details of how the kitchen works.\"</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>The \"Explain a System\" Question</h2>\\
  <p class='text-gray-700'>\"Why might Gmail search be slower than Google Search?\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Hint:</strong> Start with the different product goals. Compare the systems on key dimensions like data source, freshness, and core job-to-be-done.</li>\\
    <li><strong>Sample Answer Gist:</strong> \"They are optimized for different jobs. Google Search prioritizes <strong>speed</strong> across the public web. Gmail Search prioritizes <strong>security and completeness</strong> for your private, constantly changing data. This trade-off is fundamental: Gmail must ensure every single email is found securely, even if it takes an extra moment.\"</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>The \"System Design\" Question</h2>\\
  <p class='text-gray-700'>\"How would you design a risk alerting system for a fintech app?\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Hint:</strong> Clarify the type of \"risk\" (e.g., fraud). Then, outline the core components and focus on the most critical product trade-off.</li>\\
    <li><strong>Sample Answer Gist:</strong></li>\\
  </ul>\\
  <p class='text-gray-700'>\"Assuming the risk is fraud, the system needs to:</p>\\
  <ol class='list-decimal pl-6 space-y-1 text-gray-700'>\\
    <li>Ingest data like transaction streams.</li>\\
    <li>Use a rules engine to spot suspicious patterns.</li>\\
    <li>Send a notification to the user to confirm.</li>\\
  </ol>\\
  <p class='text-gray-700'>The critical PM trade-off is <strong>false Positives vs. false Negatives.</strong> A false positive annoys a user; a false negative (missing fraud) destroys trust. We must optimize to prevent missed fraud, even if it creates some friction.\"</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>The \"Debugging / Data\" Question</h2>\\
  <p class='text-gray-700'>\"DAU dropped 10%. How would you debug this?\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Hint:</strong> Use a structured, methodical approach. Eliminate simple explanations first.</li>\\
    <li><strong>Sample Answer Gist:</strong></li>\\
  </ul>\\
  <p class='text-gray-700'>\"I'd investigate in this order:</p>\\
  <ol class='list-decimal pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Is the data right?</strong> Check with data engineering for logging or dashboard errors first.</li>\\
    <li><strong>How did it drop?</strong> Segment the data. Was it on iOS/Android? A specific country? New or returning users?</li>\\
    <li><strong>Internal Causes:</strong> Was a new feature shipped? A server outage?</li>\\
    <li><strong>External Causes:</strong> Was it a holiday? A competitor's launch? A major news event?</li>\\
  </ol>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>The \"Non-Technical Communication\" Question</h2>\\
  <p class='text-gray-700'>\"How would you explain cloud computing to a non-technical exec?\"</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>Hint:</strong> Use a strong analogy that focuses on business values such as cost, speed, and flexibility.</li>\\
    <li><strong>Sample Answer Gist:</strong></li>\\
  </ul>\\
  <p class='text-gray-700'>\"Cloud computing is like using the electrical grid instead of building your own power plant. You don't have the massive upfront cost or maintenance burden. You just plug in and pay for what you use. For our business, this means we can:</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>Move faster</li>\\
    <li>Reduce costs</li>\\
    <li>Scale instantly to meet customer demand</li>\\
  </ul>\\
</div>\\
"
    },
    {
      "title": "Engineering Collaboration & Stakeholder Alignment",
      "completed": 0,
      "summary": "A great product is built on great collaboration. Technical skills get you in the room, but your ability to align engineering, business, and design is what makes you an effective PM. Interviewers want to know: are you a force multiplier for your team, or just another source of friction?",
      "content": "Understand the PM's role as a 'Bi-Directional Translator' in engineering collaboration and stakeholder alignment. Learn how to highlight your collaboration style, integrate tech into product vision, translate requirements into engineering stories, and bridge communication with business teams. Practice resolving common tensions like speed vs. quality and tech debt vs. new features, and aligning misaligned stakeholders with a structured approach.",
      "htmlContent": "<div class='p-6 rounded-xl  space-y-6 bg-white text-gray-800'>\\
  <h2 class='text-xl font-bold text-gray-900'>The PM's Role: The Bi-Directional Translator</h2>\\
  <p class='text-gray-700'>In an interview, be sure to highlight your collaboration style. Remember you are the bridge between the market and the makers.</p>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li>You translate <strong>market problems</strong> and <strong>user needs</strong> into clear, actionable problems for your engineering team to solve.</li>\\
    <li>You translate <strong>engineering constraints</strong> and <strong>technical complexity</strong> back into business trade-offs for stakeholders.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Sample Responses for Collaboration Questions</h2>\\
  <p class='text-gray-700'>Here's how to talk about working with engineering day-to-day.</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Respecting Methodologies (Agile, Kanban, etc.)</h3>\\
  <p class='text-gray-700'><strong>Example:</strong> \"<i>I see my role as providing the 'what' and the 'why,' and I trust my engineering partners to own the 'how.' I focus on delivering clear priorities and user stories, and I let the team decide if a two-week sprint or a continuous flow model is the best way to deliver value.</i>\"</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Integrating Tech into Vision</h3>\\
  <p class='text-gray-700'><strong>Example:</strong> \"<i>Engineers are the best source of innovation. I bring my tech lead into the discovery process from day one. I share customer feedback, data, and user pain directly with the entire team so they feel connected to the 'why' behind their work.</i>\"</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Translating to Engineering Stories</h3>\\
  <p class='text-gray-700'><strong>Example:</strong> \"<i>I work with my tech lead to break down large initiatives into small, testable user stories. We always use the 'As a user, I want to..., so that...' format. This ensures every piece of work is directly tied to user value, not just a list of tasks.</i>\"</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Bridging to Business Teams</h3>\\
  <p class='text-gray-700'><strong>Example:</strong> \"<i>I act as a shield and a megaphone for my team. I shield them from random stakeholder requests and megaphone their progress and wins to the rest of the company, always framed in terms of business impact.</i>\"</p>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Resolving Common Tension Example</h2>\\
  <p class='text-gray-700'>Every PM lives these conflicts. Show you can navigate them gracefully.</p>\\
  <h3 class='text-lg font-semibold text-gray-800'>Tension 1: Speed vs. Quality (\"We need this feature now!\")</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>The Conflict:</strong> The business wants a feature immediately, but engineering warns that rushing will create bugs and long-term problems.</li>\\
    <li><strong>The PM's Role:</strong> Re-frame the debate around user risk. Don't ask \"fast or good?\"; ask \"What is the user's tolerance for failure on this feature?\" For a core payment flow, quality is non-negotiable. For a speculative new feature, shipping a \"buggy\" V1 to learn quickly might be the right call. You make that strategic choice explicit.</li>\\
  </ul>\\
  <h3 class='text-lg font-semibold text-gray-800'>Tension 2: Tech Debt vs. New Features (\"We don't have time to refactor.\")</h3>\\
  <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
    <li><strong>The Conflict:</strong> The team wants to pause and fix underlying architectural issues (tech debt), but sales and marketing want more shiny new features.</li>\\
    <li><strong>The PM's Role:</strong> Quantify the cost of inaction. Treat tech debt like financial debt. Explain to stakeholders: \"This debt is costing us. Our feature velocity has slowed by 20% because of it. By investing one sprint to fix it, we can increase our future speed and deliver more value over the next two quarters.\" You are the biggest advocate for paying down debt when it impacts the user experience or the team's ability to ship.</li>\\
  </ul>\\
  <hr class='my-6 border-gray-300'/>\\
  <h2 class='text-xl font-bold text-gray-900'>Example: Aligning Misaligned Stakeholders</h2>\\
  <p class='text-700'>The Head of Sales sold a key client a custom feature, promising it for Q1. Your Tech Lead looks at the request and says it's a 6-month architectural rebuild. Both are furious. What do you do?</p>\\
  <ol class='list-decimal pl-6 space-y-2 text-gray-700'>\\
    <li><strong>Acknowledge and Validate:</strong> Get both stakeholders in a room (or call). Start by saying, \"It's clear we have a conflict between a critical client need and our technical reality. Both perspectives are valid. Let's find a path forward.\"</li>\\
    <li>\\
      <p><strong>Dig into the \"Why\"</strong></p>\\
      <ul class='list-disc pl-6 space-y-1 text-gray-700'>\\
        <li>To Sales: \"Help me understand the customer's core problem. What is the one thing they absolutely must be able to do in Q1 to feel successful?\"</li>\\
        <li>To Engineering: \"Help me understand the complexity. What makes this a 6-month project? Is there any smaller, simpler version we could build first?\"</li>\\
      </ul>\\
    </li>\\
    <li>\\
      <p><strong>Find the MVP (Minimum Viable Path):</strong> You'll often discover the customer doesn't need the perfect, scalable version. They need a specific pain solved. Work with engineering to define the simplest possible solution that solves that core pain point.</p>\\
    </li>\\
    <li>\\
      <p><strong>Propose a Phased Solution:</strong> Go back to Sales and the client. \"We can deliver a solution in Q1 that solves your immediate problem of [X]. It won't have [Y, Z] yet. We will then build the full, scalable version for all customers by Q3. This gets you what you need now and ensures a robust solution for the future.\"</p>\\
    </li>\\
  </ol>\\
  <p class='text-gray-700'>This approach turns you from a mediator into a strategic problem-solver.</p>\\
</div>"
    }
  ]
}
`,
  };
};