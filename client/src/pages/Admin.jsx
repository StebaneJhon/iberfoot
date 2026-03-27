import {useEffect, useState} from "react"
import InsertPlayer from "../components/InserPlayer";
import PlayersAdmin from "../components/PlayersAdmin";

const API_URL = '/api/players'

function Admin() {

    const [players, setPlayers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    
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

    function onEdited(player) {
        setPlayers(prePlayers => {
            prePlayers.forEach ((p, index) => {
                if(p.id === player.id) {
                    prePlayers[index] = player
                }
            })
            return prePlayers
        })
    }

    function onDeleted(id) {
        setPlayers(prePlayers => {
            
            return prePlayers.filter(player => player.id !== id);
        })
    }

    function openAddModal() {
        setSelectedPlayer(null);
        setIsModalOpen(true);
    }

    function openEditModal(player) {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    }

    function closeModal() {
        setSelectedPlayer(null)
        setIsModalOpen(false);
    }

    return (
        <div className="admin-player">
            <PlayersAdmin players={players} onEdit={openEditModal} onDelete={onDeleted}/>
            <button className="add-new-btn" onClick={openAddModal}>
                + Add New Player
            </button>

            { isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <InsertPlayer closeModal={closeModal} onNewPlayer={onNewPlayer} playerToEdit={selectedPlayer} onClose={closeModal} onEdited={onEdited}/>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Admin;