export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "AgentBio AI",
  slug: "agentbio-ai",
  tagline: "An agent bio that builds trust in 60 seconds.",
  description: "From your market, years, and wins, generate a first-person bio for your site, Zillow, or About page - confident, not cheesy.",
  toolTitle: "Write your agent bio",
  resultLabel: "Your agent bio",
  ctaLabel: "Write bio",
  features: [
  "First-person voice",
  "Market positioning",
  "Wins without bragging",
  "Site / Zillow ready"
],
  inputs: [
  {
    "key": "market",
    "label": "Your market",
    "type": "input",
    "placeholder": "e.g. Austin, TX"
  },
  {
    "key": "years",
    "label": "Years experience",
    "type": "input",
    "placeholder": "e.g. 8"
  },
  {
    "key": "specialty",
    "label": "Focus",
    "type": "select",
    "options": [
      "Buyers",
      "Sellers",
      "Investors",
      "Both buyers & sellers"
    ]
  },
  {
    "key": "wins",
    "label": "Notable wins",
    "type": "textarea",
    "placeholder": "e.g. closed 40 deals in 2025, top 5% local agent, first-home specialist"
  }
] as InputField[],
  systemPrompt: "You are a real estate brand writer. Given a market, years of experience, a focus (buyers/sellers/investors/both), and notable wins, write a first-person agent bio: a warm opening, a line on market expertise, 2-3 proof points stated plainly (no bragging), and a confident closing that invites contact. Keep it under 150 words and free of 'passionate' and 'rockstar'. In demo mode, return a realistic sample following this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "3 bios/mo"
  },
  {
    "tier": "Pro",
    "price": "$15/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const m = (inputs['market'] || 'your market').trim()
  const y = (inputs['years'] || '').trim() || 'several'
  const sp = inputs['specialty'] || 'Both buyers & sellers'
  const w = (inputs['wins'] || '').trim()
  let out = 'AGENT BIO (' + m + ' | ' + sp + ')\n\n'
  out += 'Hi, I\'m a ' + sp.toLowerCase() + ' agent in ' + m + ' with ' + y + ' years helping people land the right move.\n\n'
  out += 'I know ' + m + ' block by block - which streets hold value, which schools matter, and how to price without leaving money on the table.\n\n'
  out += 'Recent work:\n'
  out += '- Closed deals steadily through shifting markets\n'
  if (w) out += '- ' + w + '\n'
  out += '\nIf you\'re buying or selling in ' + m + ', let\'s talk - I\'ll keep it straight and get it done.\n\n'
  out += '\n--- (Mock demo. Add your market + wins for a tailored bio.)'
  return out
}
}
