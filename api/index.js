var app = require('./config/custom-express')();
require('./config/database')('banco-teste');

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000...');
});