import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlay } from 'react-icons/fa';
import './App.css';

function Card(props) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [name, setName] = useState(props.name);
  const [link, setLink] = useState(props.link);
  const [category, setCategory] = useState(props.category);

  function handleEditSubmit(event) {
    event.preventDefault();
    const updatedCard = { name, link, category };
    props.onUpdate(props.index, updatedCard);
    setShowEditForm(false);
  }

  function handleDeleteClick() {
    props.onDelete(props.index);
  }

  function handlePlayClick() {
    const iframe = document.getElementById(`iframe-${props.index}`);
    iframe.src = link;
  }

  return (
    <div className="card">
      <h2>{props.name}</h2>
      <button className="play-button" onClick={handlePlayClick}><FaPlay /></button>
      <div className="card-buttons">
        <button className="edit-button" onClick={() => setShowEditForm(true)}><FaEdit /></button>
        <button className="delete-button" onClick={handleDeleteClick}><FaTrash /></button>
      </div>
      {showEditForm && (
        <form onSubmit={handleEditSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Link:
            <input type="text" value={link} onChange={(event) => setLink(event.target.value)} />
          </label>
          <label>
        Category:
        <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} required />
      </label>

          <button type="submit">Save</button>
        </form>
      )}
      <div className="video-container">
        {link && (
          <iframe
            id={`iframe-${props.index}`}
            title={props.name}
            className="video"
            src=""
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

export default Card;
