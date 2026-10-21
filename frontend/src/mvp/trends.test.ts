import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {parseTrend,parseBls} from './trends'
test('reviewed snapshot validates and retains foreign geography and proxy caveat',async()=>{
 const snapshot=parseTrend(JSON.parse(await readFile(new URL('../../public/data/trend.json',import.meta.url),'utf8')))
 assert.equal(snapshot.geography,'United States');assert.match(snapshot.limitation,/proxy/)
 for(const growthPercent of [null,'35',Infinity,-101]) assert.throws(()=>parseTrend({...snapshot,growthPercent}))
 assert.throws(()=>parseTrend({...snapshot,url:'https://example.com'}))
})
test('upstream parser accepts a changed projection, fails closed on changed markup or absent date',()=>{
 const html='<p>Employment of data scientists is projected to grow <b>12</b> percent from 2026 to 2036</p><p>Last modified date: August 27, 2026</p>'
 const result=parseBls(html);assert.equal(result.growthPercent,12);assert.equal(result.period,'2026–2036');assert.equal(result.published,'August 27, 2026')
 assert.throws(()=>parseBls('<h1>Access Denied</h1>'));assert.throws(()=>parseBls(html.split('<p>Last')[0]))
})
