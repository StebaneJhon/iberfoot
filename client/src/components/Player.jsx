import { Link } from 'react-router-dom';

function Player(props) {
    const {id, name, position, team, imageUrl} = props
    return (
        <Link to={`/player/${id}`} className="player-container">
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
        </Link>
    )
};

export default Player;