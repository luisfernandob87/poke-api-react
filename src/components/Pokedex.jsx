import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CharacterItem from './CharacterItem';
import { useNavigate } from 'react-router-dom'

const Pokedex = () => {
    const user = useSelector(state => state.user)

    const [ pokemons, setPokemons ]= useState([]);
    const [ characterSearch, setCharacterSearch ] = useState("");
    const [ typePokemon, setTypePokemon ] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1154&offset=0`)
        .then(res => setPokemons(res.data.results))

        axios.get(`https://pokeapi.co/api/v2/type`)
        .then(res => setTypePokemon(res.data.results))
    },[]);

    const search = () =>{
        alert(characterSearch);
        const cleanCharacterSearch = characterSearch.toLowerCase().trim();
        navigate(`/pokedex/${cleanCharacterSearch}`);
    }
    const filterType = (e) =>{
        axios.get(e.target.value)
        .then(res => setPokemons(res.data.pokemon))
    }
    const [ page, setPage] = useState(1);
    const lastIndex = page * 16;
    const firstIndex = lastIndex - 16;
    const pokemonsPaginated = pokemons.slice(firstIndex, lastIndex);

    const lastPage = Math.ceil(pokemons.length / 16)

    const numbers = [];
    for (let index = 1; index <= lastPage; index++) {
        numbers.push(index);
    }

    const numbersAvailable = numbers.slice(0, 5);

    console.log(numbersAvailable);

    return (
        <div>
            <h1>PokeDex</h1>
            <p>Hola {user} bienvenido a la Pokedex</p>
            <form onSubmit={search}>
                <input type="text" 
                value={characterSearch}
                onChange={(e)=> setCharacterSearch(e.target.value)}
                />
                <button>Search</button>
            </form>
            <select onChange={filterType}>
                <option value="">Selecciona el tipo de Pokemon</option>
                <option value="">Todos</option>
                {
                    typePokemon.map(typePoke => (
                        <option key={typePoke.url} value={typePoke.url}>{typePoke.name}</option>
                    ))
                }
                
            </select>
            <br />
            <button 
            onClick={()=> setPage(page-1)}
            disabled={page === 1}
            >Prev Page</button>
            {numbers.map(number => (
                <button onClick={() => setPage(number)} key={number}>{number}</button>
            ))}
            <button 
            onClick={()=> setPage(page+1)}
            disabled={page === lastPage}
            >Next Page</button>
            <div>
                {pokemonsPaginated.map(pokemon =>(
                     <CharacterItem 
                     pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
                     key={pokemon.url ? pokemon.url : pokemon.pokemon.url}/>   
                ))}
            </div>
        </div>
    );
};

export default Pokedex;