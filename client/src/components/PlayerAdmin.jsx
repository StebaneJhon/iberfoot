function PlayerAdmin(props) {
    const { player, onEdit } = props
    const { name, position, team, image } = player

    function handleEdit() {
        onEdit(player)
    }

    return (
        <div className="player-conatainer-admin" onClick={handleEdit}>
            <div className="image-container-admin">
                {image ? (
                    <img 
                    className="image"
                    src={image} 
                    alt={name} 
                />
                ) : (
                    <div>
                        No Image
                    </div>
                )}
            </div>
            <div className="player-details-admin-container">
                <p className="player-admin player-position" >{position}</p>
                <p className="player-admin player-name" >{name}</p>
                <p className="player-admin player-team" >{team}</p>
            </div>
        </div>
    )
};

export default PlayerAdmin;