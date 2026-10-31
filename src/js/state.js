// Amostra fictícia, estado compartilhado e persistência local.
const initialFamilies = [{ id: 1, name: 'Maria de Lourdes', address: 'Rua do Sol, 42', area: '01 · Centro', members: 3, last: '23 set. 2026', priority: true, archived: false }, { id: 2, name: 'José Antônio', address: 'Sítio Boa Esperança, 18', area: '02 · Zona rural', members: 4, last: '28 set. 2026', priority: false, archived: false }, { id: 3, name: 'Ana Beatriz', address: 'Rua das Flores, 105', area: '01 · Centro', members: 2, last: '01 out. 2026', priority: true, archived: false }, { id: 4, name: 'Severino Costa', address: 'Sítio Várzea Grande, 7', area: '03 · Murupé', members: 5, last: '30 set. 2026', priority: false, archived: false }, { id: 5, name: 'Rosa Maria', address: 'Rua da Matriz, 26', area: '01 · Centro', members: 2, last: '02 out. 2026', priority: false, archived: false }];
const seedRecords = [{ id: 'V-1042', family: 1, type: 'Visita domiciliar', agent: 'Carla Santos', area: '01 · Centro', status: 'pending', time: 'Hoje, 08:42', note: 'Cadastro revisado durante visita. Endereço confirmado.' }, { id: 'C-1041', family: 2, type: 'Cadastro domiciliar', agent: 'Paulo Lima', area: '02 · Zona rural', status: 'conflict', time: 'Hoje, 08:35', note: 'Duas versões do endereço aguardam conferência.' }, { id: 'V-1040', family: 3, type: 'Visita domiciliar', agent: 'Carla Santos', area: '01 · Centro', status: 'pending', time: 'Hoje, 08:21', note: 'Acompanhamento de rotina. Família localizada.' }, { id: 'C-1039', family: 4, type: 'Cadastro individual', agent: 'Lúcia Alves', area: '03 · Murupé', status: 'returned', time: 'Ontem, 16:10', note: 'Complementar a referência do endereço.', reason: 'Complementar a referência do endereço.' }];
let saved;
try {
    saved = JSON.parse(localStorage.getItem('territorio-demo-v1'));
}
catch { }
;
if (saved && (!Array.isArray(saved.families) || !Array.isArray(saved.records) || !Array.isArray(saved.queue) || !Array.isArray(saved.history)))
    saved = null;
let data = saved || { families: initialFamilies, records: seedRecords, queue: [{ id: 'V-1038', family: 5, status: 'waiting', note: 'Visita de acompanhamento concluída.' }], history: [], draft: null };
let familyArea = 'all';
let online = true, filter = 'all', query = '', reviewFilter = 'all', areaFilter = 'all', visitStep = 1, viewFamily = 1, visit = { outcome: 'realizada', purpose: 'Acompanhamento de rotina', note: '', confirmed: false }, failure = false, syncBusy = false, undoAction = null;
const $ = s => document.querySelector(s);
const persist = () => { try {
    localStorage.setItem('territorio-demo-v1', JSON.stringify(data));
}
catch {
    toast('Não foi possível salvar neste navegador. Mantenha esta página aberta.');
} };
const recordId = prefix => prefix + '-' + crypto.randomUUID();
const today = () => new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
const dateLabel = () => new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
const family = id => data.families.find(f => f.id == id) || data.families[0];
const now = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
const pending = () => data.records.filter(r => r.status === 'pending' || r.status === 'conflict');
const badge = (text, type = 'gray', ico = '') => `<span class="tag ${type}">${ico ? icon(ico) : ''}${text}</span>`;
const status = r => ({ pending: badge('Aguardando revisão', 'amber'), conflict: badge('Revisão necessária', 'red'), returned: badge('Devolvido para correção', 'red'), approved: badge('Aprovado', 'green'), waiting: badge('Aguardando envio', 'amber', 'clock'), synced: badge('Sincronizado', 'green', 'check'), failed: badge('Falha no envio', 'red', 'alert'), sending: badge('Enviando', 'gray', 'sync') }[r.status] || '');
const btn = (label, action, type = '', ico = '') => `<button class="btn ${type}" data-action="${action}">${ico ? icon(ico) : ''}${label}</button>`;
const go = path => { location.hash = path; };
const route = () => location.hash.slice(1) || '/gestao';
function toast(msg, undo) { clearTimeout(window.toastTimer); undoAction = undo || null; $('#toast').className = 'toast'; $('#toast').innerHTML = `${icon('check')}<span>${esc(msg)}</span>${undo ? '<button data-action="undo">Desfazer</button>' : ''}`; window.toastTimer = setTimeout(() => { $('#toast').className = ''; $('#toast').innerHTML = ''; }, 6500); }
function lab(mobile) { return `<div class="lab"><div class="row"><strong>PROTÓTIPO</strong><span class="muted">Dados fictícios<span class="labelhide"> · Projeto acadêmico de IHC</span></span></div><nav class="switch" aria-label="Escolher protótipo"><a href="#/acs" class="${mobile ? 'active' : ''}">${icon('users')} Agente ACS</a><a href="#/gestao" class="${mobile ? '' : 'active'}">${icon('chart')} Secretaria</a></nav></div>`; }
function brand() { return `<div class="row"><span class="mark">T</span><div class="brand">Território<small>SAÚDE EM CAMPO</small></div></div>`; }
