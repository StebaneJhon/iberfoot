import { useEffect } from "react";
import { useState } from "react";
import Player from "../components/Player";

const API_URL = '/api/players'

function Home() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setPlayers(data))
    }, []);

    console.log(players);

    return <div>
        <h1>Home</h1>
        {players.map((player) => (
            <Player
                key={player.id}
                name={player.name}
                position={player.position}
                team={player.team}
                imageUrl={player.image}
            />
        ))}
    </div>
}

export default Home;