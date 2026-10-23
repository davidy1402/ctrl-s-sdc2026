export const dimensions = ["Analytical reasoning", "Evidence checking", "Collaborative explanation"]
// Editorial exploration rubric v1.0: rows are questions, columns are choices;
// vectors follow dimensions. These are not validated psychometric measures.
export const matrix = [
  [[3, 2, 1], [1, 1, 3], [2, 2, 1]],
  [[0, 0, 0], [0, 0, 0], [0, 0, 0]], // motivation only, excluded from scoring
  [[3, 1, 0], [2, 2, 1], [1, 3, 0]],
  [[1, 3, 2], [1, 1, 3], [2, 2, 2]],
]
export const roleWeights = [0.4, 0.4, 0.2]
export function assess(answers: readonly number[]) {
  const valid = answers.length === 4 && Array.from(answers).every((a, q) => Number.isInteger(a) && a >= 0 && a < (matrix[q]?.length ?? 0))
  if (!valid) return {kind: "incomplete" as const, signals: [], match: null}
  const signals = dimensions.map((name, d) => {
    const total = answers.reduce((sum, a, q) => sum + matrix[q][a][d], 0)
    const maximum = matrix.reduce((sum, row) => sum + Math.max(...row.map(v => v[d])), 0)
    return {name, score: Math.round(total / maximum * 100), total, maximum,
      evidence: answers.flatMap((a, q) => matrix[q][a][d] > 0 ? [`Q${q+1}: choice ${String.fromCharCode(65+a)} → ${matrix[q][a][d]} points`] : []),
      confidence: "Low — three self-described scenarios; no observed task performance"}
  })
  return {kind: "complete" as const, signals, match: Math.round(signals.reduce((sum, s, i) => sum + s.score * roleWeights[i], 0))}
}
export const learning = [
  {id:"sql", name:"SQL", url:"https://sqlbolt.com/", resource:"SQLBolt interactive SQL lessons", task:"Filter a fictional sales table, then join it to a fictional product table."},
  {id:"excel", name:"Tabular data", url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/", resource:"pandas getting started tutorials", task:"Clean a synthetic CSV and explain missing values before computing totals."},
  {id:"visualization", name:"Visualization", url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/04_plotting.html", resource:"pandas plotting tutorial", task:"Plot fictional monthly totals and explain one limitation of the chart."},
  {id:"statistics", name:"Statistical reasoning", url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html", resource:"pandas summary statistics tutorial", task:"Compare mean and median on fictional data; explain why neither proves causation."},
]
export function plan(selected: readonly string[]) {
  // Untested topics first; selecting a skill never supplies proficiency points.
  return [...learning].sort((a,b) => Number(selected.includes(a.id))-Number(selected.includes(b.id)))
}
