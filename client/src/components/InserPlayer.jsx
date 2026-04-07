import { useState, useEffect } from "react";
import TextInput from "./TextInput";
import "../../public/insert-player.css"
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

function InsertPlayer(props) {

    const {onNewPlayer, onEdited, closeModal, playerToEdit, onClose} = props

    const [player, setPlayer] = useState({
        name: "",
        position: "",
        age: "",
        team: "",
        transfermarkt: "",
    })

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const [temporaryDynamicPhotoFile, setTemporaryDynamicPhotoFile] = useState(null);
    const [dynamicPhotoFiles, setDynamicPhotoFiles] = useState([]);
    const [dynamicPhotoPreviews, setDynamicPhotoPreviews] = useState([]);
    const [existingDetails, setExistingDetails] = useState([]);

    const isEditMode = Boolean(playerToEdit);

    useEffect(function() {
        if (isEditMode) {
            console.log(playerToEdit)
            setPlayer({
                name: playerToEdit.name || "", 
                position: playerToEdit.position || "",
                age: playerToEdit.age || "",
                team: playerToEdit.team || "",
                transfermarkt: playerToEdit.transfermarkt || "",
            });
            setPreview(playerToEdit.image || null);
            setExistingDetails(playerToEdit.dynamic_photos || [])
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

    useEffect(function() {
        if (!temporaryDynamicPhotoFile) {
            return;
        }
        setDynamicPhotoFiles(prev => {
            return [...prev, temporaryDynamicPhotoFile]
        });
        const objectUrl = URL.createObjectURL(temporaryDynamicPhotoFile);
        setDynamicPhotoPreviews(prev => {
            return [...prev, objectUrl]
        });
        return () => URL.revokeObjectURL(objectUrl);
    }, [temporaryDynamicPhotoFile]);

    function handleChange(event) {
        const {name, value} = event.target;
        setPlayer(prevPlayer => {
            return {
                ...prevPlayer,
                [name]: value
            };
        });
    }

    function removeExistingDetail(idToRemove) {
        setExistingDetails(existingDetails.filter(p => p.id !== idToRemove));
    };

    function removeNewDetails(index) {
        setDynamicPhotoFiles((prev) => (
            prev.filter((_, i) => i !== index)
        ));
        setDynamicPhotoPreviews((prev) => (
            prev.filter((_, i) => i !== index)
        ));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!player.name) return alert ("Name is required!");

        const formatData = new FormData();
        formatData.append("name", player.name);
        formatData.append("position", player.position);
        formatData.append("age", player.age);
        formatData.append("team", player.team);
        formatData.append("transfermarkt", player.transfermarkt);
        if (file) {
            formatData.append("image", file);
        } else if (isEditMode && playerToEdit.image) {
            formatData.append("image", playerToEdit.image);
        }

        
        const keepIds = existingDetails.map(p => p.id)

        formatData.append('keepIds', JSON.stringify(keepIds));

        dynamicPhotoFiles.forEach((file) => {
            formatData.append("details", file);
        });
            
            
        const url = isEditMode ? `/api/players/${playerToEdit.id}` : '/api/players';
        const method = isEditMode ? 'PUT' : 'POST';

        try {

            const token = localStorage.getItem('token');

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}` 
                },
                body: formatData
            });

            if (response.status === 401) {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem('token'); 
                window.location.href = "/login";   
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server rejected request:", errorText);
                return;
            } else {
                const data = await response.json();
                const newPlayer = data;
                setPlayer({
                    name: "",
                    position: "",
                    age: "",
                    team: "",
                    transfermarkt: "",
                });
                setFile(null);
                setDynamicPhotoFiles([])
                setDynamicPhotoPreviews([])
                setTemporaryDynamicPhotoFile(null)
                setExistingDetails([])
                setFileInputKey(Date.now());
                if (isEditMode) {
                    console.log(newPlayer)
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

            <div>
                <TextInput 
                        className="input-admin"
                        name="transfermarkt"
                        value={player.transfermarkt}
                        onChange={handleChange}
                        type="text"
                        label="Link to transfermarkt profile"
                    />  
            </div>

            <div className="dynamic-player-photos-container">
                    {existingDetails.map((existingDetail) => {
                        return (
                            <div key={existingDetail.id} className="dynamic-player-photo-container" onClick={() => removeExistingDetail(existingDetail.id)}>
                                <img src={existingDetail.url} alt="Player dynamic photo" className="image" />
                                <div className="delete-overlay"><DeleteSharpIcon/></div>
                            </div>
                        )
                    })}
                    {dynamicPhotoPreviews.map((url, index) => {
                        return (
                            <div key={index} className="dynamic-player-photo-container" onClick={() => removeNewDetails(index)}>
                                <img src={url} alt="Player dynamic photo" className="image" />
                                <div className="delete-overlay"><DeleteSharpIcon/></div>
                            </div>
                        )
                    })}
            </div>
            <div className="btns">
                <div className="submit-btn add-dynamic-player-photo-container">
                    <label htmlFor="dynamic-player-photo"> + Add a dynamic photo </label>
                    <input 
                        id="dynamic-player-photo"
                        type="file" 
                        accept="image/*" 
                        onChange={(event) => setTemporaryDynamicPhotoFile(event.target.files[0])} 
                        style={{ display: 'none' }}
                    />
                </div>
                <button className="submit-btn" type="submit" > { isEditMode ? "Save Changes" : "Submit" } </button>
            </div>
            

        </form>
    </div>
};

export default InsertPlayer;