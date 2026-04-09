import React from 'react';
import heroImage from '../assets/hero-bg.png'; 
import NavBar from './NavBar';
import EastIcon from '@mui/icons-material/East';

function Hero(props) {
  return (
    <div className="hero-container">
      <img src={heroImage} alt="Football tunnel" className="hero-bg-image" />

      <div className="hero-overlays-wrapper">
        <div className="radial-light"></div>
        <div className="dark-shadow-overlay"></div>
      </div>
      
      <NavBar 
        toOurServices={props.toOurServices}
        toOurPlayers={props.toOurPlayers}
      />
      <div className='hero-texts-container'>
        <div className="hero-content">
            <h1>WE ELEVATE CAREERS</h1>
            <p>IBERFOOT is a newly built football agency with a devoted aim to provide an individually centred career management of our clients  enabling them to reach their full potential and fulfil their professional dreams in the world of football.</p>
            <p>Our personalised approach and honest guidance will help our clients to endure and succeed in their football careers.</p>
            <p>Iberfoot is committed to promote long lasting relationships with our represented players and football managers, and to provide them with a day to day support, to obtain the opportunities they need to pursue their football careers.</p>
            <p>Iberfoot stands for honesty and trust as a football agency in the  intermediation and representation of clubs,member associations, players and managers with a worldwide extensive network of connections within the world of elite professional football.</p>
            <p>Iberfoot as a newly started agency have  both a professional and a youth amateur level client base that work with us on a tight regular basis from all different club locations and countries.</p>
            <div className='hero-btn-container'>
                <button className="view-all-players-btn" onClick={props.toWriteToUs}><EastIcon /> WRITE TO US</button>
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default Hero;