// A ideia aqui seria limitar por tipo de usuario, ja estamos recebendo o usuario com todos os dados,
// talvez a gente so passe o tipo de usuario pelo token e nao todos os dados, seria até melhor.
// ai ou a gente cria um arquivo de autorização para cada tipo de usuario, ou so um com muitos ifs e
// complexo (nao pensei bem como seria essa ideia).
// Proximos passos: 
// -> definir os usuarios
// -> definir as rotas de cada usuario
// -> definir como vamos fazer essas verificações, se vai ser um authentication para cada usuario ou 
//    so um q ja separa tudo lendo o tipo do usuario passado pelo token e definindo se pode ou nao.
//    Acho melhor um arquivo pra cada pq a gnt so verifica se o token ta certo e passa o arquivo na rota