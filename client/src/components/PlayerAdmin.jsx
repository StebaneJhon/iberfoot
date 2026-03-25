function PlayerAdmin(props) {
    const {name, position, team, imageUrl} = props
    return (
        <div className="player-conatainer-admin">
            <div className="image-container-admin">
                {imageUrl ? (
                    <img 
                    className="image"
                    src={imageUrl} 
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