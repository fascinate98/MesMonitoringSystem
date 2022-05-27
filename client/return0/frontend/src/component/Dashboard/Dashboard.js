//import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Abnormal from "./Abnormal";
import Difference from "./Diff";
import Plan from "./Planned";
import Progress from "./Progress";
import Real from "./Real";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, GridList } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { call } from "../../service/ApiService"; //  통신
import { useNavigate } from "react-router-dom";

const Dashboard = ({ modeTheme, dashboard_status }) => {
  const savedCallback = useRef();
  const [APIData, setAPIData] = useState([]);
  const [ArduinoData, setArduinoData] = useState([]);
  const navigate = useNavigate();
  async function getData() {
    call(`/api/dashboard`, {}, 2).then((response) => {
      setAPIData(response.data.data);
    });
  }

  async function getArduData() {
    call(`/api/arduino`, {}, 2).then((response) => {
      setArduinoData(response.data.data);
    });
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
      userSelect: "none",
      height: "100%",
    },
    PinkPaper: {
      backgroundColor: "#FFDEE9",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      height: "100%",
      userSelect: "none",
    },
    BlueberryPaper: {
      backgroundColor: "#D5DEFF",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      height: "100%",
      userSelect: "none",
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
      backgroundColor: "#fff",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      userSelect: "none",
      height: "85%",
    },
  }));

  useEffect(() => {
    savedCallback.current = getData;

    function getValue() {
      savedCallback.current();
      getArduData();
    }
    let id = setInterval(getValue, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    console.log(dashboard_status);
  }, [dashboard_status]);

  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <Box
          className={classes.backgroundpaper}
          boxShadow={1}
          marginLeft="10px"
          backgroundColor="primary.background.contents"
        >
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
            대시보드
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridAutoFlow: "row",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "repeat(3, 200px)",
              gap: 3,
              rowGap: 7,
            }}
          >
            <Box gridColumn="span 4" gridRow="span 1">
              <Box
                className={classes.PinkPaper}
                style={{ padding: "10px" }}
                backgroundColor="primary.count.first"
                boxShadow={1}
              >
                <Plan data={APIData} />
              </Box>
            </Box>

            <Box gridColumn="span 4" gridRow="span 1">
              <Box
                boxShadow={1}
                backgroundColor="primary.count.second"
                className={classes.BlueberryPaper}
                style={{ padding: "10px" }}
              >
                <Real data={APIData} />
              </Box>
            </Box>

            <Box gridColumn="span 4" gridRow="span 1">
              <Box
                boxShadow={1}
                backgroundColor="primary.count.third"
                className={classes.OrangePaper}
                elevation={2}
                style={{
                  padding: "10px",
                  backgroundColor: "primary.hi.lightfirstbox",
                }}
              >
                <Difference data={APIData} />
              </Box>
            </Box>

            <Box gridColumn="span 12" gridRow="span 2">
              {/* <Abnormal data={data} /> */}
              <Typography
                fontSize={25}
                fontFamily="Pretendard"
                color="primary.text.primary"
                fontWeight="bold"
                letterSpacing={3}
                textAlign={"left"}
                marginLeft="30px"
                position="relative"
                sx={{ userSelect: "none" }}
              >
                생산이상
              </Typography>
              <Abnormal data={APIData} />
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Box
          className={classes.backgroundpaper}
          boxShadow={1}
          backgroundColor="primary.background.contents"
          //  sx={{
          //   borderRadius: "38px",
          //   padding: "30px",
          //   background: "#1F2937",
          // }}
        >
          <Progress
            data={APIData}
            modeTheme={modeTheme}
            ardudata={ArduinoData}
            dashboard_status={dashboard_status}
          />
          {/* <Grid container spacing={5}>
            <Grid item xs={4}>
             
              <Paper className={classes.GridPaper}>
                <Progress data={data} />
              </Paper>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
