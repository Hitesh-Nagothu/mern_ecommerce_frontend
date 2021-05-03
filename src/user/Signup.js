import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import {signUp} from '../auth/index'

const Signup = () => {

  //Creating the state 
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  //Destructuing state object to store into variables
  const { name, email, password, error, success } = userInfo;

  //handler to save userInfo into state object
  const onFormChangeHandler = (name) => (event) => {
    setUserInfo({ ...userInfo, error: false, [name]: event.target.value });
  };

  //Handler to take action on submission of form by user
  const onSubmitHandler = (event) => {
    event.preventDefault();

    //Sending state values to backend handler signUp: auth/index
    signUp({ name, email, password })
    .then(data=> {
      if (data.error){
        setUserInfo({...userInfo, error: data.error, success: false})
      }
      else {
        setUserInfo({...userInfo, name: '', email: '', password: '', error:'', success:true})
      }
    })
  };

  //Helper func to show error messages
  const showError = () => {
    return (
    <div className="alert alert-danger" style={{display:error ? '': 'none'}}>
      {error}
    </div>);
    
  }

  //Helper func to show success signup
  const showSuccess = () => {
    return (<div className="alert alert-info" style={{display:success ? '': 'none'}}>
        SignUp successful! <Link to="/signin">SignIn</Link>
    </div>);
  }

  //Render the form
  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={onFormChangeHandler("name")}
            type="text"
            value={name}
            className="form-control"
          />
        </div>
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
          Submit
        </button>
      </form>
    );
  };


  return (
    <Layout
      title="Signup Page"
      description="React App for Ecommerce"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
      {JSON.stringify(userInfo)}
    </Layout>
  );
};

export default Signup;
