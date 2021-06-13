import React from 'react';
import {withRouter} from "react-router";
import {addCoupon} from "../../../PathResolver";

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            customerId: null,
            discountVal: null,
            customers: [],
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addCoupon = (e) => {
        e.preventDefault();
        addCoupon(this.state).then(x => {
                window.location.href = "/coupons/" + x.data?.message;
            }
        ).catch(error => console.log(error?.response?.data?.message));
    }

    setupData = (buttonText) => {
        this.setState({
            customerId: this.props.match.params.id,
            content: <form style={{textAlign: "left"}} onSubmit={this.addCoupon}>
                <h3>Category {buttonText} form</h3>
                <p>Number: <input
                    type='text'
                    defaultValue={this.state.code}
                    onChange={(e) => this.myChangeHandler(e, "number")}
                /></p>
                <p>discount value: <input
                    type='text'
                    defaultValue={this.state.description}
                    onChange={(e) => this.myChangeHandler(e, "discountVal")}
                /></p>
                <input type="submit" value={buttonText}/>
            </form>
        })
    }

    componentDidMount() {
        this.setupData("Add");
    }

    render() {
        return this.state.content;
    }
}

export default withRouter(AddCategory)