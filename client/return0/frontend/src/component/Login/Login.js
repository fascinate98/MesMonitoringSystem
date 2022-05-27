import React, { useState, useEffect } from "react";
import style from "../../../assets/css/login.css";
import { InputAdornment } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import TextField from '@mui/material/TextField';
import Button from "@material-ui/core/Button";
import { background } from "@chakra-ui/react";
import { borderRadius } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import { singin } from '../../service/ApiService';  //  통신

const Login = ({ setLoginName }) => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [loginInfo, setLoginInfo] = useState([]);

  const [nameLogin, setNameLogin] = useState(false);  //  로그인 이름 바꿀려고 한 것
  const navigate = useNavigate();
  //아이디 입력창 관리
  const handleID = (e) => {
    setUserId(e.target.value);
  };
  //패스워드 입력창 관리
  const handlePW = (e) => {
    setUserPw(e.target.value);
  };
  //로그인버튼 클릭시 서버로 데이터 전송
  const handleSubmit = async () => {
    try {
      const login_info = {
        userId: userId,
        userPw: userPw,
        userName: userName,
        isLogin: isLogin,
      };
      singin(login_info).then((AppData) => {
        if (AppData) {
          console.log(AppData);
          setUserId("");
          setUserPw("");
          setNameLogin(true);
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      });
    } catch (err) {
      console.error(err);
    }

  };

  const useStyles = makeStyles({
    flexGrow: {
      flex: '1',
    },
    button: {
      width: "200px",
      backgroundColor: "#5995fd",
      border: "none",
      outline: "none",
      height: "50px",
      borderRadius: "49px",
      color: "#fff",
      textTransform: "uppercase",
      fontWeight: "600",
      margin: "20px 0",
      cursor: "pointer",
      transition: "0.9s",
      fontSize: "1.1rem",
      fontFamily: "Poppins",
      '&:hover': {
        backgroundColor: '#335faa',

      },
    }
  })

  const classes = useStyles();
  useEffect(()=>{     //  로그인 이름 바꿀려고
    setLoginName(sessionStorage.getItem("user"));
  }, [nameLogin]);
  return (
    <div className={style.signinSignup}>
      <form action="#" className={style.signInForm}>
        <h2 className={style.title}>Sign in</h2>
        <div className={style.inputField}>
          <PersonIcon className={style.icon} />
          <input type="text" placeholder="Username" onChange={handleID}
            value={userId} backgroundColor={"none"}/>
        </div>

        <div className={style.inputField}>
          <LockRoundedIcon className={style.icon} />
          <input type="password" placeholder="Password"
            onChange={handlePW}
            value={userPw} style={{backgroundColor:"transparent"}} />
        </div>

        <Button className={classes.button}
          onClick={() => {
            handleSubmit();
          }}
        >
          Log In
        </Button>
      </form>
    </div>
  );

}


export default Login;