/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Recaptcha from 'react-recaptcha';

class App extends Component {
  constructor(props) {
    super(props);

    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.handleLoginForm = this.handleLoginForm.bind(this);
    this.disableLogin = this.disableLogin.bind(this);

    this.state = {
      isVerified: false,
      signoutTime: 1000 * 30,
    };
    this.loginAttempts = 0;
  }

  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }
  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  }
  disableLogin() {
    alert('Silahkan tunggu 30 detik');
    setTimeout(() => (this.loginAttempts = 0), 1000 * 30);
  }
  handleLoginForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    if (this.loginAttempts > 2) {
      this.disableLogin();
    } else if (email === 'admin@gmail.com' && password === 'Admin1234') {
      this.loginAttempts = 0;
      alert("Anda berhasil login")
    } else {
      this.loginAttempts = this.loginAttempts + 1;
      alert("email / password salah")
    }
  }

  componentDidMount() {
    this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeoutFunc = () => {
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  };

  setTimeout = () => {
    this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
  };

  resetTimeout = () => {
    this.clearTimeoutFunc();
    this.setTimeout();
  };

  logout = () => {
    alert('Terdeteksi tidak aktif');
  };


  render() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={this.handleLoginForm}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <Recaptcha
              sitekey="6LedmrQUAAAAAJsx12C3lyKJ5dH2oyWrfaabUgrW"
              onloadCallback={this.recaptchaLoaded}
              verifyCallback={this.verifyCallback}
            />
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
