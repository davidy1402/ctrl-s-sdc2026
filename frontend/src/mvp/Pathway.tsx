import { plan } from './scoring'

type Props = { selected:string[]; completed:string[]; onToggle:(id:string)=>void }
export function Pathway({selected,completed,onToggle}:Props) {
  const steps=plan(selected)
  const done=steps.filter(step=>completed.includes(step.id)).length
  const next=steps.find(step=>!completed.includes(step.id))
  return <div className="pathway-workspace">
    <header className="pathway-intro">
      <p className="pathway-context">Data Analyst <span>Foundations</span></p>
      <h1>{done===steps.length ? 'A good start. Keep growing.' : 'One step closer.'}</h1>
      <p>{next ? `Start with ${next.name}. A little practice makes the next step clearer.` : 'You’ve checked off every step. Revisit your work and choose one artifact to improve.'}</p>
    </header>
    <section className="pathway-overview" aria-label="Learning progress">
      <div><strong>{done} of {steps.length} complete</strong><span>{done===steps.length ? 'Ready for review' : 'At your own pace'}</span></div>
      <div className="pathway-track" role="progressbar" aria-label="Practice steps completed" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={done}><i style={{transform:`scaleX(${done/steps.length})`}} /></div>
    </section>
    <ol className="practice-steps">
      {steps.map((step,index)=>{
        const complete=completed.includes(step.id)
        const current=next?.id===step.id
        return <li key={step.id} className={`${complete?'is-complete':''} ${current?'is-current':''}`}>
          <details key={`${step.id}-${current}`} open={current || undefined}>
            <summary><span className="step-number" aria-hidden="true">{complete?'✓':index+1}</span><span className="step-heading"><strong>{step.name}</strong><small>{complete?'Completed':current?'Up next':selected.includes(step.id)?'Review your experience':'Build a foundation'}</small></span><span className="step-chevron" aria-hidden="true">⌄</span></summary>
            <div className="practice-body"><p>{step.task}</p><a className="practice-resource" href={step.url} target="_blank" rel="noreferrer"><span>Open learning resource<small>{step.resource}</small></span><span aria-hidden="true">↗</span></a><button className={`practice-complete ${complete?'complete':''}`} type="button" aria-pressed={complete} onClick={()=>onToggle(step.id)}>{complete?'Mark as incomplete':'Mark complete'}<span aria-hidden="true">{complete?'↶':'✓'}</span></button></div>
          </details>
        </li>
      })}
    </ol>
    <details className="pathway-notes"><summary>How this plan is tailored</summary><p>Untried topics come first. Skills you selected are self-reported and still need practice evidence. Completion is your own record, not a verified qualification; it does not change your assessment score.</p><p>Use fictional practice data. This visit’s progress clears when you reload. Resources were checked on 21 October 2026; the links open external learning sites.</p></details>
  </div>
}
