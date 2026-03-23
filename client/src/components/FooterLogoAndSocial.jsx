import logo from "../assets/iberfoot_logo.svg"


function FooterLogoAndSoctial() {
    return (
        <div className="footer-section-logo-and-socials-container">
            <div className="container-nav-bar-logo">
                <img className="nav-bar-logo" src={logo} alt="iberfoot-logo" />
            </div>
            <div className="socials-container">
                <div className="social-btn">
                    <i class="fa-brands fa-linkedin"></i>
                </div>
                <div className="social-btn">
                    <i class="fa-brands fa-square-facebook"></i>
                </div>
                <div className="social-btn">
                    <i class="fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}

export default FooterLogoAndSoctial;