# Databricks notebook source
# MAGIC %md
# MAGIC # <center>Rocket Lab Dados - 2025.2</center>
# MAGIC # <center> Introdução à Pyspark</center>
# MAGIC ___
# MAGIC Todo o conteúdo que você terá acesso ao longo desse período é confidencial, não sendo possível compartilhar ou comercializar os links ou os materiais recebidos que sejam de propriedade do Programa Rocket Lab da V(dev)
# MAGIC
# MAGIC Dessa forma, ao participar do curso você está aceitando os termos de confidencialidade e não-comercialização dos conteúdos que serão recebidos.
# MAGIC ___
# MAGIC
# MAGIC # <center> Objetivos de aprendizado </center>
# MAGIC - Familiarizar-se com as funcionalidades básicas do PySpark
# MAGIC - Ser capaz de carregar dados em um DataFrame
# MAGIC - Ser capaz de realizar manipulações básicas de dados
# MAGIC ___
# MAGIC

# COMMAND ----------

# MAGIC %md
# MAGIC ### 1. Juntando DataFrames
# MAGIC
# MAGIC É muito comum ter a necessidade de juntar *DataFrames* diferentes. Se você já utilizou SQL ou qualquer outro banco de dados relacional, deve conhecer isso como *join*. O Pandas também tem a mesma função utilizando o método *.merge()*. Antes do exemplo, vamos aprender/relembrar os tipos de *joins* mais comuns:<br>
# MAGIC ![Joining Methods](https://i.imgur.com/HaSBT91.jpg) <br>
# MAGIC Agora, vamos carregar um DataFrame mais simples para testar os tipos de *merge*.

# COMMAND ----------

# MAGIC %md
# MAGIC Para os exemplos abaixo iremos utilizar o Datafram: **metal_bands**, contendo as informações sobre bandas de metal do mundo todo, suas origens e estilos musicais.
# MAGIC
# MAGIC Principais colunas:
# MAGIC - Band — nome da banda
# MAGIC - Origin — país de origem
# MAGIC - Fans — número aproximado de fãs
# MAGIC - Formed — ano de formação
# MAGIC - Split — ano de separação ('-', se ainda ativa)
# MAGIC - Style — subgênero do metal (ex: Heavy Metal, Black Metal, Thrash Metal)

# COMMAND ----------

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

#Criar sessão spark
spark = SparkSession.builder.appName("AtividadePraticaSpark").getOrCreate()

# Execute esta célula para carregar o dataframe metal_bands com dados de bandas de metal
metal_bands = spark.table("workspace.default.metal_bands")

metal_bands.printSchema()
display(metal_bands.limit(5))

# COMMAND ----------

# MAGIC %md
# MAGIC Vamos separar alguns dataframes a partir de *metal_bands* para testar os merges. Observe a célula abaixo.

# COMMAND ----------

# ano de formação e país das bandas
bands_origin = metal_bands.select('id','band_name','formed','origin')

# estilo das bandas
bands_style = metal_bands.select('id','band_name','style') # estilo das bandas

# bandas que se separaram
bands_split = (metal_bands
               .select('id','band_name','split')
               .where(F.column('split') != "-")
               )

# bandas com mais de 4000 fans
bands_4000_fans = (metal_bands
                   .select('id','band_name','fans')
                   .where(F.column('fans') > 4000)
                   )

# bandas formadas nos EUA
bands_USA = (metal_bands
             .select('id','band_name','formed','origin')
             .where(F.column('origin') == "USA")
             )

# bandas formadas na Suécia
bands_Sweden = (metal_bands
                .select('id','band_name','formed','origin')
                .where(F.column('origin') == 'Sweden')
                )

# COMMAND ----------

# MAGIC %md
# MAGIC Vamos criar um DataFrame a partir de ```bands_origin``` e ```bands_split```, utilizando *merge*.

# COMMAND ----------

origin_split = (bands_origin # o DataFrame da esquerda
                .join(bands_split, # o DataFrame da direita
                      on=['id', 'band_name'], # baseado em quais valores em comum (chave)
                      how='inner' # o tipo de join que queremos fazer
                      )
                )
display(origin_split.limit(5))

# COMMAND ----------

# MAGIC %md
# MAGIC Ótimo! Conseguimos fazer o *Join* de dois *DataFrames*. Observe que utilizamos o argumento ```how='inner'```. Lembre-se que *inner*, *left*, *right* e *outer* terão resultados diferentes, observe os merges abaixo e a explicação ao final.

# COMMAND ----------

left_origin_split = (bands_origin
                     .join(bands_split,
                           on= ['id', 'band_name'],
                           how="left"
                           )
                     )
display(left_origin_split.limit(5))

# COMMAND ----------

right_origin_split = (bands_origin
                     .join(bands_split,
                           on= ['id', 'band_name'],
                           how="right"
                           )
                     )
display(right_origin_split.limit(5))

# COMMAND ----------

print('Numero de linhas do DataFrame bands_4000_fans:', bands_4000_fans.count())
print('Numero de linhas do DataFrame bands_USA:', bands_USA.count())
print('----------------------------------------------')

outer_origin_split = (bands_4000_fans
                     .join(bands_USA,
                           on= ['id', 'band_name'],
                           how="outer"
                           )
                     )

print('Numero de linhas do DataFrame após Outer entre bands_4000_fans & bands_USA:', outer_origin_split.count())
display(outer_origin_split.limit(5))

# COMMAND ----------

# MAGIC %md
# MAGIC Como podemos ver, os resultados são de fato bem diferentes.
# MAGIC
# MAGIC O *inner* mantém apenas os dados das bandas encontradas nos dois dataframes (onde há correspondência de *id*), dessa forma, a posição do dataframe não faz diferença.
# MAGIC
# MAGIC No *left*, mantemos os dados do dataframe à esquerda, e trazemos os dados do dataframe à direita no qual encontrou-se a chave (neste exemplo, o *id* da banda).
# MAGIC
# MAGIC Por outro lado, no *right* ocorre o contrário, mantemos os dados do dataframe à direita e, quando há correspondência da chave, trazemos os dados do dataframe à esquerda. Note que o número de entradas (*entries*) é diferente do caso com o *left*. Isso ocorre porque no *left* mantemos os dados de formação das bandas (ou seja, o dataframe contém todas as bandas do .csv), enquanto no *right*, mantemos apenas os dados de bandas que se separaram (e existem muitas bandas que ainda continuam juntas).
# MAGIC
# MAGIC Por fim, no *outer* utilizamos dois dataframes diferentes dos anteriores para facilitar o entendimento. Observe pelos prints que existem apenas 4 bandas com mais de 4000 fans e 1139 bandas formadas nos EUA. Quando fazemos o *join* com *outer*, observe que o total de linhas passa a ser 1143. O que acontece é que esse tipo de join mantém os dados de ambos os dataframes, independente se houve correspondência de chave ou não.
# MAGIC
# MAGIC Podemos também querer apenas concatenar dois *DataDrames*, isto é, juntá-los colocando um abaixo do outro. Para isso, utilizamos o método *.union()*:

# COMMAND ----------

# concatenando bandas formadas nos EUA e bandas formadas na Suécia
USA_Sweden = bands_USA.union(bands_Sweden)

print('Numero de linhas do DataFrame bands_USA:', bands_USA.count())
print('Numero de linhas do DataFrame bands_Sweden:', bands_Sweden.count())
print('Numero de linhas do DataFrame após union entre bands_USA & bands_Sweden:', USA_Sweden.count())
display(USA_Sweden.limit(5))

# COMMAND ----------

# MAGIC %md
# MAGIC ## Exercício 1
# MAGIC O Ultimate Team (FUT) é um modo do jogo FIFA no qual o jogador monta seu próprio time adquirindo atletas virtuais.
# MAGIC Cada atleta possui atributos que influenciam seu desempenho em campo — como drible, chute, passe, defesa, velocidade e físico.
# MAGIC
# MAGIC Principais colunas:
# MAGIC - `player_id` — identificador único do jogador
# MAGIC - `player_name` — nome do atleta
# MAGIC - `nationality` — país de origem
# MAGIC - `club` — clube atual
# MAGIC - `overall` — nota geral do jogador
# MAGIC - `potential` — potencial máximo de evolução
# MAGIC - `value_eur, wage_eur` — valor de mercado e salário
# MAGIC - `age, height_cm, weight_kg` — características físicas
# MAGIC - `pace, shooting, passing, dribbling, defending, physic` — atributos técnicos
# MAGIC
# MAGIC _**Preencha os espacos ____ para carregar os dados e realizar as consultas propostas.**_

# COMMAND ----------

# MAGIC %md
# MAGIC ### Exercício 1.1 Faça a leitura do arquivo fut_players (fut_player_data.csv) e retorne as 5 primeiras linhas

# COMMAND ----------

fut_players = spark.read.table("fut_players_data")

display(fut_players.limit(5))


# COMMAND ----------

# MAGIC %md
# MAGIC ### Exercício 1.2 - Retorna a nacionalidade dos jogadores "The Bests"
# MAGIC
# MAGIC São considerados jogadores The Bests os que possuem os atributos de drible (_dribbling_) e chute (_shooting_) superior a 90. 
# MAGIC Após a geração do DF _The_Best_ realize o join com o df _nationalities_ para obter a nacionalidade dos jogadores.
# MAGIC
# MAGIC A sua tabela final deve conter as seguintes informações:
# MAGIC - `player_id`
# MAGIC - `player_name`
# MAGIC - `nationality`
# MAGIC - `position`
# MAGIC - `dribbling`
# MAGIC - `shooting`
# MAGIC - `overall`

# COMMAND ----------

the_best = fut_players.filter((fut_players.dribbling > 90) & (fut_players.shooting > 90))

nationalities = (fut_players.select('player_id', 'player_name', 'nationality'))

the_best_nationality = the_best.join(nationalities, "player_id", "left") \
    .select(
        the_best['player_id'],
        the_best['player_name'], 
        nationalities['nationality'],
        the_best['position'],
        the_best['dribbling'],
        the_best['shooting'],
        the_best['overall']
    )

the_best_nationality.display()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 2. Alterando o dataframe
# MAGIC

# COMMAND ----------

# MAGIC %md
# MAGIC Agora iremos utilizar o DataFrame _**pokemon_data**_. Essa base reúne informações sobre os Pokémons das diversas gerações da franquia, contendo atributos, classificações e estatísticas de batalha.
# MAGIC
# MAGIC Principais Colunas:
# MAGIC - Name — nome do Pokémon 
# MAGIC - Type 1, Type 2 — tipos primário e secundário (ex: Fire, Water, Grass) 
# MAGIC - HP, Attack, Defense, Sp. Atk, Sp. Def, Speed — atributos de combate 
# MAGIC - Generation — geração à qual pertence
# MAGIC - Legendary - Se e ou não um Pokémon lendário

# COMMAND ----------

pkmn = spark.table("workspace.default.pokemon_data")

display(pkmn.limit(5))

# COMMAND ----------

# MAGIC %md
# MAGIC Até o momento apenas utilizamos os dados da forma que nos foram fornecidos, mas e se precisássemos criar alguma coluna que fosse a combinação das demais? Por exemplo, caso eu deseje criar uma coluna que corresponde à soma do ataque e velocidade dos Pokémons? Observe abaixo:

# COMMAND ----------

# Criando a coluna desejada
pkmn = pkmn.withColumn("Sum_Attack_Speed", F.col("Attack") + F.col("Speed"))
display(pkmn.limit(5))

# COMMAND ----------

# MAGIC %md
# MAGIC Observe como foi fácil! Apenas utilizamos o operador de soma com as duas colunas necessárias. Você pode fazer isso com outras operações também, basta utilizar ```-```, ```/``` ou ```*```. Além disso, você pode combinar quantas colunas quiser!
# MAGIC
# MAGIC Mas e se precisarmos alterar apenas algumas linhas do nosso DataFrame?
# MAGIC
# MAGIC Por exemplo, suponha que você percebeu que seus dados estão errados, e todos os Pokémons com velocidade acima de 100 deveriam estar marcados como Type_1 = 'Fire', podemos seguir o procedimento abaixo:

# COMMAND ----------

# Observe os valores unicos da coluna Type_1 para os Pokémons com mais de 100 de velocidade
pkmn.filter(pkmn["Speed"] > 100).select("Type_1").distinct().display()

# COMMAND ----------

# Vamos alterar os casos onde Speed é superior a 100 para Fire
pkmn = pkmn.withColumn(
    "Type_1",
    F.when(pkmn["Speed"] > 100, "Fire").otherwise(pkmn["Type_1"])
)

# COMMAND ----------

# Observe como os valores mudaram
pkmn.filter(pkmn["Speed"] > 100).select("Type_1").distinct().display()

# COMMAND ----------

# MAGIC %md
# MAGIC Relendo o arquivo para desconsiderar os tratamentos de exemplos que fizemos acima

# COMMAND ----------


pkmn = spark.table("workspace.default.pokemon_data")

# Renomeando as colunas
pkmn = (
    pkmn
    .withColumnRenamed("Type 1", "Type_1")
    .withColumnRenamed("Type 2", "Type_2")
    .withColumnRenamed("Sp. Atk", "Sp_Atk")
    .withColumnRenamed("Sp. Def", "Sp_Def")
)



# COMMAND ----------

# MAGIC %md
# MAGIC ## 3. Operações em grupo
# MAGIC
# MAGIC Com PySpark nós podemos aplicar operações em grupos usando o método *.groupby()*. Ele é muito útil por ser uma forma bem simples de extrair informação de dados agregados. Para utilizá-lo, passamos as colunas nas quais queremos agrupar os dados e a operação que queremos fazer. Para exemplificar, vamos ver quantos Pokémons lendários cada geração tem:

# COMMAND ----------

pkmn_soma = (pkmn
            .groupBy("Generation") # Campo que sera agrupado
            .agg(
                F.sum(F.col("Legendary").cast("int")) # Converte a coluna "Legendary" em inteiro e faz a soma
                .alias("Qtd_Legendary") # Nomeando a coluna que receberá o resultado da soma
                )
            )
pkmn_soma.display()

# COMMAND ----------

# MAGIC %md
# MAGIC Podemos obter um relatório da média de diversas colunas para cada tipo de Pokémon:

# COMMAND ----------

pkmn_media = (pkmn
                .groupBy("Type_1")
                .agg(
                    F.mean("HP").alias("HP_medio"),
                    F.mean("Attack").alias("Attack_medio"),
                    F.mean("Defense").alias("Defense_medio")
                    )
                )
pkmn_media.display()

# COMMAND ----------

# MAGIC %md
# MAGIC
# MAGIC
# MAGIC ###  Exercício 2
# MAGIC Use o método *.groupby()* para descobrir qual país tem o melhor *overall* médio. Crie a coluna 'avg_overall'
# MAGIC
# MAGIC Seu df country_avg_overall deve conter as seguintes colunas:
# MAGIC - `nationality`
# MAGIC - `overall`
# MAGIC - `avg_overall`

# COMMAND ----------

from pyspark.sql import functions as F

country_avg_overall = (
    fut_players
    .groupBy("nationality")
    .agg(
        F.avg("overall").alias("avg_overall")
    )
    .select(
        "nationality",
        F.lit("overall").alias("overall"),  
        "avg_overall"
    )
)

melhor = (
    country_avg_overall
    .orderBy(F.col("avg_overall").desc())
    .limit(1)
    .collect()[0]
)

brasil = (
    country_avg_overall
    .filter(F.col("nationality") == "Brazil")
    .collect()[0]
)

display({
    "Melhor overall médio": f"{melhor['nationality']}: {melhor['avg_overall']:.2f}",
    "Overall médio do Brasil": round(brasil['avg_overall'], 2)
})

# COMMAND ----------

# MAGIC %md
# MAGIC Agora nós já cobrimos toda a parte básica do Spark! Vamos praticar essa última parte!
# MAGIC
# MAGIC ### Exercício 2.1
# MAGIC Crie um racional que retorne a classificação para o jogador de acordo com as instruções abaixo, então aplique isso para o dataframe fut_players.
# MAGIC
# MAGIC *Observação:* considere os limites dentro do intervalo de classificação.
# MAGIC exemplo
# MAGIC
# MAGIC -50 contém todos os valores menores que 50 e o valor 50 incluso;
# MAGIC
# MAGIC
# MAGIC 51-60 contém todos os valores entre 51 e 60 com os limites [51,60] inclusos no grupo;
# MAGIC
# MAGIC
# MAGIC e assim por diante ...

# COMMAND ----------

from pyspark.sql import functions as F

fut_players = fut_players.withColumn(
    'classification',
    F.when(F.col('overall') <= 50, "Amador")
     .when(F.col('overall') <= 60, "Ruim")    
     .when(F.col('overall') <= 70, "Ok")       
     .when(F.col('overall') <= 80, "Bom")      
     .when(F.col('overall') <= 90, "Ótimo")    
     .otherwise("Lenda")                      
)

fut_players.groupBy("classification").count().orderBy("count", ascending=False).display()

# COMMAND ----------

# MAGIC %md
# MAGIC ## Desafio — Montando o Time dos Sonhos do 🇧🇷
# MAGIC
# MAGIC Ainda utilizando a base **`fut_players_data`**, imagine que você é um grande fã do jogo *FIFA*, e deseja montar o **Time dos Sonhos (Dream Team)** do **Brasil**, selecionando os **melhores jogadores por posição**, ou seja, aqueles com o **maior overall** dentro de cada grupo de posição.
# MAGIC
# MAGIC Para isso, adote a **formação tática 4-4-2**, composta por:
# MAGIC
# MAGIC - **1 Goleiro (GK)**  
# MAGIC - **4 Defensores (Defesa)**  
# MAGIC - **4 Meio-campistas (Meio)**  
# MAGIC - **2 Atacantes (Ataque)**  
# MAGIC
# MAGIC ### Objetivo
# MAGIC Criar um *DataFrame* com **11 linhas**, representando o **melhor jogador de cada posição dentro da formação 4-4-2**, com as seguintes colunas:
# MAGIC
# MAGIC - `nationality` — nacionalidade do jogador  
# MAGIC - `position_group` — posição agrupada (Goleiro, Defesa, Meio, Ataque)  
# MAGIC - `player_name` — nome do jogador  
# MAGIC - `overall` — nota geral (overall)
# MAGIC
# MAGIC ---
# MAGIC
# MAGIC ### Agrupamento de posições
# MAGIC Para facilitar a análise, agrupe as posições originais da base conforme a tabela abaixo:
# MAGIC
# MAGIC | **position_group** | **Posições incluídas (`position`)** | **Descrição** |
# MAGIC |:--------------------|:------------------------------------|:---------------|
# MAGIC | **Goleiro** | `GK` | Jogadores que atuam exclusivamente no gol. |
# MAGIC | **Defesa** | `CB`, `LB`, `RB`, `LWB`, `RWB` | Zagueiros e laterais (defensores). |
# MAGIC | **Meio** | `CM`, `CDM`, `CAM`, `LM`, `RM` | Meio-campistas centrais, volantes e meias ofensivos/laterais. |
# MAGIC | **Ataque** | `ST`, `CF`, `LW`, `RW`, `LF`, `RF` | Atacantes e pontas. |
# MAGIC | **Outros** | *(demais posições não classificadas)* | Jogadores fora do esquema tático principal (ex: cartas especiais). |
# MAGIC
# MAGIC ---
# MAGIC
# MAGIC ### 🏁 Entrega esperada
# MAGIC Seu *DataFrame final* deve retornar **11 jogadores**, representando o **Time dos Sonhos do Brasil (formação 4-4-2)**, conforme os critérios acima.

# COMMAND ----------

from pyspark.sql import functions as F
from pyspark.sql.window import Window

posicao_goleiro = ["GK"]
posicoes_defesa = ["CB", "RB", "LB", "LWB", "RWB"]  
posicoes_meio = ["CM", "CDM", "CAM", "LM", "RM"]  
posicoes_ataque = ["ST", "CF", "LW", "RW", "LF", "RF"] 

jogadores_brasileiros = fut_players.filter(F.col("nationality") == "Brazil")

jogadores_classificados = jogadores_brasileiros.withColumn(
    "position_group",
    F.when(F.col("position").isin(posicao_goleiro), "Goleiro")
     .when(F.col("position").isin(posicoes_defesa), "Defesa")
     .when(F.col("position").isin(posicoes_meio), "Meio")
     .when(F.col("position").isin(posicoes_ataque), "Ataque")
     .otherwise("Outros")
)

window_spec = Window.partitionBy("position_group").orderBy(F.desc("overall"))

dream_team = (
    jogadores_classificados
    .filter(F.col("position_group") != "Outros")
    .withColumn("rank", F.row_number().over(window_spec))
    .filter(
        ((F.col("position_group") == "Goleiro") & (F.col("rank") <= 1)) |
        ((F.col("position_group") == "Defesa") & (F.col("rank") <= 4)) |
        ((F.col("position_group") == "Meio") & (F.col("rank") <= 4)) | 
        ((F.col("position_group") == "Ataque") & (F.col("rank") <= 2))
    )
    .select(
        "nationality",
        "position_group", 
        "player_name",
        "overall"
    )
    .orderBy(
        F.when(F.col("position_group") == "Goleiro", 1)
         .when(F.col("position_group") == "Defesa", 2)
         .when(F.col("position_group") == "Meio", 3)
         .when(F.col("position_group") == "Ataque", 4)
         .otherwise(5)
    )
)

print("TIME DOS SONHOS DO BRASIL (4-4-2)")
dream_team.display()

print(f"Total de jogadores no time: {dream_team.count()}")

# COMMAND ----------

# MAGIC %md
# MAGIC ### Desafio Bônus
# MAGIC
# MAGIC Você deve ter notado que **Neymar** aparece tanto entre os melhores jogadores de **ataque** quanto do **meio-campo**.  
# MAGIC Isso acontece porque o dataset contém **múltiplas versões do mesmo jogador**, inclusive atuando em **outras posições**, o que é típico dos modos do *FIFA/Ultimate Team*.
# MAGIC
# MAGIC O seu desafio agora é **refazer o exercício anterior**, garantindo que **cada jogador apareça apenas uma vez** no *DataFrame final*.
# MAGIC
# MAGIC - Caso o jogador possua mais de uma versão (carta), **considere apenas aquela com o maior valor de `overall`**.  
# MAGIC - Em seguida, **reaplique a lógica da formação 4-4-2**, selecionando os melhores por grupo de posição.
# MAGIC
# MAGIC ---
# MAGIC
# MAGIC ### 🏁 Entrega Esperada
# MAGIC Seu *DataFrame final* deve retornar **11 jogadores únicos**, representando o **Dream Team do Brasil** na **formação tática 4-4-2**, **sem repetição de atletas**, conforme os critérios estabelecidos acima.
# MAGIC

# COMMAND ----------

from pyspark.sql import functions as F
from pyspark.sql.window import Window

posicao_goleiro = ["GK"]
posicoes_defesa = ["CB", "RB", "LB", "LWB", "RWB"]
posicoes_meio = ["CM", "CDM", "CAM", "LM", "RM"]  
posicoes_ataque = ["ST", "CF", "LW", "RW", "LF", "RF"]

window_jogador = Window.partitionBy("player_name").orderBy(F.desc("overall"))

jogadores_brasileiros_unicos = (
    fut_players
    .filter(F.col("nationality") == "Brazil")
    .withColumn("rank_versao", F.row_number().over(window_jogador))
    .filter(F.col("rank_versao") == 1) 
    .drop("rank_versao")
)

jogadores_classificados = jogadores_brasileiros_unicos.withColumn(
    "position_group",
    F.when(F.col("position").isin(posicao_goleiro), "Goleiro")
     .when(F.col("position").isin(posicoes_defesa), "Defesa")
     .when(F.col("position").isin(posicoes_meio), "Meio")
     .when(F.col("position").isin(posicoes_ataque), "Ataque")
     .otherwise("Outros")
)

window_posicao = Window.partitionBy("position_group").orderBy(F.desc("overall"))

dream_team_unicos = (
    jogadores_classificados
    .filter(F.col("position_group") != "Outros")
    .withColumn("rank_posicao", F.row_number().over(window_posicao))
    .filter(
        ((F.col("position_group") == "Goleiro") & (F.col("rank_posicao") <= 1)) |
        ((F.col("position_group") == "Defesa") & (F.col("rank_posicao") <= 4)) |
        ((F.col("position_group") == "Meio") & (F.col("rank_posicao") <= 4)) | 
        ((F.col("position_group") == "Ataque") & (F.col("rank_posicao") <= 2))
    )
    .select(
        "nationality",
        "position_group", 
        "player_name",
        "overall"
    )
    .orderBy(
        F.when(F.col("position_group") == "Goleiro", 1)
         .when(F.col("position_group") == "Defesa", 2)
         .when(F.col("position_group") == "Meio", 3)
         .when(F.col("position_group") == "Ataque", 4)
         .otherwise(5)
    )
)

print("TIME DOS SONHOS DO BRASIL - SEM REPETIÇÕES (4-4-2)")
dream_team_unicos.display()

print(f"Total de jogadores únicos no time: {dream_team_unicos.count()}")

# COMMAND ----------

# MAGIC %md
# MAGIC # Declaração de Inexistência de Plágio:
# MAGIC
# MAGIC 1. Eu sei que plágio é utilizar o trabalho de outra pessoa e apresentar como meu.
# MAGIC 2. Eu sei que plágio é errado e declaro que este notebook foi feito por mim.
# MAGIC 3. Tenho consciência de que a utilização do trabalho de terceiros é antiético e está sujeito a medidas administrativas.
# MAGIC 4. Declaro também que não compartilhei e não compartilharei meu trabalho com o intuito de que seja copiado e submetido por outra pessoa.

# COMMAND ----------

# MAGIC %md
# MAGIC # Fim da aula!
# MAGIC
# MAGIC Obrigado por participar do curso, você acaba de finalizar o Módulo de Pyspark. Neste momento você já deve ser capaz de manipular seus dados no Spark, utilizando as bibliotecas que acabamos de aprender!
# MAGIC
# MAGIC Lembre-se que sempre que surgir alguma dúvida, você pode olhar a documentação do [PySpark](https://spark.apache.org/docs/latest/api/python/reference).