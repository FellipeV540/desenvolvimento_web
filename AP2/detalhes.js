if (localStorage.getItem('logado')){
    document.body.innerHTML = '<h1>ESCONDIDA!!!</H1><button id="logout">Logout</button>';
    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('logado');
        window.location.href = 'secreta.html';
    };
}