import { hex_sha256 } from "./sha256-min.mjs";

const alvo = '925b39018d531f8662562c4414602d86233fc07483b2440e15ec299e2333ca83'; /*Senha alvo com sal */
const sal = 'botafogo'; /*sal da senha */

if (localStorage.getItem('logado')){
    /*Html da pagina se o usuario estiver logado, com header etc...*/
    document.body.innerHTML = `
    <header style="background-color: grey; padding: 0.5em 1em; position: relative; display: flex; flex-direction: row;">
    <h1 style="color: white; margin: 0px; flex-grow: 1;">Atletas do possível campeão brasileiro 2024</h1>
    <button id="logout" style="background-color: black; border: none; color: white; text-align: center; text-decoration: none; padding: 0.5em 1em; cursor: pointer;">Logout</button>
    <button id="detalhesP" style="background-color: black; border: none; color: white; text-align: center; text-decoration: none; padding: 0.5em 1em; cursor: pointer;">Detalhes</button>
    </header>
    `;

    /*botao de logout remove a autorização do localstorage e reabre a pagina */
    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('logado');
        window.location.href = 'index.html';
    }

    document.getElementById('detalhesP').onclick = () => {
        window.location.href = 'detalhes.html';
    }

    let dados;

    /*Cria div com id filters */
    const divPesquisa = document.createElement('div');
    divPesquisa.id = 'filters';
    divPesquisa.style.textAlign = 'center';
    divPesquisa.style.padding = '5px';
    divPesquisa.style.display = 'flex';
    divPesquisa.style.flexDirection = 'column';
    divPesquisa.style.alignItems = 'center';
    divPesquisa.style.gap = '10px';

    /*Cria um input */
    const inputPesquisa = document.createElement('input');
    inputPesquisa.type = 'text';
    inputPesquisa.placeholder = 'Pesquisar por nome ou posição';
    inputPesquisa.style.padding = '0.5em';
    inputPesquisa.style.width = '50%';
    inputPesquisa.style.maxWidth = '300px';

    /*Cria div para os buttons */
    const divBotoes = document.createElement('div');
    divBotoes.style.display = 'flex';
    divBotoes.style.gap = '10px';

    const mostrarCarregando = () => {
        conteudo.innerHTML = 'Carregando...';
        conteudo.style.color = 'white';
    };

    const atualizarConteudo = (caminho) => {
        mostrarCarregando();
        pegaDados(caminho).then(
            (entrada) => {
                dados = entrada;
                conteudo.innerHTML = '';
                dados.forEach(
                    (atleta) => {
                        conteudo.appendChild(montaCard(atleta))
                    }
                )
            });
    };

    /*Cria um button, que sera usado para filtrar para todos os jogadores */
    const buttonPesquisaT = document.createElement('button');
    buttonPesquisaT.innerHTML = 'Todos';
    buttonPesquisaT.onclick = () => atualizarConteudo("https://botafogo-atletas.mange.li/2024-1/all");
    buttonPesquisaT.style.cssText = `
    background-color: white;
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    padding: 0.5em 1em;
    cursor: pointer;
    `;

    /*Cria um button, que sera usado para filtrar os jogadores masculinos*/
    const buttonPesquisaM = document.createElement('button');
    buttonPesquisaM.innerHTML = 'Masculino';
    buttonPesquisaM.onclick = () => atualizarConteudo("https://botafogo-atletas.mange.li/2024-1/masculino");
    buttonPesquisaM.style.cssText = `
    background-color: white;
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    padding: 0.5em 1em;
    cursor: pointer;
    `;

    /*Cria um button, que sera usado para filtrar as jogadoras femininas*/
    const buttonPesquisaF = document.createElement('button');
    buttonPesquisaF.innerHTML = 'Feminino';
    buttonPesquisaF.onclick = () => atualizarConteudo("https://botafogo-atletas.mange.li/2024-1/feminino");
    buttonPesquisaF.style.cssText = `
    background-color: white;
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    padding: 0.5em 1em;
    cursor: pointer;
    `;

    /*Coloca inputPesquisa e divBotoes (com buttons) dentro da divPesquisa */
    divPesquisa.appendChild(inputPesquisa);
    divBotoes.appendChild(buttonPesquisaT);
    divBotoes.appendChild(buttonPesquisaM);
    divBotoes.appendChild(buttonPesquisaF);
    divPesquisa.appendChild(divBotoes);

    /*Coloca a divPesquisa dentro do body */
    document.body.appendChild(divPesquisa);

    const conteudo = document.createElement('div');
    conteudo.style.display = 'flex';
    conteudo.style.flexWrap = 'wrap';
    conteudo.style.justifyContent = 'center';
    conteudo.style.alignItems = 'center';
    conteudo.style.gap = '10px';
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

    inputPesquisa.onkeyup = (ev) => {
        console.log(ev.target.value);

        if (ev.target.value.length > 3){

            const filtrado = dados.filter(
                (elemento) => {
                    const estaNoNome = elemento.nome.toLowerCase().includes(ev.target.value.toLowerCase())
                    const estaNaPosicao = elemento.posicao.toLowerCase().includes(ev.target.value.toLowerCase())
                    return estaNoNome || estaNaPosicao
                }
            )

            conteudo.innerHTML = '';

            filtrado.forEach(
                (atleta) => (
                    conteudo.appendChild(montaCard(atleta))
                )
            )
        }
    }

    const pegaDados = async(caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }

    pegaDados("https://botafogo-atletas.mange.li/2024-1/all").then(
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
    document.body.innerHTML = `
    <div id="card">
    <div id="card-content">
      <div id="card-title">
        <h2>LOGIN</h2>
        <div class="underline-title"></div>
      </div>
      <form class="form">
        <label for="senha" style="padding-top:22px">&nbsp;Senha</label>
        <input id="senha" class="form-content" type="password" name="password" required />
        <div class="form-border"></div>
        <a href="#">
          <legend id="senhaSite">A senha é botafogo2024</legend>
        </a>
        <input id="btn_login" type="submit" name="submit" value="LOGIN" />
      </form>
    </div>
  </div>
        `

    document.getElementById('btn_login').onclick = () => {
        const entrada = document.getElementById('senha').value;
        const mensagem = document.getElementById('mensagem');
        if (hex_sha256(entrada + sal) === alvo){
            localStorage.setItem('logado', 1);
            window.location.href = 'index.html'
        } else {
            alert('Senha incorreta');
        }
    }
}

export default alvo;
