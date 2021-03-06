import React from 'react';
import {getCustomer, updateCustomer} from "../../PathResolver";
import {withRouter} from "react-router";

class ModifyCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            login: '',
            birthDate: '',
            password: '',
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    modify = (e) => {
        e.preventDefault();
        updateCustomer(this.props.match.params.id, this.state).then(x =>
            window.location.href = "/customers/" + this.props.match.params.id
        ).catch(error => console.log(error.response?.data.message));
    }

    setupData = (buttonText) => {
        this.setState({
            content: <form style={{textAlign: "left"}} onSubmit={this.modify}>
                <h3>Offer {buttonText} form</h3>
                <p>Name: <input
                    type='text'
                    defaultValue={this.state.name}
                    onChange={(e) => this.myChangeHandler(e, "name")}
                /></p>
                <p>Surname: <input
                    type='text'
                    defaultValue={this.state.surname}
                    onChange={(e) => this.myChangeHandler(e, "surname")}
                /></p>
                <p>Login: <input
                    type='text'
                    defaultValue={this.state.login}
                    onChange={(e) => this.myChangeHandler(e, "login")}
                /></p>
                <p>Password: <input
                    type='password'
                    defaultValue={this.state.password}
                    onChange={(e) => this.myChangeHandler(e, "password")}
                /></p>
                <p>Date of birth: <input
                    type='date'
                    defaultValue={new Date(this.state.birthDate)}
                    onChange={(e) => this.myChangeHandler(e, "birthDate")}
                /></p>
                <input type="submit" value={buttonText}/>
            </form>
        })
    }

    componentDidMount() {
        getCustomer(this.props.match.params.id).then(obj => {
            this.setState({...obj.data});
            this.setupData("Modify");
        }).catch(error => {
            console.log(error?.response?.data?.message);
        });
    }

    render() {
        return this.state.content;
    }
}

export default withRouter(ModifyCustomer)