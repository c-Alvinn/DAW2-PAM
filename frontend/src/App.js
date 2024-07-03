import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header/Header';
import Activity from './Activity/Activity';
import CreateUser from './Create/CreateUser';
import CreateCategory from './Create/CreateCategory';
import CreateActivity from './Create/CreateActivity';

function App() {

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:3000/category/')
          .then(response => {
              setCategories(response.data);
          })
          .catch(error => {
              console.error("Erro ao buscar categorias:", error);
          });

          axios.get('http://localhost:3000/user/')
              .then(response => {
                  setUsers(response.data);
              })
              .catch(error => {
                  console.error("Erro ao buscar usuários:", error);
              });
  }, []);

  const addCategory = (newCategory) => {
      setCategories([...categories, newCategory]);
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
};

  return (
    <div className="App">
      <Header></Header>
      <div className='main'>
        <section className='create'>
          <CreateUser addUser={addUser} ></CreateUser>
          <div className='line'></div>
          <CreateCategory addCategory={addCategory}></CreateCategory>
        </section>
        <section className='create'>
          <CreateActivity categories={categories} users={users}></CreateActivity>
        </section>
        <Activity users={users} categories={categories}></Activity>
      </div>
    </div>
  );
}

export default App;
