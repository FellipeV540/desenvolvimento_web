import { hex_sha256 } from "./sha256-min.mjs";

console.log(hex_sha256('botafogo2024'))
const alvo = '925b39018d531f8662562c4414602d86233fc07483b2440e15ec299e2333ca83'; /*Senha alvo com sal (botafogo2024) */
const sal = 'botafogo'; /*sal da senha */

if (localStorage.getItem('logado')){
    /*Html da pagina se o usuario estiver logado, com header etc...*/
    document.body.innerHTML = `
    <header style="background-color: grey; padding: 0.5em 1em; position: relative; display: flex; flex-direction: row;">
    <h1 style="color: white; margin: 0px; flex-grow: 1;">Atletas do possível campeão brasileiro 2024</h1>
    <button id="logout" style="background-color: black; border: none; border-radius: 0.5em; color: white; text-align: center; text-decoration: none; padding: 0.5em 1em; cursor: pointer;">Logout</button>
    </header>
    `;

    /*botao de logout remove a autorização do localstorage e reabre a pagina */
    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('logado');
        window.location.href = 'index.html';
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
    inputPesquisa.style.borderRadius = '0.5em';

    /*Cria div para os buttons */
    const divBotoes = document.createElement('div');
    divBotoes.style.display = 'flex';
    divBotoes.style.gap = '10px';

    //função para mostrar carregando apos o clique nos botoes
    const mostrarCarregando = () => {
        conteudo.innerHTML = 'Carregando...';
        conteudo.style.color = 'white';
    };

    //função para atualizar o conteudo, pegando a API vinculada ao botao, e usando o PegaDados
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
    border-radius: 0.5em;
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
    border-radius: 0.5em;
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
    border-radius: 0.5em;
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
    conteudo.id = 'cards';
    conteudo.innerHTML = 'carregando...';

    document.body.appendChild(conteudo);

    const montaCard = (entrada) => {
        const card = document.createElement('div');
        card.style.display = 'grid';
        card.style.gridTemplateColumns = '1fr';
        card.style.gridTemplateAreas = `
            "a1"
            "a2"
            "a3"
        `;
        card.style.width = '20.4rem';
        card.style.border = 'solid';
        card.style.padding = '.5rem';
        card.style.color = 'black';
        card.style.backgroundColor = 'white';
        card.style.borderRadius = '1em';
        card.style.transition = 'transform 0.3s';
        card.onmouseover = () => {
            card.style.transform = 'scale(1.04)';
        };
        card.onmouseout = () => {
            card.style.transform = 'scale(1)';
        };

        const imgContainer = document.createElement('div');
        imgContainer.style.gridArea = 'a2';
        imgContainer.style.display = 'flex';
        imgContainer.style.alignItems = 'center';
        imgContainer.style.justifyContent = 'center';

        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `Foto de ${entrada.nome}`;
        imagem.style.objectFit = 'cover';
        imagem.style.borderRadius = '0.5em';

        const posicao = document.createElement('p');
        posicao.innerHTML = entrada.posicao;
        posicao.style.gridArea = 'a1';
        posicao.style.fontSize = '35px';
        posicao.style.textAlign = 'center';
        posicao.style.margin = '0';

        const buttonDetalhes = document.createElement('button');
        buttonDetalhes.id = "saibaMais";
        buttonDetalhes.innerHTML = 'Saiba Mais';
        buttonDetalhes.style.cssText = `
            grid-area: 'a3';
            background: black;
            border: none;
            border-radius: 21px;
            box-shadow: 0px 1px 8px black;
            cursor: pointer;
            color: white;
            font-family: "Raleway SemiBold", sans-serif;
            height: 42.3px;
            margin: 0 auto;
            margin-top: 10px;
            transition: 0.25s;
            width: 153px;
        `
        buttonDetalhes.onmouseover = () => {
            buttonDetalhes.style.boxShadow = "0px 1px 18px #BC8422";
        }
        buttonDetalhes.onmouseout = () => {
            buttonDetalhes.style.boxShadow = "0px 1px 8px black";
        }

        buttonDetalhes.onclick = () => {
            const jogadorId = entrada.id;
            window.location.href = `detalhes.html?id=${jogadorId}`;
        }

        card.appendChild(imgContainer);
        imgContainer.appendChild(imagem);
        card.appendChild(posicao);
        card.appendChild(buttonDetalhes);

        return card;
    }

    inputPesquisa.onkeyup = (ev) => {
        const valorPesquisa = ev.target.value.toLowerCase();

        if (valorPesquisa.length > 1){
            const filtrado = dados.filter(
                (elemento) => {
                    const estaNoNome = elemento.nome.toLowerCase().includes(valorPesquisa)
                    const estaNaPosicao = elemento.posicao.toLowerCase().includes(valorPesquisa)
                    return estaNoNome || estaNaPosicao
                }
            );

            conteudo.innerHTML = '';

            filtrado.forEach(
                (atleta) => (
                    conteudo.appendChild(montaCard(atleta))
                )
            );
        } else if (valorPesquisa.length === 0) {
            conteudo.innerHTML = '';
            dados.forEach(
                (atleta) => (
                    conteudo.appendChild(montaCard(atleta))
                )
            );
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
        <input id="senha" class="form-content" name="password" required />
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
        if (hex_sha256(entrada + sal) === alvo){
            localStorage.setItem('logado', 1);
            window.location.href = 'index.html'
        } else {
            alert('Senha incorreta');
        }
    }
}

export default alvo;