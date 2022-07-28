import React, { useState } from 'react';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserInput = () => {

    const [ userName, setUserName ] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submit = e => {
        e.preventDefault();
        dispatch(changeUser(userName))
        navigate('/pokedex')
    }

    return (
        <div className='appLogin'>
        <form className='formLogin App' onSubmit={submit}>
            <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Logo_PokeApi" />
            </div>
            <input className='login' type="text" 
            placeholder='Give me your name to start'
            value={userName}
            onChange={e => setUserName(e.target.value)}
            />
            <button className='icon'><img src="https://icon-library.com/images/poke-ball-icon/poke-ball-icon-7.jpg" alt="Submit" /></button>
        </form>
        </div>
    );
};

export default UserInput;