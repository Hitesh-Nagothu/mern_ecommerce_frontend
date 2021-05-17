import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { signOut, isLoggedIn } from "../auth/index";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = (props) => {
  const history = useHistory();

  return (
    <div>
      <ul className="nav nav-tabs bg-primary  ">
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/")}
            to="/"
          >
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>

       { isLoggedIn() && isLoggedIn().user.role===0 && (<li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>) }

        { isLoggedIn() && isLoggedIn().user.role===1 && (<li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>) }

      {!isLoggedIn() && <>  <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/signin")}
            to="/signin"
          >
            Signin
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/signup")}
            to="/signup"
          >
            Signup
          </Link>
        </li> </> }

       { isLoggedIn() &&  <li className="nav-item">
          <span
            onClick={() =>
              signOut(() => {
                history.push("/");
              })
            }
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            to="/signup"
          >
            Signout
          </span>
        </li> }
      </ul>
    </div>
  );
};

export default withRouter(Menu);
