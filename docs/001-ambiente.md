# Ambiente utilizado

Neste projeto, o ambiente de desenvolvimento é composto por:

- Windows
- WSL
- Linux dentro do WSL
- Node.js gerenciado com NVM
- uso preferencial de npx
- evitando instalações globais

A proposta desse ambiente é manter o desenvolvimento mais controlado, reproduzível e menos dependente de configurações soltas da máquina.

---

## 1. WSL + Linux no Windows

### 1.1. O que é

O WSL [🔍](https://learn.microsoft.com/pt-br/windows/wsl/) permite usar um ambiente Linux dentro do Windows.

Na prática, isso significa desenvolver em uma máquina com Windows, mas executar comandos, ferramentas e fluxos de trabalho em um ambiente Linux.

### 1.2. Motivo do uso

Muitos ambientes de desenvolvimento adotam Linux. Por isso, esta foi uma escolha intencional para praticar nesse contexto e, ao mesmo tempo, trabalhar em um ambiente muito comum no mercado.

Além disso, o ecossistema de desenvolvimento costuma funcionar muito bem em Linux, o que reduz diferenças entre o ambiente local e ambientes reais de trabalho, como servidores e pipelines.

### 1.3. Vantagens

- melhor compatibilidade com ferramentas de desenvolvimento
- terminal Linux disponível no Windows
- ambiente mais próximo de produção
- mais leve e mais simples que uma máquina virtual completa

### 1.4. Desvantagens

- adiciona uma camada a mais no ambiente
- pode confundir no começo, porque parte das coisas fica no Windows e parte no Linux
- exige cuidado com a localização dos arquivos e com os caminhos usados

### 1.5. Alternativas

- Windows puro  
  Mais simples para começar, mas pode ter mais diferenças em relação a ambientes Linux.

- Linux nativo  
  É a opção mais direta e consistente, mas exige usar Linux como sistema principal.

- Máquina virtual  
  Dá isolamento, mas consome mais recursos e costuma ser menos prática que WSL.

---

## 2. NVM

### 2.1. O que é

O NVM [🔍](https://www.nvmnode.com/pt/) é um gerenciador de versões do Node.js.

Ele permite instalar e alternar entre diferentes versões do Node sem depender de uma única instalação fixa no sistema.

### 2.2. Motivo do uso

Projetos diferentes podem exigir versões diferentes do Node. Com NVM, isso fica mais fácil de controlar.

Essa escolha ajuda a evitar conflitos entre projetos e deixa o ambiente mais flexível para testes, estudos e manutenção.

### 2.3. Vantagens

- permite trocar de versão do Node com facilidade
- evita conflitos entre projetos
- reduz o acoplamento ao sistema
- melhora a organização do ambiente

### 2.4. Desvantagens

- exige lembrar de usar a versão correta
- adiciona uma ferramenta a mais no setup
- pode gerar confusão se cada terminal estiver com uma versão diferente ativa

### 2.5. Alternativas

- instalar Node diretamente no sistema  
  Mais simples no começo, mas pior para alternar versões.

- fnm / asdf / Volta  
  São outras ferramentas com a mesma proposta, cada uma com seu próprio estilo de uso.

---

## 3. npx

### 3.1. O que é

O npx executa pacotes Node sem exigir instalação global prévia.

Exemplo:

```bash
npx @angular/cli new meu-projeto
```

### 3.2. Motivo do uso

O npx foi adotado para evitar dependência de ferramentas instaladas globalmente, o que reduz o acoplamento da máquina a versões específicas.

Isso também ajuda a deixar mais explícito qual ferramenta está sendo usada em cada momento.

### 3.3. Vantagens

- evita instalações globais desnecessárias
- permite usar versões específicas de ferramentas
- deixa o ambiente mais previsível
- reduz conflitos entre projetos

### 3.4. Desvantagens

- os comandos ficam maiores
- a primeira execução pode ser mais lenta
- pode parecer menos prático para quem busca rapidez imediata

### 3.5. Alternativas

- instalação global
  Exemplo: `npm install -g @angular/cli`
  É mais prático no curto prazo, mas mais arriscado em controle de versão.

- scripts no package.json
  Boa alternativa para comandos recorrentes do projeto.

---

## 4. Evitar instalações globais

### 4.1. Motivo do uso

Evitar instalações globais foi uma decisão para reduzir dependências escondidas na máquina e manter o ambiente mais fácil de entender, reproduzir e até resetar.

A ideia é que, ao remover as pastas do projeto, não fiquem resíduos relevantes do desenvolvimento espalhados pelo sistema.

Além disso, instalações globais podem prender o ambiente a versões específicas e criar dependências que não ficam visíveis no próprio projeto.

Isso pode causar situações como:

- o projeto funcionar em uma máquina e falhar em outra
- ninguém saber exatamente qual versão está sendo usada
- conflitos entre projetos diferentes

### 4.2. Vantagens

- mais clareza sobre o ambiente
- melhor reprodutibilidade
- menos conflitos entre versões
- ambiente mais limpo

### 4.3. Desvantagens

- exige mais organização
- alguns comandos ficam menos curtos
- o setup inicial pode parecer mais trabalhoso
