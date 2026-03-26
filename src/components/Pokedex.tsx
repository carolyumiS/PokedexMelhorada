import { useState, useEffect } from "react";
import "./Pokedex.css";
import PokeCard from "./PokeCard";

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
};

export default function Pokedex() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [erro, setErro] = useState("");

  const buscarPokemon = async () => {
    if (!nome.trim()) return;

    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
      );

      if (!resposta.ok) throw new Error();

      const dados: Pokemon = await resposta.json();

      //remove duplicados e coloca a busca mais recente no topo da lista
      setPokemons((prev) => {
        const filtrados = prev.filter((p) => p.name !== dados.name);
        return [dados, ...filtrados];
      });

    } catch {
      setErro("Pokémon não encontrado 😢");
    } finally {
      setCarregando(false);
      setNome("");
    }
  };

  // lod do ultimo pokemon pesquisado
  useEffect(() => {
    if (pokemons.length > 0) {
      console.log(
        `Pokémon ${pokemons[0].name} carregado com sucesso!`
      );
    }
  }, [pokemons]);

  return (
    <div className="pokedex-container">
      <h2 className="pokedex-title">🔎 Pokédex</h2>

      <input
        className="pokedex-input"
        type="text"
        placeholder="Digite o nome do Pokémon"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && buscarPokemon()}
      />

      <button className="pokedex-button" onClick={buscarPokemon}>
        Buscar
      </button>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="pokedex-error">{erro}</p>}

      {/* lista de pokemons */}
      <div className="pokedex-list">
        {pokemons.map((p) => (
          <PokeCard key={p.name} pokemon={p} />
        ))}
      </div>
    </div>
  );
}