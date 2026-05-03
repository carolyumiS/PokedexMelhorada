# Proposta de Refatoração - MVVM

## Padrão Escolhido

Escolhi o padrão **MVVM (Model-View-ViewModel)**.

Motivo:
- Funciona muito bem com React (hooks)
- Mantém a View simples
- Separa lógica de negócio da interface
- Facilita testes e manutenção

---

## Nova Estrutura de Arquivos


src/
├─ screens/
│ └─ Pokedex/
│ ├─ PokedexScreen.tsx
│ ├─ usePokedexViewModel.ts
│
├─ components/
│ └─ PokeCard.tsx
│
├─ services/
│ └─ pokemonService.ts
│
├─ types/
│ └─ Pokemon.ts


---

## Divisão de Responsabilidades

### View (PokedexScreen.tsx)

Responsável apenas por:

- Renderização da UI
- Captura de eventos (input, botão)
- Consumir dados do ViewModel

Exemplos:
- Exibir lista
- Mostrar loading
- Mostrar erro

---

### ViewModel (usePokedexViewModel.ts)

Responsável por:

- Estado da aplicação:
  - `pokemons`
  - `loading`
  - `erro`
  - `nome`

- Lógica:
  - buscarPokemon
  - remover duplicados
  - manipular lista

- Comunicação com API (via service)

---

### Service (pokemonService.ts)

Responsável por:

- Fazer chamadas HTTP
- Isolar o `fetch`

Exemplo:

```ts
export async function getPokemon(nome: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  if (!res.ok) throw new Error();
  return res.json();
}
Fluxo de Dados

Quando o usuário realiza uma busca:

Usuário digita no input (View)
A View chama setNome do ViewModel
Usuário clica em "Buscar"
A View chama buscarPokemon
O ViewModel:
ativa o loading
chama o pokemonService
O Service faz a requisição na API
O ViewModel recebe os dados
Atualiza o estado (pokemons)
A View re-renderiza automaticamente
Benefícios da Refatoração
Separação clara de responsabilidades
Código mais organizado
Melhor escalabilidade
Facilidade para testes
Reutilização de lógica
Conclusão

A aplicação deixa de concentrar a lógica na interface e passa a ter uma arquitetura mais robusta.

Isso permite evoluir o projeto com mais facilidade, possibilitando a implementação de novas funcionalidades como:

favoritos globais
cache de dados
uso offline
paginação
