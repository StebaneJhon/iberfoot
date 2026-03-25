function Player(props) {
    const {name, position, team, imageUrl} = props
    return (
        <div className="player-container">
            <div className="image-container">
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
            <p className="player-details-texts player-position" >{position}</p>
            <p className="player-details-texts  player-name" >{name}</p>
            <p className="player-details-texts  player-team" >{team}</p>
        </div>
    )
};

export default Player;