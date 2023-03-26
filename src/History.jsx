import React, { useState } from 'react';
import './App.css';

function History() {
  const [history, setHistory] = useState([]);

  function handleVideoPlayed(name, link) {
    const timePlayed = new Date().toLocaleString();
    const playedVideo = { name, link, timePlayed };
    setHistory([...history, playedVideo]);
  }

  return (
    <div className="container">
      <h1 className="title">History</h1>
      {history.length === 0 ? (
        <p>No videos have been played yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((playedVideo, index) => (
            <li key={index}>
              <span>{playedVideo.name}</span>
              <span>{playedVideo.link}</span>
              <span>{playedVideo.timePlayed}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
