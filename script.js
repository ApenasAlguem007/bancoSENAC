// 1. Dados em Memória
const clientes = [
    { conta: "1001", senha: "123", nome: "Dennis Lopes", saldo: 5000 },
    { conta: "1002", senha: "123", nome: "Nicolas Silva", saldo: 1500 },
    { conta: "1003", senha: "123", nome: "Ana Maria", saldo: 3000 },
    { conta: "1004", senha: "123", nome: "Bruno Costa", saldo: 500 },
    { conta: "1005", senha: "123", nome: "Carla Souza", saldo: 10000 }
];

document.querySelector('#form-registro').addEventListener('submit', function(event) {
    // CRITÉRIO 1: Impedir o envio padrão do formulário
    event.preventDefault(); 

    // 1. Captura dos Elementos do DOM
    const campos = {
        nome: document.querySelector('#reg-nome'),
        email: document.querySelector('#reg-email'),
        senha: document.querySelector('#reg-senha'),
        saldo: document.querySelector('#reg-saldo'),
        cpf: document.querySelector('#reg-cpf'),
        endereco: document.querySelector('#reg-endereco'),
        complemento: document.querySelector('#reg-complemento'),
        cep: document.querySelector('#reg-cep'),
        cidade: document.querySelector('#reg-cidade'),
        estado: document.querySelector('#reg-estado'),
        celular: document.querySelector('#reg-celular')
    };

    let formValido = true;

    // CRITÉRIO 3: Função de Feedback Visual Obrigatório
    function validarCampo(input, condicaoValida) {
        if (!condicaoValida) {
            input.style.border = '2px solid red';
            formValido = false;
        } else {
            input.style.border = ''; // Retorna ao estado normal
        }
    }

    // CRITÉRIO 2: Lógica de Validação (Client-Side e RegEx)
    
    // Campos que não podem ser vazios
    validarCampo(campos.nome, campos.nome.value.trim() !== '');
    validarCampo(campos.endereco, campos.endereco.value.trim() !== '');
    validarCampo(campos.complemento, campos.complemento.value.trim() !== '');
    validarCampo(campos.cidade, campos.cidade.value.trim() !== '');
    validarCampo(campos.estado, campos.estado.value.trim() !== '');

    // Validação de E-mail (RegEx)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validarCampo(campos.email, emailRegex.test(campos.email.value.trim()));

    // Validação de Senha (Mínimo 6 caracteres)
    validarCampo(campos.senha, campos.senha.value.length >= 6);

    // Validação de Saldo (Numérico >= 0)
    const saldoValor = parseFloat(campos.saldo.value);
    validarCampo(campos.saldo, !isNaN(saldoValor) && saldoValor >= 0);

    // Validação de CPF (11 dígitos, com ou sem pontuação)
    const cpfLimpo = campos.cpf.value.replace(/\D/g, ''); // Remove tudo que não é número
    validarCampo(campos.cpf, cpfLimpo.length === 11);

    // Validação de CEP (8 dígitos, com ou sem hífen)
    const cepLimpo = campos.cep.value.replace(/\D/g, '');
    validarCampo(campos.cep, cepLimpo.length === 8);

    // Validação de Celular (DDD + 9 dígitos = 11 números no total)
    const celularLimpo = campos.celular.value.replace(/\D/g, '');
    validarCampo(campos.celular, celularLimpo.length === 11 || celularLimpo.length === 10);

    // Se alguma validação falhou, interrompe a execução aqui (Testes 2 - Falha Forçada)
    if (!formValido) {
        console.warn("Validação falhou. Corrija os campos em vermelho.");
        return; 
    }

    // Estruturação do Objeto Exatamente como a API espera
    const dadosCliente = {
        email: campos.email.value.trim(),
        senha: campos.senha.value,
        saldo: saldoValor,
        nome: campos.nome.value.trim(),
        cpf: cpfLimpo, // Enviando apenas os 11 números conforme exemplo
        endereco: campos.endereco.value.trim(),
        complemento: campos.complemento.value.trim(),
        cep: campos.cep.value.trim(),
        cidade: campos.cidade.value.trim(),
        estado: campos.estado.value.trim(),
        celular: campos.celular.value.trim()
    };

    // CRITÉRIO 4: Requisição Assíncrona (Fetch API - POST)
    fetch('https://senac-bank-api.dennislopes.com.br/banco/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Cabeçalho obrigatório
        },
        body: JSON.stringify(dadosCliente) // Convertendo o objeto para JSON
    })
    .then(response => {
        if (response.ok || response.status === 201) {
            alert('Cliente registrado com sucesso!');
            document.querySelector('#form-registro').reset(); // Limpa o formulário
        } else {
            alert('Erro ao registrar. O servidor recusou os dados.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição (Network):', error);
        alert('Erro de conexão com a API.');
    });
});

