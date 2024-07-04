document.addEventListener('DOMContentLoaded', function () {
    carregarPerfil();
    carregarColegas();
    carregarRepositorios();
    carregarConteudos();
});

function carregarPerfil() {
    fetch('https://api.github.com/users/palomas0257')
        .then(response => response.json())
        .then(data => renderizarPerfil(data))
        .catch(error => console.error('Erro ao carregar perfil:', error));
}

function renderizarPerfil(data) {
    document.querySelector('#perfil img').src = data.avatar_url;
    document.querySelector('#perfil h2').textContent = data.name;
    document.querySelector('#perfil p:nth-child(3)').textContent = `Bio: ${data.bio}`;
    document.querySelector('#perfil p:nth-child(4)').textContent = `Localização: ${data.location}`;
    document.querySelector('#perfil a').href = data.blog;
}

function carregarColegas() {
    fetch('http://localhost:3000/colegas')
        .then(response => response.json())
        .then(data => renderizarColegas(data))
        .catch(error => console.error('Erro ao carregar colegas:', error));
}

function renderizarColegas(colegas) {
    const colegasContainer = document.querySelector('#colegas .row');
    colegas.forEach(colega => {
        const card = `
            <div class="card colega-card">
                <img src="${colega.foto}" class="card-img-top" alt="${colega.nome}">
                <div class="card-body">
                    <h5 class="card-title">${colega.nome}</h5>
                    <a href="${colega.github}" class="btn btn-primary">GitHub</a>
                </div>
            </div>
        `;
        colegasContainer.innerHTML += card;
    });
}

function carregarRepositorios() {
    fetch('http://localhost:3000/repositorios')
        .then(response => response.json())
        .then(data => renderizarRepositorios(data))
        .catch(error => console.error('Erro ao carregar repositórios:', error));
}

function renderizarRepositorios(repositorios) {
    const reposContainer = document.querySelector('#repositorios .repositorios');
    repositorios.forEach(repo => {
        const card = `
            <div class="card repo-card">
                <div class="card-body">
                    <h5 class="card-title">${repo.nome}</h5>
                    <p class="card-text">${repo.descricao}</p>
                    <a href="${repo.link}" class="btn btn-primary">Ver no GitHub</a>
                </div>
            </div>
        `;
        reposContainer.innerHTML += card;
    });
}

function carregarConteudos() {
    fetch('http://localhost:3000/conteudos')
        .then(response => response.json())
        .then(data => renderizarConteudos(data))
        .catch(error => console.error('Erro ao carregar conteúdos:', error));
}

function renderizarConteudos(conteudos) {
    const conteudosContainer = document.querySelector('.carousel-inner');
    conteudos.forEach((conteudo, index) => {
        const item = `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${conteudo.imagem}" class="d-block w-100" alt="${conteudo.titulo}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${conteudo.titulo}</h5>
                    <p>${conteudo.descricao}</p>
                    <a href="${conteudo.url}" class="btn btn-primary">Saiba mais</a>
                </div>
            </div>
        `;
        conteudosContainer.innerHTML += item;
    });
}
