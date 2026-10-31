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
