// Função para pegar o ID do jogador a partir da URL
function getJogadorIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

// Função para buscar os dados do jogador pela URL da API
async function pegaDados(id) {
    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Erro ao buscar os dados do jogador:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar os dados do jogador:', error);
        return null;
    }
}

// Função para montar o card com os dados do jogador
function montaCard(entrada) {
    const card = document.createElement('div');
    card.id = "cardD";

    // Container para a imagem do jogador
    const imgContainer = document.createElement('div');
    imgContainer.id = "imgContainerD";

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.width = '100%';
    imagem.style.height = 'auto';

    imgContainer.appendChild(imagem);

    // Container para as informações do jogador
    const infoContainer = document.createElement('div');
    infoContainer.id = "infoContainerD";

    const nome = document.createElement('p');
    nome.innerHTML = `${entrada.nome}`;
    nome.style.fontSize = '40px';

    const elenco = document.createElement('p');
    elenco.innerHTML = `<strong>Elenco:</strong> ${entrada.elenco}`;
    elenco.style.fontSize = '16px';

    const posicao = document.createElement('p');
    posicao.innerHTML = `<strong>Posição:</strong> ${entrada.posicao}`;
    posicao.style.fontSize = '16px';

    const no_botafogo_desde = document.createElement('p');
    no_botafogo_desde.innerHTML = `<strong>No Botafogo Desde:</strong> ${entrada.no_botafogo_desde}`;
    no_botafogo_desde.style.fontSize = '16px';

    const nascimento = document.createElement('p');
    nascimento.innerHTML = `<strong>Data de Nascimento:</strong> ${entrada.nascimento}`;
    nascimento.style.fontSize = '16px';

    const altura = document.createElement('p');
    altura.innerHTML = `<strong>Altura:</strong> ${entrada.altura}`;
    altura.style.fontSize = '16px';

    const naturalidade = document.createElement('p');
    naturalidade.innerHTML = `<strong>Naturalidade:</strong> ${entrada.naturalidade}`;
    naturalidade.style.fontSize = '16px';

    const detalhes = document.createElement('p');
    detalhes.innerHTML = entrada.detalhes;
    detalhes.style.fontSize = '16px';

    const n_jogos = document.createElement('p');
    n_jogos.innerHTML = entrada.n_jogos.toLowerCase();

    // Botão de voltar
    const buttonVoltar = document.createElement('button');
    buttonVoltar.id = "btn_login";
    buttonVoltar.innerHTML = "Voltar";

    buttonVoltar.onclick = () => {
        window.location.href = "index.html";
    };

    // Adiciona os elementos ao container de informações
    infoContainer.appendChild(nome);
    infoContainer.appendChild(elenco);
    infoContainer.appendChild(posicao);
    infoContainer.appendChild(n_jogos);
    infoContainer.appendChild(no_botafogo_desde);
    infoContainer.appendChild(nascimento);
    infoContainer.appendChild(altura);
    infoContainer.appendChild(naturalidade);
    infoContainer.appendChild(detalhes);
    infoContainer.appendChild(buttonVoltar);

    // Adiciona os containers ao card na ordem desejada
    card.appendChild(imgContainer);
    card.appendChild(infoContainer);

    return card;
}

// Função principal para carregar os dados do jogador e exibir o card
async function carregaDetalhes() {
    if (localStorage.getItem('logado')) {
        document.body.innerHTML = `
        <header style="background-color: #5C5C5C; padding: 0.5em 1em; position: relative; display: flex; flex-direction: row; border-radius: 0.5em;">
            <h1 style="color: white; margin: 0px; flex-grow: 1;">Detalhes do Atleta</h1>
            <button id="logout" style="background-color: black; border: none; border-radius: 0.5em; color: white; text-align: center; text-decoration: none; padding: 0.5em 1em; cursor: pointer;">Logout</button>
        </header>
        `;

        document.getElementById('logout').onclick = () => {
            localStorage.removeItem('logado');
            localStorage.removeItem('jogadorDetalhes');
            window.location.href = 'index.html';
        };

        const jogadorId = getJogadorIdFromUrl();
        if (isNaN(jogadorId) || jogadorId > 60 || jogadorId < 1) {
            document.body.innerHTML += `<p style="color: red; text-align: center; margin-top: 20px;">Erro ao carregar os dados do atleta.</p>`;
        } else {
            const jogador = await pegaDados(jogadorId);

            if (jogador) {
                const conteudo = document.createElement('div');
                conteudo.style.display = 'flex';
                conteudo.style.flexWrap = 'wrap';
                conteudo.style.justifyContent = 'center';
                conteudo.style.alignItems = 'center';
                conteudo.style.gap = '10px';
                conteudo.style.color = 'white';

                const card = montaCard(jogador);
                conteudo.appendChild(card);

                document.body.appendChild(conteudo);
            } else {
                document.body.innerHTML += `<p style="color: red; text-align: center; margin-top: 20px;">Erro ao carregar os dados do atleta.</p>`;
            }
        }
    } else {
        window.location.href = 'index.html';
    }
}

// Chama a função principal para carregar os detalhes do jogador ao carregar a página
carregaDetalhes();