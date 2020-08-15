import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { signIn, authenticate } from '../auth';
import { isAuthenticated } from '../auth';

class Signin extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToRefer: false,
            loading: false
        }
    }

    isValid = () => {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            this.setState({
                error: "This is not a valid email"
            });
            return false;
        }

        if(this.state.email.length == 0) {
            this.setState({
                error: "Email is required!"
            });
            return false;
        }

        if(this.state.password.length == 0 ) {
            this.setState({
                error: "Please enter the password!"
            });
            return false;
        }
        return true;
    };

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value,
            error: ""
        });
    };

    clickSubmit = e => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({
                loading: true
            });
            const { email, password } = this.state;
            const user = {
                email,
                password
            };
            
            signIn(user).then(data => {
                if(data.error) this.setState({error: data.error, loading: false})
                else {
                    authenticate(data, () => {
                        this.setState({
                            redirectToRefer: true
                        })
                    })
                }
            });
        }
    };

    

    render() {
        if(this.state.redirectToRefer || isAuthenticated()) {
            return <Redirect to="/" />
        }
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1>SignIn</h1>
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
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="email" className="text-muted">Email</label>
                                <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-muted">Password</label>
                                <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password} />
                            </div>
                            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Login</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;
