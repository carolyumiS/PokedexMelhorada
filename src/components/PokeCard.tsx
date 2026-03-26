import { useState, useEffect } from "react";
import "./PokeCard.css";
import type { Pokemon } from "./Pokedex";

type Props = {
  pokemon: Pokemon;
};

export default function PokeCard({ pokemon }: Props) {
  const [favorito, setFavorito] = useState(false);

  // carregar favorito salvo
  useEffect(() => {
    const saved = localStorage.getItem(`fav-${pokemon.name}`);
    if (saved) {
      setFavorito(JSON.parse(saved));
    }
  }, [pokemon.name]);

  // salvar favorito
  useEffect(() => {
    localStorage.setItem(
      `fav-${pokemon.name}`,
      JSON.stringify(favorito)
    );
  }, [favorito, pokemon.name]);

  return (
    <div className="pokecard">
      <h3 className="pokecard-name">
        {pokemon.name} {favorito && "⭐"}
      </h3>

      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokecard-image"
        />
      )}

      <p><strong>Altura:</strong> {pokemon.height * 10} cm</p>
      <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
      <p>
        <strong>Tipos:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(" / ")}
      </p>

      <button
        className="pokecard-button"
        onClick={() => setFavorito((prev) => !prev)}
      >
        {favorito ? "Remover dos favoritos" : "Favoritar"}
      </button>
    </div>
  );
}