# Landing page — Monteiro & Vasconcelos Advocacia

Site de uma página para escritório de advocacia, feito com **React + TypeScript + Tailwind CSS** (Vite) e animações com **Framer Motion**.

## Como abrir no seu computador

1. Instale o **Node.js** (versão 20 ou mais nova): https://nodejs.org
2. Dê dois cliques em **`iniciar-site.bat`** (Windows).
   Na primeira vez ele instala tudo sozinho e depois abre o site no navegador.

Ou, pelo terminal dentro desta pasta:

```bash
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão final na pasta dist/
```

## Onde editar

Quase tudo fica em **`src/data/site.ts`**:
- nome do escritório, OAB, telefone, WhatsApp, e-mail, endereço e horário
- áreas de atuação, equipe, etapas do atendimento, valores e perguntas frequentes

Cores e fontes: `src/index.css` (bloco `@theme`).

## Animações incluídas

- Tela de abertura com a balança se desenhando e cortinas se abrindo
- Balança da justiça balançando, com ícones jurídicos em órbita
- Poeira dourada animada (canvas) no topo e na seção de valores
- Título surgindo palavra por palavra e texto digitando as áreas
- Fachada de tribunal (frontão, colunas e degraus) se desenhando
- Livro de leis folheando as páginas sozinho
- Malhete (martelo do juiz) batendo com ondas de impacto e faíscas
- Faixas de texto correndo em direções opostas
- Cards com inclinação 3D, borda dourada girando e brilho que segue o mouse
- Linha do tempo que se preenche conforme a rolagem
- Cards da equipe que viram (flip) ao passar o mouse ou tocar
- Selo giratório "Ética • Sigilo • Compromisso"
- Contadores numéricos, parallax, botões magnéticos, barra de progresso,
  brilho do cursor, botão do WhatsApp pulsando e voltar ao topo com anel de progresso

- Pergaminho da Constituição (Art. 5º) que se desenrola e acende palavra por palavra na rolagem, com selo de cera
- Linha do tempo "Nossa História" que anda na horizontal enquanto você rola, com os anos se preenchendo de dourado
- Contrato sendo escrito, assinado por uma caneta e carimbado ("ASSINADO"), em loop
- Faixa de palavras que acelera, inverte e inclina conforme a velocidade da rolagem
- Símbolos jurídicos (§, ¶, balança, martelo, livro) flutuando com parallax
- Feixes de luz no topo, cursor personalizado e a palavra JUSTIÇA gigante no rodapé

As animações respeitam a opção "reduzir movimento" do sistema.

## Modo escuro forçado

Se o seu navegador usa "modo escuro automático" (flag do Chrome) ou a extensão Dark Reader,
as seções claras aparecem marrons. A página já pede ao Dark Reader para não mexer nela;
no Chrome, desative a flag em `chrome://flags` → "Auto Dark Mode for Web Contents" para ver as cores reais.

## Publicidade na advocacia (OAB)

O conteúdo foi escrito para seguir o **Provimento 205/2021 da OAB**: sem promessa de resultado,
sem preços e sem depoimentos de clientes. Mantenha esse cuidado ao editar os textos.

## Publicar

Rode `npm run build` e envie a pasta `dist/` para Vercel, Netlify, Hostinger ou qualquer hospedagem de site estático.
