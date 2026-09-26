<div align="center">

# 🍔 BurguerSync Ourinhos
### *Real-Time Food Delivery & Kitchen Display System (KDS)*
### *Plataforma de Delivery em Tempo Real e Painel KDS de Cozinha*

[![Google Antigravity](https://img.shields.io/badge/Google-Antigravity%20v2.5.5-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/)
[![Google Stitch](https://img.shields.io/badge/Google-Stitch%20UI-EA4335?style=for-the-badge&logo=material-design&logoColor=white)](https://stitch.googleapis.com)
[![Firebase Firestore](https://img.shields.io/badge/Firebase-Firestore%20v10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-00E065?style=for-the-badge)](LICENSE)

<br/>

<img src="frontend/assets/logo.svg" alt="BurguerSync Ourinhos Logo" width="180"/>

<p align="center">
  <strong>Desenvolvido e Orquestrado com Google Antigravity &bull; SENAI Ourinhos Edition</strong>
</p>

[🇧🇷 Português](#-sobre-o-projeto-pt-br) &bull; [🇺🇸 English](#-about-the-project-en-us)

---

</div>

## 🇧🇷 Sobre o Projeto (PT-BR)

O **BurguerSync Ourinhos** é uma plataforma web full-stack desenvolvida para revolucionar a operação de delivery de alimentação e o autoatendimento gastronômico na região de Ourinhos/SP. Inspirado em experiências de alta conversão como iFood e sistemas industriais de cozinha (KDS - Kitchen Display System), o sistema elimina ruídos de comunicação e comandas manuais de papel através de sincronização bidirecional e instantânea via **Google Firebase Cloud Firestore**.

### 🌟 Destaques Tecnológicos
- **Google Antigravity (IA Generativa & Agente Orquestrador):** Concepção arquitetural, especificação técnica, validação de regras de negócio e geração automatizada de código em 3 camadas desacopladas.
- **Google Stitch Integration:** Prototipação visual em alta fidelidade com geração de temas neon, tokens de design e assets visuais de produtos.
- **Google Firebase Firestore v10:** Persistência em tempo real com WebSockets (`onSnapshot`), persistência offline (`IndexedDB`) e resiliência com arquitetura *Self-Annealing*.
- **Experiência Mobile-First SPA:** Alternância instantânea sem recarregar a página entre a **Visão do Cliente** (cardápio, observações, carrinho deslizante e checkout) e a **Visão da Cozinha** (comandas de chapa, métricas em tempo real e atualização de status em 1 clique).

---

## 🇺🇸 About the Project (EN-US)

**BurguerSync Ourinhos** is a full-stack real-time food delivery and Kitchen Display System (KDS) web application crafted for the Ourinhos/SP market. Built with modern web standards and reactive cloud architecture, it eliminates the operational gap between customer checkout and kitchen food preparation.

### 🌟 Technological Highlights
- **Google Antigravity Powered:** AI orchestration and multi-agent coordination following the strict 3-Layer Architecture (Directives, Orchestration, Execution).
- **Google Stitch Integration:** High-fidelity interactive design prototyping, dark neon color palette tokens, and gourmet visual assets.
- **Google Firebase Cloud Firestore v10:** Real-time synchronization via listeners, instant status mutations, and offline cache resilience.
- **Mobile-First SPA:** Seamless client ordering experience paired with a high-throughput kitchen display panel.

---

## 🏗️ Arquitetura em 3 Camadas (3-Layer Architecture)

```mermaid
graph TD
    subgraph Layer1 [Layer 1: Diretiva & Estratégia]
        D1[directives/projeto.md]
        D2[directives/design/desing.md]
        D3[backend/schema/firestore-schema.json]
    end

    subgraph Layer2 [Layer 2: Orquestração IA Antigravity]
        O1[Antigravity Multi-Agent Router]
        O2[Pipeline de Auto-Recuperação / Self-Annealing]
    end

    subgraph Layer3 [Layer 3: Execução & Runtime]
        E1[frontend/index.html & styles/main.css]
        E2[frontend/js/app.js & firebase-config.js]
        E3[Firebase Cloud Firestore v10]
    end

    Layer1 --> Layer2
    Layer2 --> Layer3
```

---

## 🤖 Agentes e Skills do Google Antigravity Utilizados

Durante todo o ciclo de desenvolvimento, o ecossistema do **Google Antigravity** foi empregado através de agentes especializados e skill packs:

| Agente / Skill Pack | Finalidade no Projeto |
| :--- | :--- |
| **`@agente-orquestrador`** | Coordenação determinística das 3 camadas, auto-recuperação e fluxo de build. |
| **`@app-builder`** | Estruturação de componentes front-end e sincronização de dados. |
| **`@frontend-design`** | Aplicação estrita dos tokens de design neon do Google Stitch. |
| **`@database-design`** | Modelagem NoSQL no Firebase Cloud Firestore e regras de segurança. |
| **`@clean-code`** | Implementação de código limpo, sem dependências infladas e de alto desempenho. |

---

## 🚀 Como Executar Localmente / Quickstart

### No Windows:
Basta executar o script automatizado `executar.bat`:
```cmd
.\executar.bat
```

### Via Terminal Node.js:
```bash
# Iniciar o servidor HTTP local na porta 3000
node execution/server.mjs

# Abrir no navegador:
http://localhost:3000/frontend/index.html
```

---

## 📱 Fluxo de Status do Pedido (KDS Lifecycle)

```
[🛒 Cliente Envia Pedido] 
       │
       ▼
 [🟡 Recebido (Pendente)] ──► Notifica KDS da Cozinha
       │
       ▼ (1 Clique)
 [🔵 Na Chapa (Em Preparo)] ──► Chapeiros iniciam preparo dos smashs
       │
       ▼ (1 Clique)
 [🟠 Saiu p/ Entrega] ──► Notifica expedição e motoboys
       │
       ▼ (1 Clique)
 [🟢 Entregue] ──► Concluído e arquivado
```

---

## 📄 Licença
Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.

*Desenvolvido com ⚡ Google Antigravity por Aluno SENAI Ourinhos.*
