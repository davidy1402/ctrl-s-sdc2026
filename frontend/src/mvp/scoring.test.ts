import {test} from 'node:test'
import assert from 'node:assert/strict'
import {assess,plan} from './scoring'
test('incomplete and invalid inputs never produce recommendations',()=>{
 for(const value of [[],new Array<number>(4),[0,0,0],[0,0,0,3],[0,0,0,NaN],[0,0,0,1.5],[0,0,0,-1],[0,0,0,0,0]]) assert.equal(assess(value).kind,'incomplete')
})
test('known profile has transparent points and weighted total',()=>{
 const result=assess([0,0,0,0]);assert.equal(result.kind,'complete')
 assert.deepEqual(result.signals.map(s=>[s.total,s.maximum,s.score]),[[7,8,88],[6,8,75],[3,7,43]])
 assert.equal(result.match,74)
})
test('all 81 complete profiles stay bounded and deterministic; motivation does not affect score',()=>{
 for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<3;d++){
  const input=[a,b,c,d];const result=assess(input);assert.deepEqual(result,assess(input));assert.equal(result.kind,'complete');assert.ok(result.match!==null&&result.match>=0&&result.match<=100)
  assert.equal(result.match,assess([a,0,c,d]).match)
 }
 assert.notEqual(assess([0,0,0,0]).match,assess([1,0,2,1]).match)
})
test('self-report changes learning order, without removing unverified gaps',()=>{
 assert.equal(plan([])[0].id,'sql');assert.equal(plan(['sql'])[0].id,'excel');assert.equal(plan(['sql']).length,4)
 assert.equal(plan(['sql']).at(-1)?.id,'sql')
})
