import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from "react-router-dom";
import DefaultUserImg from "../images/avatar.jpg";
import { read, updateUser, updatedUser } from "./apiUser";

class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            about: "",
            password: "",
            error: "",
            redirectToProfile: false,
            loading: false,
            imageSize: 0
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.error) {
                console.log("ERROR:" + data.error)
                this.state({
                    redirectToProfile: true
                })
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: "",
                    about: data.about
                })
            }
        })
    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        const imageSize = name === 'photo' ? e.target.files[0].size : 0;
        this.userData.set(name, value)
        this.setState({
            [name]: value,
            imageSize,
            error: ""
        });
    };

    isValid = () => {
        if(this.state.name.length === 0) {
            this.setState({
                error: "Name is required!"
            });
            return false;
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            this.setState({
                error: "A valid email is required!"
            });
            return false;
        }

        if(this.state.password.length >= 1 && this.state.password.length <= 6 ) {
            this.setState({
                error: "Password must be at least 6 characters long!"
            });
            return false;
        }
        if(this.state.imageSize > 300000) {
            this.setState({
                error: "Image size is too big! Size should be less than 3MB."
            });
            return false;
        }
        return true;
    };

    clickSubmit = e => {
        e.preventDefault();
        if(this.isValid()) {
            this.setState({
                loading: true
            })
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;        
            updateUser(userId, token, this.userData).then(data => {
                if(data.error) this.setState({error: data.error})
                else
                updatedUser(data, () => {
                    this.setState({
                        redirectToProfile: true
                    })
                });
            });
        }
    };

    render() {

        if (this.state.redirectToProfile) {
            return <Redirect to={`/user/${this.state.id}`} />
        }

        const photoUrl = this.state.id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.id}?${new Date().getTime()}` : DefaultUserImg;

        return (
            <div className="jumbotron">
                <div className="container">
                    <h1>Edit Profile</h1>
                    <div className="row mt-5"> 
                        <div className="col-12">
                            <div className="alert alert-primary" style={{ display: this.state.error ? "block" : "none"}}>
                                {this.state.error}
                            </div>
                            {
                                this.state.loading ? (
                                <div className="jumbotron text-center">
                                    <h2>Loading...</h2>
                                </div>
                                ) : ( "" )
                            }
                            <img src={photoUrl} style={{height: "250px", width: "auto"}} onError={image => (image.target.src = `${DefaultUserImg}`)} className="img-thumbnail" alt={this.state.name} />
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="name" className="text-muted">Profile Picture</label>
                                    <input onChange={this.handleChange("photo")} type="file" className="form-control" accept="image/*" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="text-muted">Name</label>
                                    <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-muted">Email</label>
                                    <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="text-muted">About</label>
                                    <textarea onChange={this.handleChange("about")} type="text" className="form-control" value={this.state.about} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-muted">Password  <span style={{fontSize: "12px"}}>(* If you don't need to updated the password, Leave it as blank. So that your password remains unchanged!)</span></label>
                                    <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password} />
                                </div>
                                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfile
