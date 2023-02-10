import { useState } from "react";
import { getUsers } from "../utils/api";
import { findUsername } from "../utils/findUsername";

export const UserLogin = ({ user, setUser }) => {
    const [usernameValue, setUsernameValue] = useState("");
    const [invalidUsername, setInvalidUsername] = useState(false);

    const handleChange = (event) => {
        setUsernameValue(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (usernameValue.length !== 0) {
            getUsers().then((usersFromApi) => {
                if (findUsername(usersFromApi, 'username', usernameValue)) {
                    setUser(usernameValue)
                    setInvalidUsername(false)
                } else {
                    setInvalidUsername(true)
                }
            })
        } else {
            setInvalidUsername(true)
        }
    }

    return (
        <section id="loginBody">
            <div id="loginBox">
            <h2>Login</h2>
            <p id="loginTagline">The lastest in developer news</p>
            <form>
                <label htmlFor="usernameInput"></label>
                <input id="usernameTextBox" onChange={handleChange} type="text" value={usernameValue} placeholder="cooljmessy"></input><br />
                <button id="usernameSubmit" onClick={handleSubmit} type="submit">Log In</button>
                {invalidUsername ? <p id="usernameError">Please enter valid username</p> : null}
                {user ? <p id="welcomeMessage">Welcome {user}</p> : null}
            </form>
            </div>
        </section>
    )
}