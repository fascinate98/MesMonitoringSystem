import React, { useState, Component, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from 'react-router';
import { Routes, Route,useLocation  } from "react-router";
import { Box, Text, transition } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  styled,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import Plan from "./component/Plan/Plan";
import Condition from "./component/Condition/Condition";
import Press from "./component/Monitoring/Press";
import TagHistory from "./component/TagGraph/TagHistory";
import TagTrend from "./component/TagGraph/TagTrend";
import Performance from "./component/Performance/Performance";
import Login from "./component/Login/LoginApp";
import Dashboard from "./component/Dashboard/Dashboard";
import Error4040 from "./component/error/Error404";
import Layout from "./component/Frame/Layout";
import "../assets/fonts/font.css";
import { linearProgressClasses } from "@mui/material";

const App = () => {
  const [openTime, setOpenTime] = useState(null);
  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
  const [mode, setMode] = React.useState("light");
  const [loginName, setLoginName] = useState(null);
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: "#C0C0C0",   //기본글씨색
            background: {
              default: '#F3F6FD', //맨뒤배경색

              contents: '#FFFFFF'
            },
            count:{
              first: "#FEE4CB",
              second:"#FFD3E2",
              third: "#D5DEFF",
              text:"#1F1C2E",
              count:"#1F1C2E"
            },
            monitoring:{
              graph:"#83DAD0",
              card:"#ffffff",
              on:"#b6e69a",
              off:"#ebf0f5",
              abnormal1:"#FFD3E2",
              abnoraml2:"#87CEEB"
            },
            text: {
              primary: '#363343',//363343
              secondary: '#FF0000',
              color:'#1F1C2E'

            },
            scroll:{
              primary: '#C0C0C0'
            },
            button: {
              primary: '#363343',
              secondary: '#FFFFFF',
              color: '#1F1C2E',
              paging:'#363343'
            },
            paper: {
              background: '#FFFFFF',  //제일큰 카드색 배경
            },
            box:{
              primary: '#FFFFFF' //공저몬일엍ㄹㅇ잉
            },
            icon:{
              primary: '#6eb6ff'
            },
            gird:{

            },
            hi: {
              lightfirstbox: '#123123'
            },
            
            bgcolor: '#123123', 
            backgroundColor: '#F3F6FD',
          
            
          }
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#83DAD0",
            background: {

              default: '#36393F',
              contents:'#2F3136'
            },
            count:{
              first: "#36393F",
              second:"#36393F",
              third: "#36393F",
              text:"#E8E9EB",
              count:"#83DAD0"
            },
            monitoring:{
              graph:"#83DAD0",
              card:"#36393F",
              on:"#0fffb3",
              off:"#92989C",
              abnormal1:"#ff6181",
              abnoraml2:"#a694ff"

            },
            text: {
              primary: '#E5E6E6',
              secondary: '#D2D4D7',
              color:'#36393F'
            },
            scroll:{
              primary: '#83DAD0',
            },
            button: {
              primary: '#83DAD0',
              secondary: '#FFFFFF',
              color: '#353C50',
              paging:'#83DAD0'
            },
            paper: {
              background: '#ff0900'
            },
            box:{
              primary: '#111827'
            },
            icon:{
              primary: '#ffea4d'
            },
            bgcolor: '#171F29',
            backgroundColor: '#111827'
          }
       
        })
    },
  });
  const modeTheme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        //console.log(setMode)
      },
    }),
    [],
  );
  useEffect(() => {
    setOpenTime(new Date());
    setLoginName('');
  }, []);
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={modeTheme}>
          <CssBaseline />
          <Router basename="/">
            <Routes>
              <Route
                element={
                  <Layout
                    mode={mode}
                    setMode={colorMode.toggleColorMode}
                    name={loginName}
                    openTime={openTime}
                  />
                }
              >
                <Route path="/dashboard" element={<Dashboard modeTheme={modeTheme} dashboard_status={2}/>} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/condition" element={<Condition />} />
                <Route
                  path="/monitoring"
                  element={<Press press_status={2} openTime={openTime} />}
                />
                <Route
                  path="/tagTrend"
                  element={<TagTrend openTime={openTime} />}
                />
                <Route
                  path="/tagHistory"
                  element={<TagHistory openTime={openTime} />}
                />
                <Route path="*" element={</*Main*/ Error4040 />} />
              </Route>
              <Route path="/" element={<Login setLoginName={setLoginName}/>} />
              <Route path="*" element={</*Main*/ Error4040 />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};

export default App;