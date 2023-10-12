# My Employee

## Configuração inicial
### Backend 
Acesse o diretório <em>backend</em> e siga os passos abaixo:
1. Execute composer install;
2. Configure o arquivo .env. Utilize o arquivo .env.example como base e altere as informações de acordo com o seu ambiente:
   <br>DB_DATABASE
   <br>DB_USERNAME
   <br>DB_PASSWORD 
3. Execute php artisan migrate;
4. Execute php artisan serve.
<br><br>
Por padrão o processo irá rodar na porta 8000 

### Frontend
Acesse o diretório <em>frontend</em> e siga os passos abaixo:
1. npm install -g @angular/cli
2. npm install ou yarn install
3. ng serve
<br><br>
Por padrão o processo irá rodar na porta 4200

## Rotas da aplicação
Após ter configurado o backend e frontend. Estamos prontos para utilizar a aplicação.

O frontend tem apenas três rotas: [nomeDoColaborador]/registrar, /registros e [nomeDoColaborador]/validar.

O backend é uma api, ela tem as seguintes rotas:
<br>(get) employees, retorna todos os colaboradores registrados
<br>(get) employees/{employeeName}, retorna um colaborador pelo nome
<br>(post) employees, armazena os dados que o frontend enviar
<br>(post) employees/validate/{id}, valida ou invalida um registro de um colaborador

## Executando a aplicação
Basta acessar a aplicação frontend e digitar algumas das rotas:
<br>[nomeDoColaborador]/registrar
<br>/registros
<br>[nomeDoColaborador]/validar
<br>

Por exemplo http://localhost:4200/josafaverissimo/registrar



