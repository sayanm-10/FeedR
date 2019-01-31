import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUser} from "../actions";

import Header from "./Header";
import Landing from "./Landing";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                    </div>
                </BrowserRouter>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(
    mapStateToProps,
    {fetchUser}
)(App);