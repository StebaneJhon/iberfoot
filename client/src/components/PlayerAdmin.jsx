import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import "../../public/player-admin.css"

function PlayerAdmin(props) {
    const { player, onEdit, onDelete } = props
    const { name, position, team, image, id } = player

    function handleEdit() {
        onEdit(player)
    }

    function handleDelete() {
        onDelete(id)
    }
    // onClick={handleEdit}
    return (
        <div className="player-conatainer-admin" >
            <div className="image-container-admin">
                {image ? (
                    <img 
                    className="image"
                    src={image} 
                    alt={name} 
                />
                ) : (
                    <div>
                        No Image
                    </div>
                )}
            </div>
            <div className="player-details-admin-container">
                <p className="player-admin player-position" >{position}</p>
                <p className="player-admin player-name" >{name}</p>
                <p className="player-admin player-team" >{team}</p>
            </div>
            <button className="delete-player-btn" onClick={handleEdit}>
                <ModeEditSharpIcon />
            </button>
            <button className="delete-player-btn" onClick={handleDelete}>
                <DeleteSharpIcon />
            </button>
        </div>
    )
};

export default PlayerAdmin;