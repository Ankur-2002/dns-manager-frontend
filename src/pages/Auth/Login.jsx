import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.css';
import Context from '../../store/createStore';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const { logIn, register } = useContext(Context);

  const handleSubmit = async e => {
    e.preventDefault();
    if (isLogin) {
      // Login
      console.log(email.current.value, password.current.value);
      await logIn(email.current.value, password.current.value);
    } else {
      // Register
      console.log(
        name.current.value,
        email.current.value,
        password.current.value,
      );
      await register(
        name.current.value,
        email.current.value,
        password.current.value,
      );
    }
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="left-login-content">
          <div className="login-form">
            <h1>
              <img src="/dns.jpg" alt="" />
              Manager
            </h1>
            <p>
              {isLogin
                ? 'Manage your DNS records easily with DNS Manager. Login to your account to get started.'
                : 'Create an account with DNS Manager to start managing your DNS records.'}
            </p>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="password" id="name" name="name" ref={name} />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" ref={email} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  ref={password}
                />
              </div>

              <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
              <div
                className="registerLink"
                to={isLogin ? '/register' : '/login'}
                onClick={() => {
                  email.current.value = '';
                  password.current.value = '';
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin
                  ? 'Don’t have an account? Register'
                  : 'Already have an account? Login'}
              </div>
            </form>
          </div>
        </div>
        <div className="right-login-content">
          <img src="/login.svg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
