import {Component, React} from "react";
import {getCustomers} from "../../PathResolver";


class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isLoaded: false,
            error: null,
        };
    }

    componentDidMount() {
        getCustomers().then(x => {
            this.setState({
                customers: x.data,
                isLoaded: true,
            })
        }).catch(error => {
            console.log(error?.response?.data?.message);
            this.setState({error: error.response?.data?.message, isLoaded: true})
        });
    }

    getDataToDisplay() {
        return (this.state.error ?
            <p>{this.state.error}</p> :
            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.customers.map(x => <li>Customer: <a
                    href={"customers/" + x.id}>{x.name} {x.surname}</a>
                </li>)}
            </ul>)
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href="/">Home</a>
            {this.state.isLoaded ?
                this.getDataToDisplay()
                :
                <p>Loading data...</p>
            }
        </div>;
    }

}

export default Customers
