import React, { useEffect, useState } from "react";
import GameForm from "../components/GameForm";

function AdminPanel() {
  const [games, setGames] = useState([]);

  const loadGames = () => {
    fetch("/api/games")
      .then((res) => res.json())
      .then(setGames);
  };

  useEffect(loadGames, []);

  const deleteGame = async (id) => {
    const res = await fetch(`/api/games/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    if (res.ok) loadGames();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <GameForm onGameAdded={loadGames} />
      <h3>Manage Games</h3>
      <ul>
        {games.map((g) => (
          <li key={g._id}>
            {g.title} ({g.platform}) 
            <button onClick={() => deleteGame(g._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
