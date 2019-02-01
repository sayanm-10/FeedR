import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import Payment from "./Payment";

class Header extends Component {
    renderLogin() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (<li><a href="/auth/google">Login with Google</a></li>);
            default:
                return (<>
                        <li><Payment /></li>
                        <li style={{margin: "0 10px"}}>{this.props.auth.credits} Credits</li>
                        <li><a href="/api/logout">Logout</a></li>
                    </>
                );
        }
    };

    render() {
        return (
            <nav>
                <div className="nav-_wrapper">
                    <Link className="left brand-logo" to={this.props.auth ? "/surveys" : "/"}>
                        Feedr
                    </Link>
                    <ul className="right">
                        {this.renderLogin()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return { auth : state.auth };
};

export default connect(mapStateToProps)(Header);