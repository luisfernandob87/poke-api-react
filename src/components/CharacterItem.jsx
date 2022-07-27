import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CharacterItem = ({pokemonUrl}) => {

    const [ character, setCharacter ] = useState({})

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(pokemonUrl)
        .then(res => setCharacter(res.data))
    },[])

    console.log(character);

    return (
        <div className='pokedex' onClick={() => navigate(`/pokedex/${character.id}`)}>
            <h3>{character.name}</h3>
            <img src={character.sprites?.other?.dream_world.front_default} alt="Images"/>
            <p>{character.weight}</p>
        </div>
    );
};

export default CharacterItem;