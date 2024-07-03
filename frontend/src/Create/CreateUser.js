import React, { useState } from 'react';
import './Style.css'
import axios from 'axios';

function CreateUser({ addUser }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleAddUser = (e) => {
        e.preventDefault();
        if (firstName.trim() !== '' && lastName.trim() !== '') {
            axios.post('http://localhost:3000/user/', { firstName, lastName })
                .then(response => {
                    alert('Usuário adicionado!');
                    addUser(response.data); // Supondo que a resposta contém o novo usuário criado
                    setFirstName(''); // Limpa os campos de input após adicionar o usuário
                    setLastName(''); 
                })
                .catch(error => {
                    alert("Erro ao adicionar usuário:");
                    console.error("Erro ao adicionar usuário:", error);
                });
        }
    };

    return (
        <form onSubmit={handleAddUser}>
            <span>Create an User</span>
            <label>First Name</label>
            <input type='text' 
                placeholder='First Name' 
                required 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}></input>
            <label>Last Name</label>
            <input 
                type='text' 
                placeholder='Last Name' 
                required
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}></input>
            <button type='submit'>Create User</button>
        </form>
    );
}

export default CreateUser;