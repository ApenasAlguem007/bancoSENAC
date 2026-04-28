// 1. Dados em Memória
const clientes = [
    { conta: "1001", senha: "123", nome: "Dennis Lopes", saldo: 5000 },
    { conta: "1002", senha: "123", nome: "Nicolas Silva", saldo: 1500 },
    { conta: "1003", senha: "123", nome: "Ana Maria", saldo: 3000 },
    { conta: "1004", senha: "123", nome: "Bruno Costa", saldo: 500 },
    { conta: "1005", senha: "123", nome: "Carla Souza", saldo: 10000, status: "bloqueado" }
];

let usuarioLogado = null;

// 2. Seleção de Elementos (DOM)
const secaoLogin = document.querySelector('#login-section');
const secaoPainel = document.querySelector('#painel-section');
const campoSaldo = document.querySelector('#saldo-valor');
const boasVindas = document.querySelector('#boas-vindas');

// 3. Funções de Interface
function atualizarInterface() {
    campoSaldo.textContent = `R$ ${usuarioLogado.saldo.toFixed(2)}`;
    boasVindas.textContent = `Olá, ${usuarioLogado.nome}`;
}

// 4. Eventos de Login
document.querySelector('#btn-login').addEventListener('click', () => {
    const numConta = document.querySelector('#input-conta').value;
    const senha = document.querySelector('#input-senha').value;

    // Busca o cliente que atende às duas condições
    usuarioLogado = clientes.find(c => c.conta === numConta && c.senha === senha);

    if (usuarioLogado) {
        secaoLogin.style.display = 'none';
        secaoPainel.style.display = 'block';
        atualizarInterface();
    } else {
        document.querySelector('#login-erro').style.display = 'block';
    }
});
/**
document.querySelector('#btn-depositar').addEventListener('click', () => {
    const valor = parseFloat(document.querySelector('#valor-op').value);

    if (valor > 0) {
        usuarioLogado.saldo += valor; 
        atualizarInterface();
        alert("Depósito realizado!");
    } else {
        alert("Digite um valor válido.");
    }
});

document.querySelector('#btn-sacar').addEventListener('click', () => {
    const valor = parseFloat(document.querySelector('#valor-op').value);

    if (valor > 0 && valor <= usuarioLogado.saldo) {
        usuarioLogado.saldo -= valor;
        atualizarInterface();
        alert("Saque realizado com sucesso!");
    } else {
        alert("Saldo insuficiente ou valor inválido.");
    }
});
*/

document.querySelector('.operacoes').addEventListener('click', (e) => {

    if (e.target.tagName !== 'BUTTON') return;
    const idBotao = e.target.id;
    const valor = parseFloat(document.querySelector('#valor-op').value);

    if (idBotao === 'btn-depositar') {
        if (valor > 0) {
            usuarioLogado.saldo += valor;
            atualizarInterface();
            alert("Depósito realizado!");
        } else {
            alert("Valor inválido para depósito.");
        }
    }

    else if (idBotao === 'btn-sacar') {
        if (valor > 0 && valor <= usuarioLogado.saldo) {
            usuarioLogado.saldo -= valor;
            atualizarInterface();
            alert("Saque realizado!");
        } else {
            alert("Saldo insuficiente ou valor inválido.");
        }
    }
});

/**document.querySelector('#btn-transferir').addEventListener('click', () => {
    const valor = parseFloat(document.querySelector('#valor-op').value);
    const contaDest = document.querySelector('#conta-destino').value;
    
    const destino = clientes.find(c => c.conta === contaDest);

    if (!destino) {
        alert("Erro: Conta de destino inexistente!");
        return; // O 'return' para a função aqui mesmo
    }

    if (valor > usuarioLogado.saldo) {
        alert("Erro: Saldo insuficiente para transferência.");
        return;
    }

    usuarioLogado.saldo -= valor;
    destino.saldo += valor;
    atualizarInterface();
    alert(`Sucesso! R$ ${valor.toFixed(2)} enviado para ${destino.nome}`);
});
*/

document.querySelector('#btn-transferir').addEventListener('click', () => {
    try {
        const valor = parseFloat(document.querySelector('#valor-op').value);
        const contaDest = document.querySelector('#conta-destino').value;
        const destino = clientes.find(c => c.conta === contaDest);

        if (!destino) throw new Error("Conta de destino inexistente.");
        if (valor > usuarioLogado.saldo) throw new Error("Saldo insuficiente.");
        if (valor <= 0) throw new Error("Valor inválido.");

        usuarioLogado.saldo -= valor;
        destino.saldo += valor;
        atualizarInterface();
        alert("Transferência realizada com sucesso!");

    } catch (erro) {
        alert("Falha na transação: " + erro.message);
    }
});

document.querySelector('#container').addEventListener('click', (e) => {

    if (usuarioLogado && usuarioLogado.status === "bloqueado") {
        if (e.target.closest('.operacoes')) {
            alert("CONTA BLOQUEADA: Operação cancelada por restrição da Receita Federal.");
            e.stopPropagation();
        }
    }
}, true);

document.querySelector('#btn-sair').addEventListener('click', () => {
    location.reload(); // Reinicia o app
});