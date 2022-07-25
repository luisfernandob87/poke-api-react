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
        <form onSubmit={submit}>
            <input type="text" 
            value={userName}
            onChange={e => setUserName(e.target.value)}
            />
            <button>Submit</button>
        </form>
    );
};

export default UserInput;