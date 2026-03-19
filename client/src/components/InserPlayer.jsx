import {useState} from "react";

function InsertPlayer() {

    const [player, setPlayer] = useState({
        name: "",
        position: "",
        age: "",
        team: "",
    })

    const [file, setFile] = useState(null);

    function handleChange(event) {
        const {name, value} = event.target;
        setPlayer(prevPlayer => {
            return {
                ...prevPlayer,
                [name]: value
            };
        });
    }

    const addPlayer = async (event) => {
        event.preventDefault();
        if (!player.name) return alert ("Name is required!");

        const formatData = new FormData();
        formatData.append("name", player.name);
        formatData.append("position", player.position);
        formatData.append("age", player.age);
        formatData.append("team", player.team);
        if (file) formatData.append("image", file);

        try {
            const response = await fetch('/api/players', {
                method: 'POST',
                body: formatData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server rejected request:", errorText);
                return;
            }
        } catch (error) {
            console.log("Network or parsing error:", error);
        }

    }

    return <div>
        <h2>Inser Player</h2>
        <form onSubmit={addPlayer} >
            <input 
                name="name"
                value={player.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input 
                name="position"
                value={player.position}
                onChange={handleChange}
                placeholder="Position"
            />
            <input 
                name="age"
                value={player.age}
                onChange={handleChange}
                placeholder="Age"
            />
            <input 
                name="team"
                value={player.team}
                onChange={handleChange}
                placeholder="Team"
            />
            <input type="file" onChange={(event) => setFile(event.target.files[0])}/>
            <button type="submit" > Submit </button>
        </form>
    </div>
};

export default InsertPlayer;