import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signIn } from "../auth/index";

const Signin = () => {
  //Creating the state
  const [userInfo, setUserInfo] = useState({
    email: "venky@gmail",
    password: "venky@123",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  //Destructuing state object to store into variables
  const { email, password, error, loading, redirectToReferrer } = userInfo;

  //handler to save userInfo into state object
  const onFormChangeHandler = (name) => (event) => {
    setUserInfo({ ...userInfo, error: false, [name]: event.target.value });
  };

  //Handler to take action on submission of form by user
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setUserInfo({ ...userInfo, error: false, loading: true });
    //Sending state values to backend handler signUp: auth/index
    signIn({ email, password }).then((data) => {
      if (data.error) {
        setUserInfo({ ...userInfo, error: data.error, loading: false });
      } else {
        setUserInfo({
          ...userInfo,
          email: "",
          password: "",
          error: "",
          loading: false,
          redirectToReferrer: true,
        });
      }
    });
  };

  //Helper func to show error messages
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  //Helper func to show loading signup
  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer){
      return <Redirect to="/" />
    }
  }

  //Render the form
  const signInForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={onFormChangeHandler("email")}
            type="email"
            value={email}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={onFormChangeHandler("password")}
            type="password"
            value={password}
            className="form-control"
          />
        </div>
        <button onClick={onSubmitHandler} className="btn btn-primary">
          Login
        </button>
      </form>
    );
  };

  return (
    <Layout
      title="SignIn Page"
      description="React App for Ecommerce"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
