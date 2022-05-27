import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard(data) {
  return (
    <div style={{display:"block"}}>
      <Typography
        fontSize={23}
        fontFamily="Pretendard"
        textAlign={"center"}
        color="primary.count.text"
        top="20px"
        fontWeight="600"
        position="relative"
        sx={{userSelect:"none", opacity:".8"}}
      >
        차이
      </Typography>
      <Typography 
        fontSize={100}       
        fontFamily="Pretendard"
        fontWeight="600" 
        textAlign={"center"}
        position="relative"
        color="primary.count.count"
        sx={{userSelect:"none",}}>
        {data.data.diff_count}
      </Typography>
    </div>
  );
}
