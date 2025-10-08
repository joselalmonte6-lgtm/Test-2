import React from "react";
import GameList from "../components/GameList";

function Dashboard({ user }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <GameList user={user} />
      ) : (
        <p>Please login to view games.</p>
      )}
    </div>
  );
}

export default Dashboard;
