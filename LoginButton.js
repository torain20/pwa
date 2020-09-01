import React, { Component } from 'react';

class LogInButton extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.logInMenuToggle}>Log In</button>
            </div>
        )
    }
}

export default LogInButton; 