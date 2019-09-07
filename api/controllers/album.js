module.exports = (app) => {

  var api = app.api.album;

  app.route('/albums')
  .get(api.listar)
  .post(api.adicionar);

  app.route('/albums/:_id')
  .get(api.buscarPorId)
  .put(api.atualizar);

  app.route('/albums/page/:_pageId/term/:term?')
  .get(api.listarPorPaginaFiltro)

}