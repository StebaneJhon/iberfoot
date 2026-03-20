import logo from "../assets/iberfoot_logo.svg"

function NavBar(props) {
return (
        <div className="nav_bar">
            <div className="container-nav-bar-logo">
                <img className="nav-bar-logo" src={logo} alt="iberfoot-logo" />
            </div>
            <div className="container-btn-nav-bar">
                <a className="btn-nav-bar" href="/">About us</a>
                <a className="btn-nav-bar" href="/">Our services</a>
                <a className="btn-nav-bar" href="/">Our players</a>

            </div>
        </div>
    )
};

export default NavBar;