# 🚀 Portfólio & Central de Sites Estáticos (portfolio)

Esta pasta funciona como uma central para desenvolvimento e rascunho de sites e landing pages estáticas desenvolvidas pela Escola SINC / Alexandre Dias. Ela abriga múltiplos miniprojetos independentes em subpastas e utiliza um script utilitário para automação de versionamento no GitHub.

## 🛠️ Stack Técnica e Dependências

- **Linguagens**: HTML5, CSS3, JavaScript (Vanilla).
- **Versionamento & Deploy**: Git, Bash Script (`publish.sh`), GitHub CLI (`gh`).
- **Arquitetura Visual**: Layouts responsivos e estruturas estáticas puras.

---

## 📁 Organização de Pastas (Estrutura do Projeto)

Como se trata de um ecossistema de sites estáticos, a estrutura não segue um padrão MVC de framework (como Express/Next), mas está organizada de forma modular:

```text
portfolio/
├── publish.sh                 # Automação de commit e publicação no GitHub
├── readme.md                  # Este manual local do desenvolvedor
├── index.html                 # Página central/portfólio principal
├── styles.css                 # Estilos da página central
├── gaby-vital/                # Site estático - Gaby Vital
├── jamille-avelino/           # Site estático - Jamille Avelino
├── mega-frete-transportes/    # Site estático - Mega Frete Transportes
├── que-delicia-bolos/         # Site estático - Que Delícia Bolos
└── thaylan-andrade/           # Site estático - Thaylan Andrade
```

---

## ⚙️ Como Executar Localmente

Como o projeto consiste em arquivos estáticos (HTML/CSS/JS), não é necessário um container Docker ou servidor de aplicação para execução básica.

### Execução via Browser
Basta abrir o arquivo principal `index.html` ou o `index.html` de qualquer subpasta diretamente no seu navegador.

### Servidor de Desenvolvimento Estático (Opcional)
Se você preferir rodar um servidor de desenvolvimento local leve, pode usar um módulo do Python ou Node:

```bash
# Usando Python (dentro da pasta do projeto)
python3 -m http.server 8000

# Usando Node.js (se tiver 'serve' instalado)
npx serve .
```

---

## 🔄 Publicação & Sincronização Automática (`publish.sh`)

O repositório inclui um script em bash que simplifica o versionamento e envio para o GitHub:

1. **Requisitos**: É necessário ter a ferramenta GitHub CLI (`gh`) instalada e autenticada no servidor:
   ```bash
   gh auth login
   ```
2. **Executar o Deploy**:
   ```bash
   chmod +x publish.sh
   ./publish.sh "feat: minha mensagem de commit"
   ```
   *Nota: O script adicionará todas as novas pastas e alterações, gerará o commit e fará o push direto para o repositório remoto.*
