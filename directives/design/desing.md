Especificação Técnica de UI/UX & Front-End: BurguerSync Ourinhos

Documentação arquitetural de interface, design system e especificações de código front-end para o aplicativo BurguerSync Ourinhos.

1. Design System & Identidade Visual

1.1 Paleta de Cores (Hexadecimal)

| Token | Hex | Aplicação no Sistema |
| --bg-base | #0D0D10 | Fundo principal da aplicação (Dark Mode profundo) |
| --bg-surface | #18181C | Fundo de cards, painéis, modais e containers |
| --bg-surface-elevated | #24242B | Estados de hover de cards, inputs e dropdowns |
| --border-subtle | #2E2E38 | Divisórias e bordas secundárias de cards |
| --accent-primary | #FF9F0A | Laranja vibrante para CTAs principais e ícones |
| --accent-neon | #FFD60A | Amarelo neon para badges de alerta, observações e brilhos |
| --success | #00E065 | Verde neon para confirmações, badges "Entregue" e checkout |
| --info | #0A84FF | Azul de status (ex: "Em Preparo") |
| --danger | #FF453A | Vermelho para remoção de itens e cancelamento |
| --text-primary | #FFFFFF | Títulos e textos de alto contraste |
| --text-secondary | #A1A1AA | Descrições, rótulos e textos de suporte |
| --text-muted | #63636E | Textos desativados, placeholders e tags de baixa ênfase |

1.2 Tipografia e Escala Visual

Família Tipográfica Primária: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif.

Família Tipográfica Numérica (Preços e IDs): 'JetBrains Mono', monospace (para alinhamento tabular de valores).

Escala Modular e Hierarquia (Base 16px):

Display / Hero (h1): 2.25rem (36px) | Peso: 800 (Bold) | line-height: 1.2

Título de Seção (h2): 1.5rem (24px) | Peso: 700 (Bold) | line-height: 1.3

Título de Card (h3): 1.125rem (18px) | Peso: 600 (Semi-bold) | line-height: 1.4

Subtítulos / Rótulos: 0.875rem (14px) | Peso: 600 (Semi-bold) | letter-spacing: 0.05em

Corpo (body): 1rem (16px) | Peso: 400 (Regular) | line-height: 1.5

Legendas / Metadados: 0.75rem (12px) | Peso: 500 (Medium) | line-height: 1.4

2. Wireframe Estrutural & Arquitetura de Informação

2.1 Visão do Cliente

Header Fixo: Logotipo BurguerSync Ourinhos, Seletor de Modo (Cliente/Cozinha) e Botão acionador do Carrinho (#btnAbrirCarrinho) com badge numérica.

Hero / Banner: Identificação da loja com badges de tempo estimado ("30-45 min") e status ("Aberto").

Vitrine Dinâmica (#vitrineLanches): Grid responsivo contendo os cards de produtos com foto, tags de ingredientes, preço e gatilho de adição.

Gaveta Lateral / Modal Carrinho (#carrinho): Itens selecionados, botões de incremento/decremento (.btn-qty), campo de observação individual (.item-obs), cálculo de subtotal, frete e total.

Seção de Checkout & Pagamento (#checkout): Formulário semântico com validação nativa para entrega e abas de método de pagamento (Pix / Cartão / Dinheiro).

2.2 Visão da Cozinha (KDS - Kitchen Display System)

Painel de Controle: Métricas rápidas (Pedidos Pendentes, Em Preparo, Prontos).

Quadro Kanban / Grid Operacional (#listaPedidos): Cards organizados cronologicamente. Cada card exibe:

Identificador do pedido (ex: #BS-1042).

Dados de entrega e telefone com botão direto para WhatsApp.

Lista detalhada de itens com observações destacadas em caixa de alerta amarelo neon.

Ações de transição de status em 1 clique.

3. Estrutura HTML5 Semântica

A estrutura abaixo consolida todos os IDs e classes obrigatórios para a integração JavaScript e estilização CSS:

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BurguerSync Ourinhos</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet">
</head>
<body class="dark-theme">

  <!-- Header Global -->
  <header class="main-header">
    <div class="header-container container">
      <div class="brand">
        <span class="brand-badge">Ourinhos</span>
        <h1 class="brand-title">Burguer<span>Sync</span></h1>
      </div>
      
      <nav class="view-switcher" role="tablist">
        <button id="tabCliente" class="tab-btn active" role="tab" aria-selected="true">Fazer Pedido</button>
        <button id="tabCozinha" class="tab-btn" role="tab" aria-selected="false">Painel Cozinha</button>
      </nav>

      <button id="btnAbrirCarrinho" class="cart-trigger" aria-label="Abrir Carrinho">
        <span class="cart-icon">🛍️</span>
        <span id="carrinhoContador" class="badge-count">0</span>
      </button>
    </div>
  </header>

  <main class="main-viewport container">
    <!-- VISÃO DO CLIENTE -->
    <section id="visaoCliente" class="view-panel active">
      <!-- Vitrine de Produtos -->
      <section class="catalog-section">
        <h2 class="section-title">Cardápio Artesanal</h2>
        <div id="vitrineLanches" class="products-grid">
          <!-- Exemplo de Card de Produto -->
          <article class="product-card" data-id="1">
            <div class="product-media">
              <img src="assets/smash-burguer.jpg" alt="Ourinhos Smash Burguer" class="product-img" loading="lazy">
              <span class="badge-tag">Mais Pedido</span>
            </div>
            <div class="product-content">
              <h3 class="product-name">Ourinhos Smash Burguer</h3>
              <p class="product-desc">Pão brioche tostado na manteiga, 2x smash burger 80g, queijo cheddar inglês derretido e bacon crocante.</p>
              <div class="product-footer">
                <span class="product-price">R$ 28,00</span>
                <button class="btn-add-cart" data-id="1">
                  <span>Adicionar</span>
                  <span class="icon">+</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Drawer / Modal do Carrinho -->
      <aside id="carrinho" class="cart-drawer" aria-hidden="true">
        <div class="cart-header">
          <h2>Seu Pedido</h2>
          <button id="btnFecharCarrinho" class="btn-close" aria-label="Fechar">✕</button>
        </div>
        
        <div id="itensCarrinho" class="cart-items-list">
          <!-- Template de item injetado dinamicamente -->
          <!-- 
          <div class="cart-item">
            <div class="cart-item-info">
              <span class="cart-item-title">Ourinhos Smash Burguer</span>
              <span class="cart-item-price">R$ 28,00</span>
            </div>
            <div class="qty-selector">
              <button class="btn-qty btn-decrease">-</button>
              <span class="qty-val">1</span>
              <button class="btn-qty btn-increase">+</button>
            </div>
            <input type="text" class="item-obs" placeholder="Ex: Sem cebola, ponto da carne...">
          </div>
          -->
        </div>

        <div class="cart-summary">
          <div class="summary-row"><span>Subtotal:</span><span id="subtotalVal">R$ 0,00</span></div>
          <div class="summary-row"><span>Taxa de Entrega:</span><span id="taxaEntregaVal">R$ 5,00</span></div>
          <div class="summary-row total"><span>Total:</span><span id="totalGeralVal">R$ 5,00</span></div>
        </div>

        <button id="btnIrParaCheckout" class="btn-checkout-proceed">Avançar para Entrega</button>
      </aside>

      <!-- Formulário de Finalização -->
      <section id="secaoCheckout" class="checkout-section">
        <h2 class="section-title">Dados de Entrega & Pagamento</h2>
        <form id="formCheckout" class="checkout-form">
          <fieldset class="form-group-fieldset">
            <legend>Informações do Cliente</legend>
            <div class="form-grid">
              <div class="field-control">
                <label for="nomeCliente">Nome Completo *</label>
                <input type="text" id="nomeCliente" name="nomeCliente" required placeholder="Digite seu nome">
              </div>
              <div class="field-control">
                <label for="telefoneCliente">WhatsApp / Celular *</label>
                <input type="tel" id="telefoneCliente" name="telefoneCliente" required placeholder="(14) 99999-9999">
              </div>
            </div>
          </fieldset>

          <fieldset class="form-group-fieldset">
            <legend>Endereço de Entrega (Ourinhos)</legend>
            <div class="form-grid address-grid">
              <div class="field-control span-2">
                <label for="enderecoRua">Rua / Avenida *</label>
                <input type="text" id="enderecoRua" name="enderecoRua" required placeholder="Rua São Paulo">
              </div>
              <div class="field-control">
                <label for="enderecoNumero">Número *</label>
                <input type="text" id="enderecoNumero" name="enderecoNumero" required placeholder="123">
              </div>
              <div class="field-control">
                <label for="enderecoBairro">Bairro *</label>
                <input type="text" id="enderecoBairro" name="enderecoBairro" required placeholder="Centro">
              </div>
              <div class="field-control span-full">
                <label for="obsEntrega">Instruções de Entrega (Opcional)</label>
                <input type="text" id="obsEntrega" name="obsEntrega" placeholder="Apto 42, Bloco B / Interfone / Deixar na guarita">
              </div>
            </div>
          </fieldset>

          <fieldset class="form-group-fieldset">
            <legend>Forma de Pagamento</legend>
            <div id="tipoPagamento" class="payment-options-grid">
              <label class="payment-card">
                <input type="radio" name="formaPagamento" value="pix" checked>
                <span class="payment-box">
                  <span class="icon">⚡</span>
                  <span class="label">Pix Instantâneo</span>
                </span>
              </label>
              <label class="payment-card">
                <input type="radio" name="formaPagamento" value="cartao">
                <span class="payment-box">
                  <span class="icon">💳</span>
                  <span class="label">Cartão na Entrega</span>
                </span>
              </label>
              <label class="payment-card">
                <input type="radio" name="formaPagamento" value="dinheiro">
                <span class="payment-box">
                  <span class="icon">💵</span>
                  <span class="label">Dinheiro</span>
                </span>
              </label>
            </div>

            <!-- Caixa Dinâmica de Troco -->
            <div id="campoTrocoWrapper" class="field-control troco-field hidden">
              <label for="valorTroco">Precisa de troco para quanto?</label>
              <input type="text" id="valorTroco" name="valorTroco" placeholder="Ex: R$ 50,00">
            </div>

            <!-- Caixa Dinâmica de Pix -->
            <div id="painelPixCopiaCola" class="pix-instructions">
              <p>Chave Pix (CNPJ/Aleatória):</p>
              <div class="pix-clipboard-box">
                <code id="codigoPix">00020126360014BR.GOV.BCB.PIX0114burguersyncourinhos...</code>
                <button type="button" id="btnCopiarPix" class="btn-copy">Copiar</button>
              </div>
            </div>
          </fieldset>

          <button type="submit" id="btnFinalizarPedido" class="btn-confirm-order">
            Finalizar e Enviar Pedido para a Cozinha
          </button>
        </form>
      </section>
    </section>

    <!-- VISÃO DA COZINHA (KDS) -->
    <section id="visaoCozinha" class="view-panel">
      <div class="kds-header">
        <h2 class="section-title">Painel de Pedidos em Tempo Real</h2>
        <div class="kds-filters">
          <span class="live-indicator"><span class="dot"></span> Atualização Ao Vivo</span>
        </div>
      </div>

      <div id="listaPedidos" class="kds-orders-grid">
        <!-- Exemplo de Card de Pedido da Cozinha -->
        <article class="order-card status-recebido" data-order-id="1042">
          <header class="order-card-header">
            <span class="order-id">#1042</span>
            <span class="order-timestamp">19:42 (há 5 min)</span>
            <span class="badge-status status-badge-recebido">Recebido</span>
          </header>

          <div class="order-client-data">
            <strong>João Silva</strong>
            <span>(14) 99876-5432</span>
            <address>Rua Duque de Caxias, 450 - Vila Nova</address>
          </div>

          <div class="order-items-container">
            <div class="order-item-row">
              <span class="item-qty-tag">1x</span>
              <span class="item-name">Monster Bacon SENAI</span>
            </div>
            <div class="order-item-note">
              <strong>Obs:</strong> Sem cebola, bacon bem crocante.
            </div>
          </div>

          <footer class="order-card-footer">
            <div class="order-total-info">Total: R$ 39,00 (Pix)</div>
            <div class="order-actions-flow">
              <button class="btn-status-action" data-action="preparar">Mover p/ Em Preparo</button>
            </div>
          </footer>
        </article>
      </div>
    </section>
  </main>
</body>
</html>



4. Folha de Estilos CSS3 Moderna (Mobile-First)

/* ==========================================================================
   1. TOKENS, VARIÁVEIS E RESET MODERNO
   ========================================================================== */
:root {
  --bg-base: #0D0D10;
  --bg-surface: #18181C;
  --bg-surface-elevated: #24242B;
  --border-subtle: #2E2E38;
  --border-focus: #FF9F0A;
  
  --accent-primary: #FF9F0A;
  --accent-primary-hover: #FFB340;
  --accent-neon: #FFD60A;
  --success: #00E065;
  --success-hover: #19F47C;
  --info: #0A84FF;
  --danger: #FF453A;

  --text-primary: #FFFFFF;
  --text-secondary: #A1A1AA;
  --text-muted: #63636E;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-full: 9999px;

  --shadow-card: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
  --shadow-neon: 0 0 16px rgba(255, 159, 10, 0.35);
  --shadow-neon-success: 0 0 16px rgba(0, 224, 101, 0.4);
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body.dark-theme {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ==========================================================================
   2. CONTAINERS E COMPONENTES GLOBAIS
   ========================================================================== */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(24, 24, 28, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0.75rem 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand-title span {
  color: var(--accent-primary);
}

.brand-badge {
  font-size: 0.65rem;
  text-transform: uppercase;
  background: var(--bg-surface-elevated);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  color: var(--accent-neon);
  font-weight: 700;
  margin-bottom: 2px;
  display: inline-block;
}

.view-switcher {
  display: flex;
  background-color: var(--bg-base);
  padding: 4px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-fast);
}

.tab-btn.active {
  background-color: var(--accent-primary);
  color: #000;
}

.cart-trigger {
  position: relative;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.badge-count {
  background: var(--accent-neon);
  color: #000;
  font-size: 0.75rem;
  font-weight: 800;
  border-radius: var(--radius-full);
  padding: 2px 6px;
}

.view-panel {
  display: none;
  padding: 1.5rem 0;
}

.view-panel.active {
  display: block;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
}

/* ==========================================================================
   3. VITRINE DE PRODUTOS (MOBILE-FIRST GRID)
   ========================================================================== */
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.product-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-neon);
}

.product-media {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: var(--bg-surface-elevated);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(13, 13, 16, 0.85);
  backdrop-filter: blur(4px);
  color: var(--accent-neon);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 214, 10, 0.4);
}

.product-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.product-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-neon);
}

.btn-add-cart {
  background-color: var(--accent-primary);
  color: #000;
  border: none;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.btn-add-cart:hover {
  background-color: var(--accent-primary-hover);
  transform: scale(1.03);
}

/* ==========================================================================
   4. DRAWER DO CARRINHO & RESUMO
   ========================================================================== */
.cart-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background-color: var(--bg-surface);
  box-shadow: -10px 0 30px rgba(0,0,0,0.8);
  z-index: 200;
  display: flex;
  flex-direction: column;
  transition: right var(--transition-smooth);
  padding: 1.5rem;
}

.cart-drawer.open {
  right: 0;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 1rem;
}

.btn-close {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
}

.cart-items-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-summary {
  background-color: var(--bg-surface-elevated);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-top: auto;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.4rem;
}

.summary-row.total {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.summary-row.total span:last-child {
  color: var(--accent-neon);
  font-family: 'JetBrains Mono', monospace;
}

.btn-checkout-proceed {
  width: 100%;
  background-color: var(--accent-primary);
  color: #000;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  margin-top: 1rem;
  transition: var(--transition-fast);
}

.btn-checkout-proceed:hover {
  background-color: var(--accent-primary-hover);
}

/* ==========================================================================
   5. FORMULÁRIO DE CHECKOUT & PAGAMENTO
   ========================================================================== */
.checkout-section {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-top: 2rem;
}

.form-group-fieldset {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.form-group-fieldset legend {
  padding: 0 0.5rem;
  font-weight: 700;
  color: var(--accent-primary);
  font-size: 0.9rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.field-control {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-control label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.field-control input {
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  padding: 0.75rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.field-control input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(255, 159, 10, 0.2);
}

.payment-options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.payment-card input[type="radio"] {
  display: none;
}

.payment-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.payment-card input[type="radio"]:checked + .payment-box {
  border-color: var(--accent-primary);
  background-color: rgba(255, 159, 10, 0.08);
}

.pix-instructions {
  margin-top: 1rem;
  background-color: var(--bg-base);
  border: 1px dashed var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.pix-clipboard-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.pix-clipboard-box code {
  flex-grow: 1;
  background-color: var(--bg-surface);
  padding: 0.5rem;
  font-size: 0.8rem;
  color: var(--accent-neon);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-copy {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.btn-confirm-order {
  width: 100%;
  background-color: var(--success);
  color: #000;
  border: none;
  font-weight: 800;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform var(--transition-smooth), box-shadow var(--transition-smooth), background-color var(--transition-fast);
}

.btn-confirm-order:hover {
  background-color: var(--success-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-neon-success);
}

/* ==========================================================================
   6. PAINEL DA COZINHA (KDS - KITCHEN DISPLAY SYSTEM)
   ========================================================================== */
.kds-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--success);
  font-weight: 600;
}

.live-indicator .dot {
  width: 8px;
  height: 8px;
  background-color: var(--success);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-neon-success);
  animation: pulse 1.8s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.8; }
}

.kds-orders-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.order-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: var(--shadow-card);
  border-left: 5px solid var(--accent-neon);
}

.order-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.75rem;
}

.order-id {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 1.1rem;
}

.order-timestamp {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Badges com brilho neon */
.badge-status {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.status-badge-recebido {
  background: rgba(255, 214, 10, 0.15);
  color: var(--accent-neon);
  border: 1px solid var(--accent-neon);
  box-shadow: 0 0 10px rgba(255, 214, 10, 0.3);
}

.status-badge-preparo {
  background: rgba(10, 132, 255, 0.15);
  color: var(--info);
  border: 1px solid var(--info);
  box-shadow: 0 0 10px rgba(10, 132, 255, 0.3);
}

.status-badge-entrega {
  background: rgba(255, 159, 10, 0.15);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
  box-shadow: 0 0 10px rgba(255, 159, 10, 0.3);
}

.status-badge-entregue {
  background: rgba(0, 224, 101, 0.15);
  color: var(--success);
  border: 1px solid var(--success);
  box-shadow: 0 0 10px rgba(0, 224, 101, 0.3);
}

.order-client-data {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.35;
}

.order-client-data strong {
  color: var(--text-primary);
  display: block;
}

.order-items-container {
  background-color: var(--bg-surface-elevated);
  border-radius: var(--radius-sm);
  padding: 0.85rem;
}

.order-item-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.item-qty-tag {
  color: var(--accent-neon);
  font-family: 'JetBrains Mono', monospace;
}

.order-item-note {
  margin-top: 0.4rem;
  padding: 0.4rem 0.6rem;
  background-color: rgba(255, 214, 10, 0.1);
  border-left: 3px solid var(--accent-neon);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--accent-neon);
}

.btn-status-action {
  width: 100%;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  padding: 0.65rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-status-action:hover {
  background-color: var(--accent-primary);
  color: #000;
  border-color: var(--accent-primary);
}

/* ==========================================================================
   7. REGRAS DE RESPONSIVIDADE (MEDIA QUERIES)
   ========================================================================== */
@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .payment-options-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .span-2 {
    grid-column: span 2;
  }

  .span-full {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .kds-orders-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .main-viewport {
    padding: 2.5rem 0;
  }
}



5. Diretrizes de Interação e Estados de UX

Adição ao Carrinho Sem Atrito: Ao clicar no botão de adicionar (.btn-add-cart), o contador do botão (#carrinhoContador) sofre uma microanimação de escala (transform: scale(1.3)) e retorna ao normal em 150ms.

Alternância Dinâmica de Troco: Quando o radio button de pagamento for dinheiro, o campo #campoTrocoWrapper remove a classe .hidden com transição suave de opacidade.

Persistência de Visão (SPA Feel): A navegação entre as tabs #tabCliente e #tabCozinha altera apenas a visibilidade dos painéis (#visaoCliente e #visaoCozinha), mantendo os itens do carrinho e os status da cozinha em memória local (localStorage ou estado reativo).