import type { IncomingMessage, ServerResponse } from 'node:http'
import { parseBls } from '../src/mvp/trends.js'
// Fixed public upstream; assessment responses never leave the browser.
export default async function handler(req:IncomingMessage,res:ServerResponse) {
  res.setHeader('Content-Type','application/json')
  if(req.method !== 'GET') {res.statusCode=405;res.setHeader('Allow','GET');res.end(JSON.stringify({error:'GET only'}));return}
  try {
    const response=await fetch('https://www.bls.gov/ooh/math/data-scientists.htm',{signal:AbortSignal.timeout(8000)})
    if(!response.ok) throw new Error('Upstream unavailable')
    const data=parseBls(await response.text())
    res.setHeader('Cache-Control','public, s-maxage=3600');res.statusCode=200;res.end(JSON.stringify(data))
  } catch {
    res.statusCode=503;res.end(JSON.stringify({error:'Live source unavailable. Use the dated reviewed snapshot.'}))
  }
}
