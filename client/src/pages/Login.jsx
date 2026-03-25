import TextInputCentered from "../components/TextInputCentered"

function LogIn() {
    return (
        <div className="log-in-container">
            <form className="log-in-form">
                <TextInputCentered 
                    name="password"
                    label="Enter your admin password"
                    type="password"
                    value=""
                    onChange=""
                />
                <button className="log-in-btn" type="submit">Log in</button>
            </form>
        </div>
    )
};

export default LogIn;