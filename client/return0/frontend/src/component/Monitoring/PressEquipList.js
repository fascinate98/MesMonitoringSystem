import React, { useState, useEffect, useRef } from "react";
import PressEquip from "./PressEquip";
import Box from "@mui/material/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

export default function PressEquipList({ equiplist, equiplist2, fetchData, press_status, openTime }) {
  var index = 0;
  const [items, setItem] = useState([]);
  const [items2, setItem2] = useState([]); // 10초 전 데이타~
  const press_count = 5;
  

  // const [index, setIndex] =useState(0);
  const savedCallback = useRef();
  const nameList = ["a"];
  const defaultDataList = nameList.map(name => ({
    name: name,
    data: [],
    
    
  }));
  const [dataList0, setDataList0] = React.useState(defaultDataList);
  const [dataList1, setDataList1] = React.useState(defaultDataList);
  const [dataList2, setDataList2] = React.useState(defaultDataList);
  const [dataList3, setDataList3] = React.useState(defaultDataList);
  const [dataList4, setDataList4] = React.useState(defaultDataList);
  const [dataList5, setDataList5] = React.useState(defaultDataList);
  const [dataList6, setDataList6] = React.useState(defaultDataList);
  const [dataList7, setDataList7] = React.useState(defaultDataList);
  const [dataList8, setDataList8] = React.useState(defaultDataList);
  const [dataList9, setDataList9] = React.useState(defaultDataList);
  const [dataList10, setDataList10] = React.useState(defaultDataList);
  const [dataList11, setDataList11] = React.useState(defaultDataList);
  const [dataList12, setDataList12] = React.useState(defaultDataList);
  const [dataList13, setDataList13] = React.useState(defaultDataList);
  const [dataList14, setDataList14] = React.useState(defaultDataList);
  const [dataList15, setDataList15] = React.useState(defaultDataList);
  const [dataList16, setDataList16] = React.useState(defaultDataList);
  const [dataList17, setDataList17] = React.useState(defaultDataList);
  const [dataList18, setDataList18] = React.useState(defaultDataList);
  const [dataList19, setDataList19] = React.useState(defaultDataList);
  const [dataList20, setDataList20] = React.useState(defaultDataList);
  const [dataList21, setDataList21] = React.useState(defaultDataList);
  const [dataList22, setDataList22] = React.useState(defaultDataList);
  const [dataList23, setDataList23] = React.useState(defaultDataList);
  const [dataList24, setDataList24] = React.useState(defaultDataList);
  const [dataList25, setDataList25] = React.useState(defaultDataList);
  const [dataList26, setDataList26] = React.useState(defaultDataList);
  const [dataList27, setDataList27] = React.useState(defaultDataList);

  useEffect(() => {
    var itemArray = [];



    for (var i = 0; i < equiplist.length; i++) {
  
      var isAbnormal1 = false;
      var isUnder = false;
      if (equiplist2.length !== 0) {
        isAbnormal1 =
          //equiplist[i].press_log_punch > 0 &&
            (equiplist[i].press_log_punch === equiplist2[i].press_log_punch) && equiplist[i].press_log_status === 1
            ? true
            : false;

        isUnder = (equiplist[i].press_log_punch - equiplist2[i].press_log_punch) < 10  ? true : false;
      }
      var isAbnormal2 = false;
      isAbnormal2 =
        equiplist[i].press_log_punch === -1 || equiplist[i].press_log_status === -1
        //&& equiplist[i].press_log_status === 1
          ? true
          : false;
      function ArrayPush(data) {
        if (data !== null) {
          itemArray.push({
            id: equiplist[i].press_log_press_id,
            oper: equiplist[i].press_log_status,
            punch: equiplist[i].press_log_punch,
            isAbnormal1: isAbnormal1,
            isAbnormal2: isAbnormal2,
            isUnder: isUnder,
            data: data
          });
        } else {
          itemArray.push({
            id: equiplist[i].press_log_press_id,
            oper: equiplist[i].press_log_status,
            punch: equiplist[i].press_log_punch,
            isAbnormal1: isAbnormal1,
            isAbnormal2: isAbnormal2,
            isUnder: isUnder,
            data: null
          });
        }
      }
      function addDataRandomly(data, punchData) {
        if(data.length > 7){
          data.shift();
        }
        
        return [
          ...data,
          {
            x: new Date(),
            y: punchData
          }
        ];
      };
      function listMap(list, punch) {
        return list.map(val => {
          return {
            name: val.name,
            data: addDataRandomly(val.data, punch)
          };
        })
      }
      if (press_status === 2) { //  공정 모니터링 눌렀을 때만, 
        switch (i) {
          case 0: setDataList0(listMap(dataList0, equiplist[i].press_log_punch));ArrayPush(dataList0); break;
          case 1: setDataList1(listMap(dataList1, equiplist[i].press_log_punch)); ArrayPush(dataList1); break;
          case 2: setDataList2(listMap(dataList2, equiplist[i].press_log_punch)); ArrayPush(dataList2); break;
          case 3: setDataList3(listMap(dataList3, equiplist[i].press_log_punch)); ArrayPush(dataList3); break;
          case 4: setDataList4(listMap(dataList4, equiplist[i].press_log_punch)); ArrayPush(dataList4); break;
          case 5: setDataList5(listMap(dataList5, equiplist[i].press_log_punch)); ArrayPush(dataList5); break;
          case 6: setDataList6(listMap(dataList6, equiplist[i].press_log_punch)); ArrayPush(dataList6); break;
          case 7: setDataList7(listMap(dataList7, equiplist[i].press_log_punch)); ArrayPush(dataList7); break;
          case 8: setDataList8(listMap(dataList8, equiplist[i].press_log_punch)); ArrayPush(dataList8); break;
          case 9: setDataList9(listMap(dataList9, equiplist[i].press_log_punch)); ArrayPush(dataList9); break;
          case 10: setDataList10(listMap(dataList10, equiplist[i].press_log_punch)); ArrayPush(dataList10); break;
          case 11: setDataList11(listMap(dataList11, equiplist[i].press_log_punch)); ArrayPush(dataList11); break;
          case 12: setDataList12(listMap(dataList12, equiplist[i].press_log_punch)); ArrayPush(dataList12); break;
          case 13: setDataList13(listMap(dataList13, equiplist[i].press_log_punch)); ArrayPush(dataList13); break;
          case 14: setDataList14(listMap(dataList14, equiplist[i].press_log_punch)); ArrayPush(dataList14); break;
          case 15: setDataList15(listMap(dataList15, equiplist[i].press_log_punch)); ArrayPush(dataList15); break;
          case 16: setDataList16(listMap(dataList16, equiplist[i].press_log_punch)); ArrayPush(dataList16); break;
          case 17: setDataList17(listMap(dataList17, equiplist[i].press_log_punch)); ArrayPush(dataList17); break;
          case 18: setDataList18(listMap(dataList18, equiplist[i].press_log_punch)); ArrayPush(dataList18); break;
          case 19: setDataList19(listMap(dataList19, equiplist[i].press_log_punch)); ArrayPush(dataList19); break;
          case 20: setDataList20(listMap(dataList20, equiplist[i].press_log_punch)); ArrayPush(dataList20); break;
          case 21: setDataList21(listMap(dataList21, equiplist[i].press_log_punch)); ArrayPush(dataList21); break;
          case 22: setDataList22(listMap(dataList22, equiplist[i].press_log_punch)); ArrayPush(dataList22); break;
          case 23: setDataList23(listMap(dataList23, equiplist[i].press_log_punch)); ArrayPush(dataList23); break;
          case 24: setDataList24(listMap(dataList24, equiplist[i].press_log_punch)); ArrayPush(dataList24); break;
          case 25: setDataList25(listMap(dataList25, equiplist[i].press_log_punch)); ArrayPush(dataList25); break;
          case 26: setDataList26(listMap(dataList26, equiplist[i].press_log_punch)); ArrayPush(dataList26); break;
          case 27: setDataList27(listMap(dataList27, equiplist[i].press_log_punch)); ArrayPush(dataList27); break;
          default : break;
        }


      }
      
      else {  //  알림 뜨는 것
        ArrayPush(null);
      }
    }
    setItem(itemArray);
  }, [equiplist]);
  


  const useStyles = makeStyles((theme) => ({

    // root: {
    //   "& .MuiPaper-root": {
    //     backgroundColor:'primary.bgcolor',
    //     color:"#848B9D",
        
    //   },

    //   paper:{
    //     padding: theme.spacing(3, 2),
    //     height: 200,
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center"
    //   }
    // }, 

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

  return (
    <Box
      className={classes.container}
         sx={{
           display: "grid",
           gridTemplateColumns: "repeat(7, 1fr)",
           gridTemplateRows: "repeat(4, 165px)",
           gap: "20px",
           rowGap: "20px",
         }}
          >
        {items.map((item) => {
          return (
            <PressEquip
              id={item.id}
              oper={item.oper}
              punch={item.punch}
              isAbnormal1={item.isAbnormal1}
              isAbnormal2={item.isAbnormal2}
              isUnder={item.isUnder}
              press_status={press_status}
              openTime={openTime}
              dataList={item.data}
            />
          );
        })}
        
        </Box>
  );
}

// PressEquipList.propTypes = {
//     equiplist: PropTypes.arrayOf(PropTypes.shape(PressEquip.propType))
// }