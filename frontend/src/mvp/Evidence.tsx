import { assess, plan, roleWeights } from "./scoring"
import type { Trend } from "./trends"
export function Evidence({answers}:{answers:number[]}) {
 const result=assess(answers)
 if(result.kind === "incomplete") return <section className="mvp-panel"><h2>Insufficient evidence</h2><p>Complete all four assessment responses before receiving a recommendation. The dashboard preview has no assessed profile.</p></section>
 return <section className="mvp-panel"><h2>Your response evidence</h2><p>Exploration alignment: <strong>{result.match}/100</strong>. Editorial rubric v1.0, not proficiency or a probability of career success. Q2 describes motivation and contributes no points. Response speed is never measured.</p>
 {result.signals.map((s,i)=><article key={s.name}><h3>{s.name} · {s.score}/100</h3><p>{s.total} of {s.maximum} possible points · role weight {roleWeights[i]*100}%</p><meter min="0" max="100" value={s.score}>{s.score}</meter><p>{s.evidence.join("; ")}</p><small>{s.confidence}</small></article>)}
 </section>
}
export function TrendPanel({trend,status,refresh}:{trend:Trend|null;status:string;refresh:()=>void}) {
 return <section className="mvp-panel"><h2>Job signal & source</h2><p role="status">{status}</p><button type="button" onClick={refresh} disabled={status.startsWith("Refreshing")}>Refresh from BLS</button>
 {trend ? <><p><a href={trend.url} target="_blank" rel="noreferrer">{trend.source}</a></p><p>{trend.growthPercent}% projected employment growth · {trend.period} · {trend.geography}</p><p>Source updated {trend.published} · checked {trend.checked}</p><p>{trend.limitation}</p><small>{trend.license}</small></> : <p>Trend evidence unavailable; no demand conclusion can be made.</p>}
 <p><a href="https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure" target="_blank" rel="noreferrer">ILO Working Paper 140 · 20 May 2025</a> · reviewed 21 October 2026. Global task exposure context; exposure does not establish job loss. The scenarios are our assumptions, without probabilities.</p>
 </section>
}
export function LearningPlan({selected}:{selected:string[]}) {
 return <details className="mvp-panel learning-disclosure"><summary>Your skills & learning resources</summary><p>Untried topics come first. Self-reported experience remains unverified; tasks marked done do not change assessment scores. Time budgets are demo suggestions.</p><ol>{plan(selected).map(s=><li key={s.id}><h3>{s.name} · {selected.includes(s.id)?"Self-reported — validate with a task":"No skill evidence yet"}</h3><p>{s.task}</p><a href={s.url} target="_blank" rel="noreferrer">{s.resource}</a><small> · link checked 21 October 2026; external resource, no copied course content.</small></li>)}</ol></details>
}
export function SdgMapping(){return <section className="mvp-panel"><h2>Potential SDG contribution</h2><p><a href="https://sdgs.un.org/goals/goal4">Target 4.4</a>: SQL, data cleaning and visualization practice supports employment-related technical skills. Track completed practice artifacts, not clicks.</p><p><a href="https://sdgs.un.org/goals/goal8">Target 8.2</a>: evidence checking and responsible tool use may support productive work. Assess a fictional analysis with a before/after quality rubric; productivity gains are not measured yet.</p><small>Proposed contribution, not validated impact or a UN endorsement. UN target pages checked 21 October 2026.</small></section>}
