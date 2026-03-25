import {useEffect, useState} from "react"
import InsertPlayer from "../components/InserPlayer";
import PlayersAdmin from "../components/PlayersAdmin";

const API_URL = '/api/players'

function Admin() {

    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setPlayers(data))
    }, []);

    function onNewPlayer(player) {
        setPlayers(prePlayers => {
            return [...prePlayers, player]
        })
    }

    return (
        <div className="admin-player">
            <PlayersAdmin players={players}/>
            <InsertPlayer 
                onNewPlayer={onNewPlayer}
            />
        </div>
    )
}

export default Admin;