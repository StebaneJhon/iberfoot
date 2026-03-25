import PlayerAdmin from "./PlayerAdmin"

function PlayersAdmin(props) {
    const {players} = props
    return (
        <div className="players-container-admin">
            <h2>PLAYERS</h2>
            <div className="players-admin">
                { players.map((player) => {
                return (
                        <div key={player.id}>
                            <PlayerAdmin 
                                name={player.name}
                                position={player.position}
                                team={player.team}
                                imageUrl={player.image}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default PlayersAdmin;