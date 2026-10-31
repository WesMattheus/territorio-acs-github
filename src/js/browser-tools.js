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
