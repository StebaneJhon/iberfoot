import { useState, useEffect } from "react";
import TextInput from "./TextInput";

function InsertPlayer(props) {

    const [player, setPlayer] = useState({
        name: "",
        position: "",
        age: "",
        team: "",
    })

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(function() {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

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
            } else {
                setPlayer({
                    name: "",
                    position: "",
                    age: "",
                    team: "",
                });
                setFile(null);
                const data = await response.json();
                const newPlayer = data[0];
                props.onNewPlayer(newPlayer)
                console.log("Response: ", response.body)
            }
        } catch (error) {
            console.log("Network or parsing error:", error);
        }

    }

    return <div>
        <form className="insert-player-form" onSubmit={addPlayer} >

            <h2>ADD PLAYER</h2>

            <div className="form-layout-row">
                <div className="player-img-upload-box">
                    <label htmlFor="file-input" className="image-label">
                        {preview ? (
                                <img src={preview} alt="Preview" className="image" />
                            ) : (
                                <div className="add-img-placeholder">
                                    <span className="plus-icon">+</span>
                                    <p>Add Image</p>
                                </div>
                            )}
                    </label>
                    <input 
                        id="file-input" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])} 
                        style={{ display: 'none' }} // Hide the actual input
                        value={file ? undefined : ""}
                    />
                </div>
                <div className="inputs-column">
                    <TextInput 
                        className="input-admin"
                        name="name"
                        value={player.name}
                        onChange={handleChange}
                        type="text"
                        label="Name"
                    />
                    <TextInput 
                        className="input-admin"
                        name="position"
                        value={player.position}
                        onChange={handleChange}
                        type="text"
                        label="Position"
                    />
                    <TextInput 
                        className="input-admin"
                        name="age"
                        value={player.age}
                        onChange={handleChange}
                        type="text"
                        label="Age"
                    />
                    <TextInput 
                        className="input-admin"
                        name="team"
                        value={player.team}
                        onChange={handleChange}
                        type="text"
                        label="Team"
                    />  
                </div>
            </div>
            
            <button className="submit-btn" type="submit" > Submit </button>
        </form>
    </div>
};

export default InsertPlayer;