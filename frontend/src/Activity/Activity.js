import React, { useState } from 'react';
import './Activity.css'
import Card from '../Card/Card'
import axios from 'axios';

function Activity({ users, categories }){

    const [activities, setActivities] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const fetchActivities = () => {
        if (selectedUser) {
            axios.get(`http://localhost:3000/activity/${selectedUser}`)
                .then(response => {
                    const activitiesWithDetails = response.data.map(activity => ({
                        ...activity,
                        user: findUser(activity.userId),
                        category: findCategory(activity.categoryId)
                    }));
                    setActivities(activitiesWithDetails);
                })
                .catch(error => {
                    console.error(`Erro ao buscar atividades do usuário ${selectedUser}:`, error);
                });
        }
    };

    const findUser = (userId) => {
        const user = users.find(user => user.id === userId);
        return user;
    };

    const findCategory = (categoryId) => {
        const category = categories.find(category => category.id === categoryId);
        return category;
    };

    const handleSeeActivities = () => {
        fetchActivities();
    };

    const handleDeleteActivity = (id) => {
        axios.delete(`http://localhost:3000/activity/${id}`)
            .then(response => {
                console.log(`Atividade com ID ${id} deletada com sucesso`);
                // Atualiza a lista de atividades após deletar a atividade
                setActivities(prevActivities => prevActivities.filter(activity => activity.id !== id));
            })
            .catch(error => {
                console.error(`Erro ao deletar atividade com ID ${id}:`, error);
            });
    };
    
    return (
        <section className='activity'>
            <div className='headerActivity'>
                <h1 className='title'>Activity</h1>
                <span>Which user’s activities do you want to see?</span>
                <div className='selectUser'>
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
                    <button onClick={handleSeeActivities}>See activities</button>
                </div>
                <div className='line'></div>
            </div>
            <div className='containerActivity'>
                <span className='title'>Activities</span>
                <div className='list'>
                    {activities.map((activity) => (
                        <Card
                            key={activity.id}
                            description={activity.description}
                            category={activity.category.description}
                            user={`${activity.user.firstName} ${activity.user.lastName}`}
                            onDelete={() => handleDeleteActivity(activity.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Activity;