# projeto_programador

## Passo a Passo


> IMPORTANTE: É necessário ter o docker instalado no computador

- Faça o clone do projeto;
- Abra três terminais na pasta do projeto;
- No primeiro faça ```docker network create --driver bridge minha-rede ```  para criar uma rede entre os containers
- Para ver se realmente criou a rede execute: ```docker network ls``` e verifique se aparece a rede ``` minha-rede ```
- Depois faça ```cd database ```

> IMPORTANTE: O usuário e senha cadastrado por padrão é -> usuário: ```fulano``` e senha: ```teste```.
> Se quiser adicionar outro usuário edite o arquivo usuarios.txt conforme a primeira linha desse arquivo;

- Agora execute os seguintes comandos:
  - ```docker build -f Dockerfile -t minorugondo/mongo . ```
  - ```docker run -d -p 27017:27017 --name banco-teste --network minha-rede minorugondo/mongo ```
  - ```docker exec -it banco-teste bash ```
  - ```mongoimport --db projeto_programador --collection albums --type csv --file ./users.csv --fields "_id,nome,username" ```
  - ```mongoimport --db projeto_programador --collection list1 --type csv --file ./lista1.txt --fields "_id,nome,username" ```
  - ```mongoimport --db projeto_programador --collection list2 --type csv --file ./lista2.txt --fields "_id,nome,username" ```
  - ```mongoimport --db projeto_programador --collection usuarios --type csv --file ./usuarios.txt --fields "_id,username,password" ```
  - ```exit ```
  
  
  
- No segundo terminal execute os seguintes comandos:
  - ```cd api ```
  - ```docker build -f Dockerfile -t minorugondo/api .```
  - ```docker run -d -p 8000:8000 --name api-teste --network minha-rede minorugondo/api```
  
  
    
- No terceiro terminal execute os seguintes comandos:
  - ```cd client ```
  - ```docker build -f Dockerfile -t minorugondo/client .```
  - ```docker run -d -p 8080:8080 --name client-teste --network minha-rede minorugondo/client```
  
 
- Agora é só abrir o navegador no endereço: ```localhost:8080``` e fazer login;
