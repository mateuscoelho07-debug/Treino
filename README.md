# Chicoteiro

Site de vendas do **Chicoteiro**, o suporte para guardar manhosos montados (com EVA e antena) sem embolar.

## Como ver o site no seu computador

Baixe a pasta e abra o arquivo `index.html` com o navegador (dois cliques nele). Não precisa instalar nada.

## Os arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O **conteúdo**: textos, títulos, fotos, botões. |
| `style.css` | A **aparência**: cores, tamanhos, animações, versão de celular. |
| `script.js` | O **comportamento**: galeria, abas, simulador de antena, quiz, cálculo do preço e botão do WhatsApp. |
| `img/` | As fotos do produto. |

## O que trocar antes de vender

Abra `script.js` e mude o bloco `CONFIG` no começo do arquivo:

- `whatsapp`: seu número com 55 + DDD (só números). O que está lá é exemplo.
- `preco`: o preço de uma unidade. O que está lá (29,90) é exemplo.
- `descontoAPartirDe` e `descontoPercentual`: desconto por quantidade (exemplo: 10% a partir de 3). Coloque `descontoPercentual: 0` para tirar.

Para mudar as cores, edite as variáveis no começo de `style.css` (`--azul`, `--verde-lago`...).

## Publicar de graça no GitHub Pages

1. No GitHub, abra o repositório e vá em **Settings → Pages**.
2. Em **Branch**, escolha `main` e a pasta `/ (root)`, e clique em **Save**.
3. Em alguns minutos o site fica no ar em `https://mateuscoelho07-debug.github.io/Treino/`.
