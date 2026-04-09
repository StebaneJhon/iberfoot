import logo from "../assets/iberfoot_logo.svg"

function NavBar(props) {
return (
        <div className="nav_bar">
            <div className="container-nav-bar-logo">
                <img className="nav-bar-logo" src={logo} alt="iberfoot-logo" />
            </div>
            <div className="container-btn-nav-bar">
                <button className="btn-nav-bar" onClick={props.toOurServices}>Our services</button>
                <button className="btn-nav-bar" onClick={props.toOurPlayers}>Our players</button>
            </div>
        </div>
    )
};

export default NavBar;