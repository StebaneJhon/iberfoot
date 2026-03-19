function Player(props) {
    const {name, position, team, imageUrl} = props
    return (
        <div>
            <div className="image-container">
                {imageUrl ? (
                    <img 
                    src={imageUrl} 
                    alt={name} 
                />
                ) : (
                    <div>
                        No Image
                    </div>
                )}
                
            </div>
            <p>{name}</p>
            <p>{position}</p>
            <p>{team}</p>
        </div>
    )
};

export default Player;