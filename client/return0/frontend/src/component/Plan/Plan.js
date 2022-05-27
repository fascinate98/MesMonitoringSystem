import React, { useState } from "react";
import Button from '@mui/material/Button';
import SignModal from "./inputForm";
import Box from "@mui/material/Box";
import PlanTable from "./PlanTable";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import PlanDetailTable from"./PlanDetailTable";


export default function Plan() {

  const [showTable, setShowTable] = useState(false);
  const [showDetailTable, setShowDetailTable] = useState(false);
  const [selected, setSelected] = useState(null);

    
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
      backgroundColor:"#123123",
      height:"100%"
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
  
  const classes = useStyles();
  const closeModal = () => setShowModal(true)
  return (
    <Box className={classes.backgroundpaper}
    boxShadow={1}
    marginLeft="10px"
    width="100%"
    paddingBottom={"30px"}
    backgroundColor="primary.background.contents">
    <Box
     sx={{
      display: "grid",
      gridAutoFlow: "row",
      gridTemplateColumns: "repeat(12, 1fr)",
     }}>  
        <Box gridColumn="span 11" >
        <Typography
            color="primary.text.primary"
            fontFamily="Pretendard"
            fontWeight="bold"
            fontSize={35}
            marginLeft="30px"
            marginBottom="20px"
            letterSpacing={4}
            style={{ userSelect: "none" }}>
            생산계획 등록/조회
          </Typography>
          </Box>  
          <Box gridColumn="span 1" 
          justifyItems={"middle"}
          alignItems={"center"}
          
          >
            {/* <Button variant="contained" onClick={handleClickOpen}>
              등록
            </Button> */}
          </Box>

        </Box>
          <PlanTable showTable={showTable} setShowTable={setShowTable} selected={selected} setSelected={setSelected} handleClickOpen={handleClickOpen}/>
          
          <SignModal open={open} handleClose={handleClose} setShowTable={setShowTable}/>
      </Box>
);
};