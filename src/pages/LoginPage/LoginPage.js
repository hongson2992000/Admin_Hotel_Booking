import React from "react";
// import image from "../../assets/img/LoginPage/LoginImage.jpg";
import "./LoginPage.scss";
export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-header">
          <h1>Chào Mừng Tới 5 Men Hotel</h1>
          <p>Vui Lòng Đăng Nhập</p>
        </div>
        <form className="login-form">
          <div className="login-form-item">
            <div className="form-item">
              <label for="username">Enter Username</label>
              <input type="text" id="username" />
            </div>
            <div className="form-item">
              <label for="password">Enter Password</label>
              <input type="text" id="password" />
            </div>
            <div className="form-item">
              <div className="checkbox">
                <input type="checkbox" id="rememberMeCheckbox" checked />
                <label className="checkboxLabel" for="rememberMeCheckbox">
                  Remember me
                </label>
              </div>
            </div>
            <button type="submit" className="buttonSignIn">Sign In</button>
          </div>
          <div className="login-form-footer">
            <a href="#">
              <img
                width="30"
                src="https://wiki.in-circuit.de/images/thumb/1/13/facebook_logo.png/600px-facebook_logo.png"
              />
              Facebook Login
            </a>
            <a href="#">
              <img
                width="30"
                src="https://wiki.in-circuit.de/images/thumb/1/13/facebook_logo.png/600px-facebook_logo.png"
              />
              Google Login
            </a>
          </div>
        </form>
      </div>
      <div className="login-right">
        {/* <img src={image} /> */}
      </div>
    </div>
  );
}
