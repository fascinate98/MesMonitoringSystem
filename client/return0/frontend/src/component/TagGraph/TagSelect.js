import React, { useState } from "react";
import styles from '../../../assets/scss/component/TagTrend.scss';
import { Button } from "react-bootstrap";
import TagTrend from "./TagTrend";
import TagHistory from "./TagHistory";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const Plan = ({openTime}) => {
    const [historyModal, setHistory] = useState(false);
    const [LiveTrand, setLiveTrand] = useState(false);
    const useStyles = makeStyles((theme) => ({
        container: {
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoColumns: "1fr",
        },
        backgroundpaper: {
          whiteSpace: "nowrap",
          borderRadius: "38px",
          height: "100%",
          padding: "30px",
          userSelect:"none",
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
          height:"380px"
        },
    
      }));
    
      const classes = useStyles();
    
    return (
        <Box className={classes.backgroundpaper}
              boxShadow={4}
              marginLeft="10px"
              width='100%'
              minHeight='700px'
              backgroundColor="primary.paper.background"
              style={{overflow: "hidden",
              overflowY: "scroll",}}>
        <Typography
            color="primary.text.primary"
            fontFamily="Pretendard1"
            fontWeight="570"
            fontSize={35}
            marginLeft="2%"
            marginBottom="10px"
            style={{ userSelect: "none" }}
          >
            Tag 트렌드
          </Typography>
            
            {/* <Button className="btn btn-success" onClick={() => {setHistory(true);setLiveTrand(false);}}>
                history
            </Button>
             
            <Button className="btn btn-dark" onClick={()=>{setLiveTrand(true); setHistory(false);}}>
                실시간 트랜드 조회
            </Button> */}
            {/* {historyModal ? <TagHistory/>:null}
            {LiveTrand ? <TagTrend openTime={openTime} ></TagTrend> : null}    */}

       
        </Box>
    )
}

export default Plan