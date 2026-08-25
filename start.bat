@echo off
chcp 65001 >nul

echo 🚀 Iniciando Controle Financeiro Pessoal...
echo.

cd /d "%~dp0"
echo 📂 Pasta: %cd%
echo.

python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python encontrado
    echo.
    echo 🌐 Servidor iniciando na porta 8000...
    echo 📍 Acesse: http://localhost:8000
    echo.
    echo 💡 Para parar o servidor: pressione Ctrl+C
    echo.
    python -m http.server 8000
) else (
    npm --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Node.js encontrado
        echo.
        echo 🌐 Servidor iniciando na porta 8080...
        echo 📍 Acesse: http://localhost:8080
        echo.
        echo 💡 Para parar o servidor: pressione Ctrl+C
        echo.
        npx http-server
    ) else (
        echo ❌ Nenhum servidor encontrado!
        echo.
        echo Instale um dos seguintes:
        echo   - Python 3: https://python.org
        echo   - Node.js: https://nodejs.org
        pause
        exit /b 1
    )
)
