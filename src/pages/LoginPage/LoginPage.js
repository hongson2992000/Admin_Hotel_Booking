import React, { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import image from "../../assets/img/loginImage.jpg";
import "./LoginPage.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/LoginAction";
import { useNavigate } from "react-router-dom";
import { errState$ } from "../../redux/selectors/UserSelector";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import img from "../../assets/img/logo.png";
export default function LoginPage() {
  const dispatch = useDispatch();
  const errMessage = useSelector(errState$);
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/overview");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOTEL_MANAGE
    ) {
      navigate("/listRoom");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
    ) {
      navigate("/listRoom");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
    ) {
      navigate("/listRoom");
    }
  });
  const onSubmitFormLogin = useCallback(
    (values) => {
      dispatch(actions.login.loginRequest({ values, navigate }));
    },
    [navigate, dispatch]
  );
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitFormLogin(values);
      resetForm({ values: "" });
    },
  });
  console.log(formik.values);
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-header">
          <img src={img} alt="" style={{width:"70px",height:"70px",marginRight:"10px"}}/>
          <span>5 Men Hotel</span>
        </div>
        <form
          className="login-form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className="login-form-item">
            <div className="form-item">
              {/* <label for="username">Tên đăng nhập</label> */}
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Tên đăng nhập"
              />
            </div>
            <div className="form-item">
              {/* <label for="password">Mật khẩu</label> */}
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Mật khẩu"
              />
              {errMessage === "INVALID USER NAME OR PASSWORD" ? (
                <p style={{ paddingTop: "10px", color: "red" }}>
                  Tài Khoản Và Mật Khẩu Không Đúng
                </p>
              ) : (
                ""
              )}
            </div>
            {/* <div className="form-item">
              <div className="checkbox">
                <input type="checkbox" id="rememberMeCheckbox" checked />
                <label className="checkboxLabel" for="rememberMeCheckbox">
                  Nhớ mật khẩu
                </label>
              </div>
            </div> */}
            <button type="submit" className="buttonSignIn">
              Đăng Nhập
            </button>
          </div>
          {/* <div className="login-form-footer">
            <a href="#">
              <img
                width="30"
                src="https://wiki.in-circuit.de/images/thumb/1/13/facebook_logo.png/600px-facebook_logo.png" alt=""
              />
              Facebook Login
            </a>
            <a href="#">
              <img
                width="30"
                src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw" alt=""
              />
              Google Login
            </a>
          </div> */}
        </form>
      </div>
      {/* <div className="login-right">
        <img src={image} alt="" />
      </div> */}
    </div>
  );
}
