# Análise de Arquitetura - Pokédex

## Estrutura de Diretórios

A organização atual do projeto é simples e relativamente clara, com separação entre componentes (`PokeCard`) e tela principal (`Pokedex`).

Isso facilita o entendimento inicial do código, principalmente para aplicações pequenas.

No entanto, há pontos que podem ser melhorados:

- Não existe uma pasta `services` para centralizar chamadas à API
- A lógica de requisição (`fetch`) está dentro do componente
- O tipo `Pokemon` está definido dentro do arquivo da tela, podendo ser reutilizado em outros lugares

Sugestão de melhoria:


src/
├─ components/
├─ screens/
├─ services/
├─ types/


---

## Componentização

O componente `PokeCard` é um bom exemplo de componente reutilizável.

Pontos positivos:
- Recebe dados via props
- Não depende diretamente da tela
- Tem responsabilidade única (exibir dados do Pokémon)

Possível melhoria:
- A lógica de favoritos poderia ser extraída para um hook personalizado (ex: `useFavoritePokemon`)

---

## Gerenciamento de Estado e Lógica

### Pokedex

A lógica de busca está dentro do próprio componente:

- Função `buscarPokemon`
- Uso de `useState`
- Uso de `fetch` diretamente

### PokeCard

- Gerencia estado de favorito
- Usa `localStorage` para persistência

---

## Avaliação da Abordagem

### Prós

- Simplicidade
- Fácil de entender
- Rápida implementação
- Ideal para projetos pequenos

### Contras

- Mistura UI com lógica de negócio
- Dificulta testes
- Pouca escalabilidade
- Possível repetição de código no futuro

---

## Pontos Fortes

### 1. Boa separação de componentes

O `PokeCard` está bem isolado e reutilizável.

### 2. Uso adequado de hooks

O uso de `useState` e `useEffect` está correto, incluindo persistência com `localStorage`.

---

## Pontos Fracos

### 1. Lógica de API dentro da tela

O uso de `fetch` diretamente no componente dificulta manutenção e reutilização.

### 2. Falta de separação de responsabilidades

O componente `Pokedex` acumula várias funções:

- Interface
- Requisição de dados
- Tratamento de erro
- Manipulação da lista

Isso viola o princípio de responsabilidade única.

---

## Conclusão

A arquitetura atual funciona bem para aprendizado e projetos pequenos, mas não é ideal para aplicações maiores.

Para melhorar a escalabilidade e manutenção, seria interessante aplicar padrões arquiteturais como MVVM ou MVP, separando melhor as responsabilidades.
