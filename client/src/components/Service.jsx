function Service(props) {
    const {icon, title, content} = props
    return (
        <div className="service-container">
            <div className="service-icon-container">
                <img src={icon} alt=""/>
            </div>
            <h3 className="service-title">{title}</h3>
            <p className="service-content">{content}</p>
        </div>
    )
}

export default Service;