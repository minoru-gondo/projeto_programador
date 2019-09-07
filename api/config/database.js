module.exports = (host) => {
  var mongoose = require('mongoose');
  var model = mongoose.model('Usuario');
  
  mongoose.connect('mongodb://' + host + ':27017/projeto_programador', { useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  
  mongoose.connection.on('connected', async () => {
    console.log('Conectado ao banco de dados (MongoDB)');
  });
  
  mongoose.connection.on('error', (error) => {
    console.log('Erro na conexão: ' + error);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado do servidor banco de dados (MongoDB)');
  });
  
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Conexão ao banco de dados (MongoDB) foi encerrada pelo término da aplicação');
      process.exit(0);
    });
  });
}