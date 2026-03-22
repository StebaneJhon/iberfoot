function TextInput(props) {
    const {name, label} = props
    return (
        <div className="text-input-container">
            <label className="text-input-label" htmlFor={name}>{label}</label>
            <input 
                className="text-input-field"
                name={name}
                id={name}
            />
        </div>
    )
}

export default TextInput;