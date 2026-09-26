@echo off
title BurguerSync Ourinhos - Local Server
echo ======================================================
echo    Iniciando Servidor Web BurguerSync Ourinhos
echo    Ambiente Operacional: Node.js / HTTP Localhost
echo ======================================================
echo.
start http://localhost:3000/frontend/index.html
node execution/server.mjs
pause
