export interface Question {
  id: string;
  question: string;
  hint: string;
  framework?: string;
  tags: string[];
}

export interface Round {
  id: number;
  slug: string;
  name: string;
  description: string;
  color: string;
  bgGlow: string;
  icon: string;
  timeLimit: number;
  questions: Question[];
}

export const rounds: Round[] = [
  {
    id: 1,
    slug: "phone-screen",
    name: "Phone Screen",
    description: "First impression—behavioral basics, resume walk-through, and a lightweight product question.",
    color: "#FF9900",
    bgGlow: "rgba(255,153,0,0.12)",
    icon: "📞",
    timeLimit: 120,
    questions: [
      {
        id: "ps-1",
        question: "Walk me through your background and why you're interested in this TPM role at Amazon.",
        hint: "Lead with impact metrics, connect your trajectory to Amazon's scale, and end with why now.",
        framework: "Past → Present → Future arc. Keep it under 2 minutes.",
        tags: ["intro", "behavioral"],
      },
      {
        id: "ps-2",
        question: "Tell me about a product or feature at Amazon that you use and genuinely like. What makes it work?",
        hint: "Pick something non-obvious. Go beyond 'it's convenient' — analyze the UX, business model, and why it wins.",
        framework: "Feature → User problem it solves → Why the design decision was correct → What you'd improve.",
        tags: ["product sense"],
      },
      {
        id: "ps-3",
        question: "If you were PM on the Alexa Shopping team and wanted to launch a new feature, what would be your idea?",
        hint: "Ground it in customer pain, not technology. Use data or anecdote to size the opportunity.",
        framework: "CIRCLES: Customer → Identify needs → Report constraints → Cut, through prioritization → List solutions → Evaluate tradeoffs → Summarize.",
        tags: ["product design", "Alexa"],
      },
      {
        id: "ps-4",
        question: "How does your proposed feature relate to Amazon's mission of being Earth's most customer-centric company?",
        hint: "Tie every feature back to LPs, especially Customer Obsession. Avoid generic answers.",
        tags: ["strategic thinking", "amazon culture"],
      },
      {
        id: "ps-5",
        question: "How would you measure the success of the feature you described?",
        hint: "Define a North Star metric, supporting metrics, guard-rail metrics, and how you'd detect if it's failing.",
        framework: "North Star → Input metrics → Counter metrics → Launch criteria → Long-term health signals.",
        tags: ["metrics", "execution"],
      },
      {
        id: "ps-6",
        question: "Assume your feature failed 60 days after launch. What went wrong and what's your next idea?",
        hint: "Show intellectual honesty about failure. Diagnose before proposing a pivot.",
        framework: "Hypothesize failure modes (low adoption, quality, wrong segment) → Root cause → Pivot or iterate.",
        tags: ["failure analysis", "resilience"],
      },
    ],
  },
  {
    id: 2,
    slug: "bar-raiser",
    name: "Bar Raiser",
    description: "Deep behavioral dive on Amazon's Leadership Principles. The Bar Raiser looks for signal beyond the role.",
    color: "#f87171",
    bgGlow: "rgba(248,113,113,0.12)",
    icon: "⚖️",
    timeLimit: 180,
    questions: [
      {
        id: "br-1",
        question: "Tell me about a time you had to make a decision with incomplete data. What was the outcome?",
        hint: "Amazon values Bias for Action + Are Right, A Lot. Show how you built the best possible mental model fast.",
        framework: "STAR: Situation → Task → Action (what data you gathered/estimated) → Result + what you'd change.",
        tags: ["bias for action", "are right a lot"],
      },
      {
        id: "br-2",
        question: "Describe a situation where you disagreed with your manager or a senior stakeholder. How did you handle it?",
        hint: "This is about Have Backbone; Disagree and Commit. Show you advocated strongly, then fully committed once decided.",
        framework: "State your position clearly → Evidence you brought → How you raised it → Outcome → How you committed.",
        tags: ["have backbone", "leadership"],
      },
      {
        id: "br-3",
        question: "Give me an example of when you took ownership of a problem that was technically outside your scope.",
        hint: "Ownership LP. Show you didn't say 'that's not my job'. Focus on what you personally did.",
        tags: ["ownership", "leadership"],
      },
      {
        id: "br-4",
        question: "Tell me about a time you had to earn trust quickly with a skeptical stakeholder or team.",
        hint: "Earn Trust LP. Actions > words. How did you demonstrate competence and reliability early?",
        framework: "Context of skepticism → Quick wins you identified → Consistent follow-through → Long-term relationship.",
        tags: ["earn trust", "stakeholder management"],
      },
      {
        id: "br-5",
        question: "Describe the most complex technical project you've managed. How did you ensure on-time delivery?",
        hint: "Show systems thinking: risk tracking, dependency mapping, escalation protocols, communication cadence.",
        framework: "Project scope → Key risks you identified → Mitigation strategies → How you tracked progress → Outcome.",
        tags: ["deliver results", "program management"],
      },
      {
        id: "br-6",
        question: "Tell me about a time you had to influence a team or person you had no authority over.",
        hint: "Show you can lead through influence, not just authority. What was your strategy for alignment?",
        framework: "Identify their incentives → Frame shared goals → Build credibility → Find incremental wins → Coalition.",
        tags: ["influence", "leadership"],
      },
      {
        id: "br-7",
        question: "When have you raised the bar for quality on your team, even when it wasn't required?",
        hint: "Insist on the Highest Standards. Give concrete examples — not abstract principles.",
        tags: ["highest standards", "quality"],
      },
    ],
  },
  {
    id: 3,
    slug: "system-design",
    name: "System Design",
    description: "Design scalable distributed systems. You'll be judged on architecture depth, trade-offs, and clarity.",
    color: "#818cf8",
    bgGlow: "rgba(129,140,248,0.12)",
    icon: "🏗️",
    timeLimit: 300,
    questions: [
      {
        id: "sd-1",
        question: "Design a URL shortener like bit.ly that handles 1 billion requests per day.",
        hint: "Start with scale math. 1B req/day ≈ 11,600 req/s. Focus on read-heavy optimization, consistent hashing, and cache strategy.",
        framework: "Requirements → Scale estimation → API design → Data model → High-level design → Deep dive (DB, cache, CDN) → Trade-offs.",
        tags: ["distributed systems", "caching", "hashing"],
      },
      {
        id: "sd-2",
        question: "Design Amazon's product recommendation system.",
        hint: "Collaborative filtering vs content-based vs hybrid. Online vs offline computation. How do you handle cold start?",
        framework: "User signals → Feature engineering → Model selection → Training pipeline → Serving layer → A/B testing infrastructure.",
        tags: ["ML systems", "recommendations", "amazon"],
      },
      {
        id: "sd-3",
        question: "Design a distributed rate limiter for an API gateway.",
        hint: "Token bucket vs leaky bucket vs sliding window. How do you share state across instances?",
        framework: "Algorithms → Distributed state (Redis) → Race conditions → Centralized vs local → Failure modes.",
        tags: ["rate limiting", "distributed systems"],
      },
      {
        id: "sd-4",
        question: "Design a real-time collaborative document editor like Google Docs.",
        hint: "OT (Operational Transformation) vs CRDT. Conflict resolution is the core challenge.",
        framework: "Conflict resolution model → Real-time sync (WebSocket) → Storage (document snapshots + deltas) → Presence indicators.",
        tags: ["real-time", "collaboration", "CRDT"],
      },
      {
        id: "sd-5",
        question: "Design Amazon's order management system to handle Prime Day traffic (10x normal).",
        hint: "Think about idempotency, at-least-once delivery, circuit breakers, and graceful degradation.",
        framework: "Core flows → Peak load planning → Queue-based decoupling → Saga pattern for transactions → Observability.",
        tags: ["event-driven", "high availability", "amazon"],
      },
      {
        id: "sd-6",
        question: "Design a notification system that delivers 100 million push notifications daily.",
        hint: "Fan-out problem. How do you handle priority, deduplication, delivery receipts, and retries?",
        framework: "Write path (event intake) → Fan-out strategy → Channel routing (push/email/SMS) → Dedup + retry → Analytics.",
        tags: ["messaging", "fan-out", "notifications"],
      },
    ],
  },
  {
    id: 4,
    slug: "program-management",
    name: "Program Management",
    description: "Cross-team coordination, roadmap planning, risk management, and working through ambiguity.",
    color: "#2dd4bf",
    bgGlow: "rgba(45,212,191,0.12)",
    icon: "📋",
    timeLimit: 180,
    questions: [
      {
        id: "pm-1",
        question: "You're managing a multi-team program. Three weeks before launch, a critical dependency slips by 6 weeks. What do you do?",
        hint: "Show systematic risk management: assess impact, explore options, communicate early, escalate with solutions.",
        framework: "Assess impact → Generate options (descope, parallel path, partial launch) → Stakeholder comms → Decision framework → New plan.",
        tags: ["risk management", "crisis", "stakeholders"],
      },
      {
        id: "pm-2",
        question: "How would you build a roadmap for a new TPM role where no roadmap currently exists?",
        hint: "Work backwards from business outcomes. Interview stakeholders, identify quick wins vs strategic bets.",
        framework: "Discovery (stakeholder interviews, pain points) → Categorize (must-have, nice-to-have, strategic) → Sequence by impact/effort → Review cadence.",
        tags: ["roadmapping", "ambiguity", "strategy"],
      },
      {
        id: "pm-3",
        question: "Describe your approach to managing a program where two engineering teams have conflicting priorities.",
        hint: "Show you can align on shared outcomes without taking sides. Use data to depersonalize the conflict.",
        framework: "Surface the conflict early → Map incentives of each team → Find shared outcome metric → Escalate trade-off to business owner.",
        tags: ["conflict resolution", "cross-team", "alignment"],
      },
      {
        id: "pm-4",
        question: "How do you distinguish between healthy and unhealthy technical debt when making scope decisions?",
        hint: "Healthy debt = deliberate trade-off with payback plan. Unhealthy = accumulated negligence. Show nuance.",
        framework: "Classify (deliberate vs accidental) → Quantify blast radius → Weigh against feature velocity cost → Payback timeline.",
        tags: ["technical debt", "engineering partnership"],
      },
      {
        id: "pm-5",
        question: "You inherit a program that's 3 months behind and the team is burnt out. How do you stabilize it?",
        hint: "People first, then process, then delivery. Credibility comes from listening before prescribing.",
        framework: "Listen tour → Diagnose root cause (scope, process, people, dependencies) → Quick win → Re-baseline → Sustainable pace.",
        tags: ["turnaround", "team health", "delivery"],
      },
      {
        id: "pm-6",
        question: "How do you communicate program status to executives differently from how you communicate to engineers?",
        hint: "Executives want risk + business impact. Engineers want clarity + unblocking. Same facts, different frame.",
        framework: "Executive: RAG status + business impact + decision needed. Engineers: blockers + action items + timeline.",
        tags: ["communication", "stakeholders", "executive presence"],
      },
    ],
  },
  {
    id: 5,
    slug: "product-sense",
    name: "Product Sense",
    description: "Customer empathy, product design, metrics, and making decisions with ambiguous data.",
    color: "#4ade80",
    bgGlow: "rgba(74,222,128,0.12)",
    icon: "💡",
    timeLimit: 240,
    questions: [
      {
        id: "prd-1",
        question: "Design a product to help elderly users in rural areas access telemedicine.",
        hint: "Start with deep customer empathy. Don't jump to features. Probe constraints: internet access, device literacy, trust.",
        framework: "CIRCLES: Customer → Identify pain → Report constraints → Cut scope → List solutions → Evaluate → Summarize.",
        tags: ["product design", "accessibility", "CIRCLES"],
      },
      {
        id: "prd-2",
        question: "Amazon Alexa's daily active usage has dropped 20% in the last quarter. How do you diagnose and fix this?",
        hint: "Segment the drop before prescribing solutions. External factors? Specific device type? Specific use case?",
        framework: "Clarify metric → External factors → Segment (device, use case, geography) → Root cause hypothesis → A/B test plan.",
        tags: ["metrics", "diagnosis", "Alexa"],
      },
      {
        id: "prd-3",
        question: "How would you improve Amazon's checkout experience?",
        hint: "Baseline current funnel drop-off points. Data-driven identification of friction, not gut feeling.",
        framework: "Map current funnel → Identify drop-off points → Segment by user type → Prioritize by reach × impact × confidence ÷ effort.",
        tags: ["product improvement", "e-commerce", "funnel"],
      },
      {
        id: "prd-4",
        question: "Design a feature for Amazon Prime Video to improve content discovery for new subscribers.",
        hint: "Cold start problem. Balance personalization with exploration. Think about social proof and editorial curation.",
        framework: "User segmentation (new vs returning) → Onboarding flow → Signal collection → Discovery UI patterns → Success metrics.",
        tags: ["content discovery", "Prime Video", "onboarding"],
      },
      {
        id: "prd-5",
        question: "What metrics would you use to measure the health of Amazon's third-party seller marketplace?",
        hint: "Two-sided marketplace: seller health AND buyer health. Don't optimize one at the expense of the other.",
        framework: "Seller metrics (GMV, fulfillment rate, listings) → Buyer metrics (trust, returns, NPS) → Marketplace health (selection, price competitiveness).",
        tags: ["marketplace", "metrics", "two-sided platform"],
      },
      {
        id: "prd-6",
        question: "You need to build a feature but engineering says it'll take 6 months. Business wants it in 2. What do you do?",
        hint: "This is a scoping and trade-off conversation, not a negotiation. Find the 20% that delivers 80% of the value.",
        framework: "Define must-have vs nice-to-have → Identify MLP (Minimum Lovable Product) → Phased delivery → Communicate trade-offs clearly.",
        tags: ["scoping", "tradeoffs", "negotiation"],
      },
    ],
  },
  {
    id: 6,
    slug: "leadership",
    name: "Leadership Deep Dive",
    description: "All 16 Amazon Leadership Principles with STAR stories and coaching on what interviewers seek.",
    color: "#fbbf24",
    bgGlow: "rgba(251,191,36,0.12)",
    icon: "🌟",
    timeLimit: 180,
    questions: [
      {
        id: "lp-1",
        question: "Customer Obsession: Tell me about a time you went beyond what was asked to solve a customer problem.",
        hint: "Show you started with the customer, worked backwards, and made a decision that was right for them even at short-term cost.",
        framework: "STAR — emphasize the customer insight that others missed and the long-term benefit.",
        tags: ["customer obsession"],
      },
      {
        id: "lp-2",
        question: "Ownership: Describe when you treated a problem as your own even though it wasn't your responsibility.",
        hint: "Owners don't say 'that's not my job'. Show the personal risk or effort you took on willingly.",
        tags: ["ownership"],
      },
      {
        id: "lp-3",
        question: "Invent and Simplify: Give an example of a creative or simple solution to a complex problem.",
        hint: "Simple is harder than complex. Show how you stripped away complexity while preserving customer value.",
        tags: ["invent and simplify", "innovation"],
      },
      {
        id: "lp-4",
        question: "Are Right, A Lot: Tell me about a time your judgment was right when others disagreed.",
        hint: "How did you build conviction? Show your data sources, mental models, and how you stress-tested your view.",
        tags: ["are right a lot", "judgment"],
      },
      {
        id: "lp-5",
        question: "Learn and Be Curious: What's the most important thing you've taught yourself recently? Why?",
        hint: "Show you proactively seek knowledge, not just respond to requirements. Connect it to customer or business impact.",
        tags: ["learn and be curious", "growth"],
      },
      {
        id: "lp-6",
        question: "Hire and Develop the Best: Tell me about a time you identified talent that others had overlooked.",
        hint: "Raises the bar. Show your evaluation framework and how you invested in developing someone.",
        tags: ["hire and develop", "talent"],
      },
      {
        id: "lp-7",
        question: "Insist on the Highest Standards: When have you pushed back on 'good enough' that was clearly not good enough?",
        hint: "Show the specific standard you held and why it mattered for the customer. Avoid perfectionism framing.",
        tags: ["highest standards", "quality"],
      },
      {
        id: "lp-8",
        question: "Think Big: Tell me about a time you proposed something that seemed unrealistic at first.",
        hint: "Show a long-term bold vision backed by customer logic, not just ambition. How did you bring people along?",
        tags: ["think big", "vision"],
      },
      {
        id: "lp-9",
        question: "Bias for Action: Give an example of a calculated risk you took quickly. What was your rationale?",
        hint: "Speed matters. Show how you made an 80% decision fast rather than waiting for 100% certainty.",
        framework: "Cost of delay vs cost of error. Show reversibility assessment.",
        tags: ["bias for action", "speed"],
      },
      {
        id: "lp-10",
        question: "Frugality: Tell me about a time you accomplished more with fewer resources.",
        hint: "Constraint-driven creativity. Show how the constraint improved the solution, not just how you survived it.",
        tags: ["frugality", "resourcefulness"],
      },
      {
        id: "lp-11",
        question: "Earn Trust: How have you built trust with someone who was initially skeptical of you or your team?",
        hint: "Actions > words. Small consistent promises fulfilled, transparency about failures, listening before prescribing.",
        tags: ["earn trust", "relationships"],
      },
      {
        id: "lp-12",
        question: "Dive Deep: Tell me about a time your in-depth investigation revealed an issue others had missed.",
        hint: "Show you go beyond dashboards and summaries. Direct observation, data drilling, talking to frontline users.",
        tags: ["dive deep", "analytical rigor"],
      },
      {
        id: "lp-13",
        question: "Have Backbone; Disagree and Commit: When did you push back on a decision from someone senior?",
        hint: "Show courage + respect. You raised the concern with data, they made a call, you committed fully.",
        tags: ["backbone", "disagreement"],
      },
      {
        id: "lp-14",
        question: "Deliver Results: Tell me about your most challenging project delivery. What obstacles did you overcome?",
        hint: "Show you focus on controllable actions, re-plan relentlessly, and never just report problems — you solve them.",
        tags: ["deliver results", "execution"],
      },
      {
        id: "lp-15",
        question: "Strive to be Earth's Best Employer: How have you created an environment where people did their best work?",
        hint: "Psychological safety, growth opportunities, clear expectations. Show specific actions, not management philosophy.",
        tags: ["best employer", "team culture"],
      },
      {
        id: "lp-16",
        question: "Success and Scale Bring Broad Responsibility: Describe how you considered societal impact in a major decision.",
        hint: "Amazon-specific LP. Show awareness of second-order effects on communities, environment, and society at large.",
        tags: ["broad responsibility", "ethics"],
      },
    ],
  },
];
