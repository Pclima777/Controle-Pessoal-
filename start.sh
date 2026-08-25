#!/bin/bash

echo "🚀 Iniciando Controle Financeiro Pessoal..."
echo ""
echo "📂 Pasta: $(pwd)"
echo ""

# Verificar se Python está instalado
if command -v python3 &> /dev/null; then
    echo "✅ Python3 encontrado"
    echo ""
    echo "🌐 Servidor iniciando na porta 8000..."
    echo "📍 Acesse: http://localhost:8000"
    echo ""
    echo "💡 Para parar o servidor: pressione Ctrl+C"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python encontrado"
    echo ""
    echo "🌐 Servidor iniciando na porta 8000..."
    echo "📍 Acesse: http://localhost:8000"
    echo ""
    echo "💡 Para parar o servidor: pressione Ctrl+C"
    echo ""
    python -m http.server 8000
elif command -v npm &> /dev/null; then
    echo "✅ Node.js encontrado"
    echo ""
    echo "🌐 Servidor iniciando na porta 8080..."
    echo "📍 Acesse: http://localhost:8080"
    echo ""
    echo "💡 Para parar o servidor: pressione Ctrl+C"
    echo ""
    npx http-server
else
    echo "❌ Nenhum servidor encontrado!"
    echo ""
    echo "Instale um dos seguintes:"
    echo "  - Python 3: https://python.org"
    echo "  - Node.js: https://nodejs.org"
    exit 1
fi
