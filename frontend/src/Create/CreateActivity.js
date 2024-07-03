import React, { useState } from 'react';
import axios from 'axios';
import './Style.css'

function CreateActivity({ categories, users }) {

    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    const handleAddActivity = (e) => {
        e.preventDefault();
        if (description.trim() !== '' && selectedCategory && selectedUser) {
            axios.post('http://localhost:3000/activity/', {
                description: description,
                userId: parseInt(selectedUser),
                categoryId: parseInt(selectedCategory)
            })
            .then(response => {
                alert('Atividade adicionada com sucesso!');
                setDescription(''); // Limpa os campos após adicionar a atividade
                setSelectedCategory('');
                setSelectedUser('');
            })
            .catch(error => {
                alert('Erro ao adicionar atividade');
                console.error('Erro ao adicionar atividade:', error);
            });
        }
    };

    return (
        <form onSubmit={handleAddActivity}>
            <span>Create an Activity</span>
            <label>Select User</label>
            <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
            >
                {users.map((user, index) => (
                    <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                    </option>
                ))}
            </select>
            <label>Select Category</label>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categories.map((category, index) => (
                    <option key={category.id} value={category.id}>
                        {category.description}
                    </option>
                ))}
            </select>
            <label>Description</label>
            <textarea 
            placeholder='Description' 
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
            <button type='submit'>Create Activity</button>
        </form>
    );
}

export default CreateActivity;