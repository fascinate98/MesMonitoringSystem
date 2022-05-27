import React, { Fragment, useState } from "react";
import Tag from "./Tag";
import Multiselect from 'multiselect-react-dropdown';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from 'react-select';
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import Box from "@mui/material/Box";
import { Item } from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

const TagTrend = ({ openTime }) => {
  const [selected, setSelected] = useState([]);
  const [selectCheck, setSelectCheck] = useState(false);
  const [selectClick, setSelectClick] = useState(0); //  젤 처음 클릭 여부
  const [selectOptions, setSelectOptions] = useState([]);

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
  
  const onChangeSelected = function (event, value) {
    console.log("-------");
    console.log(event);
    console.log("-------");
    setSelectOptions(value);
     console.log("----selectOptions---");
     console.log(selectOptions);
     console.log("----selectOptions---");
    setSelectClick(selectClick + 1);
    event !== selected ? setSelectCheck(true) : setSelectCheck(false);
    setSelected(event);
  };


  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
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
  }));

  const classes = useStyles();

  const customStyles = {
    control: (base) => ({
      ...base,
      background: "primary.background.contents",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0
    }),
    menuList: (base) => ({
      ...base,
      padding: 0
    })
  };

  return (
      <Box className={classes.backgroundpaper}
              boxShadow={1}
              marginLeft="10px"
              width='100%'
              minHeight='700px'
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
            Tag 트렌드
          </Typography>
          <Box
          width={"480px"}
            marginBottom={"30px"}
              marginLeft="30px"
          >
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
              color: 'primary.text.primary',
              fontFamily:'Pretendard'
            },
            searchBox: {
              padding: "15px",
            }
          }}
              />
             </Box>
        
          <Box>
            <Tag
              selected={selected}
              openTime={openTime}
              selectCheck={selectCheck}
              setSelectCheck={setSelectCheck}
              selectoptions={options}
              selectClick={selectClick}
              setSelectClick={setSelectClick}
            />
          </Box>

              
      </Box>
  );
};

export default TagTrend;