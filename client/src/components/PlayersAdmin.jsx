import PlayerAdmin from "./PlayerAdmin"

function PlayersAdmin(props) {
    const {players, onEdit} = props

    function handleEdit(player) {
        onEdit(player)
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
                                />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
};

export default PlayersAdmin;