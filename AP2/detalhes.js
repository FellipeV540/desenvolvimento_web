if (localStorage.getItem('logado')){
    document.body.innerHTML = `
    <header style="background-color: grey; padding: 0.5em 1em; position: relative; display: flex; flex-direction: row;">
    <h1 style="color: white; margin: 0px; flex-grow: 1;">Atletas do possível campeão brasileiro 2024</h1>
    <button id="logout" style="background-color: black; border: none; color: white; text-align: center; text-decoration: none; padding: 0.5em 1em; cursor: pointer;">Logout</button>
    </header>
    `;
    /*botao de logout remove a autorização do localstorage e reabre a pagina */
    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('logado');
        window.location.href = 'index.html';
    }

    let dados;

        const conteudo = document.createElement('div');
        conteudo.style.display = 'flex';
        conteudo.style.flexWrap = 'wrap';
        conteudo.style.justifyContent = 'center';
        conteudo.style.alignItems = 'center';
        conteudo.style.gap = '10px';
        conteudo.style.color = 'white';
        conteudo.innerHTML = 'carregando...';

        document.body.appendChild(conteudo);

    const montaCard = (entrada) => {
        const card = document.createElement('div');
        card.style.display = 'grid';
        card.style.gridTemplateColumns = '1fr 2fr';
        card.style.gridTemplateAreas = `
        "a1 a2"
        "a1 a3"
        "a4 a4"
        "a5 a5"
        `;
        card.style.width = '30rem';
        card.style.border = 'solid';
        card.style.padding = '.3rem';
        card.style.color = 'black';
        card.style.backgroundColor = 'white';

        const imgContainer = document.createElement('div');
        imgContainer.style.gridArea = 'a1';
        imgContainer.style.display = 'flex';
        imgContainer.style.alignItems = 'center';
        imgContainer.style.justifyContent = 'center';

        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `Foto de ${entrada.nome}`;
        imagem.style.objectFit = 'cover';

        const posicao = document.createElement('p');
        posicao.innerHTML = entrada.posicao;
        posicao.style.cssText = `
            grid-area: a2;
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
        `;

        const nome = document.createElement('p');
        nome.innerHTML = entrada.nome;
        nome.style.gridArea = 'a3';
        nome.style.display = 'flex';
        nome.style.alignItems = 'center';
        nome.style.justifyContent = 'center';
        nome.style.fontWeight = 'bold';
        nome.style.visibility = 'hidden';

        const detalhes = document.createElement('p');
        detalhes.innerHTML = entrada.detalhes;
        detalhes.style.gridArea = 'a4';

        const nascimento = document.createElement('p');
        nascimento.innerHTML = entrada.nascimento;
        nascimento.style.gridArea = 'a5';

        const id = document.createElement('p');
        id.innerHTML = entrada.id

        card.appendChild(imgContainer);
        imgContainer.appendChild(imagem);
        card.appendChild(posicao);
        card.appendChild(nome);
        card.appendChild(detalhes);
        card.appendChild(nascimento);
        card.appendChild(id);

        return card;
    }

    const pegaDados = async(caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }

    pegaDados(`https://botafogo-atletas.mange.li/2024-1/${card.id}`).then(
        (entrada) => {
            dados = entrada;
            conteudo.innerHTML = '';
            dados.forEach(
                (atleta) => {
                    conteudo.appendChild(montaCard(atleta))
                }
            )
        });
}
else {
    window.location.href = 'index.html'
}