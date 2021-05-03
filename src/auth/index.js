import { API } from "../config";

export const signUp = (userValues) => {
    //Making a POST REQUEST TO backend
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(userValues),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  export const signIn = (userValues) => {
    //Making a POST REQUEST TO backend
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(userValues),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


export const authentication = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data) )
        next()
    }
}

export const signOut = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt' )
        next();
        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response => {
            console.log('signout done', response)
        })
        .catch(err => console.log(err));
    }
}

export const isLoggedIn = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem("jwt")!==null) {
            return JSON.parse(localStorage.getItem('jwt'))
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

