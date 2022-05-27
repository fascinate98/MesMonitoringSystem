import React, { useEffect, useRef, useState, Component } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import stop from "../../../assets/img/stop.png";
import go from "../../../assets/img/press.gif";
import none from "../../../assets/img/noneUnder.png";
import under from "../../../assets/img/isUnder.png";
import { Toast } from "../Toast/Toast";
import { border, createStandaloneToast, useToast } from "@chakra-ui/react";
import axios from "axios";
import { call } from "../../service/ApiService"; //  통신
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RealtimeLineChart from "./RealtimeLineChart";
import Chart from 'react-apexcharts'

import { borders } from "@mui/system";
import { BiBorderTop, BiBox } from "react-icons/bi";
import { FiTrendingDown } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import TagTrend from "../TagGraph/TagTrend";
import TagHistory from "../TagGraph/TagHistory";
import ApexChart from 'apexcharts'

export default function PressEquip({
  id,
  oper,
  punch,
  isAbnormal1,
  isAbnormal2,
  isUnder,
  press_status,
  dataList
}) {



  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const stylebackgroundColor = {
    width: 60,
    height: 60,
    // backgroundColor: oper === 0 ? 'red' : 'green'
  };
  const options = [
    { label: "PR14", value: "1" },
    { label: "PR16", value: "2" },
    { label: "PR19", value: "3" },
    { label: "PR33", value: "4" },
    { label: "PR20", value: "5" },
    { label: "PR23", value: "6" },
    { label: "PR34", value: "7" },
    { label: "PR35", value: "8" },
    { label: "PR36", value: "9" },
    { label: "PR37", value: "10" },
    { label: "PR38", value: "11" },
    { label: "PR39", value: "12" },
    { label: "PR40", value: "13" },
    { label: "PR41", value: "14" },
    { label: "PR43", value: "15" },
    { label: "PR44", value: "16" },
    { label: "PR45", value: "17" },
    { label: "PR47", value: "18" },
    { label: "PR48", value: "19" },
    { label: "PR15", value: "20" },
    { label: "PR22", value: "21" },
    { label: "PR24", value: "22" },
    { label: "PR26", value: "23" },
    { label: "PR27", value: "24" },
    { label: "PR28", value: "25" },
    { label: "PR29", value: "26" },
    { label: "PR30", value: "27" },
  ];
  const operStatus = (e) => {
    e === 0 ? "중지" : "가동 중";
  };

  const isMounted = useRef(false);

  async function postAbnormalData(isAbnormalPressId, isAbnormalPressErrorType) {
    call(
      `/api/condition`,
      {
        isAbnormalPressId: isAbnormalPressId,
        isAbnormalStatus: isAbnormalPressErrorType,
      },
      1
    )
      .then((response) => {
        if (!response.data) {
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        console.log(error.status);
        return Promise.reject(error);
      });
  }



  useEffect(() => {
    
    if (isMounted.current && press_status === 1) {
      if (oper === 0)
        Toast(
          `${options[id - 1].label} OFF`,
          `${new Date().toLocaleString()}`,
          "error",
          "bottom-right"
        );
      else if (oper === 1) {
        Toast(
          `${options[id - 1].label} ON`,
          `${new Date().toLocaleString()}`,
          "success",
          "bottom-right"
        );
      }
    } else {
      isMounted.current = true;
    }
  }, [oper]);

  useEffect(() => {
    if (isMounted.current && press_status === 1) {
      if (isAbnormal1) {
        Toast(
          `누적 타발수 증가 오류 발생 [${options[id - 1].label}]`,
          `${new Date().toLocaleString()}`,
          "warning",
          "bottom-right"
        ); 
        postAbnormalData(id, 1);
      }
    } else {
      isMounted.current = true;
    }
  }, [isAbnormal1]);

  useEffect(() => {
    if (isMounted.current && press_status === 1) {
      if (isAbnormal2) {
        Toast(
          `누적 타발수 입력 오류 발생 [${options[id - 1].label}]`,
          `${new Date().toLocaleString()}`,
          "warning",
          "bottom-right"
        );
        postAbnormalData(id, 2);
      }
    } else {
      isMounted.current = true;
    }
  }, [isAbnormal2]);

 


  const useStyles = makeStyles((theme) => ({
    container: {
      display: "grid",
    },
    backgroundpaper: {
      whiteSpace: "nowrap",
      borderRadius: "20px",
      userSelect: "none",
      backgroundColor: "#123123",
      margin: "0",
    },
    GreenPaper: {
      backgroundColor: "#C8F7DC",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      height: "100%",
      userSelect: "none",
    },

    LavenderPaper: {
      backgroundColor: "#E9E7FD",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      height: "100%",
      userSelect: "none",
    },
    OrangePaper: {
      backgroundColor: " #FEE4CB",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      height: "100%",
      userSelect: "none",
    },
    GridPaper: {
      backgroundColor: "#F9F9F9",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      userSelect: "none",
    },
  }));
  const classes = useStyles();

  const chartData = {
    
  }

  return (
    <Box //진짜
      className={classes.backgroundpaper}
      boxShadow={2}
      backgroundColor="primary.monitoring.card"
      display={"grid"}
      style={{}}
      sx={{
        display: "grid",
        gridTemplateRows: "1fr 12fr",
        //border: isAbnormal1 ? "pink" : isAbnormal2 ? "skyblue" : null,
        //bgcolor: isAbnormal1 ? "pink" : isAbnormal2 ? "skyblue" : null,
      }}
    >
      <Box
        gridRow={"span 1"}
        borderRadius={"20px 20px 0px 0px"}
        sx={{
          backgroundColor: isAbnormal1 //
            ? "primary.monitoring.abnormal1"
            : isAbnormal2
            ? "primary.monitoring.abnoraml2"
            : oper === 0
            ? "primary.monitoring.off"
            : "primary.monitoring.on",
        }}
      />

      <Box
        gridRow={"span 2"}
        style={{
          padding: "3px 12px 3px 12px",
          display: "grid",
          gridTemplateColumns:"1fr",
          gridTemplateRows: "repeat(6, 1fr)",
          minHeight: 0
        }}
      >
        <Box  gridRow={"span 1"} gridColumn={"span 1"} style={{display:"flex", justifyContent:"space-between"}}>
          <Typography
            fontSize={18}
            fontFamily="Pretendard"
            fontWeight="600"
            textAlign="left"
            color="primary.text.primary"
            style={{
              userSelect: "none",
            }}
          >
            {options[id - 1].label}
          </Typography>
          <Box color="primary.icon.primary" display={isUnder === true && oper === 1 ? "" : "none"} >
            <FiTrendingDown fontSize={20}/>
          </Box>
        </Box>

        <Box  gridRow={"span 5"} minHeight="0" >
            {dataList!==null ? <RealtimeLineChart height="39" style={{minHeight:"0"}}
            dataList={dataList}
          /> : null}
        </Box>

        <Box  gridRow={"span 1"} gridColumn={"span 1"} >
          <Typography
            color="primary.text.primary"
            fontFamily="Pretendard"
            fontWeight="600"
            fontSize={22}
            style={{ userSelect: "none" }}
          >
            {punch}
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}

// PressEquip.propTypes = {
//     name: PropTypes.string.isRequired
// }
