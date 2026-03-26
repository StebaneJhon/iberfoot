import {useEffect, useState} from "react"
import InsertPlayer from "../components/InserPlayer";
import PlayersAdmin from "../components/PlayersAdmin";

const API_URL = '/api/players'

function Admin() {

    const [players, setPlayers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="admin-player">
            <PlayersAdmin players={players}/>
            <button className="add-new-btn" onClick={toggleModal}>
                + Add New Player
            </button>

            { isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={toggleModal}>&times;</button>
                        <InsertPlayer closeModal={toggleModal} onNewPlayer={onNewPlayer} />
                    </div>
                </div>
            )}

        {/*
            <InsertPlayer 
                onNewPlayer={onNewPlayer}
            />
        */}
        </div>
    )
}

export default Admin;