import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from '../auth';
import DefaultUserImg from "../images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import { read } from "./apiUser";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {following: [], followers: []},
            redirectToSignin: false,
            following: false,
            error: ""
        }
    }

    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        })
        return match
    }

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id).then(data => {
            if(data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.setState({
                    user: data,
                    following: !this.state.following
                })
            }
        })
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.error) {
                console.log("ERROR:" + data.error);
                this.setState({
                    redirectToSignin: true
                })
            } else {
                let following = this.checkFollow(data);
                this.setState({
                    user: data,
                    following
                })
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }


    render() {
        if (this.state.redirectToSignin) {
            return <Redirect to="/signin" />
        };

        const photoUrl = this.state.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id }?${new Date().getTime()}` : DefaultUserImg;

        return (
            <div className="jumbotron">
                <div className="container">
                    <h1>Profile</h1>
                    <div className="row mt-5"> 
                        <div className="col-md-6">
                            <img src={photoUrl} onError={image => (image.target.src = `${DefaultUserImg}`)} style={{height: "250px", width: "auto"}} className="img-thumbnail" alt={this.state.user.name} />
                        </div>
                        <div className="col-md-6">
                            <div className="lead">
                                <p>{this.state.user.name}</p>
                                <p>{this.state.user.email}</p>
                                <p>{this.state.user.about}</p>
                                <p>{`Joined: ${new Date(this.state.user.created).toDateString()}`}</p>
                            </div>                       
                            {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id ? (
                                <div className="d-inline-block">
                                    <Link className="btn btn-raised btn-success mr-2" to={`/user/edit/${this.state.user._id}`}>Edit</Link>
                                    <DeleteUser userId={this.state.user._id} />
                                </div>
                            ) : (
                                <FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton} />
                            )}
                        </div>
                    </div>
                    <div className="row mt-5"> 
                        <div className="col-md-12">
                            <div className="lead mt-4 mb-4">
                                <p>{this.state.user.about}</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
