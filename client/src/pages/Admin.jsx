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
        console.log(player)
        setPlayers(prePlayers => {
            prePlayers.forEach ((p, index) => {
                if(p.id === player.id) {
                    prePlayers[index] = player
                }
            })
            console.log(player)
            return prePlayers
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
            <PlayersAdmin players={players} onEdit={openEditModal}/>
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