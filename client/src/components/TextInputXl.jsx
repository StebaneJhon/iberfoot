function TextInputXl(props) {
    const {name, label, rows, value, onChange} = props
    return (
        <div className="text-input-container  text-input-xl-container">
            <label className="text-input-label text-input-xl-label" htmlFor={name}>{label}</label>
            <textarea
                className="text-input-xl-field"
                required 
                rows={rows ? rows : 10}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default TextInputXl;