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

    const elenco = document.createElement('p');
    elenco.innerHTML = `Elenco: ${entrada.elenco}`

    const imgContainer = document.createElement('div');
    imgContainer.style.gridArea = 'a1';
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.justifyContent = 'center';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.objectFit = 'cover';

    const n_jogos = document.createElement('p');
    n_jogos.innerHTML = entrada.n_jogos

    const nome = document.createElement('p');
    nome.innerHTML = entrada.nome;
    nome.style.gridArea = 'a3';
    nome.style.display = 'flex';
    nome.style.alignItems = 'center';
    nome.style.justifyContent = 'center';
    nome.style.fontWeight = 'bold';

    const posicao = document.createElement('p');
    posicao.innerHTML = `Posição: ${entrada.posicao}`;
    posicao.style.cssText = `
        grid-area: a2;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
    `;

    const naturalidade = document.createElement('p');
    naturalidade.innerHTML = ` Naturalidade: ${entrada.naturalidade}`

    const nascimento = document.createElement('p');
    nascimento.innerHTML = `Data de Nascimento: ${entrada.nascimento}`;
    nascimento.style.gridArea = 'a5';

    const altura = document.createElement('p');
    altura.innerHTML = `Altura: ${entrada.altura}`

    const no_botafogo_desde = document.createElement('p');
    no_botafogo_desde.innerHTML = `No Botafogo Desde: ${entrada.no_botafogo_desde}`

    const detalhes = document.createElement('p');
    detalhes.innerHTML = entrada.detalhes;
    detalhes.style.gridArea = 'a4';

    const buttonVoltar = document.createElement('button')
    buttonVoltar.id = "btn_login"
    buttonVoltar.innerHTML = "Voltar"

    buttonVoltar.onclick = () => {
        window.location.href = "index.html"
    }

    card.appendChild(elenco);
    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    //card.appendChild(n_jogos);
    card.appendChild(nome);
    card.appendChild(posicao);
    card.appendChild(naturalidade);
    card.appendChild(nascimento);
    card.appendChild(altura);
    card.appendChild(no_botafogo_desde);
    card.appendChild(detalhes);
    card.appendChild(buttonVoltar);

    return card;
}

// Função principal para carregar os dados do jogador e exibir o card
async function carregaDetalhes() {
    if (localStorage.getItem('logado')) {
        document.body.innerHTML = `
        <header style="background-color: grey; padding: 0.5em 1em; position: relative; display: flex; flex-direction: row;">
        <h1 style="color: white; margin: 0px; flex-grow: 1;">Detalhes do Atleta</h1>
        <button id="logout" style="background-color: black; border: none; color: white; text-align: center; text-decoration: none; padding: 0.5em 1em; cursor: pointer;">Logout</button>
        </header>
        `;

        document.getElementById('logout').onclick = () => {
            localStorage.removeItem('logado');
            localStorage.removeItem('jogadorDetalhes');
            window.location.href = 'index.html';
        }

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
