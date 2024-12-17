#!/bin/bash

# Função para carregar variáveis de ambiente
load_env() {
  if [ -f ".env" ]; then
    source .env
    echo "Arquivo .env carregado com sucesso."
  else
    echo "Arquivo .env não encontrado."
  fi
}

# Função para verificar se o diretório existe
check_directory() {
  if [ ! -d "$1" ]; then
    echo "Erro: Diretório '$1' não encontrado."
    exit 1
  fi
}

# Função para verificar e rodar comando no backend
prepare_backend() {
  echo "Verificando e preparando o backend..."

  if [ -n "$DB_NAME" ] && [ -n "$DB_PASSWORD" ]; then
    echo "Variáveis de ambiente para o banco de dados configuradas."
    if npm run db:creation:mysql; then
      echo "'npm run db:creation:mysql' executado com sucesso."
    else
      echo "Erro ao executar 'npm run db:creation:mysql'."
      exit 1
    fi
  else
    echo "variáveis de ambiente para o banco de dados não configuradas."
    # Tente rodar o comando npm run db:all e continue mesmo em caso de erro
    if npm run db:all; then
      echo "'======>npm run db:all' executado com sucesso.<======"
    else
      echo "=========>Erro ao executar 'npm run db:all'. <========="
    fi
  fi
}

# Função para iniciar o servidor em um diretório
start_server() {
  echo "Iniciando servidor em '$1'..."
  npm run dev &           # Executa o servidor em background
  cd - >/dev/null || exit # Retorna ao diretório anterior sem exibir saída
}

npm install
# Verifica e inicia o backend
check_directory "backend"
cd "backend" || exit
load_env
prepare_backend
start_server "backend"

# Verifica e inicia o frontend
check_directory "frontend"
cd "frontend" || exit
load_env
start_server "frontend"

# Exibe as portas configuradas
echo "Frontend rodando"
echo "Backend rodando"
