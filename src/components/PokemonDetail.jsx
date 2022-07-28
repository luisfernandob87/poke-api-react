import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const [character, setCharacter] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setCharacter(res.data))
      .catch((error) => alert("Pokemon No Existe"));
  }, [id]);

  console.log(character);

  return (
    <div className="pokemonDetail">
      <h1 className="App name">{character.name}</h1>
      <div>
        <p><strong>ID:</strong> {character.id}</p>
        <p><strong>Height: </strong>{character.height}</p>
        <p><strong>Weight: </strong>{character.weight}</p>
        {character.abilities?.map((chara) => (
          <p key={chara.ability.name}><strong>Abilities: </strong>{chara.ability.name}</p>
        ))}
         <p><strong>Type: </strong>{character.types?.[0].type.name} {character.types?.[1]?.type.name}
        </p>
      </div>
      <img
        src={character.sprites?.other?.dream_world.front_default}
        alt="Images"
      />
        <div>
        {character.stats?.map((charac) => (
            <p key={charac.stat.name}>
            <strong>{charac.stat.name}: </strong>{charac.base_stat}
            </p>
        ))}
        </div>   
        <div className="moves">
            <h2>Movements</h2>
            {character.moves?.map((chara) => (
            <p key={chara.move.name}>{chara.move.name}</p>
            ))}      
        </div>
    </div>
  );
};

export default PokemonDetail;
