# 📋 Instruções de Execução - BurguerSync Ourinhos

Guia passo a passo para configuração de ambiente, execução local e deploy da plataforma **BurguerSync Ourinhos**.

---

## 🛠️ Pré-requisitos

- **Node.js** v18+ instalado na máquina.
- Navegador moderno com suporte a ES Modules (Chrome, Edge, Firefox, Safari).
- Conexão com a internet para sincronização com o Firebase Cloud Firestore.

---

## 🚀 Como Executar Localmente

### Método 1: Via Script Batch Automático (Windows)
Basta dar um duplo clique no arquivo `executar.bat` localizado na raiz do projeto ou executá-lo no terminal:

```cmd
.\executar.bat
```

O script inicializará o servidor local em `http://localhost:3000` e abrirá a aplicação automaticamente no navegador padrão.

---

### Método 2: Via Terminal Node.js

1. No terminal aberto na pasta do projeto, inicie o servidor:
```bash
node execution/server.mjs
```

2. Acesse a aplicação no seu navegador:
```text
http://localhost:3000/frontend/index.html
```

---

## 🍔 Estrutura e Funcionalidades Disponíveis

- **Visão do Cliente (`#visaoCliente`):**
  - Cardápio interativo com fotos de alta qualidade extraídas do Google Stitch.
  - Seleção e adição ao carrinho com controle de quantidade e campo de observações ("Sem cebola", "Ponto da carne", etc.).
  - Drawer lateral dinâmico calculando subtotal, taxa de entrega de Ourinhos ($R\$\,5{,}00$) e total.
  - Checkout completo com validação de dados de entrega, suporte a Pix Copia-e-Cola, Cartão e Dinheiro com troco.
  - Envio direto para o banco de dados Cloud Firestore em tempo real.

- **Visão da Cozinha KDS (`#visaoCozinha`):**
  - Métricas operacionais ao vivo (Pendentes, Na Chapa, Prontos, Tempo Médio).
  - Filtro ágil por status.
  - Comandas sincronizadas via WebSocket (`onSnapshot`) com atualização em 1 clique:
    `Recebido` ➔ `Na Chapa (Em Preparo)` ➔ `Aguardando Entrega` ➔ `Entregue`.
  - Botão de simulação de pedido balcão para testes rápidos de expedição.

---

## 🔐 Configuração do Firebase & Variáveis

O projeto já vem pré-configurado com a conexão com o Firebase Firestore v10 no arquivo `frontend/js/firebase-config.js`. Caso deseje utilizar seu próprio projeto Firebase:

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Crie uma aplicação Web e copie as credenciais de `firebaseConfig`.
3. Atualize o arquivo `frontend/js/firebase-config.js` com seus dados.
4. Aplique as regras de segurança descritas em `backend/firestore.rules`.
