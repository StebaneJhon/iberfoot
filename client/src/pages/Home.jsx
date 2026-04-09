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

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        console.log(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return <div>
        <Hero 
            toOurServices={() => scrollToSection("ourService")}
            toOurPlayers={() => scrollToSection("ourPlayers")}
            toWriteToUs={() => scrollToSection("writeToUs")}
        />
        <div id="ourPlayers">
            <Players players={players} />
        </div>
        <div className="our-services-section" id="ourService">
            <Services />
        </div>
        <div className="write-to-us-section" id="writeToUs">
            <WriteToUs />
        </div>
        <div className="footer-section">
            <Footer />
        </div>
        
    </div>
}

export default Home;