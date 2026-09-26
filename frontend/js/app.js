// =============================================================================
// BurguerSync Ourinhos - Core Application Logic & Realtime Sync
// Layer 3: Execução e Controle de Interface
// =============================================================================

import { 
  db, 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy,
  isOfflineFallback 
} from "./firebase-config.js";

// Cardápio Base Oficial do BurguerSync Ourinhos
export const cardapioItens = [
  {
    id: "bs-smash",
    nome: "Ourinhos Smash Burguer",
    preco: 28.00,
    tag: "Mais Pedido",
    descricao: "Pão brioche tostado na manteiga, 2x smash burger 80g angus, duplo queijo cheddar inglês derretido e bacon crocante.",
    imagem: "assets/smash_burguer.png"
  },
  {
    id: "bs-bacon-senai",
    nome: "Monster Bacon SENAI",
    preco: 34.00,
    tag: "Especial Chef",
    descricao: "Pão brioche artesanal, burger 180g na brasa, fatias generosas de bacon artesanal defumado em lenha frutífera e maionese defumada da casa.",
    imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR5Z-1HjjXsneFFv10VCQpUsG9jcMf4qVl3MFiFCaxcOnjuF6oQGPsr9HpAyToTpgYdaRu78IucQWMFA0IriJXypaROXIuE4ohDkwkDgSmA9sCvAIIOGNcbIrFRpWXnJSUcWqGGghAYVBAjaHES9rwxmRa7b10pzVedR_kZdPkQreHq1tvnI4evRlOKnLsK84xgWndj01OLXdrZh_IqcRKb-c7rcan3HDzuvS7wcv5L3HzfJDRXqkRYA"
  },
  {
    id: "bs-cheddar-melt",
    nome: "Cheddar Melt Ourinhos",
    preco: 32.00,
    tag: "Cremoso",
    descricao: "Pão australiano macio com gergelim preto, blend 160g, cascata de creme de cheddar derretido e cebola caramelizada na cerveja escura.",
    imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpmYy2t23hdkJ7kX0JQD5X_68jOJGjB-Sq9cgAaXbAJn70-oaeLgQ5tNCN9YWdzDSQqOKmDPIgOfaIb8DcTXTbLDtB3utd2RRGLgjHGru1r4Z5LLZL1kgoijjvseMwmz4h80lnq4zFeQkUatl9lXgHC2kIoBCpEnrobeWtXYVlqU2-UIcKJ5p_Fcji0sGnSzKamvjhNAsbfHq29SmFdMWHxF08F9B92U_1L74WF3VrN4696QpSmPuZWw"
  },
  {
    id: "bs-chicken-crisp",
    nome: "Chicken Crisp Artesanal",
    preco: 29.00,
    tag: "Super Crocante",
    descricao: "Sobrecoxa desossada empanada na farinha panko temperada, salada coleslaw refrescante, picles artesanal e molho honey mustard.",
    imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR5Z-1HjjXsneFFv10VCQpUsG9jcMf4qVl3MFiFCaxcOnjuF6oQGPsr9HpAyToTpgYdaRu78IucQWMFA0IriJXypaROXIuE4ohDkwkDgSmA9sCvAIIOGNcbIrFRpWXnJSUcWqGGghAYVBAjaHES9rwxmRa7b10pzVedR_kZdPkQreHq1tvnI4evRlOKnLsK84xgWndj01OLXdrZh_IqcRKb-c7rcan3HDzuvS7wcv5L3HzfJDRXqkRYA"
  },
  {
    id: "bs-duplo-defumado",
    nome: "Duplo Burger Defumado",
    preco: 38.00,
    tag: "Bruto",
    descricao: "2 blends de 150g cada selados na brasa, queijo prato artesanal, relish de pepino doce e molho barbecue rústico de goiabada cascão.",
    imagem: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpmYy2t23hdkJ7kX0JQD5X_68jOJGjB-Sq9cgAaXbAJn70-oaeLgQ5tNCN9YWdzDSQqOKmDPIgOfaIb8DcTXTbLDtB3utd2RRGLgjHGru1r4Z5LLZL1kgoijjvseMwmz4h80lnq4zFeQkUatl9lXgHC2kIoBCpEnrobeWtXYVlqU2-UIcKJ5p_Fcji0sGnSzKamvjhNAsbfHq29SmFdMWHxF08F9B92U_1L74WF3VrN4696QpSmPuZWw"
  },
  {
    id: "bs-batata-rustica",
    nome: "Batata Rústica c/ Páprica",
    preco: 18.00,
    tag: "Acompanhamento",
    descricao: "Batatas com casca fritas no ponto perfeito, temperadas com sal marinho, alecrim fresco e páprica defumada. Acompanha maionese verde.",
    imagem: "assets/smash_burguer.png"
  }
];

// Estado da Aplicação
const TAXA_ENTREGA = 5.00;
let carrinho = [];
let pedidosFirestore = [];
let filtroAtivo = "todos";

// Elementos do DOM
const dom = {
  tabCliente: document.getElementById("tabCliente"),
  tabCozinha: document.getElementById("tabCozinha"),
  visaoCliente: document.getElementById("visaoCliente"),
  visaoCozinha: document.getElementById("visaoCozinha"),
  vitrineLanches: document.getElementById("vitrineLanches"),
  btnAbrirCarrinho: document.getElementById("btnAbrirCarrinho"),
  btnFecharCarrinho: document.getElementById("btnFecharCarrinho"),
  cartBackdrop: document.getElementById("cartBackdrop"),
  carrinhoDrawer: document.getElementById("carrinho"),
  carrinhoContador: document.getElementById("carrinhoContador"),
  itensCarrinho: document.getElementById("itensCarrinho"),
  subtotalVal: document.getElementById("subtotalVal"),
  taxaEntregaVal: document.getElementById("taxaEntregaVal"),
  totalGeralVal: document.getElementById("totalGeralVal"),
  btnIrParaCheckout: document.getElementById("btnIrParaCheckout"),
  formCheckout: document.getElementById("formCheckout"),
  campoTrocoWrapper: document.getElementById("campoTrocoWrapper"),
  btnCopiarPix: document.getElementById("btnCopiarPix"),
  codigoPix: document.getElementById("codigoPix"),
  listaPedidos: document.getElementById("listaPedidos"),
  metricPendentes: document.getElementById("metricPendentes"),
  metricPreparo: document.getElementById("metricPreparo"),
  metricProntos: document.getElementById("metricProntos"),
  totalFiltro: document.getElementById("totalFiltro"),
  btnNovoPedidoSimulado: document.getElementById("btnNovoPedidoSimulado"),
  toast: document.getElementById("toastNotification"),
  toastTitle: document.getElementById("toastTitle"),
  toastDesc: document.getElementById("toastDesc")
};

// =============================================================================
// Formatação & Utilitários
// =============================================================================
const formatMoney = (val) => {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const showToast = (title, desc, isError = false) => {
  if (!dom.toast) return;
  dom.toastTitle.textContent = title;
  dom.toastDesc.textContent = desc;
  dom.toast.className = `toast show ${isError ? 'border-danger' : 'border-success'}`;
  setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 3500);
};

// =============================================================================
// Renderização da Vitrine de Produtos
// =============================================================================
function renderVitrine() {
  if (!dom.vitrineLanches) return;
  dom.vitrineLanches.innerHTML = cardapioItens.map(item => `
    <article class="product-card" data-id="${item.id}">
      <div class="product-media">
        <img src="${item.imagem}" alt="${item.nome}" class="product-img" loading="lazy">
        <span class="badge-tag">${item.tag}</span>
      </div>
      <div class="product-content">
        <h3 class="product-name">${item.nome}</h3>
        <p class="product-desc">${item.descricao}</p>
        <div class="product-footer">
          <span class="product-price">${formatMoney(item.preco)}</span>
          <button class="btn-add-cart" data-id="${item.id}">
            <span>Adicionar</span>
            <span class="icon">+</span>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  // Event Listeners nos botões Adicionar
  dom.vitrineLanches.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      adicionarAoCarrinho(id);
    });
  });
}

// =============================================================================
// Gerenciamento do Carrinho
// =============================================================================
function adicionarAoCarrinho(id) {
  const produto = cardapioItens.find(p => p.id === id);
  if (!produto) return;

  const itemExistente = carrinho.find(item => item.id === id);
  if (itemExistente) {
    itemExistente.qtd += 1;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      qtd: 1,
      observacao: ""
    });
  }

  atualizarCarrinho();
  abrirCarrinho();
  showToast("Item Adicionado!", `${produto.nome} foi adicionado ao seu pedido.`);
}

function alterarQtd(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;

  item.qtd += delta;
  if (item.qtd <= 0) {
    carrinho = carrinho.filter(i => i.id !== id);
  }
  atualizarCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  atualizarCarrinho();
}

function atualizarObservacao(id, obs) {
  const item = carrinho.find(i => i.id === id);
  if (item) {
    item.observacao = obs;
  }
}

function atualizarCarrinho() {
  const totalItens = carrinho.reduce((sum, item) => sum + item.qtd, 0);
  dom.carrinhoContador.textContent = totalItens;

  if (carrinho.length === 0) {
    dom.itensCarrinho.innerHTML = `
      <div class="empty-cart-msg">
        <p style="font-size: 2rem; margin-bottom: 0.5rem;">🛍️</p>
        <p>Seu carrinho está vazio.</p>
        <span style="font-size: 0.8rem; color: var(--text-secondary);">Adicione deliciosos smash burguers do cardápio!</span>
      </div>
    `;
    dom.subtotalVal.textContent = formatMoney(0);
    dom.taxaEntregaVal.textContent = formatMoney(0);
    dom.totalGeralVal.textContent = formatMoney(0);
    return;
  }

  const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);
  const total = subtotal + TAXA_ENTREGA;

  dom.itensCarrinho.innerHTML = carrinho.map(item => `
    <div class="cart-item-card" data-id="${item.id}">
      <div class="cart-item-row-top">
        <span class="cart-item-title">${item.nome}</span>
        <span class="cart-item-price">${formatMoney(item.preco * item.qtd)}</span>
      </div>
      <div class="cart-item-row-bottom">
        <div class="qty-control">
          <button class="btn-qty btn-dec" data-id="${item.id}">-</button>
          <span class="qty-display">${item.qtd}</span>
          <button class="btn-qty btn-inc" data-id="${item.id}">+</button>
        </div>
        <button class="btn-remove-item" data-id="${item.id}">
          Remover
        </button>
      </div>
      <input type="text" class="item-obs-input" placeholder="Ex: Sem cebola, bacon bem passado..." value="${item.observacao || ''}" data-id="${item.id}">
    </div>
  `).join("");

  // Listeners de quantidade e remoção
  dom.itensCarrinho.querySelectorAll(".btn-dec").forEach(btn => {
    btn.addEventListener("click", () => alterarQtd(btn.getAttribute("data-id"), -1));
  });
  dom.itensCarrinho.querySelectorAll(".btn-inc").forEach(btn => {
    btn.addEventListener("click", () => alterarQtd(btn.getAttribute("data-id"), 1));
  });
  dom.itensCarrinho.querySelectorAll(".btn-remove-item").forEach(btn => {
    btn.addEventListener("click", () => removerDoCarrinho(btn.getAttribute("data-id")));
  });
  dom.itensCarrinho.querySelectorAll(".item-obs-input").forEach(input => {
    input.addEventListener("input", (e) => {
      atualizarObservacao(input.getAttribute("data-id"), e.target.value);
    });
  });

  dom.subtotalVal.textContent = formatMoney(subtotal);
  dom.taxaEntregaVal.textContent = formatMoney(TAXA_ENTREGA);
  dom.totalGeralVal.textContent = formatMoney(total);
}

function abrirCarrinho() {
  dom.carrinhoDrawer.classList.add("open");
  dom.cartBackdrop.classList.add("open");
  dom.carrinhoDrawer.setAttribute("aria-hidden", "false");
}

function fecharCarrinho() {
  dom.carrinhoDrawer.classList.remove("open");
  dom.cartBackdrop.classList.remove("open");
  dom.carrinhoDrawer.setAttribute("aria-hidden", "true");
}

// =============================================================================
// Navegação SPA (Visão Cliente vs Visão Cozinha)
// =============================================================================
function switchView(view) {
  if (view === "cliente") {
    dom.visaoCliente.classList.add("active");
    dom.visaoCozinha.classList.remove("active");
    dom.tabCliente.classList.add("active");
    dom.tabCozinha.classList.remove("active");
    dom.tabCliente.setAttribute("aria-selected", "true");
    dom.tabCozinha.setAttribute("aria-selected", "false");
  } else {
    dom.visaoCliente.classList.remove("active");
    dom.visaoCozinha.classList.add("active");
    dom.tabCliente.classList.remove("active");
    dom.tabCozinha.classList.add("active");
    dom.tabCliente.setAttribute("aria-selected", "false");
    dom.tabCozinha.setAttribute("aria-selected", "true");
    fecharCarrinho();
  }
}

// =============================================================================
// Checkout & Finalização de Pedido
// =============================================================================
function setupCheckout() {
  // Alternância de método de pagamento
  const radios = document.querySelectorAll('input[name="formaPagamento"]');
  radios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "dinheiro") {
        dom.campoTrocoWrapper.classList.remove("hidden");
      } else {
        dom.campoTrocoWrapper.classList.add("hidden");
      }
    });
  });

  // Copiar chave Pix
  if (dom.btnCopiarPix) {
    dom.btnCopiarPix.addEventListener("click", () => {
      const code = dom.codigoPix.textContent;
      navigator.clipboard.writeText(code).then(() => {
        showToast("Pix Copiado!", "Código copia-e-cola copiado para a área de transferência.");
      }).catch(() => {
        showToast("Erro ao Copiar", "Copie manualmente o código Pix.", true);
      });
    });
  }

  // Envio do formulário
  if (dom.formCheckout) {
    dom.formCheckout.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (carrinho.length === 0) {
        showToast("Carrinho Vazio", "Adicione itens ao carrinho antes de finalizar!", true);
        abrirCarrinho();
        return;
      }

      const nome = document.getElementById("nomeCliente").value.trim();
      const telefone = document.getElementById("telefoneCliente").value.trim();
      const rua = document.getElementById("enderecoRua").value.trim();
      const numero = document.getElementById("enderecoNumero").value.trim();
      const bairro = document.getElementById("enderecoBairro").value.trim();
      const obsEntrega = document.getElementById("obsEntrega").value.trim();
      const formaPagamento = document.querySelector('input[name="formaPagamento"]:checked')?.value || "pix";
      const valorTroco = document.getElementById("valorTroco")?.value.trim() || "";

      const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);
      const total = subtotal + TAXA_ENTREGA;
      const numeroPedido = Math.floor(1000 + Math.random() * 9000);

      const novoPedido = {
        numeroPedido: `#BS-${numeroPedido}`,
        dataCriacao: new Date().toISOString(),
        status: "recebido", // recebido -> em_preparo -> saiu_entrega -> entregue
        cliente: {
          nome,
          telefone,
          endereco: `${rua}, ${numero} - ${bairro} (Ourinhos/SP)`,
          obsEntrega
        },
        itens: carrinho.map(i => ({
          id: i.id,
          nome: i.nome,
          qtd: i.qtd,
          precoUnit: i.preco,
          observacao: i.observacao || ""
        })),
        pagamento: {
          metodo: formaPagamento,
          trocoPara: formaPagamento === "dinheiro" ? valorTroco : null
        },
        valores: {
          subtotal,
          taxaEntrega: TAXA_ENTREGA,
          total
        }
      };

      try {
        const btnSubmit = document.getElementById("btnFinalizarPedido");
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Transmitindo para a Cozinha...";

        if (db && !isOfflineFallback) {
          // Gravação no Cloud Firestore
          await addDoc(collection(db, "pedidos"), {
            ...novoPedido,
            createdAt: serverTimestamp()
          });
        } else {
          // Self-Annealing LocalStorage Fallback
          salvarPedidoLocal(novoPedido);
        }

        // Limpeza de estado e feedback
        carrinho = [];
        atualizarCarrinho();
        dom.formCheckout.reset();
        dom.campoTrocoWrapper.classList.add("hidden");
        fecharCarrinho();

        showToast("Pedido Enviado!", `Pedido #${numeroPedido} despachado diretamente para o KDS da Cozinha.`);
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Finalizar e Enviar Pedido para a Cozinha";

        // Redireciona opcionalmente para a visão de cozinha para demonstração imediata
        setTimeout(() => {
          switchView("cozinha");
        }, 1200);

      } catch (err) {
        console.error("[Erro ao submeter pedido]:", err);
        salvarPedidoLocal(novoPedido);
        showToast("Modo Offline Ativo", "Pedido salvo localmente devido à oscilação da conexão.");
        carrinho = [];
        atualizarCarrinho();
        dom.formCheckout.reset();
        fecharCarrinho();
      }
    });
  }
}

// =============================================================================
// Resiliência & Self-Annealing (Offline Fallback)
// =============================================================================
function salvarPedidoLocal(pedido) {
  try {
    const pedidosLocais = JSON.parse(localStorage.getItem("burguersync_pedidos") || "[]");
    pedidosLocais.unshift(pedido);
    localStorage.setItem("burguersync_pedidos", JSON.stringify(pedidosLocais));
    carregarPedidosLocais();
  } catch (e) {
    console.error("Erro ao salvar local:", e);
  }
}

function carregarPedidosLocais() {
  const pedidosLocais = JSON.parse(localStorage.getItem("burguersync_pedidos") || "[]");
  pedidosFirestore = pedidosLocais;
  renderKDS();
}

// =============================================================================
// Visão da Cozinha KDS (Realtime Listeners & Ações de Status)
// =============================================================================
function setupKDSListener() {
  if (db && !isOfflineFallback) {
    try {
      const q = query(collection(db, "pedidos"));
      onSnapshot(q, (snapshot) => {
        const lista = [];
        snapshot.forEach((docSnap) => {
          lista.push({
            firestoreId: docSnap.id,
            ...docSnap.data()
          });
        });

        // Ordenação decrescente por data
        lista.sort((a, b) => new Date(b.dataCriacao || 0) - new Date(a.dataCriacao || 0));
        pedidosFirestore = lista;
        renderKDS();
      }, (error) => {
        console.warn("[Firestore Listener Error]: chaveando para modo local.", error);
        carregarPedidosLocais();
      });
    } catch (e) {
      console.warn("Erro ao registrar snapshot:", e);
      carregarPedidosLocais();
    }
  } else {
    carregarPedidosLocais();
  }
}

async function transicionarStatusPedido(pedidoId, firestoreId, proximoStatus) {
  try {
    if (firestoreId && db && !isOfflineFallback) {
      const docRef = doc(db, "pedidos", firestoreId);
      await updateDoc(docRef, { status: proximoStatus });
    } else {
      // Local fallback update
      const pedidosLocais = JSON.parse(localStorage.getItem("burguersync_pedidos") || "[]");
      const p = pedidosLocais.find(x => x.numeroPedido === pedidoId);
      if (p) {
        p.status = proximoStatus;
        localStorage.setItem("burguersync_pedidos", JSON.stringify(pedidosLocais));
        carregarPedidosLocais();
      }
    }
    showToast("Status Atualizado", `Pedido ${pedidoId} movido para: ${formatarStatus(proximoStatus)}.`);
  } catch (err) {
    console.error("Erro ao alterar status:", err);
    showToast("Erro ao atualizar status", err.message, true);
  }
}

function formatarStatus(status) {
  switch (status) {
    case "recebido": return "Recebido";
    case "em_preparo": return "Na Chapa";
    case "saiu_entrega": return "Saiu p/ Entrega";
    case "entregue": return "Entregue";
    default: return status;
  }
}

function renderKDS() {
  if (!dom.listaPedidos) return;

  // Filtragem
  const filtrados = pedidosFirestore.filter(p => {
    if (filtroAtivo === "todos") return true;
    if (filtroAtivo === "pendente") return p.status === "recebido";
    if (filtroAtivo === "preparo") return p.status === "em_preparo";
    if (filtroAtivo === "pronto") return p.status === "saiu_entrega" || p.status === "entregue";
    return true;
  });

  // Atualizar métricas
  const pendentes = pedidosFirestore.filter(p => p.status === "recebido").length;
  const preparo = pedidosFirestore.filter(p => p.status === "em_preparo").length;
  const prontos = pedidosFirestore.filter(p => p.status === "saiu_entrega").length;

  if (dom.metricPendentes) dom.metricPendentes.textContent = pendentes;
  if (dom.metricPreparo) dom.metricPreparo.textContent = preparo;
  if (dom.metricProntos) dom.metricProntos.textContent = prontos;
  if (dom.totalFiltro) dom.totalFiltro.textContent = pedidosFirestore.length;

  if (filtrados.length === 0) {
    dom.listaPedidos.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
        <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔥</p>
        <h3 style="color: var(--text-primary); font-size: 1.2rem; margin-bottom: 0.25rem;">Nenhum pedido nesta fila</h3>
        <p style="font-size: 0.85rem;">Todos os hambúrgueres foram processados ou aguarde novos chamados do cardápio digital.</p>
      </div>
    `;
    return;
  }

  dom.listaPedidos.innerHTML = filtrados.map(p => {
    let proximaAcaoBtn = "";
    let statusClass = "status-recebido";
    let badgeClass = "status-badge-recebido";

    if (p.status === "recebido") {
      statusClass = "status-recebido";
      badgeClass = "status-badge-recebido";
      proximaAcaoBtn = `
        <button class="btn-status-action btn-action-preparo" data-num="${p.numeroPedido}" data-fid="${p.firestoreId || ''}" data-next="em_preparo">
          Mover p/ Em Preparo (Chapa)
        </button>
      `;
    } else if (p.status === "em_preparo") {
      statusClass = "status-preparo";
      badgeClass = "status-badge-preparo";
      proximaAcaoBtn = `
        <button class="btn-status-action btn-action-entrega" data-num="${p.numeroPedido}" data-fid="${p.firestoreId || ''}" data-next="saiu_entrega">
          Despachar p/ Entrega
        </button>
      `;
    } else if (p.status === "saiu_entrega") {
      statusClass = "status-entrega";
      badgeClass = "status-badge-entrega";
      proximaAcaoBtn = `
        <button class="btn-status-action btn-action-concluir" data-num="${p.numeroPedido}" data-fid="${p.firestoreId || ''}" data-next="entregue">
          Marcar como Entregue
        </button>
      `;
    } else {
      statusClass = "status-entregue";
      badgeClass = "status-badge-entregue";
      proximaAcaoBtn = `
        <div style="text-align: center; color: var(--success); font-weight: 700; font-size: 0.85rem; padding: 0.5rem;">
          ✓ Pedido Concluído
        </div>
      `;
    }

    const cleanTel = (p.cliente?.telefone || "").replace(/\D/g, "");
    const waLink = cleanTel ? `https://wa.me/55${cleanTel}` : "#";

    return `
      <article class="order-card ${statusClass}">
        <header class="order-card-header">
          <span class="order-id">${p.numeroPedido}</span>
          <span class="badge-status ${badgeClass}">${formatarStatus(p.status)}</span>
        </header>

        <div class="order-client-data">
          <strong>${p.cliente?.nome || "Cliente"}</strong>
          <span><a href="${waLink}" target="_blank" rel="noopener">📱 ${p.cliente?.telefone || "Sem telefone"}</a></span>
          <address style="font-style: normal; color: var(--text-secondary); font-size: 0.8rem; margin-top: 2px;">
            📍 ${p.cliente?.endereco || "Balcão Ourinhos"}
          </address>
          ${p.cliente?.obsEntrega ? `<span style="font-size: 0.75rem; color: var(--accent-neon); margin-top: 2px;">Ref: ${p.cliente.obsEntrega}</span>` : ""}
        </div>

        <div class="order-items-container">
          ${(p.itens || []).map(i => `
            <div class="order-item-row">
              <span class="item-qty-tag">${i.qtd}x</span>
              <span class="item-name">${i.nome}</span>
            </div>
            ${i.observacao ? `
              <div class="order-item-note">
                <strong>Obs:</strong> ${i.observacao}
              </div>
            ` : ""}
          `).join("")}
        </div>

        <footer class="order-card-footer">
          <div class="order-total-info">
            <span>Total:</span>
            <span>${formatMoney(p.valores?.total || 0)} (${p.pagamento?.metodo?.toUpperCase() || 'PIX'})</span>
          </div>
          <div class="order-actions-flow">
            ${proximaAcaoBtn}
          </div>
        </footer>
      </article>
    `;
  }).join("");

  // Event Listeners das ações de transição
  dom.listaPedidos.querySelectorAll(".btn-status-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const num = btn.getAttribute("data-num");
      const fid = btn.getAttribute("data-fid");
      const next = btn.getAttribute("data-next");
      transicionarStatusPedido(num, fid, next);
    });
  });
}

function setupKDSEvents() {
  // Filtros
  const filtrosBtns = document.querySelectorAll(".btn-filtro");
  filtrosBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filtrosBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filtroAtivo = btn.getAttribute("data-filtro");
      renderKDS();
    });
  });

  // Simular Pedido Balcão
  if (dom.btnNovoPedidoSimulado) {
    dom.btnNovoPedidoSimulado.addEventListener("click", async () => {
      const num = Math.floor(1000 + Math.random() * 9000);
      const randomItem = cardapioItens[Math.floor(Math.random() * cardapioItens.length)];
      const pedidoSimulado = {
        numeroPedido: `#BS-${num}`,
        dataCriacao: new Date().toISOString(),
        status: "recebido",
        cliente: {
          nome: `Cliente Balcão (${num})`,
          telefone: "(14) 99876-5432",
          endereco: "Retirada no Balcão • Rua São Paulo, Centro - Ourinhos/SP",
          obsEntrega: "Chamar pelo número da comanda"
        },
        itens: [{
          id: randomItem.id,
          nome: randomItem.nome,
          qtd: 1,
          precoUnit: randomItem.preco,
          observacao: "Caprichar no molho!"
        }],
        pagamento: {
          metodo: "pix",
          trocoPara: null
        },
        valores: {
          subtotal: randomItem.preco,
          taxaEntrega: 0,
          total: randomItem.preco
        }
      };

      if (db && !isOfflineFallback) {
        await addDoc(collection(db, "pedidos"), {
          ...pedidoSimulado,
          createdAt: serverTimestamp()
        });
      } else {
        salvarPedidoLocal(pedidoSimulado);
      }

      showToast("Pedido Simulado!", `Comanda #${num} enviada para a chapa.`);
    });
  }
}

// =============================================================================
// Inicialização do App
// =============================================================================
function init() {
  renderVitrine();
  atualizarCarrinho();
  setupCheckout();
  setupKDSEvents();
  setupKDSListener();

  // Alternador de Abas
  if (dom.tabCliente) dom.tabCliente.addEventListener("click", () => switchView("cliente"));
  if (dom.tabCozinha) dom.tabCozinha.addEventListener("click", () => switchView("cozinha"));

  // Carrinho Drawer
  if (dom.btnAbrirCarrinho) dom.btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
  if (dom.btnFecharCarrinho) dom.btnFecharCarrinho.addEventListener("click", fecharCarrinho);
  if (dom.cartBackdrop) dom.cartBackdrop.addEventListener("click", fecharCarrinho);

  if (dom.btnIrParaCheckout) {
    dom.btnIrParaCheckout.addEventListener("click", () => {
      fecharCarrinho();
      const secao = document.getElementById("secaoCheckout");
      if (secao) {
        secao.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  console.log("⚡ BurguerSync Ourinhos iniciado com sucesso.");
}

// Bootstrap
document.addEventListener("DOMContentLoaded", init);
