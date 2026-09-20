/**
 * L3 deterministic rules for agentbio-ai.
 * Ruleset: agent-bio@2026-07-20
 * Retrieved: 2026-07-20 — see SOURCES.md and product-factory/web-research/cursor/rad-A01-A04/agentbio-ai_2026-07-20.md
 */
export const RULESET_ID = 'agent-bio'
export const RULESET_VERSION = '2026-07-20'

export type RuleHit = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  remediation: string
  source: string
  ref: string
  passed: boolean
}

export type RuleDef = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  remediation: string
  source: string
  ref: string
  test: (text: string, inputs: Record<string, string>) => boolean
}

const RULES: RuleDef[] = [
  {
    id: 'BIO-01',
    title: 'First-person voice',
    severity: 'medium',
    remediation: 'Write in first person (I / my) for personal agent bios.',
    source: 'Professional bio craft / personal statement norms',
    ref: 'https://grants.nih.gov/grants-process/write-application/forms-directory/biographical-sketch-common-form',
    test: (text, _inputs) => { return [' i ', 'i\'m', 'i am', 'my ', 'i\'ve'].some((k) => text.includes(k)) },
  },
  {
    id: 'BIO-02',
    title: 'Market / geography present',
    severity: 'medium',
    remediation: 'Name the served market or city.',
    source: 'Local professional disclosure baseline',
    ref: 'https://grants.nih.gov/policy-and-compliance/implementation-of-new-initiatives-and-policies/common-forms-for-biosketch',
    test: (text, _inputs) => { return ['market', 'area', 'city', 'county', 'neighborhood', 'region'].some((k) => text.includes(k)) },
  },
  {
    id: 'BIO-03',
    title: 'No fabricated credentials',
    severity: 'high',
    remediation: 'Avoid unverifiable top-producer / award claims without year/source.',
    source: 'Accuracy / completeness certification principle (NIH Common Form)',
    ref: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-26-018.html',
    test: (text, _inputs) => { if (['#1 agent in the world', 'guaranteed sale', 'never lost a listing'].some((k) => text.includes(k))) return false; return true },
  },
  {
    id: 'BIO-04',
    title: 'Years / experience signal',
    severity: 'low',
    remediation: 'Include years of experience or tenure cue.',
    source: 'Professional preparation section analogy',
    ref: 'https://grants.nih.gov/grants-process/write-application/forms-directory/biographical-sketch-common-form',
    test: (text, _inputs) => { return ['year', 'years', 'experience', 'since'].some((k) => text.includes(k)) },
  },
  {
    id: 'BIO-05',
    title: 'Concrete win or contribution',
    severity: 'medium',
    remediation: 'Cite at least one concrete outcome (closed homes, clients helped).',
    source: 'Contributions / products analogy',
    ref: 'https://grants.nih.gov/policy-and-compliance/implementation-of-new-initiatives-and-policies/common-forms-for-biosketch',
    test: (text, _inputs) => { return ['client', 'closed', 'sold', 'helped', 'transaction', 'family'].some((k) => text.includes(k)) },
  },
  {
    id: 'BIO-06',
    title: 'No cheesy hype stack',
    severity: 'low',
    remediation: 'Reduce stacked clichés (synergy, rockstar, ninja).',
    source: 'Trust-building copy baseline',
    ref: 'https://grants.nih.gov/grants-process/write-application/forms-directory/biographical-sketch-common-form',
    test: (text, _inputs) => { if (['rockstar', 'ninja', 'synergy', 'crushing it'].some((k) => text.includes(k))) return false; return true },
  }
]

export function runDeterministicChecks(inputs: Record<string, string>, modelText = '') {
  const blob = (modelText + '\n' + Object.values(inputs || {}).join('\n')).toLowerCase()
  const hits: RuleHit[] = []
  for (const r of RULES) {
    const passed = r.test(blob, inputs || {})
    if (!passed) {
      hits.push({
        id: r.id,
        title: r.title,
        severity: r.severity,
        remediation: r.remediation,
        source: r.source,
        ref: r.ref,
        passed: false,
      })
    }
  }
  return { rulesetVersion: `${RULESET_ID}@${RULESET_VERSION}`, hits, total: RULES.length }
}

export function listRules() {
  return RULES.map(({ test, ...rest }) => rest)
}
