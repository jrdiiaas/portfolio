# 🚀 Portfólio de Vendas & Central de Cases — Alexandre Dias

Este projeto é um **site de vendas de alta conversão** pessoal de **Alexandre Dias**, projetado para apresentar soluções e infraestruturas digitais de ponta como cases de sucesso comerciais. O design é baseado na linguagem de estilo **Apple Liquid Glass** (materiais translúcidos com refração, volume e brilho dinâmico).

---

## 🛠️ Stack Técnica e Dependências

- **Linguagens**: HTML5 Semântico, CSS3 Vanilla (Design Tokens / Custom Properties), JavaScript (Vanilla ES6+).
- **Diretrizes de Design**: **Apple Liquid Glass**
  - **Materiais**: Translucidez dinâmica via `backdrop-filter: blur(28px) saturate(190%)`.
  - **Física de Luz**: Borda de catch-light interna (`border: 1px solid rgba(255, 255, 255, 0.12)`) associada a sombras internas volumétricas (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25)`) para simular reflexão e refração.
  - **Geometria**: Cantos arredondados contínuos suavizados (Squircles de 28px).
  - **Interatividade**: Efeito tridimensional tátil (3D Tilt) e brilho reflexivo que segue dinamicamente a posição do mouse na tela.
  - **Vibrant Canvas**: Fundo composto por orbes de gradientes orgânicos em movimento fluido para criar o contraste necessário para a translucidez.
- **Tipografia**: Outfit (Títulos de alta expressividade) + Plus Jakarta Sans (Texto legível e corporativo).
- **Ícones**: FontAwesome 6 (CDN).
- **Versionamento & Deploy**: Git, Bash Script (`publish.sh`), GitHub CLI (`gh`).

---

## 📁 Organização de Pastas (Estrutura do Projeto)

O ecossistema está organizado de forma modular, preservando os rascunhos estáticos de clientes locais e centralizando a página de vendas principal na raiz:

```text
portfolio/
├── publish.sh                 # Automação de commit e publicação no GitHub
├── readme.md                  # Este manual local do desenvolvedor
├── index.html                 # Página de vendas principal (Apple Liquid Glass)
├── styles.css                 # Folha de estilo contendo os tokens do Liquid Glass
├── assets/                    # Diretório contendo imagens e elementos de mídia
│   └── FotoPerfil.png         # Foto oficial do desenvolvedor
├── gaby-vital/                # Landing Page estática - Gaby Vital
├── jamille-avelino/           # Landing Page estática - Jamille Avelino
├── mega-frete-transportes/    # Landing Page estática - Mega Frete Transportes
├── que-delicia-bolos/         # Cardápio estático - Que Delícia Bolos
└── thaylan-andrade/           # Landing Page estática - Thaylan Andrade
```

---

## 🏆 Catálogo de Cases Apresentados no Portfólio

1. **Checkout Transparente Independente** — Fintech & Vendas (`automacoes.escolasinc.com.br`)
2. **Landing Page 3D & Validação OTP** — Marketing & Captura (`marketing.escolasinc.com.br`)
3. **Social Dashboard & Agente IA** — Dados & Inteligência (`social.escolasinc.com.br`)
4. **Gestor de Tokens IA (Extensão VS Code & Antigravity)** — Extensão Oficial & Developer Tools ([Marketplace Microsoft](https://marketplace.visualstudio.com/items?itemName=escola-sinc.antigravity-customizations-manager&ssr=false#overview) | [Open VSX Registry](https://open-vsx.org/extension/escola-sinc/antigravity-customizations-manager))
5. **Currículo Vitae & Parser XML Lattes** — SaaS & Produtividade (`curriculo.escolasinc.com.br`)
6. **Plataforma Kanban & Importador Trello** — Produtividade & Organização (`agenda.escolasinc.com.br`)
7. **SINC Remotion Engine** — Vídeo como Código & Automação de Mídia (API Interna)
8. **WordPress SINC** — Tema Customizado de Alta Performance (`escolasinc.com.br`)
9. **Moodle LMS SINC** — Tema Boost Child & REST API (`ead.escolasinc.com.br`)

---

## ⚙️ Como Executar Localmente

### 1. Abertura Direta
Por ser construído em HTML/CSS/JS puros e sem ferramentas de compilação intermediárias, basta abrir o arquivo `index.html` da raiz diretamente no navegador.

### 2. Servidor de Desenvolvimento Local Leve
Para simular a entrega de rede real e desfrutar das transições de forma idêntica a produção, execute um servidor estático local a partir do terminal da pasta `portfolio/`:

```bash
# Usando Python 3
python3 -m http.server 8000

# Usando Node.js (se possuir o pacote 'serve' instalado)
npx serve .
```

---

## 🔄 Publicação & Sincronização Automática (`publish.sh`)

O repositório inclui um script em bash que simplifica o versionamento e envio das novidades para o repositório GitHub remoto:

1. Garanta a autenticação ativa no GitHub CLI:
   ```bash
   gh auth login
   ```
2. Dê permissão e execute o script fornecendo a mensagem de atualização:
   ```bash
   chmod +x publish.sh
   ./publish.sh "feat: atualização de cases no portfolio"
   ```
