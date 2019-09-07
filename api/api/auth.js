var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken'); 

module.exports = function(app) {

     var api = {};
     var model = mongoose.model('Usuario');

     api.autentica = function(req, res) {
      console.log('Autenticando usuário');
      let username = req.body.username;
      let password = req.body.password;
      model.findOne({username, password}).then((user) => {
        if(!user) {
          console.log('Username e senha inválidos');
          res.sendStatus(401); 
        }
        else {
          let token = jwt.sign({ username: user.username }, app.get('secret'), {expiresIn: 7200});
          console.log('Token criado e sendo enviado no header da resposta');
          res.setHeader('x-access-token', token);
          res.status(200).json({ok: true});
        }
      }, (error) => {
        console.log('Username e senha inválidos');
        res.sendStatus(401);
      });
     };

    api.verificaToken = function(req, res, next) {
      if(req.originalUrl === '/autenticar/' || req.originalUrl === '/autenticar') {
        return next();
      }
      else {
        let token = req.headers['x-access-token'];
        if(token) {
          console.log('verificando token...');
          jwt.verify(token, app.get('secret'), (error, decoded) => {
            if(error) {
              console.log('Token rejeitado');
              res.sendStatus(401);
            }
            req.usuario = decoded;
            next();
          });
        }
        else {
          console.log('Token não foi enviado');
          res.sendStatus(401);
        }
      }
    }

    return api;
};