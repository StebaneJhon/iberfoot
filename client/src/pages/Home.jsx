import { useEffect } from "react";
import { useState } from "react";
import Hero from "../components/Hero";
import Players from "../components/Players";
import Services from "../components/Services";

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
        <Players players={players} />
        <Services />
    </div>
}

export default Home;