import React, { useRef } from 'react';
import Player from './Player'; 
import EastIcon from '@mui/icons-material/East';
import { Link } from 'react-router-dom';


function HorizontalSlider({ players }) { 
  const scrollRef = useRef(null);

  function scroll(direction) {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  if (!players || players.length === 0) {
    return <p>No players found...</p>;
  }

  return (
    <div className="slider-container">
      <div className="slider-content" ref={scrollRef}>
        {players.slice(0, 3).map(function(player) {
          return (
              <Player 
                key={player.id}
                id={player.id}
                name={player.name}
                position={player.position}
                team={player.team}
                imageUrl={player.image}
              />
          );
        })}
      </div>

      <Link className='view-all-players-btn' to={"/players"}> <EastIcon /> VIEW ALL PLAYERS</Link>
      
    </div>
  );
}

export default HorizontalSlider;