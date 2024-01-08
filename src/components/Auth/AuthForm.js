import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import { AuthContext } from "../../store/context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isLogin) {
      setLoading(true);
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQfowKtZe2ycOBdfKDhwFN3-Pg20dizhk`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              let errormessage = "Authentication failed";
              if (data && data.error && data.error.message) {
                errormessage = data.error.message;
              }
              setLoading(false);
              alert(errormessage);
              throw new Error(errormessage);
            });
          }
        })
        .then((data) => {
          console.log("login",data)
          context.Login(data.idToken);
          setLoading(false);
          history.push("/profile");
        })
        .catch((error) => {
          // console.log("signin", error);
          setLoading(false);
          alert(error.message);
        });
    } else {
      setLoading(true);
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQfowKtZe2ycOBdfKDhwFN3-Pg20dizhk`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true ,}),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              // console.log(data);
              let errormessage = "Authentication failed";
              if (data && data.error && data.error.message) {
                errormessage = data.error.message;
              }
              setLoading(false);
              alert(errormessage);
              throw new Error(errormessage);
            });
          }
        })
        .then((data) => {
          console.log("signup", data);
          context.Login(data.idToken);
          setLoading(false);
          history.push("/profile");
        })
        .catch((error) => {
          setLoading(false);
          error.message = error.message || "Something went wrong";
          throw error;
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={authHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button type="submit">
            {!loading ? (isLogin ? "Login" : "SignUp") : "submitting.."}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
