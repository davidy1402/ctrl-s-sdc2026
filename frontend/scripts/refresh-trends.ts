import { writeFile } from "node:fs/promises"
import { parseBls } from "../src/mvp/trends"
const response=await fetch("https://www.bls.gov/ooh/math/data-scientists.htm", {signal:AbortSignal.timeout(15000)})
if(!response.ok) throw new Error(`BLS returned ${response.status}; existing snapshot unchanged`)
const snapshot=parseBls(await response.text())
await writeFile(new URL("../public/data/trend.json",import.meta.url),JSON.stringify(snapshot,null,2)+"\n")
console.log(`Updated reviewed source candidate: ${snapshot.period}, ${snapshot.growthPercent}%. Review diff before committing.`)
