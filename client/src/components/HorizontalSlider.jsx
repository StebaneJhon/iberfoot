import React, { useRef } from 'react';
import Player from './Player'; 
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';


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
      
      {/* <div className='nav-btn-container'>
        <button className="nav-btn left" onClick={function() { scroll('left') }}> <WestIcon /> </button>
        <button className="nav-btn right" onClick={function() { scroll('right') }}> <EastIcon /> </button>
      </div> */}

      <button className='view-all-players-btn'> <EastIcon /> VIEW ALL PLAYERS</button>
      
    </div>
  );
}

export default HorizontalSlider;