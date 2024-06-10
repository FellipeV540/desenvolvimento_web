import { hex_sha256 } from "./sha256-min.mjs";

const alvo = '925b39018d531f8662562c4414602d86233fc07483b2440e15ec299e2333ca83';
const sal = 'botafogo';

if (localStorage.getItem('logado')){
    document.body.innerHTML = `
    <header style="background-color: grey; padding: 0.5em 1em; position: relative; display: flex; flex-direction: row;">
    <h1 style="color: white; margin: 0px; flex-grow: 1;">Atletas do possível campeão brasileiro 2024</h1>
    <button id="logout" style="background-color: black; border: none; color: white; text-align: center; text-decoration: none; padding: 0.5em 1em; cursor: pointer;">Logout</button>
    </header>
    <p>teste card</p>
    `
    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('logado');
        window.location.href = 'index.html';
    }
}
else {
    document.body.innerHTML = `
        <label>
            Senha:
            <input type="password" id="senha">
        </label>
        <button id="btn_login">Entrar</button>
        <h1>A senha é Botafogo2024</h1>
        <div id="mensagem"></div>`
    document.getElementById('btn_login').onclick = () => {
        const entrada = document.getElementById('senha').value;
        const mensagem = document.getElementById('mensagem');
        if (hex_sha256(entrada + sal) === alvo){
            mensagem.innerHTML = "<h2>Senha correta.</h2>";
            localStorage.setItem('logado', 1);
            window.location.href = 'index.html'
        } else {
            mensagem.innerHTML = "<h2>Senha errada!!!</h2>";
        }
    }
}

export default alvo;