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
