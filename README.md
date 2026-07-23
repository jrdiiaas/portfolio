# 🚀 Antigravity Scratch Workspace & Auto-Publishing

Este diretório funciona como uma central para desenvolvimento de sites e projetos web. Cada subpasta criada aqui representa um **projeto/site independente** com seu próprio repositório no GitHub.

---

## 📁 Estrutura de Arquivos

```text
scratch/
├── publish.sh               # Script de automação para criar e publicar repositórios
├── README.md                # Este guia de orientações de uso
├── mega-frete-transportes/  # Projeto/Repositório independente
├── que-delicia-bolos/       # Projeto/Repositório independente
└── [novo-site]/             # Qualquer nova pasta criada se tornará um novo repositório
```

---

## ⚙️ Identidade Git & Autenticação

- **Autor**: Alexandre Sousa Dias Junior (`@jrdiiaas`)
- **E-mail**: `jrdiiaas@icloud.com`
- **Ramo Padrão**: `main`
- **Ferramenta de Publicação**: GitHub CLI (`gh`)

---

## 🛠️ Como Usar a Automação (`publish.sh`)

O script `publish.sh` simplifica o processo de inicialização e publicação de repositórios no GitHub.

### 1. Publicar ou Atualizar TODAS as pastas
Para publicar novos sites ou enviar alterações de todas as subpastas de uma só vez, execute no terminal:

```bash
./publish.sh
```

### 2. Publicar ou Atualizar UMA pasta específica
Para publicar ou atualizar apenas um projeto específico (ex: ao criar uma nova pasta `meu-novo-site`):

```bash
./publish.sh nome-da-pasta
```

---

## 🔄 O que o `publish.sh` faz automaticamente?

1. **Gera `.gitignore`**: Cria o arquivo ignorando itens desnecessários (`.DS_Store`, `node_modules`, etc.).
2. **Inicializa o Git**: Executa `git init` (ramo `main`) caso a pasta ainda não seja um repositório.
3. **Registra Alterações**: Executa `git add -A` e cria o commit das alterações.
4. **Cria Repositório no GitHub**: Se o repositório ainda não existir na sua conta do GitHub (`@jrdiiaas`), o script cria um repositório **público** automaticamente.
5. **Faz Push**: Envia as atualizações para o GitHub e exibe o link direto do repositório.
