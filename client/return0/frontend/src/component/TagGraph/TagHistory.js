import React, { Fragment, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import HistoryGraph from "./HistoryGraph";
import Button from '@mui/material/Button';
import * as XLSX from "xlsx";
import IconButton from "@mui/material/IconButton";
import { FiSearch } from "react-icons/fi";
import dayjs from "dayjs";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Multiselect from 'multiselect-react-dropdown';
import { SiMicrosoftexcel } from "react-icons/si";
//

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(value, personName, theme) {
  return {
    fontFamily:"Pretendard",
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

//



const TagHistory = () => {
  const [startDate, setStartDate] = useState("2022-03-07");
  const [endDate, setEndDate] = useState("2022-03-14");
  const [Check, setCheck] = useState(false);
  const [HistoryData, setHistoryData] = useState([]);

  const [selected, setSelected] = useState([]);
  const [selectCheck, setSelectCheck] = useState(false);
  const [selectClick, setSelectClick] = useState(0); //  젤 처음 클릭 여부
  const [selectOptions, setSelectOptions] = useState([]);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [optionName, setOptionName] = React.useState([]);


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


  const onChangeSelected = function (event) {
    

    console.log("-------");
    console.log(event);
    console.log("-------");
    setSelectOptions(event);
    setSelectClick(selectClick + 1);
    event !== selected ? setSelectCheck(true) : setSelectCheck(false);
    setSelected(event);
    Check ? setCheck(false) : null;
  };



  const handleOnExport = () => {

    let wb = XLSX.utils.book_new();
    let Heading = [
      [
        "PressLogPressId",
        "PressLogTime",
        "PressLogStatus",
        "PressLogPunch",
      ],
    ];

    let ws = XLSX.utils.aoa_to_sheet(Heading);
    XLSX.utils.sheet_add_json
      (ws, HistoryData, {
        header: [
          "press_log_id",
          "id",
          "status",
          "punch"

        ],
        skipHeader: true,
        origin: -1,
      });

    // let worksheet = XLSX.utils.json_to_sheet(rows);
    // const startDateFormat = startDate.format('YYYY-MM-DD')
    // const endDateFormat = endDate.format('YYYY-MM-DD')

    XLSX.utils.book_append_sheet(wb, ws, "TagHistory");
    XLSX.writeFile(
      wb,
      // `TagHistory_220501-220505.xlsx`
      `TagHistory_${dayjs(startDate).format("YYYY-MM-DD")}-${dayjs(endDate).format("YYYY-MM-DD")}.xlsx`
    );
  };

  const searchHandler = () => {
    setCheck(true);
    setExcelButton(false);
  };

  const handleOnExportTest = () => {
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.json_to_sheet(null);

    XLSX.utils.book_append_sheet(workbook, null, "test");
    XLSX.writeFile(workbook, "test.xlsx");
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
      height: "100%",
      padding: "30px",
      userSelect: "none",
    },
  }));
  const [excelButton, setExcelButton] = useState({ display: 'none' });

  const classes = useStyles();

  return (
    <Fragment>
    <Box className={classes.backgroundpaper}
            boxShadow={1}
            marginLeft="10px"
            width='100%'
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
          Tag 히스토리

        </Typography>

        <div >
          <Box  sx={{
              display: "flex",
              marginLeft:"30px"
            }}>
          <Box width={"500px"}>
          <LocalizationProvider dateAdapter={AdapterDateFns}  >
            <DesktopDatePicker
              label="시작일"
              value={startDate}
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              maxDate={endDate}
              onChange={(newstartDate) => {
                setStartDate(newstartDate);
              }}
              renderInput={(params) => <TextField {...params} sx={{ width:"45%", marginRight:"20px"}}/>}
            />
          </LocalizationProvider>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="종료일"
              value={endDate}
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              minDate={startDate}
              onChange={(newendDate) => {
                setEndDate(newendDate);
              }}
              renderInput={(params) => <TextField {...params}  sx={{ width:"45%", margin:"0px"}}/>}
            />
          </LocalizationProvider>
          </Box>
    

          <Box width="480px"  marginRight="30px" marginBottom={"30px"}>

           <Multiselect
              displayValue="label"
              options={options}
              selectedValues={selected}
              onSelect={onChangeSelected}
              selectionLimit={5}
              placeholder="설비 선택"
              style={{
                chips: {
                  background: '#83DAD0',
                  color:'#2F3136',
                  fontFamily:'Pretendard'
                },
                multiselectContainer: {
                  color: '#2F3136',
                  fontFamily:'Pretendard'
                },
                searchBox: {
                  padding: "13.5px",
                }
              }}
            /> 
          </Box>
            
          <Box >

                  <IconButton 
                  
                  onClick={() => {setCheck(true); setExcelButton({display: ''});}}  

                  sx={{
                    marginRight:"20px",
                    verticalAlign:"center",
                    color:"primary.button.primary",
                    top:"10px",
                  }}>
                
                <FiSearch fontSize="30"/>
              </IconButton>
                  {/* <Button variant="contained" onClick={() => {setCheck(true); setExcelButton({display: ''});}} style={{width:'150px', marginLeft:'50px', height:'53px',}}>
                        <Typography color="primary.text.color" fontFamily="Pretendard" fontWeight="550" style={{textAlign:"center"}}

                          variant="h6" >
                            검 색
                          </Typography>
              </Button> */}
              <IconButton 
                  onClick={handleOnExport} 
                  backgroundColor="palette.bgcolor"
            
                  sx={{
                     
                    verticalAlign:"center",
                    color:"primary.button.primary",
                    top:"10px",
                  }}>
                
                <SiMicrosoftexcel fontSize="30"/>
              </IconButton>
            </Box>
       

          {/* <Button 
                  variant="contained" onClick={handleOnExport}
                  position = "absolute"  
                  left = "300px"  
                  style={{
                    display: excelButton,
                    marginLeft : "50px",
                    height:'53px'
                  }}
                  >
                    
                <Typography color="primary.text.color" fontFamily="Pretendard" fontWeight="550" style={{textAlign:"center"}}
                      variant="h6" >
                        엑셀 다운로드
                      </Typography>
              </Button> */}
  
          </Box>

         
      {/* <IconButton sx={{  color:"primary.button.primary", pading: "0", }} onClick={()=>setCheck(true)}>

        <FiSearch fontSize={"30"}/> 
      </IconButton> */}

          {Check ? <HistoryGraph
            startDate={dayjs(startDate).format("YYYY-MM-DD")}
            endDate={dayjs(endDate).format("YYYY-MM-DD")}
            setHistoryData={setHistoryData}
            selectOptions={selectOptions}
          /> : null}

        </div>
      </Box>
    </Fragment>

  )
}

export default TagHistory