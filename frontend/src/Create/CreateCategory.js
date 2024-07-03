import React, { useState } from 'react';
import './Style.css';
import axios from 'axios';

function CreateCategory({ addCategory }) {
    const [description, setDescription] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (description.trim() !== '') {
            axios.post('http://localhost:3000/category/', { description: description })
                .then(response => {
                    alert('Categoria adicionada!');
                    addCategory(response.data); // Supondo que a resposta contém a nova categoria criada
                    setDescription(''); // Limpa o campo de input após adicionar a categoria
                })
                .catch(error => {
                    alert("Erro ao adicionar categoria:");
                    console.error("Erro ao adicionar categoria:", error);
                });
        }
    };

    return (
        <form onSubmit={handleAddCategory}>
            <span>Create a Category</span>
            <label>Description</label>
            <input 
                type='text' 
                placeholder='Description' 
                required 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type='submit'>Create Category</button>
        </form>
    );
}

export default CreateCategory;
