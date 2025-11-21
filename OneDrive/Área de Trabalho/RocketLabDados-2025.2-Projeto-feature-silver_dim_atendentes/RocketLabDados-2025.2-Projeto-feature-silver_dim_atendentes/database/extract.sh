#!/bin/bash

# ------------------------------------------
# Script para executar dump PostgreSQL e exportar tabelas para CSV
# Uso:
#   chmod +x extract.sh
#   ./extract.sh
# ------------------------------------------

DUMP_FILE="dump.sql"

if [ ! -f "$DUMP_FILE" ]; then
  echo "ERRO: arquivo '$DUMP_FILE' não encontrado no diretório atual!"
  exit 1
fi

echo ">>> Instalando PostgreSQL (se ainda não estiver instalado)..."
sudo apt update -y
sudo apt install -y postgresql

echo ">>> Criando banco 'basedados'..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS basedados;"
sudo -u postgres psql -c "CREATE DATABASE basedados;"

echo ">>> Executando dump no banco..."
sudo -u postgres psql -d basedados -f "$DUMP_FILE"

echo ">>> Verificando tabelas criadas..."
sudo -u postgres psql -d basedados -c "\dt"

echo ">>> Exportando todas as tabelas para CSV..."

OUT="/tmp/export_pg"
sudo -u postgres mkdir -p "$OUT"

sudo -u postgres bash << EOF
for t in \$(psql -d basedados -At -c "SELECT tablename FROM pg_tables WHERE schemaname='public';"); do
  echo "Exportando \$t..."
  psql -d basedados -c "\COPY \"\$t\" TO '$OUT/\$t.csv' CSV HEADER"
done
EOF

echo ">>> Ajustando permissões dos arquivos CSV..."
sudo chown "$USER:$USER" $OUT/*.csv

echo ">>> Copiando CSVs para o diretório atual..."
mkdir -p ./tables
cp $OUT/*.csv ./tables
cp ./Chamados_Hora.csv ./tables

echo ">>> Processo concluído!"
echo "CSVs gerados na pasta ./tables:"
ls -1 ./tables/*.csv
