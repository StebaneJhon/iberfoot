import {useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import InsertPlayer from "../components/InserPlayer";
import PlayersAdmin from "../components/PlayersAdmin";

const API_URL = '/api/players'

function Admin() {

    const navigate = useNavigate();

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

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="admin-player">
            <PlayersAdmin players={players} onEdit={openEditModal} onDelete={onDeleted}/>
            <button className="add-new-btn" onClick={openAddModal}>
                + Add New Player
            </button>

            <button className="add-new-btn" onClick={handleLogout}>Logout</button>

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