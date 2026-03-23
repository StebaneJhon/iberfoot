import {services1, services2} from "../services"
import Service from "./Service"

function Services() {
    return (
        <div className="services-section-container">
            <div className='sub-heading-container'>
                <h2 className='section-header'>OUR SERVICES</h2>
            </div>
            <div className="services-content-container">
                <div className="service-content-section">
                    {services1.map((service) => (<Service icon={service.icon} title={service.title} content={service.content} />))}
                </div>
                <div className="service-content-section">
                    {services2.map((service) => (<Service icon={service.icon} title={service.title} content={service.content} />))}
                </div>
            </div>            
        </div>
    )
}

export default Services;