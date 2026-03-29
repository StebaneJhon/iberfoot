function TextInput(props) {
    const {name, label, type, value, onChange, className, required} = props
    return (
        <div className="text-input-container">
            <label className="text-input-label" htmlFor={name}>{label}</label>
            <input 
                className={className}
                type={type || "text"}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required || false}
            />
        </div>
    )
}

export default TextInput;