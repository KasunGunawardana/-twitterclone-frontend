import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if( history.location.pathname === path ) {
        return { borderColor: "#e9ecef" }
    } else {
        return { borderColor: "transparent" }
    }
};

const Menu = ({history}) => (
    <div className="bg-primary">
        <div className="container">
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
                </li>
                { !isAuthenticated() &&  (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>SignIn</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>SignUp</Link>
                        </li>
                    </>
                )}
                { isAuthenticated() &&  (
                    <>
                        <li className="nav-item">
                            <a className="nav-link" style={isActive(history, "/signout"), {cursor: "pointer", color: "#fff"}} onClick={() => signOut(() => history.push('/'))}>SignOut</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`), {cursor: "pointer", color: "#fff"}}>{ `${isAuthenticated().user.name}'s profile` }</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users" style={isActive(history, "/users"), {cursor: "pointer", color: "#fff"}}>Users</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </div>
);

export default withRouter(Menu);

