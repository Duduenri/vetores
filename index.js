const prompt = require("prompt-sync")();
const fs = require("fs");

const times = [];
const divisoes = [];
const estados = [];

function incluirTime() {
  console.log("\nInclusão de Times de Futebol");
  console.log("-----------------------------");

  const nome = prompt("Nome do Time: ");
  const estado = prompt("Estado do Time: ");
  const divisao = Number(prompt("Divisão: "));

  times.push(nome);
  estados.push(estado);
  divisoes.push(divisao);

  console.log(`Ok! Time '${nome}' cadastrado com sucesso na Divisão '${divisao}' no Estado '${estado}'`);
}

function listarTimes() {
  console.log("\nLista de Times de Futebol");
  console.log("-------------------------");

  console.log("\nNome do Time............. Estado........... Divisão..........");

  for (let i = 0; i < times.length; i++) {
    console.log(`${times[i].padEnd(25)} ${estados[i].padEnd(20)} ${divisoes[i].toString().padEnd(15)}`);
  }
}

function pesquisarPorDivisao() {
  const divisaoPesquisa = Number(prompt("Digite a divisão para pesquisa: "));
  console.log("\nResultado da Pesquisa por Divisão");
  console.log("----------------------------------");

  for (let i = 0; i < divisoes.length; i++) {
    if (divisoes[i] === divisaoPesquisa) {
      console.log(`${times[i].padEnd(25)} ${estados[i].padEnd(20)} ${divisoes[i].toString().padEnd(15)}`);
    }
  }
}

function pesquisarPorEstado() {
  const estadoPesquisa = prompt("Digite o estado para pesquisa: ");
  console.log("\nResultado da Pesquisa por Estado");
  console.log("---------------------------------");

  for (let i = 0; i < estados.length; i++) {
    if (estados[i].toUpperCase() === estadoPesquisa.toUpperCase()) {
      console.log(`${times[i].padEnd(25)} ${estados[i].padEnd(20)} ${divisoes[i].toString().padEnd(15)}`);
    }
  }
}

function pesquisarPorIntervaloDivisao() {
  const divisaoInicial = Number(prompt("Digite a divisão inicial: "));
  const divisaoFinal = Number(prompt("Digite a divisão final: "));
  console.log("\nResultado da Pesquisa por Intervalo de Divisão");
  console.log("--------------------------------------------");

  for (let i = 0; i < divisoes.length; i++) {
    if (divisoes[i] >= divisaoInicial && divisoes[i] <= divisaoFinal) {
      console.log(`${times[i].padEnd(25)} ${estados[i].padEnd(20)} ${divisoes[i].toString().padEnd(15)}`);
    }
  }
}

function alterarTime() {
  const nomeTime = prompt("Digite o nome do time para alteração: ");
  const index = times.indexOf(nomeTime);

  if (index !== -1) {
    const novoEstado = prompt("Digite o novo estado do time: ");
    const novaDivisao = Number(prompt("Digite a nova divisão (número): "));

    estados[index] = novoEstado;
    divisoes[index] = novaDivisao;

    console.log("Time alterado com sucesso!");
  } else {
    console.log("Time não encontrado.");
  }
}

function excluirTime() {
  const nomeTime = prompt("Digite o nome do time para exclusão: ");
  const index = times.indexOf(nomeTime);

  if (index !== -1) {
    times.splice(index, 1);
    estados.splice(index, 1);
    divisoes.splice(index, 1);

    console.log("Time excluído com sucesso!");
  } else {
    console.log("Time não encontrado.");
  }
}

function salvarDados() {
  const dados = [];

  for (let i = 0; i < times.length; i++) {
    dados.push(`${times[i]};${estados[i]};${divisoes[i]}`);
  }

  fs.writeFileSync("dados/times.txt", dados.join("\n"));
  console.log("\nDados salvos com sucesso...");
}

function carregarDados() {
  if (fs.existsSync("dados/times.txt")) {
    const dados = fs.readFileSync("dados/times.txt", "utf8").split("\n");

    for (let i = 0; i < dados.length; i++) {
      const partes = dados[i].split(";");
      times.push(partes[0]);
      estados.push(partes[1]);
      divisoes.push(Number(partes[2]));
    }
  }
}

carregarDados();

let opcao;  

do {
  console.log("\nControle de Times de Futebol");
  console.log("=============================");
  console.log("1. Incluir Time");
  console.log("2. Listar Times");
  console.log("3. Pesquisar por Divisão");
  console.log("4. Pesquisar por Estado");
  console.log("5. Pesquisar por Intervalo de Divisão");
  console.log("6. Alterar Time");
  console.log("7. Excluir Time");
  console.log("8. Finalizar");

  opcao = Number(prompt("Opção: "));  

  if (opcao === 1) {
    incluirTime();
  } else if (opcao === 2) {
    listarTimes();
  } else if (opcao === 3) {
    pesquisarPorDivisao();
  } else if (opcao === 4) {
    pesquisarPorEstado();
  } else if (opcao === 5) {
    pesquisarPorIntervaloDivisao();
  } else if (opcao === 6) {
    alterarTime();
  } else if (opcao === 7) {
    excluirTime();
  } else if (opcao === 8) {
    console.log("Programa finalizado.");
  } else {
    console.log("Opção inválida. Tente novamente.");
  }
} while (opcao !== 8);

salvarDados();
