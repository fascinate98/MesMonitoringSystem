import React, { Component } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Lottie from 'react-lottie';
import imageData from './image.json';
import { Box, Button, chakra, Flex, HStack } from "@chakra-ui/react";

class LoginImage extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: imageData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
        <div style={{ 
            width: '40%',
            height: '40%',
            position: 'relative', left: '5%'
            }}>
            <Lottie options={defaultOptions}/>
        </div>
    );
  }
}

export default LoginImage;
