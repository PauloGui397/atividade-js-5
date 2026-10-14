console.log("PARTE 1 - PEDIDOS");

const pedidos = [
    { cliente: "Bia", valor: 120, status: "pago" },
    { cliente: "Ana", valor: 80, status: "pendente" },
    { cliente: "Carlos", valor: 50, status: "pago" },
    { cliente: "", valor: 30, status: "pago" },
    { cliente: "João", valor: -10, status: "pago" }
];

const pedidosValidos = pedidos.filter(pedido =>
    typeof pedido.cliente === "string" &&
    pedido.cliente.trim() !== "" &&
    typeof pedido.valor === "number" &&
    Number.isFinite(pedido.valor) &&
    pedido.valor > 0
);

const pedidosPagos = pedidosValidos.filter(pedido => pedido.status === "pago");

const totalFaturado = pedidosPagos.reduce(
    (total, pedido) => total + pedido.valor, 0
);

pedidosPagos.forEach(pedido => {
    console.log(`${pedido.cliente} — R$ ${pedido.valor.toFixed(2)}`);
});

console.log(`Total faturado: R$ ${totalFaturado.toFixed(2)}`);


console.log("PARTE 2 - BUSCADOR DE CEP");

const formCep = document.querySelector("#form-cep");
const campoCep = document.querySelector("#cep");
const botaoCep = document.querySelector("#botao-cep");
const statusCep = document.querySelector("#status-cep");
const resultadoCep = document.querySelector("#resultado-cep");

formCep.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cep = campoCep.value.trim().replace(/\D/g, "");

    resultadoCep.replaceChildren();

    if (!/^\d{8}$/.test(cep)) {
        statusCep.textContent = "CEP inválido";
        return;
    }

    statusCep.textContent = "Buscando...";
    botaoCep.disabled = true;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!response.ok) {
            throw new Error("Falha na conexão");
        }

        const dados = await response.json();

        if (dados.erro) {
            statusCep.textContent = "CEP não encontrado";
            return;
        }

        resultadoCep.replaceChildren();

        const informacoes = {
            Rua: dados.logradouro,
            Bairro: dados.bairro,
            Cidade: dados.localidade,
            UF: dados.uf
        };

        for (const [titulo, valor] of Object.entries(informacoes)) {
            const dt = document.createElement("dt");
            dt.textContent = titulo;

            const dd = document.createElement("dd");
            dd.textContent = valor || "Não informado";

            resultadoCep.append(dt, dd);
        }

        statusCep.textContent = "";
    } catch (erro) {
        statusCep.textContent = "Falha na conexão";
    } finally {
        botaoCep.disabled = false;
    }
});


console.log("PARTE 3 - MINI POKÉDEX");

const formPokemon = document.querySelector("#form-pokemon");
const campoPokemon = document.querySelector("#pokemon");
const botaoPokemon = document.querySelector("#botao-pokemon");
const statusPokemon = document.querySelector("#status-pokemon");
const resultadoPokemon = document.querySelector("#resultado-pokemon");

formPokemon.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = campoPokemon.value.trim().toLowerCase();

    resultadoPokemon.replaceChildren();

    if (nome === "") {
        statusPokemon.textContent = "Digite o nome de um Pokémon";
        return;
    }

    statusPokemon.textContent = "Buscando...";
    botaoPokemon.disabled = true;

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome)}`
        );

        if (response.status === 404) {
            statusPokemon.textContent = "Pokémon não encontrado";
            return;
        }

        if (!response.ok) {
            throw new Error("Falha na conexão");
        }

        const dados = await response.json();

        const titulo = document.createElement("h3");
        titulo.textContent = dados.name;

        const imagem = document.createElement("img");
        imagem.src = dados.sprites.front_default;
        imagem.alt = dados.name;

        const tipos = document.createElement("p");
        tipos.textContent = dados.types
            .map(tipo => tipo.type.name)
            .join(", ");

        resultadoPokemon.append(titulo, imagem, tipos);

        statusPokemon.textContent = "";
    } catch (erro) {
        statusPokemon.textContent = "Falha na conexão";
    } finally {
        botaoPokemon.disabled = false;
    }
});