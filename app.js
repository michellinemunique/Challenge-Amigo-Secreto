let amigos = [];
let sorteados = [];

function adicionarAmigo() {
    let input = document.getElementById('amigo');
    let nomes = input.value.trim();

    if (nomes === '') {
        alert('Digite o nome de uma pessoa');
        return;
    }

     let listaNomes = nomes.split(',')
        .map(nome => nome.trim().replace(/\s+/g, ' ').toLowerCase())
        .filter(nome => nome !== '');

    let setNomes = new Set(listaNomes);
    if (setNomes.size !== listaNomes.length) {
        alert('Esse nome é repetido');
        return;
    }

    let nomesDuplicados = listaNomes.filter(nome =>
        amigos.some(amigo => amigo.toLowerCase() === nome)
    );

    if (nomesDuplicados.length > 0) {
        alert(`Esse nome é duplicado: ${nomesDuplicados.join(', ')}`);
        return;
    }

    listaNomes.forEach(nome => {
        if (!amigos.map(a => a.toLowerCase()).includes(nome)) {
            amigos.push(nome.charAt(0).toUpperCase() + nome.slice(1));
        }
    });

    atualizarLista();
    input.value = '';
}

function atualizarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((nome) => {
        let li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Não dá para sortear só com um amigo');
        return;
    }

    if (sorteados.length === amigos.length) {
        alert('Acabou a lista de amigos,ela será reiniciada.');
        reiniciarLista();
        return;
    }

    let sorteado;
    do {
        sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    } while (sorteados.includes(sorteado));

    sorteados.push(sorteado);
    document.getElementById('resultado').innerText = `Sorteado: ${sorteado}`;

    document.getElementById('hiden-elements').classList.remove('hidden');
    document.getElementById('auto-sorteio').classList.remove('hidden');
    document.getElementById('novo-sorteio').classList.remove('hidden');

    document.getElementById('amigo').disabled = true;
    document.querySelector('.button-add').disabled = true;

}

function resortearAmigo() {
    if (sorteados.length === amigos.length) {
        alert('Acabou a lista de amigos,ela será reiniciada.');
        reiniciarLista();
        return;
    }

    sorteados.pop();
    sortearAmigo();
}

function reiniciarLista() {
    amigos = [];
    sorteados = [];
    atualizarLista();
    document.getElementById('resultado').innerText = '';

    document.getElementById('amigo').disabled = false;
    document.querySelector('.button-add').disabled = false;

    document.getElementById('hiden-elements').classList.add('hidden');
    document.getElementById('auto-sorteio').classList.add('hidden');
    document.getElementById('novo-sorteio').classList.add('hidden');
}

function novoSorteio() {
    reiniciarLista();
}

