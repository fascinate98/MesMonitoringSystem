import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { PieChart } from "react-minimal-pie-chart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toast } from "../Toast/Toast";

const bull = (
  <Box
    component="span"
    sx={{ display: "block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const Progress = ({data, modeTheme, ardudata, dashboard_status})=> {
  const data1 = [
    {
      value: isNaN(parseInt(data.real_count))
        ? 0
        : parseInt(data.real_count),
      color: "#83DAD0",
      name: "완료",
    },
    {
      value: isNaN(parseInt(data.proceeding_count))
        ? 0
        : parseInt(data.proceeding_count),
      color: "#8FADEB",
      name: "진행",
    },
  ];

  const dataTemp = [
    {
      value: ardudata.arduinoTemp,
      color: "#83DAD0",
      name: "온도",
    },
  ];

  const dataHumid = [
    {
      value: ardudata.arduinoHumid,
      color: "#83DAD0",
      name: "습도",
    },
  ];
  useEffect(() => {
    if (dashboard_status === 1 && parseInt(ardudata.arduinoDist) < 10 && 0 <= parseInt(ardudata.arduinoDist)) {
      Toast
      ("[PR 19] 설비와 작업자의 간격이 "+ardudata.arduinoDist+"cm 입니다. 뒤로 물러나세요.")
    }
  }, [ardudata]);

  return (
    <div style={{ width: "100%" }}>
      <ThemeProvider theme={modeTheme}>
        <box style={{ position: "relative" }}>
          {/* <Typography 
            fontSize={30}       
            fontFamily="Pretendard"
            fontWeight="600" 
            position="absolute"
            top="41%"
            left ="59%"
            alignContent={"center"}
            color="primary.text.primary"
            sx={{userSelect:"none"}}>
            {((data.real_count + data.proceeding_count) / data.planned_count * 100).toFixed(2)}%
          </Typography> */}

          <Typography
            fontSize={25}
            fontFamily="Pretendard"
            textAlign={"left"}
            marginLeft="30px"
            marginBottom={"30px"}
            color="primary.text.primary"
            fontWeight="bold"
            position="relative"
            marginTop={"10px"}
            letterSpacing={3}
            sx={{ userSelect: "none" }}
          >
            진행률
          </Typography>

          <Box
            sx={{
              position: "absolute",
              display: "grid",
              gridRowGap: "10px",
              gridTemplateColumns: "1fr 5fr",
              gridTemplateRows: "repeat(3, 1fr)",
              top: "30%",
              left: "10%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ width: "10px", height: "10px", backgroundColor: "#83DAD0" }}
            />
            <Typography
              fontSize={20}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              완료{" "}
              {isNaN((data.real_count / data.planned_count) * 100) ? 0 : ((data.real_count / data.planned_count) * 100).toFixed(
                2
              )}
              %
            </Typography>

            <Box
              sx={{ width: "10px", height: "10px", backgroundColor: "#8FADEB" }}
            />
            <Typography
              fontSize={20}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              진행{" "}
              {isNaN(
                (data.proceeding_count / data.planned_count) *
                100
              ) ?  0 :(
                (data.proceeding_count / data.planned_count) *
                100
              ).toFixed(2)}
              %
            </Typography>

            <Box
              sx={{ width: "10px", height: "10px", backgroundColor: "#f3f3f3" }}
            />
            <Typography
              fontSize={20}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              대기{" "}
              {isNaN(
                ((data.diff_count - data.proceeding_count) /
                  data.planned_count) *
                100
              ) ? 0 : (
                ((data.diff_count - data.proceeding_count) /
                  data.planned_count) *
                100
              ).toFixed(2)}
              %
            </Typography>
          </Box>

          <Box position="relative" color="primary.text.primary">
            <PieChart
              animation
              animate="false"
              animationDuration={61000}
              data={data1}
              viewBoxSize={[10, 130]}
              totalValue={
                isNaN(data.planned_count) ? 0 : data.planned_count
              }
              label={({ dataEntry }) => isNaN( data.progress_rate) ? 0 + "%" : data.progress_rate + "%"}
              labelStyle={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Pretendard",
                fill: "#83DAD0",
              }}
              labelPosition={0}
              lineWidth={25} //도넛 두께
              background="rgba(212, 212, 213, .2)"
              startAngle={270}
              lengthAngle={360}
              rounded
              style={{
                height: "260px",
                display: "flex",
              }}
            />
          </Box>

          {/* <Typography variant="body2" fontSize={200} textAlign={"center"}>
          <CircularProgress
            value={data.progress_rate}
            color="green"
            size="75%"
            thickness="25%"
          >
            <CircularProgressLabel>
              {data.progress_rate}
            </CircularProgressLabel>
          </CircularProgress>
          <br />
        </Typography> */}
        </box>
      </ThemeProvider>

      <ThemeProvider theme={modeTheme}>
        <box style={{ position: "relative" }}>
          <Typography
            fontSize={25}
            fontFamily="Pretendard"
            textAlign={"left"}
            marginLeft="30px"
            marginBottom={"30px"}
            color="primary.text.primary"
            fontWeight="bold"
            position="relative"
            marginTop={"10px"}
            letterSpacing={3}
            sx={{ userSelect: "none" }}
          >
            공정 환경
          </Typography>

          <Box
            mt="40px"
            sx={{
              position: "absolute",
              display: "grid",
              gridRowGap: "10px",
              gridTemplateColumns: "1fr 5fr",
              gridTemplateRows: "repeat(1, 1fr)",
              top: "20%",
              left: "10%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ width: "10px", height: "10px", backgroundColor: "#83DAD0" }}
            />
            <Typography
              fontSize={20}
              fontFamily="Pretendard"
              fontWeight="600"
              color="primary.text.primary"
              sx={{ userSelect: "none" }}
              style={{ textAlign: "left" }}
            >
              온도 {ardudata.arduinoTemp}℃
            </Typography>
          </Box>

          <Box position="relative" color="primary.text.primary">
            <PieChart
              marginBottom="0"
              animation
              animate="false"
              animationDuration={61000}
              data={dataTemp}
              viewBoxSize={["270", "60"]}
              center={[180, 50]}
              totalValue={60}
              label={({ dataEntry }) => ardudata.arduinoTemp + "℃"}
              labelStyle={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Pretendard",
                fill: "#83DAD0",
              }}
              labelPosition={0}
              lineWidth={25} //도넛 두께
              background="rgba(212, 212, 213, .2)"
              startAngle={180}
              lengthAngle={180}
              rounded
              style={{
                display: "flex",
              }}
            />
          </Box>

          <Box mt="70px">
            <Box
              mt="40px"
              sx={{
                position: "absolute",
                display: "grid",
                gridRowGap: "10px",
                gridTemplateColumns: "1fr 5fr",
                gridTemplateRows: "repeat(1, 1fr)",
                top: "70%",
                left: "10%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#83DAD0",
                }}
              />
              <Typography
                fontSize={20}
                fontFamily="Pretendard"
                fontWeight="600"
                color="primary.text.primary"
                sx={{ userSelect: "none" }}
                style={{ textAlign: "left" }}
              >
                습도 {ardudata.arduinoHumid}%
              </Typography>
            </Box>

            <Box position="relative" color="primary.text.primary">
              <PieChart
                animation
                animate="false"
                animationDuration={61000}
                data={dataHumid}
                viewBoxSize={["270", "60"]}
                center={[180, 50]}
                totalValue={100}
                label={({ dataEntry }) => ardudata.arduinoHumid + "%"}
                labelStyle={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "Pretendard",
                  fill: "#83DAD0",
                }}
                labelPosition={0}
                lineWidth={25} //도넛 두께
                background="rgba(212, 212, 213, .2)"
                startAngle={180}
                lengthAngle={180}
                rounded
                style={{
                  display: "flex",
                }}
              />
            </Box>
          </Box>
        </box>
      </ThemeProvider>
    </div>
  );
}

export default Progress;