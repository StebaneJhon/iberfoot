function TextInputCentered(props) {
    const {name, label, type, value, onChange} = props
    return (
        <div className="text-input-centered-container">
            <label className="text-input-centered-label" htmlFor={name}>{label}</label>
            <input 
                className="text-input-field"
                type={type ? type : "text"} 
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default TextInputCentered;