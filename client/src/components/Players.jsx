import HorizontalSlider from "./HorizontalSlider";

function Players(props) {
    const players = props.players
    return (
        <div className="players-container">
            <div className='sub-heading-container'>
                <h2 className='section-header'>OUR PLAYERS</h2>
            </div>
            <HorizontalSlider players={players} />
        </div>
    )
}

export default Players;