import TextInput from "./TextInput";
import TextInputXl from "./TextInputXl";

function WriteToUs() {
    return (
        <div className="write-to-us-container">
            <div className='sub-heading-container'>
                <h2 className='section-header'>WRITE TO US</h2>
            </div>
            <form className="write-to-us-info">
                    <TextInput 
                        name="fullName"
                        label="Full name"
                    />
                    <TextInput 
                        name="title"
                        label="Title"
                    />
                    <TextInput 
                        name="tel"
                        label="Telephone"
                    />
                    <TextInput 
                        name="email"
                        label="E-mail"
                    />
                    <TextInputXl 
                        rows="10"
                        name="message"
                        label="Message"
                    />
                    <button className="btn-nav-bar write-to-us-info-submint-btn" type="submit">Send</button>
            </form>
        </div>
    )
} 

export default WriteToUs;