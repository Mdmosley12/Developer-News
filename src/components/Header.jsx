import { Link } from "react-router-dom"

export const Header = ({ user }) => {
    return (
        <header id="header">
            <div id="loginContainer">
                <Link to="/">
                    <p>Home</p>
                </Link>
                &nbsp;
                &nbsp;
                <Link to="/userLogin">
                    <p>Login</p>
                </Link>
                {user ? <p id="welcomeUsername">Welcome {user}</p> : null}
            </div>
            <h1 id="headerTitle">Developer News</h1>
        </header>
    )
}