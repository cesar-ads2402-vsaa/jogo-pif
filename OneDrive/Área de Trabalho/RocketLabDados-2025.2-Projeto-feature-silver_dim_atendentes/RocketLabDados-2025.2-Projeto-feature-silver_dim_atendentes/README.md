# RocketLabDados-2025.2-Projeto

# Extração de dados para csv:

Este diretório contém os arquivos necessários para restaurar um dump PostgreSQL (`dump.sql`) e exportar todas as tabelas para arquivos CSV.

### Estrutura de pastas

```text
RocketLabDados-2025.2-Projeto/
└── database
    ├── Chamados_Hora.csv
    ├── dump.sql
    ├── extract.sh
    └── tables
        ├── base_atendentes.csv
        ├── base_motivos.csv
        ├── canais.csv
        ├── chamados.csv
        ├── Chamados_Hora.csv
        ├── clientes.csv
        ├── custos.csv
        └── pesquisa_satisfacao.csv
```

- `dump.sql`: arquivo de dump do banco PostgreSQL.
- `extract.sh`: script responsável por restaurar o dump e exportar as tabelas para CSV.
- `tables/`: pasta com os arquivos `.csv` gerados a partir das tabelas do banco.

### Como executar a extração

1. Certifique-se de que você está dentro da pasta `database`:

```bash
cd RocketLabDados-2025.2-Projeto/database
```

2. Dê permissão de execução ao script (apenas na primeira vez):

```bash
chmod +x extract.sh
```

3. Execute o script:

```bash
./extract.sh
```

O script irá:

- Verificar se o arquivo `dump.sql` existe na pasta atual;
- Instalar o PostgreSQL (caso ainda não esteja instalado);
- Dropar (se existir) e recriar o banco `basedados`;
- Restaurar o conteúdo do `dump.sql` no banco;
- Exportar todas as tabelas do schema `public` para CSV;
- Copiar os arquivos `.csv` gerados para a pasta `tables/`.

Após a execução, os arquivos CSV estarão disponíveis em:

```text
RocketLabDados-2025.2-Projeto/database/tables
```