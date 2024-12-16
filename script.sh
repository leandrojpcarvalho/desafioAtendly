#!/bin/bash

check_directory() {
  if [ ! -d "$1" ]; then
    echo "Erro: Diretório '$1' não encontrado."
    exit 1
  fi
}

# Função para iniciar o servidor em um diretório
start_server() {
  cd "$1" || exit
  echo "Iniciando servidor em '$1'..."
  npm run dev & # Executa o servidor em background
  cd - > /dev/null || exit # Retorna ao diretório anterior sem exibir saída
}

# Verifica e inicia o backend
check_directory "backend"
start_server "backend"

# Verifica e inicia o frontend
check_directory "frontend"
start_server "frontend"

# Exibe as portas configuradas
echo "Frontend rodando na porta: 3001"
echo "Backend rodando na porta: 3000"