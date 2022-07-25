import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const PokemonDetail = () => {

    const [character, setCharacter] =useState({})

    const { id } = useParams()

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setCharacter(res.data))
        .catch(error => alert('Pokemon No Existe'))
    },[id])

    return (
        <div>
            <h1>PokemonDetail</h1>
            <h2>{character.name}</h2>
            <img src={character.sprites?.other?.dream_world.front_default} alt="Images"/>
        </div>
    );
};

export default PokemonDetail;