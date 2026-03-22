function FooterDetailSection(props) {
    const {title, contents} = props
    return (
        <div className="footer-detail-section-container">
            <h3 className="footer-detail-title">{title}</h3>
            {contents.map((content) => (<p>{content}</p>))}
        </div>
    )
}

export default FooterDetailSection;