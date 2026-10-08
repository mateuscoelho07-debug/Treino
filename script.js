/* =========================================================
   CONFIGURAÇÃO DA LOJA
   Mateus: troque estes valores pelos seus de verdade.
   ========================================================= */
const CONFIG = {
  // Número do WhatsApp com DDI 55 + DDD + número, só dígitos.
  // EXEMPLO: troque pelo seu número.
  whatsapp: "5511999999999",

  // Preço de uma unidade, em reais. EXEMPLO: troque pelo seu preço.
  preco: 29.90,

  // A partir de quantas unidades entra o desconto, e de quanto (0.10 = 10%).
  // EXEMPLO: se não quiser desconto, coloque descontoPercentual: 0
  descontoAPartirDe: 3,
  descontoPercentual: 0.10,
};

// Transforma 29.9 em "R$ 29,90"
function emReais(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ===== MENU NO CELULAR ===== */
const menuBotao = document.querySelector(".menu-botao");
const menu = document.querySelector(".menu");

menuBotao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", aberto);
});

// Fecha o menu quando clica num link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("aberto"));
});

/* ===== GALERIA DE FOTOS ===== */
const fotoGrande = document.getElementById("foto-grande");
const miniaturas = document.querySelectorAll(".miniatura");

miniaturas.forEach((mini) => {
  mini.addEventListener("click", () => {
    fotoGrande.src = mini.dataset.foto;
    fotoGrande.alt = mini.dataset.alt;
    miniaturas.forEach((m) => m.classList.remove("ativa"));
    mini.classList.add("ativa");
  });
});

// Clicar na foto grande abre ela em tela cheia
fotoGrande.addEventListener("click", () => {
  const fundo = document.createElement("div");
  fundo.className = "lightbox";
  fundo.innerHTML = `<img src="${fotoGrande.src}" alt="${fotoGrande.alt}">`;
  fundo.addEventListener("click", () => fundo.remove());
  document.body.appendChild(fundo);
});

/* ===== CARTÕES QUE VIRAM =====
   Tocar (ou clicar) vira o cartão. Tocar de novo desvira. */
document.querySelectorAll(".cartao").forEach((cartao) => {
  cartao.addEventListener("click", () => {
    const virado = cartao.classList.toggle("virado");
    cartao.setAttribute("aria-pressed", virado);
  });
});

/* ===== ABAS: MANHOSO / EVA / ANTENA ===== */
const abas = document.querySelectorAll(".aba");

abas.forEach((aba) => {
  aba.addEventListener("click", () => {
    abas.forEach((a) => a.classList.remove("ativa"));
    document.querySelectorAll(".aba-conteudo").forEach((c) => c.classList.remove("ativo"));

    aba.classList.add("ativa");
    document.getElementById("aba-" + aba.dataset.aba).classList.add("ativo");
  });
});

/* ===== SIMULADOR DE BOIA =====
   A boia fica parada, dá umas beliscadas e depois afunda.
   Se você clicar em "Fisgar!" enquanto ela está afundada, pegou o peixe. */
const antena = document.getElementById("antena");
const botaoFisgar = document.getElementById("botao-fisgar");
const placar = document.getElementById("placar");
const mensagem = document.getElementById("mensagem-simulador");

let jogando = false;
let estado = "parada"; // "parada", "beliscando" ou "afundou"
let peixes = 0;
let escaparam = 0;
let temporizador = null;

function mudarAntena(novoEstado) {
  estado = novoEstado;
  antena.className = "antena " + novoEstado;
}

function atualizarPlacar() {
  placar.textContent = `Peixes: ${peixes} · Escaparam: ${escaparam}`;
}

// Número aleatório entre min e max (em milissegundos)
function aleatorio(min, max) {
  return Math.random() * (max - min) + min;
}

function proximaRodada() {
  clearTimeout(temporizador);
  mudarAntena("parada");

  // Espera um pouco e decide: belisca (só engana) ou afunda (é a hora!)
  temporizador = setTimeout(() => {
    if (Math.random() < 0.5) {
      mudarAntena("beliscando");
      temporizador = setTimeout(proximaRodada, 900);
    } else {
      mudarAntena("afundou");
      // Você tem pouco mais de 1 segundo para fisgar
      temporizador = setTimeout(() => {
        escaparam++;
        atualizarPlacar();
        mensagem.textContent = "Demorou! O peixe soltou a isca. 🐟💨";
        proximaRodada();
      }, 1100);
    }
  }, aleatorio(1200, 3500));
}

botaoFisgar.addEventListener("click", () => {
  if (!jogando) {
    jogando = true;
    botaoFisgar.textContent = "Fisgar!";
    mensagem.textContent = "Fique de olho na antena...";
    proximaRodada();
    return;
  }

  if (estado === "afundou") {
    peixes++;
    mensagem.textContent = "Fisgou! Belo peixe! 🎣";
  } else {
    escaparam++;
    mensagem.textContent = "Cedo demais, o peixe só estava beliscando.";
  }
  atualizarPlacar();
  proximaRodada();
});

mudarAntena("parada");

/* ===== QUIZ ===== */
const perguntas = [
  {
    texto: "Quantos chicotes você costuma levar numa pescaria?",
    opcoes: [
      { texto: "Só 1 ou 2", ponto: "um" },
      { texto: "De 3 a 4", ponto: "tres" },
      { texto: "5 ou mais", ponto: "cinco" },
    ],
  },
  {
    texto: "Você gosta de deixar chicotes montados com antecedência?",
    opcoes: [
      { texto: "Não, monto na hora", ponto: "um" },
      { texto: "Às vezes, alguns", ponto: "tres" },
      { texto: "Sempre, levo tudo pronto", ponto: "cinco" },
    ],
  },
  {
    texto: "Você troca de antena (formato ou cor) durante a pescaria?",
    opcoes: [
      { texto: "Quase nunca", ponto: "um" },
      { texto: "De vez em quando", ponto: "tres" },
      { texto: "Toda hora, vou testando", ponto: "cinco" },
    ],
  },
];

const resultados = {
  um: {
    icone: "🎣",
    titulo: "1 Chicoteiro já resolve",
    texto: "Você pesca com poucos chicotes. Um Chicoteiro mantém o seu manhoso organizado e sem embolar.",
  },
  tres: {
    icone: "🧰",
    titulo: "Kit com 3 Chicoteiros",
    texto: "Com 3 você deixa chicotes prontos e troca rápido na pescaria. E ainda ganha o desconto de quantidade!",
  },
  cinco: {
    icone: "🏆",
    titulo: "5 ou mais Chicoteiros",
    texto: "Você leva tudo pronto e testa antenas diferentes. Com vários Chicoteiros, cada chicote fica no seu lugar.",
  },
};

const quizCaixa = document.getElementById("quiz-caixa");
let perguntaAtual = 0;
let pontos = { um: 0, tres: 0, cinco: 0 };

function mostrarPergunta() {
  const p = perguntas[perguntaAtual];
  const progresso = (perguntaAtual / perguntas.length) * 100;

  quizCaixa.innerHTML = `
    <div class="quiz-progresso"><div style="width:${progresso}%"></div></div>
    <h3>${perguntaAtual + 1}. ${p.texto}</h3>
  `;

  p.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.className = "quiz-opcao";
    botao.textContent = opcao.texto;
    botao.addEventListener("click", () => {
      pontos[opcao.ponto]++;
      perguntaAtual++;
      if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
      } else {
        mostrarResultado();
      }
    });
    quizCaixa.appendChild(botao);
  });
}

function mostrarResultado() {
  // Pega a montagem com mais pontos
  const vencedor = Object.keys(pontos).reduce((a, b) => (pontos[a] >= pontos[b] ? a : b));
  const r = resultados[vencedor];

  quizCaixa.innerHTML = `
    <div class="quiz-progresso"><div style="width:100%"></div></div>
    <div class="quiz-resultado">
      <div class="icone">${r.icone}</div>
      <h3>${r.titulo}</h3>
      <p>${r.texto}</p>
      <a href="#comprar" class="botao botao-principal">Comprar agora</a>
      <p><button class="quiz-opcao" id="refazer" style="text-align:center">Refazer o quiz</button></p>
    </div>
  `;

  document.getElementById("refazer").addEventListener("click", () => {
    perguntaAtual = 0;
    pontos = { um: 0, tres: 0, cinco: 0 };
    mostrarPergunta();
  });
}

mostrarPergunta();

/* ===== COMPRA: QUANTIDADE, TOTAL E WHATSAPP ===== */
const campoQuantidade = document.getElementById("quantidade");
const textoTotal = document.getElementById("total");
const textoDesconto = document.getElementById("desconto");
const botaoWhatsapp = document.getElementById("botao-whatsapp");

document.getElementById("preco-unitario").textContent = emReais(CONFIG.preco);

function atualizarCompra() {
  let qtd = parseInt(campoQuantidade.value, 10);
  if (isNaN(qtd) || qtd < 1) qtd = 1;
  if (qtd > 50) qtd = 50;
  campoQuantidade.value = qtd;

  let total = qtd * CONFIG.preco;
  const temDesconto = CONFIG.descontoPercentual > 0 && qtd >= CONFIG.descontoAPartirDe;

  if (temDesconto) {
    total = total * (1 - CONFIG.descontoPercentual);
    textoDesconto.textContent = `🎉 ${CONFIG.descontoPercentual * 100}% de desconto aplicado!`;
  } else if (CONFIG.descontoPercentual > 0) {
    textoDesconto.textContent = `Leve ${CONFIG.descontoAPartirDe} ou mais e ganhe ${CONFIG.descontoPercentual * 100}% de desconto.`;
  } else {
    textoDesconto.textContent = "";
  }

  textoTotal.textContent = emReais(total);

  // Monta a mensagem que já vai escrita no WhatsApp
  const texto = `Olá! Quero comprar ${qtd} Chicoteiro${qtd > 1 ? "s" : ""}. Total: ${emReais(total)}.`;
  botaoWhatsapp.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}

document.getElementById("menos").addEventListener("click", () => {
  campoQuantidade.value = parseInt(campoQuantidade.value, 10) - 1;
  atualizarCompra();
});
document.getElementById("mais").addEventListener("click", () => {
  campoQuantidade.value = parseInt(campoQuantidade.value, 10) + 1;
  atualizarCompra();
});
campoQuantidade.addEventListener("change", atualizarCompra);

atualizarCompra();

/* ===== SEÇÕES APARECENDO AO ROLAR A PÁGINA ===== */
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".secao h2, .produto, .passos, .specs-grade, .simulador, .quiz, .compra, .faq").forEach((el) => {
  el.classList.add("surgir");
  observador.observe(el);
});

/* ===== BOTÃO VOLTAR AO TOPO ===== */
const voltarTopo = document.getElementById("voltar-topo");

window.addEventListener("scroll", () => {
  voltarTopo.classList.toggle("mostrar", window.scrollY > 600);
});
voltarTopo.addEventListener("click", () => window.scrollTo({ top: 0 }));
