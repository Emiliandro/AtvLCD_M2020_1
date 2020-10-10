# Introdução ao Projeto

Devido à rápida propagação da doença COVID-19 no mundo, as plataformas de mídias sociais como Twitter, Facebook e Instagram tornaram-se locais onde ocorre uma intensa e contínua troca de informações entre diversas partes e grupos sociais da sociedade. O seguinte trabalho se propõem analisar e tratar dados obtidos na rede social twitter para melhor compreensão da opinião pública nos meses iniciais.

### Url do Arquivo Collab
    https://colab.research.google.com/drive/1EIv0p2M9gol_P1DWvtcLyDpq022a79-8?usp=sharing

## Equipe do projeto

O projeto foi feito pela dupla de alunos Emily Bezerra Sales (ebs.cid20@uea.edu.br) e Emiliandro Carlos de Moraes Firmino (ecdmf.cid20@uea.edu.br) para o módulo de Programação ministrada pelo Prof. Dr. Tiago Eugenio de Melo (tmelo@uea.edu.br).

## Dependências 

    import string
    import array
    import datetime
    import operator
    from google.colab import drive
    import numpy as np
    import pandas as pd
    import csv
    import matplotlib.pyplot as plt
    import folium
    from folium.plugins import HeatMap


# Filtragem de Dados

## Primeira Conclusão: material se duplicatas e em português

Através do uso da biblioteca Pandas foi possível perceber que do dataset fornecido pelo professor existem 774516 contas totais com um total de 1653599 mensagens não repetidas de 59 idiomas diferentes vindas de 121 paises, totalizando 4500 cidades e 774516 latitudes diferentes. Porém, a filtragem de dados não foi perfeita, pois com a filtragem foi descoberto que de 4593 contas totais houveram 7882 mensagens não repetidas de **16 idiomas** diferentes vindas de 57 paises, num total de 1112 cidades e de 4593 latitudes diferentes. Enquanto o esperado era ter apenas um 1 idioma no total.

Feita a correção, através da análise dos idiomas em português é percepítvel que o dado usado se encontra igualmente falho. Existem frases em espanhol ou italiano que por serem de escrita semelhante foram categorizados como em português.

## Segunda conclusão: filtragem por palavra com pergunta marcada por "?"

Através das primeiras execuções do código foi perceptível que o resultado eram valores muito abaixo do esperado e que revisões eram necessárias, melhorias foram feitas para resolver problemas como case sensitive e o espaçamento do foco que era a interrogação presente na frase.

## Terceira Conclusão: pesquisas adicionais

Devido a conclusão obtida com a segunda interpretação, novas pesquisas foram feitas para validar o tipo de conteúdo presente e chegar a conclusão de que mesmo com as filtragens e a remoção de duplicatas, graças aos dados baixos obtidos com a pesquisa comparacional de palavras com ou sem interrogação, foi possível dizer que existe spam na datasheet trabalhado.

## Quarta conclusão: frequência de perguntas

A quarta interpretação se deu através da análise da frequência de perguntas por data e para isso foi criado uma nova coluna com a divisão da data e da hora para a montagem do gráfico. 

A análise dos dados de maior valor foram feitos em seguida através de um value_counts(), nesse ponto que se mostrou essencial a divisão do dia da hora para evitar valores repetidas de mesmo dia com horário diferente.

E o gráfico foi montado aplicando o .sort_index() ao resultado obtido na contagem para se ter a progressão por tempo. Dessa forma foi possível perceber que no dia 04 de abril houveram 22 perguntas. Foi feita uma pesquisa no histórico de notícias da pandêmia do G1 (fonte: https://g1.globo.com/bemestar/coronavirus/noticia/2020/04/04/ultimas-noticias-de-coronavirus-de-4-de-abril.ghtml ) para se saber quais foram as príncipais notícias do dia e entre elas houve a primeira morte no Amapá. Quando pesquisado no banco de textos em português foram encontradas dois resultados que mesmo não tendo a mesma data, provou que existe a cobrança a figuras políticas sobre as situações em diferentes estados.

Sendo feita novamente a pesquisa no G1 sobre o dia foi possível encontrar novas palavras chaves, assim, podendo concluir a importância do uso da frequência como essêncial para determinar as palavras necessárias para o projeto.

# Palavras e resultados das pesquisas

## Pessoa

**Palavra Chave**: presidente,governador,prefeito,deputado,bolso,bolsonaro,doria,mandetta,mandeta,moro,ministro,gov,min,hulk,luciano,pink,charles,elizabeth,boulos,ciro,lula,trump

**Total Com Localização Sem ”?"**: 217

**Com localização Com “?”**: 10

**Sem Localização com “?"**: 12177

## Doença

**Palavra Chave**:coronavirus,covid-19,covid,virus,gripezinha

**Total Com Localização Sem ”?"**: 2946

**Com localização Com “?”**: 151

**Sem Localização com “?"**: 54878

## Medicamentos

**Palavra Chave**: cloroquina,cha,vitamina,zinco,inhame,própolis,erva,chá,hidratacao,sopa,abacaxi

**Total Com Localização Sem ”?"**: 58

**Com localização Com “?”**: 7

**Sem Localização com “?"**: 16511

## Organizações

**Palavra Chave**: prefeitura,delegacia,oms,organizacao,mundial,saude,brics,caixa

**Total Com Localização Sem ”?"**: 295

**Com localização Com “?”**: 12

**Sem Localização com “?"**: 2743

# Conclusão

Quanto aos dados analisados, primeiro foi dado atenção a sua localização para a construção de um mapa e uma interface que facilita-se a leitura, no processo dessa construção a língua portuguesa e todas as suas nuanças se tornaram o maior obstáculos e a formatação da frase para sua interpretação se tornou um processo de constantes revisões que resultaram na compreensão do conteúdo presente e seus spams (citações, poemas, propagandas, assuntos diversos que fogem da proposta). Quando analisado os dados sem localização, jornais, reportagens e ciberataques de com perguntas redundantes se tornaram mais visíveis. Contudo, frases semelhantes porém variando em gênero e número não foram removidas no processo de duplicatas por falta de tempo e conhecimento técnico. 


Pelos gráficos de frequência o período de Abril até Junho foram os mais ativos na rede social analisada, fatores para isso incluem o isolamento social e a quarenta sugerida por diversos estados, mas quando analisados as principais notícias dos dias de pico a atividade de cada datasheet filtrado pode se atribuir esse aumento a “famosos doentes”, “social influencers de direita comprando briga com o STF”, “quantitativo de infectados ou mortes na china pela doença” e “o aumento do número de mortos no país”.


O nome da doença e suas variações foram os termos mais utilizados, porém isso não se reflete a qualidade do conteúdo onde as palavras estavam presentes nas frases. Contudo, os dias seguintes que se deram após o. começo de mortes em determinado estado foram os dias que houveram altas nas perguntas sobre prevenção a doença.

# Agradecimentos

Graças ao trabalho desenvolvido foi perceptível a dificuldade do trabalho de interpretação de  grandes volumes de dados e da importância que as ferramentas como colab, github e as bibliotecas Pandas e Matplotlib têm no auxilio desse processo como um todo. Os autores dessa pesquisa agradecem a oportunidade do curso de especialização em Ciência de Dados cedido pela Universidade Estadual do Amazonas (UEA) e do aprendizado obtido graças aos professores doutores Elloa Guedes e Tiago Mello.
