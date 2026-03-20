import { useEffect } from "react";
import { useState } from "react";
import Player from "../components/Player";
import HorizontalSlider from "../components/HorizontalSlider";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

const API_URL = '/api/players'

function Home() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setPlayers(data))
    }, []);

    console.log(players);

    return <div>
        <Hero />
        <HorizontalSlider players={players} />
    </div>
}

export default Home;