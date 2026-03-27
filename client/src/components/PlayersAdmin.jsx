import PlayerAdmin from "./PlayerAdmin"

function PlayersAdmin(props) {
    const {players, onEdit, onDelete} = props

    function handleEdit(player) {
        onEdit(player)
    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this player?")) {
            try {
                const response = await fetch(`/api/players/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    onDelete(id)
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div className="players-container-admin">
            <h2>PLAYERS</h2>
            <div className="players-admin">
                { players.map((p) => {
                    return (
                            <div key={p.id}>
                                <PlayerAdmin 
                                    onEdit={handleEdit}
                                    player={p}
                                    onDelete={handleDelete}
                                />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
};

export default PlayersAdmin;