import React from 'react';
import './Card.css';

function Card({ description, category, user , onDelete }) {
  
  const handleDeleteClick = () => {
    onDelete(); // Chama a função onDelete passada como prop
  };

  return (
    <div className="card">
      <span className='card-description'>{description}</span>
      <span className="card-category">{category}</span>
      <span className='card-user'>{user}</span>
      <button onClick={handleDeleteClick}>Done</button>
    </div>
  );
}

export default Card;