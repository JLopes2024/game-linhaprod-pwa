# Linha de Produção

Simulador educacional de gestão da qualidade em ambiente industrial.

O **Linha de Produção** foi desenvolvido para jovens em cursos profissionalizantes que atuam ou se preparam para atuar em linhas de produção. O objetivo do jogo é simular decisões de controle de qualidade de forma prática, permitindo que o jogador configure a máquina, acompanhe parâmetros de produção, identifique desvios e aplique correções durante o turno.

## Objetivo

O jogador assume a responsabilidade por uma linha de produção e deve manter os principais parâmetros dentro das faixas adequadas de operação.

A proposta é trabalhar conceitos como:

* controle de qualidade;
* monitoramento de processo;
* tomada de decisão;
* identificação de desvios;
* intervenção em parâmetros de produção;
* consequências de configurações incorretas;
* estabilidade operacional.

## Fluxo do jogo

A partida começa com a preparação da máquina.

O jogador define os valores iniciais dos parâmetros e decide quando ligar a linha de produção.

A configuração inicial também faz parte da avaliação. É possível iniciar a máquina com parâmetros fora da faixa recomendada, mas isso gera consequências durante o jogo.

Depois do início do turno, o jogador acompanha os indicadores em tempo real e precisa decidir quando uma intervenção é realmente necessária.

O fluxo principal é:

```text
Preparação da máquina
        ↓
Configuração dos parâmetros
        ↓
Início da produção
        ↓
Monitoramento da linha
        ↓
Eventos e desvios
        ↓
Intervenções do jogador
        ↓
Pontuação e feedback
        ↓
Resultado final
```

## Parâmetros monitorados

O jogo atualmente trabalha com quatro parâmetros:

| Parâmetro   | Faixa recomendada |
| ----------- | ----------------- |
| Peso        | 48–52 g           |
| Temperatura | 170–180 °C        |
| O₂ residual | 0.5–2.5%          |
| Velocidade  | 110–130 ppm       |

Cada parâmetro sofre pequenas variações ao longo da produção e também pode ser afetado por eventos operacionais.

## Configuração inicial

Antes de iniciar a produção, o jogador define os valores iniciais da máquina.

Os parâmetros possuem limites máximos permitidos para evitar valores incompatíveis com a simulação.

Exemplo:

```text
Peso:          40–60 g
Temperatura:   150–200 °C
O₂ residual:   0–5%
Velocidade:    80–160 ppm
```

Cada parâmetro iniciado dentro da faixa recomendada gera bônus de pontuação.

Atualmente:

```text
+50 pontos por parâmetro configurado corretamente
```

Uma configuração inicial completamente adequada pode gerar até:

```text
+200 pontos
```

## Sistema de pontuação

O jogo avalia não apenas quantas intervenções são realizadas, mas a qualidade das decisões tomadas.

### Correção adequada

Quando um parâmetro está fora da faixa e o jogador realiza um ajuste na direção correta:

```text
+100 pontos
```

Acertos consecutivos aumentam o multiplicador:

```text
1º acerto: +100
2º acerto: +200
3º acerto: +300
```

O multiplicador máximo é `x3`.

### Intervenção desnecessária

Se o jogador alterar um parâmetro que já está dentro da faixa recomendada:

```text
-20 pontos
```

### Ajuste incorreto

Se a intervenção afastar ainda mais o parâmetro do valor ideal:

```text
-40 pontos
```

O objetivo não é realizar o maior número possível de ajustes, mas reconhecer quando a intervenção é necessária e escolher a direção correta.

## Eventos operacionais

Durante o turno, a linha pode sofrer alterações automáticas que simulam ocorrências de produção.

Atualmente existem eventos como:

* variação na matéria-prima;
* instabilidade no aquecimento;
* alteração na selagem;
* ritmo de produção irregular.

Esses eventos afetam diretamente os parâmetros e obrigam o jogador a acompanhar continuamente o processo.

Além desses eventos, pequenas variações naturais acontecem periodicamente durante toda a partida.

## Resultado da partida

Ao final do turno, o jogador recebe uma avaliação baseada em:

* pontuação;
* qualidade final;
* quantidade de falhas;
* quantidade de intervenções;
* percentual de intervenções corretas;
* melhor sequência de acertos.

O desempenho pode ser classificado como:

```text
Excelente
Bom
Regular
Atenção
```

## Tecnologias

O projeto utiliza:

* React;
* JavaScript;
* CSS;
* Chart.js;
* react-chartjs-2.

Não há backend ou banco de dados nesta versão.

Toda a simulação é executada diretamente no navegador.

## Estrutura do projeto

```text
src/
├── App.jsx
├── App.css
├── main.jsx
├── index.css
│
├── components/
│   ├── StartScreen.jsx
│   ├── TopBar.jsx
│   ├── ProductionLine.jsx
│   ├── IndicatorCard.jsx
│   ├── ControlPanel.jsx
│   ├── EventLog.jsx
│   └── ResultScreen.jsx
│
├── hooks/
│   └── useProductionGame.js
│
└── data/
    └── parameters.js
```

### `App.jsx`

Responsável por organizar o fluxo principal da aplicação:

* tela de preparação;
* jogo;
* resultado final.

### `useProductionGame.js`

Centraliza o estado e as regras da partida:

* cronômetro;
* valores dos parâmetros;
* variações automáticas;
* eventos operacionais;
* pontuação;
* sequência de acertos;
* intervenções;
* qualidade;
* resultado final.

### `parameters.js`

Contém as configurações dos parâmetros monitorados, incluindo:

* valor inicial;
* unidade;
* limite mínimo;
* limite máximo;
* passo de ajuste;
* intensidade de variação.

### Componentes

Os componentes da interface foram separados por responsabilidade para facilitar manutenção e evolução do projeto.

## Executando o projeto

Instale as dependências:

```bash
npm install
```

Execute em ambiente de desenvolvimento:

```bash
npm run dev
```

Depois, acesse o endereço informado pelo servidor de desenvolvimento.

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

O resultado será gerado na pasta:

```text
dist/
```

Essa pasta pode ser publicada em serviços de hospedagem de sites estáticos.

## Uso em tablet

A interface foi projetada principalmente para uso educacional em tablets.

Os principais cuidados de interface incluem:

* botões grandes;
* áreas de toque amplas;
* controles simples;
* contraste entre estados;
* cards selecionáveis;
* feedback imediato;
* adaptação para telas menores.

## Possíveis evoluções

O projeto pode ser expandido futuramente com:

* níveis de dificuldade;
* novos cenários industriais;
* novos parâmetros;
* eventos mais complexos;
* ranking;
* identificação do aluno;
* salvamento de resultados;
* painel do professor;
* relatórios de desempenho;
* efeitos sonoros;
* animações da linha de produção;
* diferentes produtos e tipos de fábrica;
* persistência em banco de dados.

## Status

MVP funcional.

A versão atual já contempla:

* preparação da máquina;
* configuração inicial;
* simulação automática;
* monitoramento dos parâmetros;
* gráficos;
* eventos operacionais;
* intervenções;
* sistema de pontuação;
* feedback de decisões;
* tela de resultado.
