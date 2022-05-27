import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  IconButton,
  Flex,
  Input,
  Spacer,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuOptionGroup,
  MenuList,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
// import Data from "./Data.json";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
} from "react-table";
import { COLUMNS } from "./PlanColumns";
import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  fuzzyTextFilterFn,
  // Table,
  filterGreaterThan,
  filterLessThan,
} from "../Plan/Filter";
import { call } from '../../service/ApiService';  //  통신
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const PlanTable = ({showTable, setShowTable, showDetailTable, selected, setSelected}) => {
  //   let columns = Object.keys(Data[0]);  //columns list before using react table.

  // we momoized the columns and data so that our table don't get render again and again.

  const [APIData, setAPIData] = useState([]);
  const emg = [{ name: "일반" }, { name: "긴급" }];
  console.log("plantable");
  function getPlan (){
    call(`/api/plan`, {}, 2).then((response) => {
      var planData = response.data.data;
      for (var i = 0; i < planData.length; i++) {
        planData[i].joborderEmg =
          planData[i].joborderEmg === 0 ? "" : "🚨";
      }
      setAPIData(planData);
      setShowTable(false);
    });
    console.log(tableInstance);
   
  }
  useEffect(() => {
    getPlan();
  }, []);
  useEffect(() => {
    getPlan();
  }, [showTable]);
  useEffect(() => {
    console.log(APIData)
  }, [APIData]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => APIData);
 const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setSortBy,
    allColumns,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize
  } = tableInstance;
  const { pageSize, pageIndex } = state;

  const [selectedSortColumn, setSelectedSortColumn] = useState({
    id: "",
    desc: false,
  });

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  function handleSort(e) {
    let temp = Object.assign({}, selectedSortColumn);
    temp["id"] = e;
    setSelectedSortColumn(temp);
    setSortBy([temp]);
  }

  const typeOfSort = (e) => {
    let tempColumn;
    if (e == "0") {
      tempColumn = Object.assign({}, selectedSortColumn);
      tempColumn["desc"] = false;
      setSelectedSortColumn(tempColumn);
      setSortBy([tempColumn]);
    } else {
      tempColumn = Object.assign({}, selectedSortColumn);
      tempColumn["desc"] = true;
      setSelectedSortColumn(tempColumn);
      setSortBy([tempColumn]);
    }
  };

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

  return (
    <>
      <ChakraProvider>
          <Box>
              
                {headerGroups.map((headerGroup, indexKey) => (
                  <div
                    p="0"
                    key={indexKey}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, columnIndex) => (
                      <Box 
                      key={columnIndex}
                      className={classes.backgroundpaper}
                      height='30px'
                      color="black"
                      style={{
                        backgroundColor:'transparent'
                      }}

                    >
                        {/* This will render the Title of column */}
                        {column.render("Header")}
                        {"　"}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon />
                          ) : (
                            <TriangleUpIcon />
                          )
                        ) : (
                          ""
                        )}
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </Box>
                    ))}
                  </div>
                ))}
             
        </Box>
      </ChakraProvider>
    </>
  );
};

export default PlanTable;