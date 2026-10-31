const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const vm = require('node:vm');
function app(saved) {
  const elements = new Map();
  const listeners = {};
  const storage = new Map(saved ? [['territorio-demo-v1', JSON.stringify(saved)]] : []);
  const context = vm.createContext({
    console, crypto: require('node:crypto').webcrypto, location: {hash: '#/acs'},
    localStorage: {getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},
    window: {addEventListener(){},scrollTo(){}},
    document: {
      querySelector(selector) {
        if (['#visit-form','#review-filter','input[name="version"]:checked'].includes(selector)) return null;
        if (!elements.has(selector)) elements.set(selector,{innerHTML:'',className:'',close(){},showModal(){this.open=true}});
        return elements.get(selector);
      },
      addEventListener(name,fn){(listeners[name] ||= []).push(fn)}
    },
    FormData: class {constructor(form){this.data=form.values}get(k){return this.data[k]??null}has(k){return Object.hasOwn(this.data,k)}},
    setTimeout(fn, ms){if(ms===1100)queueMicrotask(fn);return 1},clearTimeout(){},
  });
  vm.runInContext(readFileSync(join(__dirname,'../dist/app.js'),'utf8'),context);
  return {run:code=>vm.runInContext(code,context), submit(form){for(const fn of listeners.submit)fn({preventDefault(){},target:form})},elements};
}
test('rascunho restaura etapa e campos após reinicializar aplicação', () => {
  const first=app();
  first.run("startVisit(1);visitStep=2;visit.note='Retorno combinado';captureVisit()");
  const next=app(JSON.parse(first.run('JSON.stringify(data)')));
  next.run("location.hash='#/acs/visita/1';render()");
  assert.equal(next.run('visit.note'),'Retorno combinado');
  assert.equal(next.run('visitStep'),2);
});
test('offline e falha preservam fila; nova tentativa não duplica registro',async()=>{
  const a=app();
  a.run('online=false');await a.run('sync()');
  assert.equal(a.run('data.queue[0].status'),'waiting');
  a.run('online=true;failure=true');await a.run('sync()');
  assert.equal(a.run('data.queue[0].status'),'failed');
  await a.run('sync()');await a.run('sync()');
  assert.equal(a.run('data.queue[0].status'),'synced');
  assert.equal(a.run("data.records.filter(r=>r.id==='V-1038').length"),1);
});
test('correção offline só chega na revisão ao sincronizar e preserva versão anterior',async()=>{
  const a=app();a.run('online=false');
  a.submit({id:'correction-form',dataset:{id:'C-1039'},values:{correction:'Casa próxima à escola municipal.'}});
  assert.equal(a.run("data.records.find(r=>r.id==='C-1039').status"),'returned');
  assert.equal(a.run("data.queue.find(r=>r.id==='C-1039').status"),'waiting');
  a.run('online=true');await a.run('sync()');
  assert.equal(a.run("data.records.find(r=>r.id==='C-1039').status"),'pending');
  assert.equal(a.run('data.history[0].previousVersion.reason'),'Complementar a referência do endereço.');
});
test('conclusão preserva resultado, motivo e observação na fila',()=>{
  const a=app();a.run("visitStep=3;viewFamily=1;visit={outcome:'ausente',purpose:'Retorno programado',note:'Vizinho informou ausência.',confirmed:true}");
  a.submit({id:'visit-form',values:{confirmed:'on'},dataset:{}});
  assert.equal(a.run('data.queue[0].outcome'),'ausente');
  assert.equal(a.run('data.queue[0].purpose'),'Retorno programado');
  assert.equal(a.run('data.draft'),null);
});
test('filtro por microárea retorna somente famílias correspondentes',()=>{
  const a=app();a.run("familyArea='02 · Zona rural'");
  assert.match(a.run('familyCards()'),/José Antônio/);
  assert.doesNotMatch(a.run('familyCards()'),/Maria de Lourdes/);
});
test('aprovar conflito exige escolher versão',()=>{
  const a=app();a.run("setRecord('C-1041','approved')");
  assert.equal(a.run("data.records.find(r=>r.id==='C-1041').status"),'conflict');
});
