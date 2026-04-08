import { useEffect, useState } from "react";
import Player from "../components/Player";
import "../../public/all-players-container.css"
import Footer from "../components/Footer";

function AllPlayers() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
            fetch('/api/players')
                .then(res => res.json())
                .then(data => setPlayers(data))
        }, []);

    if (!players || players.length === 0) {
        return <p>No players found...</p>;
    }

    return (
        <div className="all-players">
            <div className='sub-heading-container'>
                <h2 className='section-header'>OUR PLAYERS</h2>
            </div>
            <div className="all-players-container">
                {players.map( player => {
                    return (
                        <Player
                            key={player.id}
                            id={player.id}
                            name={player.name}
                            position={player.position}
                            team={player.team}
                            imageUrl={player.image}
                        />
                    )
                })}
            </div>
            <div className="footer-section">
                <Footer />
            </div>
        </div>
    )
}

export default AllPlayers;