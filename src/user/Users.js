import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { list } from "./apiUser";
import DefaultUserImg from "../images/avatar.jpg";

class Users extends Component {
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    users: data
                })
            }
        })
    }

    renderUsers(users) {
        return users.map((user, i) => (
            <div className="card ml-2 mb-2" style={{width: "18rem"}} key={i}>
                <img src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id }?${new Date().getTime()}`} onError={image => (image.target.src = `${DefaultUserImg}`)} className="card-img-top" alt={user.name} />
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link className="btn btn-raised btn-primary btn-sm" to={`/user/${user._id}`}>View Profile</Link>
                </div>
            </div>
        ))
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1>Users</h1>
                    <div className="row mt-5">
                        {this.renderUsers(this.state.users)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Users