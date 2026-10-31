// Gerado por npm run build. Edite src/js/.
// Ícones e utilitários de interface.
const icons = { home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z', users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M17 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0', check: 'm5 12 4 4L19 6', clock: 'M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0', search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0', sync: 'M20 7a9 9 0 0 0-15-2L2 8m0-6v6h6m-4 9a9 9 0 0 0 15 2l3-3m0 6v-6h-6', cloud: 'M8 18H6a4 4 0 1 1 1-7 6 6 0 0 1 12-1 4 4 0 0 1 0 8h-3M12 22V12m-3 3 3-3 3 3', pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0', chart: 'M4 3v18h17M8 16v-5m5 5V6m5 10V9', file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 0v6h6M8 13h8m-8 4h5', alert: 'm12 3 10 18H2zM12 9v4m0 4h.01', chevron: 'm9 5 7 7-7 7', back: 'm15 5-7 7 7 7', plus: 'M12 5v14M5 12h14', close: 'm6 6 12 12M6 18 18 6', download: 'M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5', shield: 'M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6z', wifi: 'M3 9a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 15a5 5 0 0 1 6 0M12 19h.01', edit: 'm16 3 5 5-13 13H3v-5zM14 5l5 5' };
const icon = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[n] || icons.file}"/></svg>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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

// Telas da Secretaria de Saúde.
function desktop() { const r = route(); const nav = [['/gestao', 'chart', 'Visão geral'], ['/gestao/revisao', 'file', 'Revisão de cadastros'], ['/gestao/territorios', 'pin', 'Microáreas'], ['/gestao/relatorios', 'chart', 'Relatórios'], ['/gestao/historico', 'clock', 'Histórico']]; return `${lab(false)}<div class="desktop"><aside class="sidebar">${brand()}<div class="context">Secretaria de Saúde<br><strong style="color:white">Vicência · Pernambuco</strong></div><nav class="nav" aria-label="Menu da Secretaria">${nav.map(([url, i, t]) => `<a href="#${url}" class="${r === url ? 'active' : ''}">${icon(i)}${t}${i === 'file' ? `<span style="margin-left:auto">${pending().length}</span>` : ''}</a>`).join('')}</nav><div class="sidebar-bottom">${icon('shield')} Ambiente de demonstração<br><span style="color:#afc3dd">Sem conexão com o e-SUS</span></div></aside><div class="workspace"><header class="topbar"><div class="row">${icon('home')} <span>Gestão da atenção primária</span></div><div class="row"><span class="date muted">${dateLabel()}</span><span class="avatar">RC</span><div class="small"><strong>Renata Costa</strong><br><span class="muted">Coordenação municipal</span></div></div></header><main class="content">${r.includes('revisao') ? reviewPage() : r.includes('territorios') ? territories() : r.includes('relatorios') ? reports() : r.includes('historico') ? historyPage() : overview()}</main></div></div>`; }
function head(kicker, title, sub, action = '') { return `<div class="pagehead"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p class="sub">${sub}</p></div>${action}</div>`; }
function stat(label, n, cap, i, type = '') { return `<div class="stat"><div class="row between"><p>${label}</p><span style="color:${type === 'amber' ? '#a37510' : 'var(--blue)'}">${icon(i)}</span></div><div class="number">${n}</div><div class="caption">${cap}</div></div>`; }
function overview() { return `${head('Painel municipal', 'O cuidado começa no território.', 'Acompanhe o que chegou do campo e o que precisa da sua atenção.', btn('Exportar resumo', 'export', 'secondary', 'download'))}<div class="stats">${stat('Famílias cadastradas', data.families.filter(f => !f.archived).length, 'Amostra demonstrativa', 'users')}${stat('Registros recebidos', data.records.length, 'Disponíveis nesta demonstração', 'cloud')}${stat('Para revisar', pending().length, 'Inclui divergências de cadastro', 'file', 'amber')}${stat('Devolvidos', data.records.filter(r => r.status === 'returned').length, 'Aguardando correção pelo agente', 'clock')}</div><div class="two-col"><section class="card"><div class="cardhead"><div><h2>Fila de revisão</h2><p class="sub">Comece pelos registros que precisam de conferência.</p></div><a class="linkbtn" href="#/gestao/revisao">Ver todos</a></div>${recordTable(pending().slice(0, 4))}</section><section class="card"><div class="cardhead"><h2>Famílias por microárea</h2>${icon('pin')}</div>${['01 · Centro', '02 · Zona rural', '03 · Murupé'].map(a => { let n = data.families.filter(f => f.area === a && !f.archived).length; return `<div class="barrow"><div class="row between"><span>${a}</span><strong>${n} ${n === 1 ? 'família' : 'famílias'}</strong></div><div class="progress"><span style="width:${n / data.families.length * 100}%"></span></div></div>`; }).join('')}<p class="footnote">Amostra do protótipo. Não representa a cobertura real do município.</p></section></div><div class="two-col sectiongap"><section class="card"><div class="cardhead"><h2>Recebimentos recentes</h2>${badge('Base local de demonstração', 'gray')}</div>${data.records.slice(0, 3).map(r => `<div class="activity"><span class="ico">${icon('cloud')}</span><div><p><strong>${esc(r.agent)}</strong> enviou ${r.type.toLowerCase()} de <strong>${esc(family(r.family).name)}</strong>.</p><small>${r.time} · ${esc(r.area)}</small></div></div>`).join('')}</section><section class="notice"><div class="row">${icon('sync')}<strong>A informação tem um tempo de chegada</strong></div><p style="margin-top:12px">A fila de revisão considera apenas registros recebidos. Cadastros de famílias são compartilhados localmente entre os dois perfis nesta demonstração; visitas aguardam sincronização.</p><p class="footnote">Último recebimento da amostra: ${esc(data.records[0]?.time || 'nenhum')}.</p></section></div>`; }
function recordTable(records) { if (!records.length)
    return `<div class="empty">${icon('check')}<h2>Tudo conferido por aqui</h2><p>Nenhum registro corresponde a esta seleção.</p></div>`; return `<div class="tablewrap"><table><thead><tr><th>Família / registro</th><th>Agente</th><th>Situação</th><th><span class="muted">Ação</span></th></tr></thead><tbody>${records.map(r => `<tr><td><strong>${esc(family(r.family).name)}</strong><small>${r.id} · ${r.type}</small></td><td>${esc(r.agent)}<small>${esc(r.area)}</small></td><td>${status(r)}</td><td><button class="linkbtn" data-action="record:${r.id}">Conferir</button></td></tr>`).join('')}</tbody></table></div>`; }
function reviewPage() { return `${head('Conferência de dados', 'Revisão de cadastros', 'Confira os dados recebidos antes de consolidá-los na base municipal.')}<div class="card"><div class="row between"><h2>${pending().length} registros aguardam sua revisão</h2>${badge('Dados fictícios', 'gray')}</div><div class="filters"><div class="search">${icon('search')}<input class="field" id="review-search" value="${esc(query)}" placeholder="Buscar família ou agente" aria-label="Buscar família ou agente"></div><select class="field" id="review-filter" aria-label="Filtrar situação"><option value="all">Todas as situações</option><option value="pending">Aguardando revisão</option><option value="conflict">Revisão necessária</option><option value="returned">Devolvidos</option><option value="approved">Aprovados</option></select><select class="field" id="area-filter" aria-label="Filtrar microárea"><option value="all">Todas as microáreas</option>${['01 · Centro', '02 · Zona rural', '03 · Murupé'].map(a => `<option>${a}</option>`).join('')}</select></div><div id="review-results">${filteredRecords()}</div></div><p class="footnote">A devolução solicita uma correção ao agente e preserva o registro. Nenhuma ação desta demonstração envia dados ao e-SUS.</p>`; }
function filteredRecords() { return recordTable(data.records.filter(r => (reviewFilter === 'all' || r.status === reviewFilter) && (areaFilter === 'all' || r.area === areaFilter) && `${family(r.family).name} ${r.agent}`.toLowerCase().includes(query.toLowerCase()))); }
function territories() { return `${head('Organização do território', 'Microáreas', 'Distribuição demonstrativa de famílias e agentes.')}<div class="territory">${['01 · Centro', '02 · Zona rural', '03 · Murupé'].map((a, i) => `<section class="card"><div class="row between"><span class="ico">${icon('pin')}</span>${badge('Amostra', 'gray')}</div><h2 style="margin-top:22px">${a}</h2><p class="sub">${['Carla Santos', 'Paulo Lima', 'Lúcia Alves'][i]}</p><hr class="divider"><div class="row between"><span>Famílias ativas</span><strong>${data.families.filter(f => f.area === a && !f.archived).length}</strong></div><div class="row between" style="margin:18px 0"><span>Para revisar</span><strong>${pending().filter(r => r.area === a).length}</strong></div>${btn('Ver registros', `area:${a}`, 'secondary full')}</section>`).join('')}</div>`; }
function reports() { return `${head('Acompanhamento', 'Relatórios', 'Resumo da amostra disponível neste protótipo.', btn('Exportar CSV', 'export', '', 'download'))}<div class="notice">${icon('file')} Exportação demonstrativa para gestão local. O arquivo não é um formato oficial do e-SUS.</div><div class="stats sectiongap">${stat('Recebidos', data.records.length, 'Registros da amostra', 'cloud')}${stat('Aprovados', data.records.filter(r => r.status === 'approved').length, 'Conferidos pela gestão', 'check')}${stat('Pendentes', pending().length, 'Inclui conflitos', 'clock')}${stat('Devolvidos', data.records.filter(r => r.status === 'returned').length, 'Correção solicitada', 'edit')}</div><div class="card"><h2>Distribuição por situação</h2><p class="sub">Atualizada conforme as ações realizadas na demonstração.</p>${['pending', 'conflict', 'returned', 'approved'].map(s => `<div class="barrow"><div class="row between">${status({ status: s })}<strong>${data.records.filter(r => r.status === s).length}</strong></div><div class="progress"><span style="width:${data.records.filter(r => r.status === s).length / Math.max(data.records.length, 1) * 100}%"></span></div></div>`).join('')}</div>`; }
function historyPage() { return `${head('Rastreabilidade', 'Histórico de alterações', 'As ações feitas nesta demonstração ficam registradas neste navegador.')}<div class="card">${!data.history.length ? `<div class="empty">${icon('clock')}<h2>Nenhuma alteração nesta sessão</h2><p>Revise um cadastro para acompanhar seu histórico aqui.</p></div>` : data.history.map(h => `<div class="activity"><span class="ico">${icon('clock')}</span><div style="flex:1"><p><strong>${esc(h.title)}</strong></p><p>${esc(h.detail)}</p><small>${h.time} · ${esc(h.actor)}</small></div>${h.reversible ? btn('Reverter', `revert:${h.id}`, 'secondary') : ''}</div>`).join('')}</div>`; }

// Telas do agente comunitário.
function mobile() { const r = route(); let screen = r.includes('/familia/') ? familyPage(Number(r.split('/').pop())) : r.includes('/morador/') ? newMember(Number(r.split('/').pop())) : r.includes('/cadastro') ? newFamily() : r.includes('/visita/') ? visitPage(Number(r.split('/').pop())) : r.includes('/concluida') ? completePage() : r.includes('/familias') ? familiesPage() : r.includes('/envios') ? syncPage() : r.includes('/rascunhos') ? draftsPage() : mobileHome(); return `${lab(true)}<div class="mobile-stage"><aside class="stage-note"><div class="eyebrow">01 / Agente comunitário</div><h1>Mais perto<br>de cada família.</h1><p>O território na palma da mão. Cadastros, visitas e pendências reunidos em um fluxo simples.</p><div class="num"><b>01</b><span>Encontre a família e inicie a visita.</span></div><div class="num"><b>02</b><span>Salve um rascunho e retome quando precisar.</span></div><div class="num"><b>03</b><span>Confira o que foi salvo e o que já foi enviado.</span></div></aside><div class="phone"><div class="bannerline"></div><header class="phone-top"><div class="row between">${brand()}<span class="avatar">CS</span></div><p class="sub">Carla Santos · Microárea 01, Centro</p></header><div class="connection ${online ? '' : 'off'}"><span class="row" style="gap:7px">${icon(online ? 'wifi' : 'cloud')}${online ? 'Conexão disponível' : 'Sem conexão · salvamento local'}</span><button data-action="toggle-network">${online ? 'Simular offline' : 'Reconectar'}</button></div><main class="mobile-content">${screen}</main><nav class="bottomnav" aria-label="Menu do agente">${[['/acs', 'home', 'Início'], ['/acs/familias', 'users', 'Famílias'], ['/acs/rascunhos', 'file', 'Rascunhos'], ['/acs/envios', 'sync', 'Envios']].map(([url, i, t]) => `<a href="#${url}" class="${r === url ? 'active' : ''}">${icon(i)}${t}</a>`).join('')}</nav></div><aside class="stage-note right"><div class="eyebrow">Experimente o fluxo</div><h2>O trabalho continua sem rede.</h2><p class="sub">Use “Simular offline”, conclua uma visita e acompanhe a fila de envio. Depois, reconecte para sincronizar.</p><div class="simtools"><h3>Sobre esta demonstração</h3><p class="sub">Nomes e registros são fictícios. Os rascunhos ficam apenas neste navegador.</p>${btn('Reiniciar demonstração', 'reset', 'secondary', 'sync')}<p class="footnote">Identidade própria, inspirada na paleta de Pernambuco. Sem marcas ou símbolos oficiais.</p></div></aside></div>`; }
function mobileHome() { let queued = data.queue.filter(q => q.status !== 'synced').length; return `<div class="eyebrow">${dateLabel()}</div><h1>Bom dia, Carla.</h1><p class="sub">Vamos cuidar do seu território?</p><div class="stats">${stat('Famílias', data.families.filter(f => !f.archived).length, 'Na amostra', 'users')}${stat('Para enviar', queued, online ? 'Conexão disponível' : 'Salvos no aparelho', 'cloud')}</div>${data.draft ? `<div class="notice amber"><strong>Você tem uma visita em andamento</strong><p style="margin:8px 0">${esc(family(data.draft.family).name)}</p>${btn('Continuar visita', 'resume', 'secondary full')}</div>` : ''}<div class="cardhead"><h2>Próxima visita</h2>${badge('Prioritária', 'amber')}</div><section class="card next-visit"><div class="row"><span class="avatar">ML</span><div><h3>Maria de Lourdes</h3><p class="sub" style="margin:4px 0">Rua do Sol, 42 · Centro</p></div></div><hr class="divider"><div class="row between small"><span class="muted">3 pessoas na família</span><span>Última visita: 23 set.</span></div><div style="margin-top:20px">${btn('Ver família', 'family:1', 'full', 'users')}</div></section><div class="cardhead"><h2>Seu dia, organizado</h2></div><a href="#/acs/rascunhos" class="familycard"><div class="row between"><div><h3>Retomar rascunhos</h3><p>${data.draft ? '1 visita aguardando conclusão' : 'Nenhuma visita interrompida'}</p></div>${icon('chevron')}</div></a><a href="#/acs/envios" class="familycard"><div class="row between"><div><h3>Conferir envios</h3><p>${queued} ${queued === 1 ? 'registro salvo' : 'registros salvos'} no aparelho</p></div>${icon('chevron')}</div></a>`; }
function familiesPage() { return `<div class="row between"><div><div class="eyebrow">Seu território</div><h1>Famílias</h1></div>${btn('Cadastrar', 'newfamily', 'secondary', 'plus')}</div><div class="search" style="margin-top:22px">${icon('search')}<input id="family-search" class="field" value="${esc(query)}" placeholder="Buscar nome ou endereço" aria-label="Buscar nome ou endereço"></div><div class="pills">${[['all', 'Todas'], ['priority', 'Prioritárias'], ['archived', 'Arquivadas']].map(([v, t]) => `<button class="pill ${filter === v ? 'active' : ''}" data-action="familyfilter:${v}">${t}</button>`).join('')}</div><label class="label" for="family-area">Microárea</label><select id="family-area" class="field" style="margin-bottom:16px"><option value="all">Todas as microáreas</option>${['01 · Centro', '02 · Zona rural', '03 · Murupé'].map(a => `<option ${familyArea === a ? 'selected' : ''}>${a}</option>`).join('')}</select><div id="family-results">${familyCards()}</div>`; }
function familyCards() { let fs = data.families.filter(f => (filter === 'archived' ? f.archived : !f.archived) && (filter !== 'priority' || f.priority) && (familyArea === 'all' || f.area === familyArea) && `${f.name} ${f.address}`.toLowerCase().includes(query.toLowerCase())); return fs.length ? fs.map(f => `<button class="familycard" data-action="family:${f.id}"><div class="row between"><div><h3>${esc(f.name)}</h3><p>${esc(f.address)}</p><p>${f.members} pessoas · Microárea ${esc(f.area)}</p></div>${icon('chevron')}</div>${badge(f.archived ? 'Arquivada' : f.priority ? 'Visita prioritária' : 'Acompanhamento de rotina', f.priority ? 'amber' : 'gray')}</button>`).join('') : `<div class="empty">${icon('search')}<h2>Nenhuma família encontrada</h2><p>Tente outro nome ou altere o filtro.</p></div>`; }
function familyPage(id) { let f = family(id); viewFamily = id; return `<button class="back" data-action="families">${icon('back')} Famílias</button><div class="eyebrow">Cadastro domiciliar · #${String(id).padStart(4, '0')}</div><h1>${esc(f.name)}</h1><p class="sub">${esc(f.address)}<br>Microárea ${esc(f.area)}</p><div class="chips" style="margin-top:16px">${badge(f.archived ? 'Arquivada' : f.priority ? 'Visita prioritária' : 'Acompanhamento', f.priority ? 'amber' : 'gray')}${badge('Dados fictícios')}</div><div class="card sectiongap"><h2>Informações da família</h2><dl class="detailgrid"><div><dt>Moradores</dt><dd>${f.members} pessoas</dd></div><div><dt>Última visita</dt><dd>${f.last}</dd></div><div><dt>Referência</dt><dd>Próximo à praça</dd></div><div><dt>Agente</dt><dd>Carla Santos</dd></div></dl></div>${memberList(f)}<div class="actions-mobile">${f.archived ? btn('Restaurar cadastro', `restore:${id}`, 'full') : btn('Iniciar visita', `start:${id}`, 'full', 'plus')}${!f.archived ? btn('Arquivar cadastro', `archive:${id}`, 'secondary full') : ''}</div>`; }
function newFamily() { return `<button class="back" data-action="families">${icon('back')} Famílias</button><h1>Cadastrar família</h1><p class="sub">Use somente informações fictícias.</p><form id="family-form" class="stack sectiongap"><div><label class="label" for="fname">Responsável familiar *</label><input class="field" id="fname" name="name" required minlength="3" autocomplete="off"></div><div><label class="label" for="faddress">Endereço *</label><input class="field" id="faddress" name="address" required minlength="5" autocomplete="off"><p class="footnote" style="margin-top:7px">Sem consulta de CEP. Digite o endereço manualmente.</p></div><div class="formgrid"><div><label class="label" for="fmembers">Quantidade de moradores *</label><input class="field" id="fmembers" name="members" type="number" min="1" max="30" required value="1"></div><div><label class="label" for="farea">Microárea</label><select class="field" id="farea" name="area"><option>01 · Centro</option><option>02 · Zona rural</option><option>03 · Murupé</option></select></div></div><label class="checkrow"><input type="checkbox" name="priority">Marcar visita como prioritária</label><button class="btn full" type="submit">Salvar no aparelho</button></form>`; }
function draftsPage() { return `<div class="eyebrow">Salvos no aparelho</div><h1>Rascunhos</h1><p class="sub">Continue de onde parou, mesmo sem conexão.</p>${data.draft ? `<div class="card sectiongap"><div class="row between"><h3>${esc(family(data.draft.family).name)}</h3>${badge('Em andamento', 'amber')}</div><p class="sub">Visita domiciliar · salva às ${esc(data.draft.time)}</p><div style="margin-top:20px">${btn('Continuar visita', 'resume', 'full')}</div></div>` : `<div class="empty">${icon('file')}<h2>Nenhum rascunho</h2><p>Ao pausar uma visita, ela ficará disponível aqui.</p><div class="sectiongap">${btn('Ver famílias', 'families', 'secondary')}</div></div>`}`; }
function visitPage(id) { viewFamily = id; let f = family(id); return `<button class="back" data-action="pause">${icon('back')} Salvar e sair</button><h1>Visita domiciliar</h1><p class="sub">${esc(f.name)} · ${esc(f.address)}</p><div class="stepper">${['Visita', 'Registro', 'Revisão'].map((s, i) => `<div class="step ${visitStep === i + 1 ? 'active' : ''}"><b>${i + 1}</b>${s}</div>`).join('')}</div><form id="visit-form">${visitStep === 1 ? `<h2 style="margin-bottom:16px">Como foi o contato?</h2><div class="stack">${[['realizada', 'Visita realizada'], ['ausente', 'Família ausente'], ['remarcar', 'Solicitada outra data']].map(([v, t]) => `<label class="radio-card"><input type="radio" name="outcome" value="${v}" ${visit.outcome === v ? 'checked' : ''}>${t}</label>`).join('')}<div><label class="label" for="purpose">Motivo da visita</label><select id="purpose" name="purpose" class="field">${['Acompanhamento de rotina', 'Atualização cadastral', 'Retorno programado'].map(s => `<option ${visit.purpose === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div></div>` : visitStep === 2 ? `<h2>Registro da visita</h2><p class="sub">Registre apenas o necessário para o acompanhamento.</p><div style="margin-top:20px"><label class="label" for="note">Observações da visita *</label><textarea class="field" id="note" name="note" required minlength="5" placeholder="Ex.: endereço confirmado e retorno combinado.">${esc(visit.note)}</textarea><p class="footnote">Nesta demonstração, não informe dados pessoais reais.</p></div>` : `<div class="card"><h2>Confira antes de concluir</h2><dl class="stack"><div><dt class="muted small">Família</dt><dd style="margin:7px 0">${esc(f.name)}</dd></div><div><dt class="muted small">Contato</dt><dd style="margin:7px 0">${{ realizada: 'Visita realizada', ausente: 'Família ausente', remarcar: 'Solicitada outra data' }[visit.outcome]}</dd></div><div><dt class="muted small">Motivo</dt><dd style="margin:7px 0">${esc(visit.purpose)}</dd></div><div><dt class="muted small">Observações</dt><dd style="margin:7px 0;white-space:pre-wrap">${esc(visit.note)}</dd></div></dl></div><label class="checkrow sectiongap"><input type="checkbox" name="confirmed" required ${visit.confirmed ? 'checked' : ''}>Conferi as informações desta visita.</label><div class="notice sectiongap">${icon('cloud')} A visita ficará salva no aparelho. O envio é confirmado separadamente.</div>`}<div class="savehint" id="savehint">${icon('check')} Rascunho salvo no aparelho</div><div class="actions-mobile"><button class="btn full" type="submit">${visitStep === 3 ? 'Concluir visita' : 'Continuar'}</button>${visitStep > 1 ? btn('Voltar uma etapa', 'prev', 'secondary full') : ''}</div></form>`; }
function completePage() { return `<div class="success"><span class="ico">${icon('check')}</span><div class="eyebrow">Registro concluído</div><h1>Visita salva<br>no aparelho.</h1><p class="sub">O registro está seguro neste navegador e aguarda envio à Secretaria.</p></div><div class="notice amber">${icon('clock')} <strong>Aguardando envio</strong><p style="margin-top:8px">${online ? 'Você pode sincronizar agora na fila de envios.' : 'Quando houver conexão, acesse Envios para sincronizar.'}</p></div><div class="actions-mobile">${btn('Conferir envios', 'envios', 'full', 'sync')}${btn('Voltar ao início', 'home', 'secondary full')}</div>`; }
function syncPage() { let qs = data.queue; return `<div class="eyebrow">Do aparelho para a Secretaria</div><h1>Envios</h1><p class="sub">Conexão e envio são estados diferentes.</p><div class="notice ${online ? '' : 'amber'} sectiongap">${icon(online ? 'wifi' : 'cloud')} ${online ? 'Conexão disponível. Os registros podem ser enviados.' : 'Você está offline. Os registros continuam salvos no aparelho.'}</div><div class="sectiongap">${btn(syncBusy ? 'Enviando…' : 'Sincronizar registros', 'sync', 'full', 'sync')}</div><div class="stack sectiongap">${qs.map(q => `<section class="card"><h3>${esc(family(q.family).name)}</h3><p class="sub">${q.id} · ${q.type || 'Visita domiciliar'}</p><div style="margin-top:13px">${status(q)}</div><button class="linkbtn sectiongap" data-action="queue:${q.id}">Ver registro salvo</button>${q.status === 'failed' ? '<p class="error">O envio não foi confirmado. Seus dados foram preservados. Tente novamente.</p>' : ''}${q.status === 'synced' ? `<p class="footnote">Recebimento confirmado às ${q.syncedAt}.</p>` : ''}</section>`).join('') || '<div class="empty">Nenhum registro na fila.</div>'}</div>${data.records.some(r => r.status === 'returned') ? `<div class="cardhead"><h2>Correções solicitadas</h2></div>${data.records.filter(r => r.status === 'returned').map(r => `<section class="card sectiongap"><h3>${esc(family(r.family).name)}</h3><p class="sub">${esc(r.reason || r.note)}</p><div class="sectiongap">${btn('Corrigir e reenviar', `correct:${r.id}`, 'secondary full')}</div></section>`).join('')}` : ''}<div class="simtools"><label class="checkrow"><input id="simulate-failure" type="checkbox" ${failure ? 'checked' : ''}>Simular falha na próxima sincronização</label><p class="footnote">Simulação local, sem envio de dados reais.</p>${btn('Reiniciar demonstração', 'reset', 'secondary full')}</div>`; }
function memberList(f) { const people = f.people || (f.id === 1 ? [{ name: 'Maria de Lourdes', relation: 'Responsável familiar', birth: '1964-04-12' }, { name: 'João Almeida', relation: 'Morador', birth: '1961-02-03' }, { name: 'Luiza Almeida', relation: 'Moradora', birth: '1998-07-17' }] : [{ name: f.name, relation: 'Responsável familiar', birth: '' }]); return `<div class="card sectiongap"><div class="row between"><h2>Moradores</h2>${!f.archived ? `<button class="linkbtn" data-action="newmember:${f.id}">Adicionar</button>` : ''}</div>${people.map(m => `<div class="member"><span class="avatar">${esc(m.name.split(' ').map(x => x[0]).slice(0, 2).join(''))}</span><div><p><strong>${esc(m.name)}</strong></p><small>${esc(m.relation)}${m.birth ? ' · ' + new Date(m.birth + 'T12:00:00').toLocaleDateString('pt-BR') : ''}</small></div></div>`).join('')}<p class="footnote">${f.id === 1 || f.people ? 'Registros fictícios para demonstração.' : 'Exibição parcial dos moradores da amostra.'}</p></div>`; }
function newMember(id) { viewFamily = id; return `<button class="back" data-action="family:${id}">${icon('back')} Voltar à família</button><div class="eyebrow">Cadastro individual</div><h1>Adicionar morador</h1><p class="sub">Família de ${esc(family(id).name)}. Use dados fictícios.</p><form id="member-form" data-family="${id}" class="stack sectiongap"><div><label class="label" for="mname">Nome completo *</label><input class="field" id="mname" name="name" required minlength="3" autocomplete="off"></div><div><label class="label" for="mbirth">Data de nascimento *</label><input class="field" id="mbirth" name="birth" type="date" required max="${new Date().toLocaleDateString('en-CA')}"></div><div><label class="label" for="mrelation">Vínculo com a família</label><select class="field" id="mrelation" name="relation"><option>Morador</option><option>Filho(a)</option><option>Cônjuge</option><option>Outro vínculo</option></select></div><div class="notice">${icon('shield')} CPF e CNS não são solicitados nesta demonstração. Não existe consulta a bases oficiais.</div><button class="btn full" type="submit">Salvar morador no aparelho</button></form>`; }

// Navegação e transições de estado da demonstração.
function render() { const r = route(); if (r.startsWith('/acs/visita/') && data.draft) {
    viewFamily = data.draft.family;
    visit = { ...data.draft.visit };
    visitStep = data.draft.step;
    if (Number(r.split('/').pop()) !== viewFamily) {
        go('/acs/rascunhos');
        return;
    }
} $('#app').innerHTML = r.startsWith('/acs') ? mobile() : desktop(); if ($('#review-filter')) {
    $('#review-filter').value = reviewFilter;
    $('#area-filter').value = areaFilter;
} if (syncBusy) {
    const b = $('[data-action="sync"]');
    if (b)
        b.disabled = true;
} }
function log(title, detail, actor = 'Renata Costa', extra = {}) { const h = { id: Date.now() + Math.random(), title, detail, actor, time: `Hoje, ${now()}`, ...extra }; data.history.unshift(h); persist(); return h; }
function modal(title, body, actions = '') { const d = $('#dialog'); d.innerHTML = `<div class="dialoghead"><h2>${title}</h2><button class="close" data-action="close" aria-label="Fechar">${icon('close')}</button></div><div class="dialogbody">${body}</div>${actions ? `<div class="actions">${actions}</div>` : ''}`; if (!d.open)
    d.showModal(); }
function closeModal() { $('#dialog').close(); }
function openRecord(id) { const r = data.records.find(r => r.id === id); if (!r)
    return; const f = family(r.family); modal('Conferir registro', `<div class="row between"><div><div class="eyebrow">${r.id} · ${r.type}</div><h2>${esc(f.name)}</h2></div>${status(r)}</div><dl class="detailgrid sectiongap"><div><dt>Endereço</dt><dd>${esc(f.address)}</dd></div><div><dt>Microárea</dt><dd>${esc(r.area)}</dd></div><div><dt>Enviado por</dt><dd>${esc(r.agent)}</dd></div><div><dt>Recebimento</dt><dd>${r.time}</dd></div></dl><hr class="divider"><h3>Registro do agente</h3><p class="sub">${esc(r.note)}</p>${r.status === 'conflict' ? `<div class="notice amber sectiongap"><strong>Duas versões precisam de conferência</strong><p>Escolha o endereço confirmado. A outra versão será preservada no histórico.</p></div><div class="stack sectiongap"><label class="radio-card"><input type="radio" name="version" value="Sítio Boa Esperança, 18">Agente: Sítio Boa Esperança, 18</label><label class="radio-card"><input type="radio" name="version" value="Sítio Boa Esperança, 81">Base municipal: Sítio Boa Esperança, 81</label></div><div id="record-error" role="alert"></div>` : ''}${r.reason ? `<div class="notice sectiongap"><strong>Motivo da devolução</strong><p>${esc(r.reason)}</p></div>` : ''}`, r.status === 'approved' ? btn('Fechar', 'close', 'secondary') : btn('Devolver para correção', `return:${id}`, 'secondary') + btn(r.status === 'conflict' ? 'Resolver e aprovar' : 'Aprovar registro', `approve:${id}`)); }
function setRecord(id, newStatus, reason = '') { let r = data.records.find(r => r.id === id); if (!r)
    return; let before = JSON.parse(JSON.stringify(r)); let prevAddress = family(r.family).address; if (r.status === 'conflict' && newStatus === 'approved') {
    let v = $('input[name="version"]:checked');
    if (!v) {
        $('#record-error').innerHTML = '<p class="error">Selecione o endereço confirmado antes de aprovar.</p>';
        return;
    }
    family(r.family).address = v.value;
    r.note += ` Versão confirmada: ${v.value}. Versões anteriores: Sítio Boa Esperança, 18 / Sítio Boa Esperança, 81.`;
} r.status = newStatus; if (reason)
    r.reason = reason; data.history.forEach(h => { if (h.recordBefore?.id === id)
    h.reversible = false; }); let h = log(newStatus === 'approved' ? 'Registro aprovado' : 'Devolvido para correção', `${family(r.family).name} · ${id}${reason ? ' · ' + reason : ''}`, 'Renata Costa', { reversible: true, recordBefore: before, prevAddress }); closeModal(); render(); toast(newStatus === 'approved' ? 'Registro aprovado na base demonstrativa.' : 'Correção solicitada. O registro foi preservado.', () => revert(h.id)); }
function revert(id) { let h = data.history.find(h => h.id == id); if (!h || !h.reversible)
    return; if (h.recordBefore) {
    let idx = data.records.findIndex(r => r.id === h.recordBefore.id);
    data.records[idx] = h.recordBefore;
    family(h.recordBefore.family).address = h.prevAddress;
}
else if (h.familyId) {
    family(h.familyId).archived = h.previousArchived;
} h.reversible = false; log('Ação revertida', h.title + ' · ' + h.detail); render(); toast('Ação revertida. O histórico foi preservado.'); }
function captureVisit() { let form = $('#visit-form'); if (form) {
    let fd = new FormData(form);
    if (fd.has('outcome'))
        visit.outcome = fd.get('outcome');
    if (fd.has('purpose'))
        visit.purpose = fd.get('purpose');
    if (fd.has('note'))
        visit.note = fd.get('note');
    if (visitStep === 3)
        visit.confirmed = fd.has('confirmed');
} data.draft = { family: viewFamily, visit: { ...visit }, step: visitStep, time: now() }; persist(); let hint = $('#savehint'); if (hint)
    hint.innerHTML = `${icon('check')} Rascunho salvo às ${now()}`; }
function startVisit(id) { if (data.draft && data.draft.family !== Number(id)) {
    modal('Uma visita está em andamento', '<p class="sub">Conclua ou retome o rascunho atual antes de iniciar outra visita.</p>', btn('Retomar rascunho', 'resume'));
    return;
} viewFamily = Number(id); if (data.draft) {
    visit = { ...data.draft.visit };
    visitStep = data.draft.step;
}
else {
    visit = { outcome: 'realizada', purpose: 'Acompanhamento de rotina', note: '', confirmed: false };
    visitStep = 1;
    captureVisit();
} go(`/acs/visita/${id}`); }
async function sync() { if (syncBusy)
    return; if (!online) {
    toast('Reconecte para enviar. Os dados locais estão preservados.');
    return;
} let items = data.queue.filter(q => q.status !== 'synced'); if (!items.length) {
    toast('Todos os registros já foram sincronizados.');
    return;
} syncBusy = true; items.forEach(q => q.status = 'sending'); render(); await new Promise(r => setTimeout(r, 1100)); items.forEach(q => { if (failure || !online) {
    q.status = 'failed';
}
else {
    q.status = 'synced';
    q.syncedAt = now();
    if (q.operation === 'correction') {
        const r = data.records.find(r => r.id === q.id);
        if (r) {
            const before = JSON.parse(JSON.stringify(r));
            data.history.forEach(h => { if (h.recordBefore?.id === r.id)
                h.reversible = false; });
            r.note = q.note;
            r.status = 'pending';
            r.time = `Hoje, ${now()}`;
            delete r.reason;
            log('Correção reenviada', `${family(r.family).name} · Registro anterior: ${before.note} · Motivo: ${before.reason || ''} · Correção: ${q.note}`, 'Carla Santos', { previousVersion: before });
        }
    }
    else if (!data.records.some(r => r.id === q.id))
        data.records.unshift({ id: q.id, family: q.family, type: q.type || 'Visita domiciliar', agent: 'Carla Santos', area: family(q.family).area, status: 'pending', time: `Hoje, ${now()}`, note: q.note || 'Registro recebido do agente.', outcome: q.outcome, purpose: q.purpose });
} }); let failed = failure || !online; failure = false; syncBusy = false; persist(); render(); toast(failed ? 'Envio não confirmado. Tente novamente; seus dados foram mantidos.' : 'Recebimento confirmado. Os registros estão na fila da Secretaria.'); }
function exportCSV() { const rows = [['AMOSTRA FICTÍCIA — NÃO É FORMATO OFICIAL DO E-SUS'], ['Registro', 'Família', 'Tipo', 'Agente', 'Microárea', 'Situação'], ...data.records.map(r => [r.id, family(r.family).name, r.type, r.agent, r.area, ({ pending: 'Aguardando revisão', approved: 'Aprovado', returned: 'Devolvido', conflict: 'Revisão necessária' })[r.status]])]; const csv = '\ufeff' + rows.map(r => r.map(v => '"' + String(v).replace(/^[=+@\-\t\r]/, m => "'" + m).replaceAll('"', '""') + '"').join(';')).join('\r\n'); const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); let a = document.createElement('a'); a.href = url; a.download = 'territorio-resumo-demonstrativo.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 3000); toast('Resumo demonstrativo exportado.'); }
async function action(a) { const [name, ...args] = a.split(':'); const id = args.join(':'); switch (name) {
    case 'queue': {
        const q = data.queue.find(q => q.id === id);
        if (q)
            modal('Registro salvo no aparelho', `<h3>${esc(family(q.family).name)}</h3><p class="sub">${esc(q.type || 'Visita domiciliar')}</p>${status(q)}<p class="sub">Contato: ${esc(q.outcome || 'Não informado na amostra')}</p><p class="sub">Motivo: ${esc(q.purpose || 'Não informado na amostra')}</p><p class="sub" style="white-space:pre-wrap">${esc(q.note)}</p>`, btn('Fechar', 'close', 'secondary'));
        break;
    }
    case 'close':
        closeModal();
        break;
    case 'home':
        go('/acs');
        break;
    case 'families':
        go('/acs/familias');
        break;
    case 'envios':
        go('/acs/envios');
        break;
    case 'family':
        go('/acs/familia/' + id);
        break;
    case 'newmember':
        go('/acs/morador/' + id);
        break;
    case 'newfamily':
        go('/acs/cadastro');
        break;
    case 'familyfilter':
        filter = id;
        render();
        break;
    case 'toggle-network':
        online = !online;
        render();
        toast(online ? 'Conexão simulada restabelecida.' : 'Modo offline simulado. Você pode continuar o cadastro.');
        break;
    case 'start':
        startVisit(id);
        break;
    case 'resume':
        if (data.draft) {
            closeModal();
            viewFamily = data.draft.family;
            visit = { ...data.draft.visit };
            visitStep = data.draft.step;
            go('/acs/visita/' + viewFamily);
            render();
        }
        break;
    case 'pause':
        captureVisit();
        go('/acs/rascunhos');
        toast('Rascunho salvo. Continue quando puder.');
        break;
    case 'prev':
        captureVisit();
        visitStep = Math.max(1, visitStep - 1);
        captureVisit();
        render();
        break;
    case 'sync':
        await sync();
        break;
    case 'record':
        openRecord(id);
        break;
    case 'approve':
        setRecord(id, 'approved');
        break;
    case 'return':
        modal('Devolver para correção', `<p class="sub">Explique ao agente o que precisa ser ajustado. O cadastro será preservado.</p><form id="return-form" data-id="${id}" class="sectiongap"><label class="label" for="reason">Motivo da devolução *</label><textarea class="field" name="reason" id="reason" minlength="10" required placeholder="Ex.: informar um ponto de referência para localizar o domicílio."></textarea><button class="btn full sectiongap" type="submit">Confirmar devolução</button></form>`);
        break;
    case 'correct': {
        let r = data.records.find(r => r.id === id);
        modal('Corrigir registro', `<p class="notice">${esc(r.reason || r.note)}</p><form id="correction-form" data-id="${id}" class="sectiongap"><label class="label" for="correction">Informação corrigida *</label><textarea class="field" id="correction" name="correction" required minlength="5">${esc(data.queue.find(q => q.id === id && q.operation === 'correction' && q.status !== 'synced')?.note || '')}</textarea><p class="footnote">A correção será salva no aparelho. Sincronize em Envios para solicitar nova revisão.</p><button class="btn full sectiongap" type="submit">Salvar correção no aparelho</button></form>`);
        break;
    }
    case 'area':
        areaFilter = id;
        reviewFilter = 'all';
        go('/gestao/revisao');
        break;
    case 'export':
        exportCSV();
        break;
    case 'archive':
        modal('Arquivar cadastro?', `<p class="sub">${esc(family(id).name)} deixará a lista ativa. O histórico será mantido e você poderá restaurar o cadastro na lista de arquivados.</p>`, btn('Cancelar', 'close', 'secondary') + btn('Arquivar', `confirmarchive:${id}`));
        break;
    case 'confirmarchive': {
        let f = family(id);
        data.history.forEach(h => { if (h.familyId === f.id)
            h.reversible = false; });
        f.archived = true;
        let h = log('Cadastro arquivado', f.name, 'Carla Santos', { familyId: f.id, previousArchived: false, reversible: true });
        closeModal();
        render();
        toast('Cadastro arquivado. O histórico foi preservado.', () => revert(h.id));
        break;
    }
    case 'restore': {
        let f = family(id);
        data.history.forEach(h => { if (h.familyId === f.id)
            h.reversible = false; });
        f.archived = false;
        log('Cadastro restaurado', f.name, 'Carla Santos');
        render();
        toast('Cadastro restaurado à lista ativa.');
        break;
    }
    case 'revert':
        revert(id);
        break;
    case 'undo':
        if (undoAction)
            undoAction();
        break;
    case 'reset':
        modal('Reiniciar demonstração?', '<p class="sub">Os rascunhos e alterações desta amostra serão substituídos pelos dados fictícios iniciais.</p>', btn('Cancelar', 'close', 'secondary') + btn('Reiniciar', 'confirmreset'));
        break;
    case 'confirmreset':
        localStorage.removeItem('territorio-demo-v1');
        location.reload();
        break;
} }

// Integração opcional de leitura e navegação com o navegador.
if (document.modelContext?.registerTool) {
    for (const tool of [{ name: 'read_demo_state', description: 'Read fictional prototype records and local synchronization state.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: () => ({ online, queue: data.queue, records: data.records, draft: data.draft }) }, { name: 'navigate_prototype', description: 'Open the ACS or Secretariat prototype screen. Does not complete or submit records.', inputSchema: { type: 'object', properties: { screen: { type: 'string', enum: ['acs', 'familias', 'envios', 'gestao', 'revisao', 'historico'] } }, required: ['screen'], additionalProperties: false }, execute: input => { const routes = { acs: '/acs', familias: '/acs/familias', envios: '/acs/envios', gestao: '/gestao', revisao: '/gestao/revisao', historico: '/gestao/historico' }; if (!input || !routes[input.screen])
                throw Error('Tela inválida'); go(routes[input.screen]); render(); return { screen: input.screen }; } }]) {
        try {
            Promise.resolve(document.modelContext.registerTool(tool)).catch(() => { });
        }
        catch { }
    }
}

// Eventos de formulários e inicialização.
document.addEventListener('click', e => { const b = e.target.closest('[data-action]'); if (b) {
    e.preventDefault();
    action(b.dataset.action);
} });
document.addEventListener('input', e => { if (e.target.id === 'family-search') {
    query = e.target.value;
    $('#family-results').innerHTML = familyCards();
} if (e.target.id === 'review-search') {
    query = e.target.value;
    $('#review-results').innerHTML = filteredRecords();
} if (e.target.closest('#visit-form'))
    captureVisit(); });
document.addEventListener('change', e => { if (e.target.id === 'family-area') {
    familyArea = e.target.value;
    $('#family-results').innerHTML = familyCards();
} if (e.target.id === 'review-filter') {
    reviewFilter = e.target.value;
    $('#review-results').innerHTML = filteredRecords();
} if (e.target.id === 'area-filter') {
    areaFilter = e.target.value;
    $('#review-results').innerHTML = filteredRecords();
} if (e.target.id === 'simulate-failure')
    failure = e.target.checked; });
document.addEventListener('submit', e => { e.preventDefault(); const form = e.target, fd = new FormData(form); if (form.id === 'visit-form') {
    captureVisit();
    if (visitStep < 3) {
        visitStep++;
        captureVisit();
        render();
        window.scrollTo(0, 0);
    }
    else {
        const id = recordId('V');
        data.queue.unshift({ id, family: viewFamily, status: 'waiting', note: visit.note, outcome: visit.outcome, purpose: visit.purpose, type: 'Visita domiciliar' });
        family(viewFamily).last = today();
        data.draft = null;
        persist();
        go('/acs/concluida');
    }
} if (form.id === 'family-form') {
    const f = { id: Date.now(), name: fd.get('name').trim(), address: fd.get('address').trim(), members: Number(fd.get('members')), area: fd.get('area'), priority: fd.has('priority'), archived: false, last: 'Ainda sem visita' };
    data.families.push(f);
    data.queue.unshift({ id: recordId('C'), family: f.id, status: 'waiting', type: 'Cadastro domiciliar', note: 'Novo cadastro domiciliar.' });
    persist();
    go('/acs/familia/' + f.id);
    toast('Família salva no aparelho, aguardando envio.');
} if (form.id === 'return-form')
    setRecord(form.dataset.id, 'returned', fd.get('reason').trim()); if (form.id === 'correction-form') {
    let r = data.records.find(r => r.id === form.dataset.id);
    const corrected = fd.get('correction').trim();
    if (corrected.length < 5)
        return;
    const q = { id: r.id, family: r.family, type: r.type, operation: 'correction', status: 'waiting', note: corrected };
    const idx = data.queue.findIndex(item => item.id === r.id);
    if (idx < 0)
        data.queue.unshift(q);
    else
        data.queue[idx] = q;
    persist();
    closeModal();
    render();
    toast('Correção salva no aparelho. Sincronize para reenviar.');
} });
document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && $('#dialog').open) {
    const b = $('#dialog [data-action^="approve:"]');
    if (b) {
        e.preventDefault();
        b.click();
    }
} });
document.addEventListener('submit', e => { if (e.target.id !== 'member-form')
    return; const fd = new FormData(e.target), f = family(Number(e.target.dataset.family)); if (!f.people)
    f.people = f.id === 1 ? [{ name: 'Maria de Lourdes', relation: 'Responsável familiar', birth: '1964-04-12' }, { name: 'João Almeida', relation: 'Morador', birth: '1961-02-03' }, { name: 'Luiza Almeida', relation: 'Moradora', birth: '1998-07-17' }] : [{ name: f.name, relation: 'Responsável familiar', birth: '' }]; f.people.push({ name: fd.get('name').trim(), birth: fd.get('birth'), relation: fd.get('relation') }); f.members++; data.queue.unshift({ id: recordId('I'), family: f.id, status: 'waiting', type: 'Cadastro individual', note: 'Novo morador cadastrado na família.' }); persist(); go('/acs/familia/' + f.id); toast('Morador salvo no aparelho, aguardando envio.'); });
window.addEventListener('hashchange', () => { query = ''; render(); window.scrollTo(0, 0); });
render();
