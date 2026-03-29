import TextInput from "./TextInput";
import TextInputXl from "./TextInputXl";
import {useState} from "react"

function WriteToUs() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telephone: "",
        title: "",
        message: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev =>  {
            return { ...prev, [name]: value };
        });
    }

    const [status, setStatus] = useState("");

    async function handleSubmit (event) {
        event.preventDefault();
        setStatus("Sending...");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    telephone: "",
                    title: "",
                    message: ""
                });
            } else {
                setStatus("Failed to send. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setStatus("Network error. Please check your connection.");
        }

    }

    return (
        <div className="write-to-us-container">
            <div className='sub-heading-container'>
                <h2 className='section-header'>WRITE TO US</h2>
            </div>
            <form className="write-to-us-info" onSubmit={handleSubmit}>
                    <TextInput 
                        className="text-input-field"
                        type="text"
                        name="name"
                        label="Full name"
                        value={formData.name}
                        onChange={handleChange}
                        required={true}
                    />
                    <TextInput 
                        className="text-input-field"
                        type="text"
                        name="title"
                        label="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextInput 
                        className="text-input-field"
                        type="text"
                        name="telephone"
                        label="Telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                    />
                    <TextInput 
                        className="text-input-field"
                        type="email"
                        name="email"
                        label="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required={true}
                    />
                    <TextInputXl 
                        className="text-input-field"
                        rows="10"
                        name="message"
                        label="Message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button className="btn-nav-bar write-to-us-info-submint-btn" type="submit">Send</button>

                    {status && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>}
            </form>
        </div>
    )
} 

export default WriteToUs;