import React, { useEffect, useState } from "react";

function GameList({ user }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then(setGames);
  }, []);

  const addFavorite = async (gameId) => {
    const res = await fetch(`/api/users/${user._id}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ gameId })
    });
    if (res.ok) {
      alert("Game added to favorites!");
    } else {
      alert("Failed to add favorite.");
    }
  };

  return (
    <div>
      <h3>All Games</h3>
      <ul>
        {games.map((g) => (
          <li key={g._id}>
            {g.title} ({g.platform}, {g.genre}, {g.releaseYear})
            {user?.role === "user" && (
              <button onClick={() => addFavorite(g._id)}>⭐ Favorite</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
