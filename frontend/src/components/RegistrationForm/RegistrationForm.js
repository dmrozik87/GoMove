import {useState} from "react";
import './RegistrationForm.css'

function RegistrationForm({setDisplayLoginForm, setDisplayRegistrationForm}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        //sprawdzenie czy hasła są zgodne
    };
    const handleOpenLoginForm = () => {
        setDisplayRegistrationForm(false);
        setDisplayLoginForm(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //sprawdzenie, czy nie ma użytkownika o takim loginie i nazwie użytkownika
        // validacja hasła
        // zapisanie użytkownika do bazy danych
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <div className="username-field">
                <label className="username-label">Username</label>
                <input
                    className="username-input"
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                ></input>
            </div>
            <div className="e-mail-field">
                <label className="e-mail-label">E-mail</label>
                <input
                    className="e-mail-input"
                    type="text"
                    id="e-mail"
                    value={email}
                    onChange={handleEmailChange}
                ></input>
            </div>
            <div className="password-field">
                <label className="password-label">Password</label>
                <input
                    className="password-input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                ></input>
            </div>
            <div className="confirm-password-field">
                <label className="confirm-password-label">Confirm password</label>
                <input
                    className="confirm-password-input"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                ></input>
            </div>
            <button className="register-submit-btn" type="submit">Register</button>
            <p>Already have an account?<br></br>
                <a className="register-link"
                   onClick={() => handleOpenLoginForm()}>Login</a> instead!</p>
        </form>
    );
}

export default RegistrationForm;