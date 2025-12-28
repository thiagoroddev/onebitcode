"";
// Array que vai armazenar todos os usuários carregados
const users = [];
// Função assíncrona que busca um usuário na API do GitHub
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`); // faz a requisição HTTP
    const user = await response.json(); // converte a resposta em JSON tipado
    if (user.message) {
        // Se a API retornar "Not Found", o usuário não existe
        alert('Usuário não encontrado!');
    }
    else {
        users.push(user); // Adiciona o usuário no array
        // Exibe informações básicas do usuário
        alert(`O usuário ${user.login} foi salvo.\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`);
    }
}
// Função que mostra os dados detalhados de um usuário já salvo no array
async function showUser(username) {
    const user = users.find(user => user.login === username); // procura o usuário pelo login
    if (typeof user === 'undefined') {
        alert('Usuário não encontrado!');
    }
    else {
        // Busca os repositórios do usuário
        const response = await fetch(user.repos_url);
        const repos = await response.json();
        // Monta a mensagem com os dados do usuário
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`;
        // Adiciona informações sobre cada repositório
        repos.forEach(repo => {
            message += `\nNome: ${repo.name}` +
                `\nDescrição: ${repo.description}` +
                `\nEstrelas: ${repo.stargazers_count}` +
                `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`;
        });
        alert(message); // Mostra tudo em um alert
    }
}
// Função que lista todos os usuários salvos
function showAllUsers() {
    let message = 'Usuários:\n';
    users.forEach(user => {
        message += `\n- ${user.login}`;
    });
    alert(message);
}
// Função que calcula o total de repositórios públicos somando todos os usuários
function showReposTotal() {
    const reposTotal = users.reduce((accumulator, user) => (accumulator + user.public_repos), 0);
    alert(`O grupo possui um total de ${reposTotal} repositórios públicos!`);
}
// Função que mostra os 5 usuários com mais repositórios públicos
function showTopFive() {
    // Cria uma cópia do array, ordena por repositórios e pega os 5 primeiros
    const topFive = users
        .slice()
        .sort((a, b) => b.public_repos - a.public_repos)
        .slice(0, 5);
    let message = 'Top 5 usuários com mais repositórios públicos:\n';
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`;
    });
    alert(message);
}
// Função principal que executa tudo
async function main() {
    // Busca vários usuários do GitHub
    await fetchUser('isaacpontes');
    await fetchUser('thiagoroddev');
    await fetchUser('pcaldass');
    await fetchUser('lucasqueirogaa');
    await fetchUser('frans203');
    await fetchUser('LeDragoX');
    // Mostra detalhes de dois usuários
    await showUser('isaacpontes');
    await showUser('thiagoroddev');
    // Mostra todos os usuários
    showAllUsers();
    // Mostra o total de repositórios do grupo
    showReposTotal();
    // Mostra os 5 com mais repositórios
    showTopFive();
}
// Chama a função principal para iniciar o programa
main();
