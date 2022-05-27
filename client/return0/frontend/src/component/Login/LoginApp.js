import React, { Component } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Error4040 from "../../component/error/Error404";
import LoginForm from "./LoginForm";
import Lottie from 'react-lottie';
import animationData from './bglottie.json';
import { Box, Button, chakra, fadeConfig, Flex, HStack } from "@chakra-ui/react";

const LoginApp = ({setLoginName}) =>{
  
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <Flex  mx="auto" pos="relative" >
          <Box zIndex={-1}  mx="auto"  pos="absolute" top={0} right={0} style={{width:'240vh', height: '100vh' }} >
            <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
          </Box>
          <Box >
            <LoginForm setLoginName={setLoginName}/>
        </Box>
        
      </Flex>
    );
}

export default LoginApp;