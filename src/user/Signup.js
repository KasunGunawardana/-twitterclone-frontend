import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { signUp } from '../auth';

class Signup extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            eroor: "",
            open: false
        };
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value,
            error: "",
            open: false
        });
    };

    clickSubmit = e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        
        signUp(user).then(data => {
            if(data.error) this.setState({error: data.error})
            else this.setState({
                name: "",
                email: "",
                password: "",
                error: "",
                open: true
            })
        });
    };

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1>SignUp</h1>
                    <div className="row mt-5">                        
                        <div className="col-12">
                        <div className="alert alert-primary" style={{ display: this.state.error ? "block" : "none"}}>
                            {this.state.error}
                        </div>
                        <div className="alert alert-info" style={{ display: this.state.open ? "block" : "none"}}>
                            Registration successfull! Please <Link to="/signin">signin!</Link>
                        </div>
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="name" className="text-muted">Name</label>
                                <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="text-muted">Email</label>
                                <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-muted">Password</label>
                                <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password} />
                            </div>
                            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
