export interface LP {
  id: number;
  name: string;
  tagline: string;
  description: string;
  watchout: string;
  starPrompts: string[];
}

export const lps: LP[] = [
  {
    id: 1,
    name: "Customer Obsession",
    tagline: "Start with the customer. Work backwards.",
    description: "Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.",
    watchout: "Don't confuse stakeholder satisfaction with customer obsession. Distinguish between your internal user and the end customer.",
    starPrompts: [
      "Time you sacrificed short-term metrics for better customer outcome",
      "Time you surfaced a customer pain no one else noticed",
      "Decision you made purely based on customer feedback, against business pressure",
    ],
  },
  {
    id: 2,
    name: "Ownership",
    tagline: "Act like an owner, not a renter.",
    description: "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team. They never say 'that's not my job.'",
    watchout: "Ownership is not micromanagement. Show you took personal accountability without trampling others.",
    starPrompts: [
      "Time you fixed a problem outside your direct responsibility",
      "Decision you made that was unpopular but right for the long term",
      "Time you escalated and personally followed through to resolution",
    ],
  },
  {
    id: 3,
    name: "Invent and Simplify",
    tagline: "If it doesn't need to exist, remove it.",
    description: "Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by 'not invented here.'",
    watchout: "Simple is harder than complex. Be ready to defend why your solution is genuinely simpler, not just different.",
    starPrompts: [
      "Feature or process you simplified that others assumed was necessarily complex",
      "Time you borrowed an idea from another industry and adapted it",
      "Innovation that reduced friction for users or the team",
    ],
  },
  {
    id: 4,
    name: "Are Right, A Lot",
    tagline: "Strong judgment, diverse perspective.",
    description: "Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.",
    watchout: "Don't confuse being confident with being right. Show you actively seek counterarguments, not just confirm your own bias.",
    starPrompts: [
      "Judgment call you made with limited data that turned out correct",
      "Time you changed your mind based on new evidence",
      "Pattern you identified before others saw it",
    ],
  },
  {
    id: 5,
    name: "Learn and Be Curious",
    tagline: "Never satisfied with current knowledge.",
    description: "Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.",
    watchout: "Show learning that directly connects to better outcomes for customers or team, not just personal development.",
    starPrompts: [
      "Skill or domain you mastered outside your comfort zone",
      "Time curiosity led to a meaningful product or technical insight",
      "How you stayed current in a rapidly changing area",
    ],
  },
  {
    id: 6,
    name: "Hire and Develop the Best",
    tagline: "Raise the bar with every hire.",
    description: "Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization. They develop leaders and take that role seriously.",
    watchout: "Developing is not just reviewing. Show coaching conversations, stretch assignments, and how you helped someone grow.",
    starPrompts: [
      "Hire or promotion decision that raised the team's bar",
      "Time you developed someone who went on to bigger things",
      "Mentorship moment that changed someone's trajectory",
    ],
  },
  {
    id: 7,
    name: "Insist on the Highest Standards",
    tagline: "Relentlessly high standards — even when inconvenient.",
    description: "Leaders have relentlessly high standards — many people may think these standards are unreasonably high. Leaders are continually raising the bar and driving their teams to deliver high quality products, services, and processes.",
    watchout: "Standards without context are perfectionism. Show you knew when to hold the line and when to accept good enough.",
    starPrompts: [
      "Time you sent work back because it wasn't good enough",
      "Standard you established that the team now takes for granted",
      "Defect or quality issue you caught before it reached customers",
    ],
  },
  {
    id: 8,
    name: "Think Big",
    tagline: "Small thinking is a self-fulfilling prophecy.",
    description: "Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.",
    watchout: "Thinking big without execution is daydreaming. Show a big vision that you also translated into concrete steps.",
    starPrompts: [
      "Vision you had that others dismissed as too ambitious",
      "Long-term bet you made that paid off",
      "Time you reframed a problem from tactical to strategic",
    ],
  },
  {
    id: 9,
    name: "Bias for Action",
    tagline: "Speed matters. Most decisions are reversible.",
    description: "Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.",
    watchout: "Bias for action ≠ recklessness. Show you assessed reversibility and cost of delay before moving fast.",
    starPrompts: [
      "Calculated risk you took quickly with incomplete information",
      "Time you moved faster than others expected and it mattered",
      "Decision you made unilaterally to unblock the team",
    ],
  },
  {
    id: 10,
    name: "Frugality",
    tagline: "Constraints breed resourcefulness and self-sufficiency.",
    description: "Accomplish more with less. Constraints breed resourcefulness, self-sufficiency, and invention. There are no extra points for growing headcount, budget size, or fixed expense.",
    watchout: "Frugality is not about being cheap — it's about being resourceful. Show how the constraint improved the solution.",
    starPrompts: [
      "Major outcome you delivered with minimal resources",
      "Time you found a creative solution when budget was cut",
      "Process or cost you eliminated without sacrificing quality",
    ],
  },
  {
    id: 11,
    name: "Earn Trust",
    tagline: "Trust is earned through actions, not words.",
    description: "Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when it's awkward or embarrassing. Leaders do not believe their or their team's body odor smells of perfume.",
    watchout: "Earning trust requires vulnerability — sharing failures and uncertainties, not just wins. Show self-awareness.",
    starPrompts: [
      "Time you publicly admitted a mistake and how it built credibility",
      "Relationship you repaired after a trust rupture",
      "How you built credibility quickly with a new team or stakeholder",
    ],
  },
  {
    id: 12,
    name: "Dive Deep",
    tagline: "No problem is too small to understand fully.",
    description: "Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdotes differ. No task is beneath them.",
    watchout: "Diving deep is not micromanaging. Show you go deep to verify, then step back once trust is established.",
    starPrompts: [
      "Root cause you found only because you went beyond the summary data",
      "Time your direct investigation revealed something the reports missed",
      "Process audit that uncovered a systemic issue",
    ],
  },
  {
    id: 13,
    name: "Have Backbone; Disagree and Commit",
    tagline: "Push back with data. Then commit fully.",
    description: "Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Once a decision is determined, they commit wholly.",
    watchout: "Backstabbing after the fact is not disagreeing and committing. Show clean escalation and full commitment once decided.",
    starPrompts: [
      "Time you pushed back on a senior leader with data",
      "Decision you disagreed with but executed flawlessly",
      "Time your challenge changed the final direction",
    ],
  },
  {
    id: 14,
    name: "Deliver Results",
    tagline: "Despite setbacks, rise to the occasion and deliver.",
    description: "Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle.",
    watchout: "Delivery without quality is not delivery. Show how you navigated the tension between speed and standards.",
    starPrompts: [
      "High-stakes delivery you completed against serious obstacles",
      "Time you re-planned mid-execution when the original plan failed",
      "Result you achieved that others had written off as impossible",
    ],
  },
  {
    id: 15,
    name: "Strive to be Earth's Best Employer",
    tagline: "Create the conditions for others to do their best work.",
    description: "Leaders work every day to create a safer, more productive, higher performing, more diverse, and more just work environment. They lead with empathy, have fun at work, and make it easy for others to have fun.",
    watchout: "This LP is newer and often underplayed. Show concrete actions — psychological safety, DEI decisions, removing obstacles.",
    starPrompts: [
      "Environment change you made that improved team performance",
      "Time you created psychological safety for a difficult conversation",
      "Initiative you championed for team wellbeing or inclusion",
    ],
  },
  {
    id: 16,
    name: "Success and Scale Bring Broad Responsibility",
    tagline: "Approach decisions with humility and broad awareness.",
    description: "Amazon is big. We must be humble and thoughtful about even the secondary effects of our actions. Our local communities, planet, and future generations need us to be better every day.",
    watchout: "This LP is about second-order effects. Show awareness of how a decision at scale impacts society beyond the immediate product.",
    starPrompts: [
      "Decision where you considered societal or environmental impact",
      "Trade-off you made between business growth and broader responsibility",
      "Time you flagged an ethical concern and how it was resolved",
    ],
  },
];
