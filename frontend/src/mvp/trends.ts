export type Trend = {schemaVersion:number; source:string; url:string; published:string; checked:string; period:string; growthPercent:number; geography:string; occupation:string; limitation:string; license:string}
export function parseTrend(value: unknown): Trend {
  if (!value || typeof value !== "object" || !("schemaVersion" in value) || value.schemaVersion !== 1 || !("growthPercent" in value) || typeof value.growthPercent !== "number" || !Number.isFinite(value.growthPercent) || value.growthPercent < -100 || value.growthPercent > 1000) throw new Error("Invalid trend feed")
  for (const key of ["source","url","published","checked","period","geography","occupation","limitation","license"]) {
    if (!(key in value) || typeof Reflect.get(value,key) !== "string" || !Reflect.get(value,key)) throw new Error("Invalid trend metadata")
  }
  // Reconstruct after validating every external field.
  const text = (key:string):string => Reflect.get(value,key)
  if (text("url") !== "https://www.bls.gov/ooh/math/data-scientists.htm" || !/^\d{4}-\d{2}-\d{2}/.test(text("checked"))) throw new Error("Untrusted source")
  return {schemaVersion:1,growthPercent:value.growthPercent,source:text("source"),url:text("url"),published:text("published"),checked:text("checked"),period:text("period"),geography:text("geography"),occupation:text("occupation"),limitation:text("limitation"),license:text("license")}
}
export function parseBls(html:string): Trend {
  const text=html.replace(/<[^>]*>/g," ").replace(/&nbsp;|&#160;/g," ").replace(/\s+/g," ")
  const match=text.match(/Employment of data scientists is projected to grow (\d+(?:\.\d+)?) percent from (\d{4}) to (\d{4})/i)
  const modified=text.match(/Last Modified Date:\s*([A-Za-z]+ \d{1,2}, \d{4})/i)
  if (!match || !modified) throw new Error("BLS page changed; manual review required")
  return parseTrend({schemaVersion:1,source:"U.S. Bureau of Labor Statistics — Data Scientists",url:"https://www.bls.gov/ooh/math/data-scientists.htm",published:modified[1],checked:new Date().toISOString().slice(0,10),period:`${match[2]}–${match[3]}`,growthPercent:Number(match[1]),geography:"United States",occupation:"Data Scientists",limitation:"Related occupation proxy for Data Analyst; not Malaysian demand, an individual forecast, or a guarantee.",license:"U.S. federal government public information; attribution retained."})
}
