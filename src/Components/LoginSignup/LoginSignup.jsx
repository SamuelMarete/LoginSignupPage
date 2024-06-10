import React, { useState, useRef } from 'react'; 
import './LoginSignup.css'; 

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "Sign Up") {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            password: password,
            confirmPassword: confirmPassword,
          }),
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      }
    } else {
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: password,
        }),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="nameinput">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="inputname">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Firstname" ref={firstnameRef} />
          </div>
        )}
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="inputname">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Lastname" ref={lastnameRef} />
          </div>
        )}
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" ref={emailRef} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {passwordError && (
          <div style={{ color: 'red' }}>{passwordError}</div>
        )}
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            forgot password? <span>Click Here!</span>
          </div>
        )}
      </div>
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>
          Sign Up
        </div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>
          Login
        </div>
      </div>
      <div className="submitforms" onClick={handleSubmit}>Submit</div>
    </div>
  );
};

export default LoginSignup;