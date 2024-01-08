import { useContext, useRef, useState } from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfileForm = () => {
const ctx = useContext(AuthContext);
const history = useHistory();
const passwordRef = useRef();
const [loading,setLoading ] = useState(false)

const submithandler = (e)=>{
  e.preventDefault();
  const EnteredPassword = passwordRef.current.value;
  const local = JSON.parse(localStorage.getItem("user"))
  console.log(local)
  setLoading(true)
  fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDQfowKtZe2ycOBdfKDhwFN3-Pg20dizhk",{
    method: 'POST',
    headers : { 'Content-Type': 'application/json' },
    body : JSON.stringify({ idToken:local.token ,password :EnteredPassword ,returnSecureToken :true})
  }).then(response => {
    if(response.ok){
         return response.json();
    }else{
      return response.json().then((data)=>{
          let errormessage = "Password changed request failed";
          if(data&&data.error&&data.error.message){
            errormessage = data.error.message
          }
          setLoading(false)
          alert(errormessage)
      })
    }
  }).then((data)=>{
    setLoading(false)
    history.push("/")
  }).catch((err)=>{
    setLoading(false)
    console.log("err",err)
  })
}

  return (
    <form className={classes.form} onSubmit={submithandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' ref={passwordRef} id='new-password' />
      </div>
      <div className={classes.action}>
        <button type='submit'>{!loading ? "Change Password": "requesting..." }</button>
      </div>
    </form>
  );
}

export default ProfileForm;
