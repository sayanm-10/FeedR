import React, {Component} from 'react';
import {connect} from "react-redux";

class Header extends Component {
    renderLogin() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (<li><a href="/auth/google">Login with Google</a></li>);
            default:
                return (<li><a href="/api/logout">Logout</a></li>);
        }
    };

    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-_wrapper">
                    <a className="left brand-logo">
                        Feedr
                    </a>
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