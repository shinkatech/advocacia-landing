@echo off
cd /d "%~dp0"
where node >nul 2>nul || (echo Instale o Node.js em https://nodejs.org e rode de novo. & pause & exit /b)
echo Verificando dependencias...
call npm install
call npm run dev -- --open
pause
