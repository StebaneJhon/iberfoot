import { useState, useEffect } from "react";
import TextInput from "./TextInput";
import "../../public/insert-player.css"

function InsertPlayer(props) {

    const {onNewPlayer, onEdited, closeModal, playerToEdit, onClose} = props

    const [player, setPlayer] = useState({
        name: "",
        position: "",
        age: "",
        team: "",
    })

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const isEditMode = Boolean(playerToEdit);

    useEffect(function() {
        if (isEditMode) {
            console.log(playerToEdit)
            setPlayer({
                name: playerToEdit.name || "", 
                position: playerToEdit.position || "",
                age: playerToEdit.age || "",
                team: playerToEdit.team || "",
            });
            setPreview(playerToEdit.image || null);
        }
    }, [playerToEdit, isEditMode]);

    useEffect(function() {
        if (!file) {
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

    async function handleSubmit(event) {
        event.preventDefault();

        if (!player.name) return alert ("Name is required!");

        const formatData = new FormData();
        formatData.append("name", player.name);
        formatData.append("position", player.position);
        formatData.append("age", player.age);
        formatData.append("team", player.team);
        if (file) {
            formatData.append("image", file);
        } else if (isEditMode && playerToEdit.image) {
            formatData.append("image", playerToEdit.image);
        }
            
            
            
        
        const url = isEditMode ? `/api/players/${playerToEdit.id}` : '/api/players';
        const method = isEditMode ? 'PUT' : 'POST';

        try {

            const response = await fetch(url, {
                method: method,
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
                setFileInputKey(Date.now());
                const data = await response.json();
                const newPlayer = data;
                // To be updated
                if (isEditMode) {
                    onEdited(newPlayer);
                } else {
                    onNewPlayer(newPlayer);
                }

                closeModal();
            }

        } catch (error) {
             console.log("Network or parsing error:", error);
        }

    }

    return <div>
        <div className="insert-player-header">
            <h2>{ isEditMode ? "EDIT PLAYER" : "ADD PLAYER" }</h2>
            <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form className="insert-player-form" onSubmit={handleSubmit} >

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
                        key={fileInputKey}
                        id="file-input" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])} 
                        style={{ display: 'none' }} // Hide the actual input
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
            
            <button className="submit-btn" type="submit" > { isEditMode ? "Save Changes" : "Submit" } </button>
        </form>
    </div>
};

export default InsertPlayer;