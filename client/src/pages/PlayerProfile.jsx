import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../../public/player-profile.css";
import Footer from "../components/Footer";

function PlayerProfile() {

    const { id } = useParams();
    const [player, setPlayer] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:3000/api/players/${id}`)
            .then(res => res.json())
            .then(data => {
                setPlayer(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading) return <p>Loading player profile...</p>;
    if (!player) return <p>Player not found.</p>;

    const {name, position, team, image, age, transfermarkt, dynamic_photos} = player

    return (
        <div>
            <div className="player-profile-container">
                <div className="profile-sidebar">
                <div className="profile-image-container">
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
                <h3 className="player-profile-name" >{name}</h3>
                <p className='player-profile-age'><span>Age:</span> {age}</p>
                <p className="player-profile-position" ><span>Position:</span> {position}</p>
                <p className="player-profile-team" ><span>Team:</span> {team}</p>
                <div className="social-btn-container">
                    <Link to={transfermarkt} className='social-btn'>TM</Link>
                </div>
            </div>

            {(!dynamic_photos || dynamic_photos.length === 0) ? (
                <div className='profile-gallery-empty'>
                    <p>No action shots available for this player.</p>
                </div>
            ) : (
                <div className="profile-gallery"> 
                    {dynamic_photos.map((d, index) => (
                        <div className='gallery-item' key={d.id || index}> 
                            <img className="image" src={d.url} alt='Dynamic photo'/>
                        </div>
                    ))}
                </div>
            )}
            </div>
            <div className="footer-section player-profile-footer-section">
                <Footer />
            </div>
        </div>
    )

}

export default PlayerProfile;