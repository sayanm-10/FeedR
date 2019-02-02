import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUser} from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import NewSurvey from "./forms/NewSurvey";

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
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/surveys/new" component={NewSurvey} />
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