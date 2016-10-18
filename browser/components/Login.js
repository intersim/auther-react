import React from 'react';
import { connect } from'react-redux';
import { browserHistory } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onFormInput = this.onFormInput.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form 
              onChange={this.onFormInput} 
              onSubmit={this.onLoginSubmit}
            >
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email" 
                    type="email" 
                    className="form-control"
                    required 
                    ref={emailEl => this.email = emailEl}
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input 
                      name="password"
                      type="password" 
                      className="form-control"
                      required 
                      ref={passwordEl => this.password = passwordEl}
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">{message}</button>
            </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    const { message } = this.props;
    // console.log(`${message} isn't implemented yet`);

    const authInfo = {email: this.state.email, password: this.state.password};
    this.props.loginUser(authInfo);
  }

  onFormInput(event) {
    this.setState({
      email: this.email.value,
      password: this.password.value
    })
  }
}

/* -----------------    CONTAINER     ------------------ */

import { loginUserAsync } from '../redux/auth';

const mapState = ({currentUser}) => ({ message: 'Log in', currentUser });

const mapDispatch = dispatch => {
  return {
    loginUser: (authInfo) => {
      dispatch(loginUserAsync(authInfo));
    }
  }
}

export default connect(mapState, mapDispatch)(Login);
