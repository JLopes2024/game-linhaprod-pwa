# Linha de Produção

**Linha de Produção** é um **PWA educacional focado em tablets** que simula decisões de controle de qualidade em uma linha de produção.

O aplicativo foi desenvolvido para jovens em cursos profissionalizantes que atuam ou se preparam para atuar em ambientes industriais. A proposta é oferecer uma experiência prática de monitoramento, identificação de desvios e tomada de decisão em processos produtivos.

Por ser um **Progressive Web App (PWA)**, o projeto é pensado para uso direto no navegador e também pode ser instalado no dispositivo, oferecendo uma experiência próxima à de um aplicativo nativo em tablets educacionais compatíveis.

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

## Público e dispositivo-alvo

O projeto é direcionado principalmente a:

* jovens em cursos profissionalizantes;
* estudantes em formação para atuação em linhas de produção;
* atividades educacionais e simulações em sala de aula.

O uso principal é em **tablets educacionais**, por isso a interface prioriza:

* botões grandes;
* áreas de toque amplas;
* leitura rápida;
* contraste entre estados;
* controles simples;
* responsividade;
* navegação sem necessidade de teclado físico;
* experiência em orientação retrato ou paisagem, conforme o dispositivo.

## PWA

O projeto foi concebido como um **Progressive Web App**.

Isso permite que, quando configurado com manifest e service worker, ele possa:

* ser instalado na tela inicial do tablet;
* abrir em modo semelhante a um aplicativo;
* reduzir a dependência de navegação pelo navegador;
* oferecer uma experiência mais adequada ao ambiente educacional;
* receber recursos de funcionamento offline ou cache em versões futuras.

> A disponibilidade de instalação e funcionamento offline depende da configuração do manifest, service worker e do navegador utilizado no dispositivo.

## Fluxo do jogo

A partida começa com a preparação da máquina.

O jogador define os valores iniciais dos parâmetros e decide quando ligar a linha de produção.

A configuração inicial também faz parte da avaliação. É possível iniciar a máquina com parâmetros fora da faixa recomendada, mas isso gera consequências durante o jogo.

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
* react-chartjs-2;
* recursos de PWA.

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

Essa pasta pode ser publicada em serviços de hospedagem de aplicações estáticas.

## Uso em tablets educacionais

A interface foi projetada prioritariamente para tablets utilizados em ambiente educacional.

Os principais cuidados de UX incluem:

* componentes grandes;
* boa área de toque;
* baixa dependência de digitação;
* informações resumidas;
* feedback visual imediato;
* responsividade;
* uso confortável em telas intermediárias;
* navegação simples durante atividades em sala.

## Instalação como aplicativo

Quando o PWA estiver configurado com `manifest.webmanifest` e service worker, o aplicativo poderá ser instalado diretamente no tablet pelo navegador compatível.

Isso permite que o **Linha de Produção** seja aberto a partir da tela inicial como uma aplicação dedicada, sem necessidade de acessar manualmente a URL a cada uso.

## Possíveis evoluções

O projeto pode ser expandido futuramente com:

* funcionamento offline completo;
* cache de recursos;
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

A versão atual contempla:

* preparação da máquina;
* configuração inicial;
* simulação automática;
* monitoramento dos parâmetros;
* gráficos;
* eventos operacionais;
* intervenções;
* sistema de pontuação;
* feedback de decisões;
* tela de resultado;
* interface responsiva focada em tablet.

