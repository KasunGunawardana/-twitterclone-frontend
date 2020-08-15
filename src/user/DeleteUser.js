import React, { Component } from 'react';
import { isAuthenticated, signOut } from '../auth';
import { Redirect } from "react-router-dom";
import { deleteUser } from "./apiUser";

class DeleteUser extends Component {

    state = {
        redirect: false
    }

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        deleteUser(userId, token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                signOut(() => console.log("User has been deleted") );
                this.setState({
                    redirect: true
                })
            }
        })
    }

    deleteUserProfile = () => {
        let confirmPrompt = window.confirm("Are you sure you want to delete this profile?");
        if(confirmPrompt) {
            this.deleteAccount()
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <button onClick={this.deleteUserProfile} className="btn btn-raised btn-danger" >Delete</button>
        )
    }
}

export default DeleteUser
