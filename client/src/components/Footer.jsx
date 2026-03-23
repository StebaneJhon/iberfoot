import FooterDetailSection from "./FooterDetailSection";
import FooterLogoAndSoctial from "./FooterLogoAndSocial";

function Footer(props) {
    const year = new Date().getFullYear();
    return (
        <div className="footer-section-container">
            <div className="footer-details">
                <div className="footer-logo-socials-section-container">
                    <FooterLogoAndSoctial/>
                </div>
                <FooterDetailSection 
                    title="CONTACT US"
                    contents={["+351 21 123 4567", "info@elitesports.pt"]}
                />
                <FooterDetailSection 
                    title="VISIT US"
                    contents={["Avenida da Liberdade, 245", "1250-143 Lisbon, Portugal"]}
                />
                <FooterDetailSection 
                    title="OPENING HOURS"
                    contents={["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 PM - 14:00 AM", "Sunday: Closed"]}
                />
            </div>
            <hr />
            <div className="cop">
                <p id="copyright">© {year} Iberfoot. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;