import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInputCentered from "../components/TextInputCentered"

function LogIn() {

    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.token); // Store the JWT
            navigate('/admin'); 
        } else {
            alert("Access Denied");
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            };
        });
    };

    return (
        <div className="log-in-container">
            <form className="log-in-form" onSubmit={handleLogin} method="POST">

                <TextInputCentered 
                    name="username"
                    label="Admin name"
                    type="text"
                    onChange={handleChange}
                />

                <TextInputCentered 
                    name="password"
                    label="Admin key"
                    type="password"
                    onChange={handleChange}
                />

                <button className="log-in-btn" type="submit">Log in</button>
            
            </form>
        </div>
    )
};

export default LogIn;