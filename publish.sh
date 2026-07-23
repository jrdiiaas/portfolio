#!/usr/bin/env bash
set -e

# Garantir que o gh esteja no PATH
export PATH="$HOME/.local/bin:$PATH"

SCRATCH_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_NAME="portfolio"

# Verificar se está autenticado no gh CLI
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ Você ainda não está autenticado no GitHub CLI."
    echo "👉 Execute o comando no terminal para fazer login: gh auth login"
    exit 1
fi

echo "--------------------------------------------------"
echo "🚀 Publicando ecossistema de Portfólio & Sites"
echo "--------------------------------------------------"

cd "$SCRATCH_DIR"

# Criar .gitignore se não existir
if [ ! -f ".gitignore" ]; then
    cat << 'EOF' > .gitignore
.DS_Store
*.log
node_modules/
.env
EOF
    echo "📄 .gitignore criado."
fi

# Inicializar repositório Git local se necessário
if [ ! -d ".git" ]; then
    git init -q -b main
    echo "🌱 Repositório Git local inicializado (ramo 'main')."
fi

# Registrar todas as alterações (root e subpastas)
git add -A

if ! git diff --cached --quiet; then
    COMMIT_MSG="${1:-feat: atualizar portfólio e sites}"
    git commit -m "$COMMIT_MSG" -q
    echo "📸 Alterações registradas no commit: '$COMMIT_MSG'"
else
    echo "ℹ️ Nenhuma alteração pendente para commit."
fi

# Verificar se remote 'origin' existe
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "🌐 Criando repositório único '$REPO_NAME' no GitHub..."
    gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
    echo "✅ Repositório '$REPO_NAME' criado e enviado com sucesso para o GitHub!"
else
    echo "⬆️ Enviando atualizações para o GitHub..."
    git push -u origin main
    echo "✅ Portfólio e projetos atualizados no GitHub com sucesso!"
fi

REPO_URL=$(gh repo view --json url -q .url 2>/dev/null || echo "https://github.com/jrdiiaas/$REPO_NAME")

echo "--------------------------------------------------"
echo "🎉 Publicação concluída com sucesso!"
echo "🔗 Repositório no GitHub: $REPO_URL"
echo "--------------------------------------------------"
