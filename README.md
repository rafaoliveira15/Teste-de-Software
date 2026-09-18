# Testes de Software — Módulo de Checkout

![STATUS](https://img.shields.io/badge/STATUS-CONCLUÍDO-0F766E?style=for-the-badge)
![VERSÃO](https://img.shields.io/badge/VERSÃO-1.0-0F766E?style=for-the-badge)
![NODE.JS](https://img.shields.io/badge/NODE.JS-24.12.0-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JAVASCRIPT](https://img.shields.io/badge/JAVASCRIPT-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JEST](https://img.shields.io/badge/JEST-TESTES-C21325?style=for-the-badge&logo=jest&logoColor=white)
![VSCODE](https://img.shields.io/badge/VSCODE-EDITOR-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

---

# Índice

<div align="center">

[![SOBRE](https://img.shields.io/badge/SOBRE%20A%20ATIVIDADE-0F766E?style=for-the-badge)](#sobre-a-atividade)
[![OBJETIVO](https://img.shields.io/badge/OBJETIVO-0F766E?style=for-the-badge)](#objetivo)
[![ESCOPO](https://img.shields.io/badge/ESCOPO-0F766E?style=for-the-badge)](#escopo-dos-testes)
[![REGRAS](https://img.shields.io/badge/REGRAS%20DE%20NEGÓCIO-0F766E?style=for-the-badge)](#regras-de-negócio)
[![GOT](https://img.shields.io/badge/MATRIZ%20GOT-0F766E?style=for-the-badge)](#matriz-got)
[![CASOS](https://img.shields.io/badge/CASOS%20DE%20TESTE-0F766E?style=for-the-badge)](#casos-de-teste)
[![AUTOMATIZADOS](https://img.shields.io/badge/TESTES%20AUTOMATIZADOS-0F766E?style=for-the-badge)](#testes-automatizados)
[![MANUAIS](https://img.shields.io/badge/TESTES%20MANUAIS-0F766E?style=for-the-badge)](#testes-manuais)
[![CORREÇÕES](https://img.shields.io/badge/CORREÇÕES-0F766E?style=for-the-badge)](#correções-realizadas)
[![TECNOLOGIAS](https://img.shields.io/badge/TECNOLOGIAS-0F766E?style=for-the-badge)](#tecnologias)
[![ESTRUTURA](https://img.shields.io/badge/ESTRUTURA-0F766E?style=for-the-badge)](#estrutura-do-projeto)
[![EXECUÇÃO](https://img.shields.io/badge/EXECUÇÃO-0F766E?style=for-the-badge)](#instalação-e-execução)
[![RESULTADOS](https://img.shields.io/badge/RESULTADOS-0F766E?style=for-the-badge)](#resultados)
[![CONCLUSÃO](https://img.shields.io/badge/CONCLUSÃO-0F766E?style=for-the-badge)](#conclusão)

</div>

---

## Sobre a Atividade

Aplicação de **Testes de Software** em um módulo de checkout de e-commerce feito em **Node.js**.

O foco é validar a função `calcularTotal`, responsável por calcular o valor final de uma compra a partir dos itens do carrinho e de um possível cupom de desconto.

A atividade foi organizada com regras de negócio, uma **Matriz GOT (Guia de Ordem de Testes)**, testes automatizados e testes manuais. Também foram identificados comportamentos incorretos na implementação inicial, que foram corrigidos e revalidados.

---

## Objetivo

Verificar se o cálculo do total da compra funciona corretamente em diferentes situações:

- Cálculo do subtotal
- Validação de itens e quantidades
- Cupom de desconto
- Frete grátis e cobrança de frete
- Arredondamento
- Carrinho vazio e entradas inválidas

---

## Escopo dos Testes

O escopo está concentrado na função:

```javascript
calcularTotal(itens, cupom)
```

Ela recebe uma lista de itens (preço e quantidade de cada um) e um cupom de desconto, e calcula:

```
Subtotal → Desconto → Frete → Total Final
```

---

## Regras de Negócio

| # | Regra | Descrição |
|---|-------|-----------|
| 1 | **Subtotal** | Preço de cada produto × quantidade. Ex.: R$ 50,00 × 2 = R$ 100,00 |
| 2 | **Validação do carrinho** | Carrinho vazio ou quantidade ≤ 0 deve lançar o erro `Carrinho inválido` |
| 3 | **Cupom** | `PROMO10` aplica **10% de desconto** sobre o subtotal. Ex.: R$ 50,00 → desconto de R$ 5,00 |
| 4 | **Frete** | Subtotal **≥ R$ 100,00** → frete grátis. Subtotal **< R$ 100,00** → frete de R$ 15,00 |
| 5 | **Arredondamento** | Valor final com 2 casas decimais. Ex.: `48.33333333336` → `48.33` |

---

## Matriz GOT

| ID | Cenário | Entrada | Resultado Esperado |
|----|---------|---------|--------------------|
| CT-01 | Frete grátis no limite | Item R$ 100,00 + quantidade 1 | Total R$ 100,00 |
| CT-02 | Aplicação do cupom | Item R$ 50,00 + `PROMO10` | Total R$ 60,00 |
| CT-03 | Quantidade negativa | Item R$ 10,00 + quantidade -2 | Erro `Carrinho inválido` |
| CT-04 | Arredondamento | Item R$ 33,333 + quantidade 1 | Total R$ 48,33 |
| CT-05 | Carrinho vazio | `[]` | Erro `Carrinho inválido` |
| CT-06 | Frete abaixo do limite | Item R$ 80,00 + quantidade 1 | Total R$ 95,00 |

---

## Casos de Teste

| ID | O que verifica | Cálculo | Esperado | Resultado |
|----|----------------|---------|----------|-----------|
| CT-01 | Frete grátis quando o subtotal é exatamente R$ 100,00 (valor de borda) | 100 + 0 de frete | `100` | ✅ PASSOU |
| CT-02 | `PROMO10` aplica 10% de desconto sobre o subtotal | 50 − 5 + 15 de frete | `60` | ✅ PASSOU |
| CT-03 | Quantidade negativa é rejeitada | — | Erro `Carrinho inválido` | ✅ PASSOU |
| CT-04 | Valor final arredondado para 2 casas | 33,333 + 15 = 48,333 | `48.33` | ✅ PASSOU |
| CT-05 | Carrinho sem produtos é rejeitado | — | Erro `Carrinho inválido` | ✅ PASSOU |
| CT-06 | Frete cobrado quando o subtotal é menor que R$ 100,00 | 80 + 15 de frete | `95` | ✅ PASSOU |

---

## Testes Automatizados

- **Arquivo:** `carrinho.test.js`
- **Ferramenta:** Jest
- **Organização:** `describe()` e `test()`, um teste por caso da Matriz GOT (CT-01 a CT-06)
- **Valores:** `expect(...).toBe(...)`
- **Erros:** `expect(() => calcularTotal(...)).toThrow("Carrinho inválido")`

---

## Testes Manuais

- **Arquivo:** `index.js`
- **Abordagem:** caixa preta, verificando entradas e saídas sem depender da implementação interna
- **Funcionamento:** executa cada caso, compara esperado × obtido e usa `try/catch` para os erros esperados
- **Saída no terminal:**

```
[CT-01] Esp: 100 | Obtido: 100 -> PASSOU
```

---

## Correções Realizadas

| # | Regra | Antes | Depois |
|---|-------|-------|--------|
| 1 | Cupom PROMO10 | Desconto fixo de R$ 10,00 | 10% do subtotal |
| 2 | Frete grátis | `subtotal > 100` (R$ 100,00 pagava frete) | `subtotal >= 100` |
| 3 | Arredondamento | Mais de 2 casas decimais | `Number(total.toFixed(2))` |

**Efeito da correção do frete:**

| Subtotal | Frete |
|----------|-------|
| R$ 99,99 | R$ 15,00 |
| R$ 100,00 | Grátis |
| R$ 100,01 | Grátis |

**Função final (`carrinho.js`):**

```javascript
function calcularTotal(itens, cupom) {

    let subtotal = 0;

    for (let i = 0; i < itens.length; i++) {
        subtotal += itens[i].preco * itens[i].quantidade;
    }

    if (itens.length === 0 || subtotal < 0) {
        throw new Error("Carrinho inválido");
    }

    let desconto = 0;

    if (cupom === "PROMO10") {
        desconto = subtotal * 0.10;
    }

    let frete = 15;

    if (subtotal >= 100) {
        frete = 0;
    }

    let total = subtotal - desconto + frete;

    return Number(total.toFixed(2));
}
```

---

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| **Node.js** | Ambiente de execução do JavaScript fora do navegador |
| **JavaScript** | Função de cálculo do carrinho e testes |
| **Jest** | Suíte de testes automatizados |
| **Visual Studio Code** | Desenvolvimento e edição dos arquivos |

---

## Estrutura do Projeto

```
TestesSoftware/
├── carrinho.js              → Função de cálculo do carrinho
├── carrinho.test.js         → Testes automatizados (Jest)
├── index.js                 → Testes manuais
├── TestesSoftwareGOT.pdf    → Plano de testes e Matriz GOT
└── README.md                → Documentação do projeto
```

---

## Instalação e Execução

**Pré-requisitos:** Node.js e NPM instalados.

```bash
# Instalar dependências
npm install

# Se o Jest ainda não estiver instalado
npm install --save-dev jest

# Executar os testes automatizados
npx jest        # ou: npm test (se houver script no package.json)

# Executar os testes manuais
node index.js
```

---

## Resultados

Após as correções, todos os cenários foram validados.

| Teste | Descrição | Resultado Final |
|-------|-----------|-----------------|
| CT-01 | Frete grátis em R$ 100,00 | ✅ PASSOU |
| CT-02 | Cupom de 10% | ✅ PASSOU |
| CT-03 | Quantidade negativa | ✅ PASSOU |
| CT-04 | Arredondamento | ✅ PASSOU |
| CT-05 | Carrinho vazio | ✅ PASSOU |
| CT-06 | Frete abaixo de R$ 100,00 | ✅ PASSOU |

**Implementação inicial × final:**

| Regra | Inicial | Final |
|-------|---------|-------|
| Frete em R$ 100 | Cobrança indevida | Frete grátis |
| Cupom PROMO10 | R$ 10,00 fixos | 10% do subtotal |
| Arredondamento | Mais de 2 casas | 2 casas decimais |
| Carrinho vazio | Erro | Erro |
| Quantidade negativa | Tratamento validado | Erro `Carrinho inválido` |
| Frete abaixo de R$ 100 | R$ 15,00 | R$ 15,00 |

---

## Conclusão

A atividade permitiu trabalhar:

- Planejamento de testes e criação de casos de teste
- Matriz de rastreabilidade (Matriz GOT)
- Testes de caixa preta, automatizados e manuais
- Testes de valores de borda e tratamento de exceções
- Identificação de falhas, correção de código e reexecução dos testes

Pequenos detalhes nas regras de negócio, como cobrar frete em R$ 100,00 exatos, aplicar R$ 10,00 em vez de 10% ou retornar mais de duas casas decimais, podem gerar resultados incorretos. Os casos de teste permitiram identificar esses problemas e validar as correções.

---

## Informações da Atividade

| | |
|---|---|
| **Projeto** | Módulo de Checkout — Carrinho de Compras |
| **Sistema** | E-Commerce Node.js |
| **Versão** | 1.0 |
| **Ambiente** | Node.js v24.12.0 / Jest / Visual Studio Code |
| **Data** | 18/09/2026 |
| **Responsável** | Rafaela Cristina Araujo Oliveira |
