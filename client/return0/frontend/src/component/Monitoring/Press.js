import React, { useState, useEffect, useRef } from "react";
import styles from "../../../assets/scss/component/Press.scss";
import PressEquipList from "./PressEquipList";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { call } from '../../service/ApiService';    //  통신
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";

const Press = ({ press_status, openTime }) => {
  const [equip, setEquip] = useState([]);
  const [equip2, setEquip2] = useState([]);
  const savedCallback = useRef();
  const RoutineTime = 10;

  async function fetchData(index) {
    try {
      call(`/api/monitoring`, { index: index }, 1).then((response) => {
        setEquip(response.data.data);
      });
    } catch (err) {
      console.log(err);
    }

    if (index > 10) {
      try {
        call(`/api/monitoring`, { index: (index - 10) }, 1).then((response) => {
          setEquip2(response.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  const [clickTime, setClickTime] = useState("");
  useEffect(() => {
    
    savedCallback.current = time;
  }, [fetchData]);

  useEffect(() => {
    setClickTime(new Date());
    function getValue() {
      savedCallback.current();
    }
    let id = setInterval(getValue, 1000);
    return () => clearInterval(id);
  }, []);

  function time() {
    var now = new Date();

    var click_sec = parseInt(now - clickTime) / 1000;
    var click_day = parseInt(click_sec / 60 / 60 / 24);
    var sec = parseInt(now - openTime) / 1000;
    var day = parseInt(sec / 60 / 60 / 24);

    click_sec = click_sec - click_day * 60 * 60 * 24;
    var click_hour = parseInt(click_sec / 60 / 60);
    sec = sec - day * 60 * 60 * 24;
    var hour = parseInt(sec / 60 / 60);

    click_sec = click_sec - click_hour * 60 * 60;
    var click_min = parseInt(click_sec / 60);
    sec = sec - hour * 60 * 60;
    var min = parseInt(sec / 60);

    click_sec = parseInt(click_sec - click_min * 60);
    sec = parseInt(sec - min * 60);

    fetchData(sec + min * 60 + hour * 3600);
  }

  const useStyles = makeStyles((theme) => ({

    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridAutoColumns: "1fr",
    },
    backgroundpaper: {
      whiteSpace: "nowrap",
      borderRadius: "38px",
      padding: "30px",
      userSelect:"none",
      height:"100%"
    },

  }));
  const classes = useStyles();

  return (
    
    <Box className={classes.backgroundpaper}
    boxShadow={1}
    marginLeft="10px"
    width="100%"
    paddingBottom={"30px"}
    backgroundColor="primary.background.contents">

        <Typography
            color="primary.text.primary"
            fontFamily="Pretendard"
            fontWeight="bold"
            fontSize={35}
            marginLeft="30px"
            marginBottom="20px"
            letterSpacing={4}
            style={{ userSelect: "none" }}
          >
            공정 모니터링
          </Typography>
          <PressEquipList
        equiplist={equip}
        equiplist2={equip2}
        fetchData={fetchData}
        press_status={press_status}
        openTime={openTime}
      />

      <Box
        sx={{
          position: "absolute",
          display: "grid",
          gridRowGap: "5px",
          gridTemplateColumns: "1fr 5fr",
          gridTemplateRows: "repeat(4, 1fr)",
          top: "81%",
          left: "87%",
          alignItems: "center",
        }}
      >
            <Box sx={{ width: "10px", height: "10px", 
            backgroundColor: "primary.monitoring.off" }}/>
            <Typography
              fontSize={15}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              대기중   
            </Typography>

            <Box sx={{ width: "10px", height: "10px", 
            backgroundColor: "primary.monitoring.on" }}/>
            <Typography
              fontSize={15}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              정상 작동   
            </Typography>

            <Box sx={{ width: "10px", height: "10px", 
            backgroundColor: "primary.monitoring.abnormal1" }}/>
            <Typography
              fontSize={15}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              타발 수 증가 오류   
            </Typography>

            <Box sx={{ width: "10px", height: "10px", 
            backgroundColor: "primary.monitoring.abnoraml2" }}/>
            <Typography
              fontSize={15}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              상태 및 타발 수 오류   
            </Typography>
      </Box>

    </Box>
  );
};

export default Press;
