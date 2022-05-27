import React from "react";
import LoginImage from './LoginImage';
import Login from './Login';
import styles from "../../../assets/css/login.css";
import logsvg from "../../../assets/img/log.svg"; 
const LoginForm = ({setLoginName})=>{  
    return (
        <div className={styles.formsContainer}>
          <Login setLoginName={setLoginName}/>
          <img src={logsvg} className={styles.image} alt="" />
        </div>
    );
  
}
export default LoginForm;