import React, { useState } from 'react';
import Card from './Card.jsx';
import History from './History.jsx';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const [cards, setCards] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !link || !category) {
      alert("Please fill in all fields");
      return;
    }
    const newCard = { name, link, category };
    setCards([...cards, newCard]);
    setShowForm(false);
    setName('');
    setLink('');
    setCategory('');
  }

  function handleCardUpdate(index, updatedCard) {
    const updatedCards = [...cards];
    updatedCards[index] = updatedCard;
    setCards(updatedCards);
  }

  function handleCardDelete(index) {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  }

  const categories = [...new Set(cards.map(card => card.category))];

  const history = () => {
    setShowHistory(true);
  };
  
  return (
    <div className="container">
      <h1 className="title">Welcome to My App</h1>
      <div className="button-group">
        <button className="add-button" onClick={() => setShowForm(true)}>Add a New Card</button>
        <button className="history-button" onClick={history}>View History</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Name:
            <input
              className="input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={20}
            />
          </label>
          <label className="label">
            Link:
            <input
              className="input"
              type="text"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              required
            />
          </label>
          <label className="label">
            Category:
            <select
              className="input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="educational">Educational</option>
              <option value="funny">Funny</option>
              <option value="music">Music</option>
            </select>
          </label>
          <button className="submit-button" type="submit">Add Card</button>
        </form>
      )}
      {categories.map(category => (
        <div key={category}>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Videos</h2>
          <div className="cards-container">
            {cards.map((card, index) => (
              card.category === category && (
                <Card 
                  key={index} 
                  index={index}
                  name={card.name} 
                  link={card.link} 
                  onUpdate={handleCardUpdate}
                  onDelete={handleCardDelete}
                />
              )
            ))}
          </div>
        </div>
      ))}
      {showHistory && (
        <History cards={cards} onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}

export default App;
