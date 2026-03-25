import { useEffect } from "react";
import { useState } from "react";
import Hero from "../components/Hero";
import Players from "../components/Players";
import Services from "../components/Services";
import WriteToUs from "../components/WriteToUs";
import Footer from "../components/Footer";

const API_URL = '/api/players'

function Home() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setPlayers(data))
    }, []);

    return <div>
        <Hero />
        <Players players={players} />
        <div className="our-services-section">
            <Services />
        </div>
        <div className="write-to-us-section">
            <WriteToUs />
        </div>
        <div className="footer-section">
            <Footer />
        </div>
        
    </div>
}

export default Home;