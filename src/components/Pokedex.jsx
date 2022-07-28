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
    const totalPages = Math.ceil(pokemons.length / 16)

    
    let initialPage = page < 5 ? 1 : (page -4)    
    let lastPage = totalPages  
    if (page < (totalPages -5)) {
        if (page > 5) {
            lastPage = (page + 4)
        }else{
            lastPage = 9
        }
    }else{
    }

    const numbers = [];
    for (let index = initialPage; index <= lastPage; index++) {
        numbers.push(index);
    }

    return (
        <>
            <div className='App'>
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Login-PokeApi" />
            </div>
            <p className='welcome'>Welcome {user}, here you can find your favorite pokemon</p>
            <div className='containerSearch'>           
            <form className='search' onSubmit={search}>
                <input type="text" 
                placeholder='Search by name'
                value={characterSearch}
                onChange={(e)=> setCharacterSearch(e.target.value)}
                />
                <button><img src="https://icon-library.com/images/poke-ball-icon/poke-ball-icon-7.jpg" alt="Submit" /></button>
            </form>
            </div>
            <div className='containerSelect'>            
            <select onChange={filterType}>
                <option value="null">List by type</option>
                {
                    typePokemon.map(typePoke => (
                        <option key={typePoke.url} 
                        value={typePoke.url}
                        >{typePoke.name}</option>
                    ))
                }
                
            </select>
            </div>
            <div className='containerButtons'>
            <button 
            className='paginated'
            onClick={()=> setPage(page-1)}
            disabled={page === 1}
            >&lt;</button>
            {numbers.map(number => (
                <button className={number === page ? 'paginated selected': 'paginated'} 
                onClick={() => setPage(number)} 
                key={number}
                >{number}</button>
            ))}
            
            <button 
            className='paginated'
            onClick={()=> setPage(page+1)}
            disabled={page === totalPages}
            >&gt;</button>
            </div>
            <div className='container'>
                {pokemonsPaginated.map(pokemon =>(
                     <CharacterItem 
                     pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
                     key={pokemon.url ? pokemon.url : pokemon.pokemon.url}/>   
                ))}
            </div>
        </>
    );
};

export default Pokedex;