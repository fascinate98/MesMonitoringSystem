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
import { COLUMNS } from "./PlanDetailColumns";
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
} from "../Performance/Filter";
import Grid from "@material-ui/core/Grid";

import Box from "@mui/material/Box";
import { call } from '../../service/ApiService';  //  통신

const PlanDetailTable = ({
  showDetailTable,
  setShowDetailTable,
  selected,
  setSelected,
}) => {
  //   let columns = Object.keys(Data[0]);  //columns list before using react table.

  // we momoized the columns and data so that our table don't get render again and again.

  const [APIData, setAPIData] = useState([]);
  const emg = [{ name: "일반" }, { name: "긴급" }];
  function getPlan(selected) {
    console.log(selected)
    call(`/api/plan`, { joborderId: selected }, 1).then((response) => {
      var planData = response.data.data;
      console.log(planData);
      if (planData) {
        for (var i = 0; i < planData.length; i++) {
         
            planData[i].joborderStatus = planData[i].joborderStatus === 0 ? "작업 전" : planData[i].joborderStatus === 1 ? "작업 중" : "작업 완료";
        }
        setAPIData(planData);
        setShowDetailTable(true);
        setPageSize(1);
      }
    });
    console.log(tableInstance);
  }
  useEffect(() => {
    console.log("selected: ", selected);
    if (selected !== null) {
      getPlan(selected);
    }
  }, [selected]);
  // useEffect(() => {
  //   getPlan();
  // }, [showDetailTable]);
  useEffect(() => {
    console.log(APIData);
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
    setPageSize,
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

  return (
    <>
      <ChakraProvider>
        <Box width="100%" p="1em" textAlign="center">   
          <Box maxH="30em" 
           color="primary.text.primary"
          sx={{overflowX:"scroll",
          '&::-webkit-scrollbar': {
            width: '16px',
            borderRadius: '8px',
            backgroundColor: "transparent",
            height:'10px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor:"primary.scroll.primary",
          },}} >
            <Table {...getTableProps()} size="sm" variant="simple">
              <Thead
                p="0"
                position="sticky"
                zIndex="1"
                top="0px"
                bg="transparent"
                sx={{color:"primary.text.primary"}}
              >
                {headerGroups.map((headerGroup, indexKey) => (
                  <Tr
                    p="0"
                    key={indexKey}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, columnIndex) => (
                      <Th
                      borderColor="gray.800"
                        p="1em"
                        className="th1"
                        key={columnIndex}
                        fontSize={18}
                        fontFamily="Pretendard"
                        color="primary.text.primary"

                        // {...column.getHeaderProps(
                        //   column.getSortByToggleProps()
                        // )}
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
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody className="body1" p="1em" height="50px"sx={{color:"primary.text.primary"}}
              {...getTableBodyProps()}>
                {page && page.length > 0 ? (
                  page.map((row) => {
                    prepareRow(row);
                    return (
                      <Tr className="tr1"    
                        fontSize={15}
                        fontWeight={600}
                        sx={{color:"primary.text.primary"}}                        
                        fontFamily="Pretendard"
                        borderColor="gray.800"                                                 
                      {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <Td
                              className="td1"
                              fontSize={15}
                              fontWeight={600}
                              fontFamily="Pretendard"
                              borderColor="gray.200"
                              color="primary.text.primary"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}{" "}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })
                ) : (
                  <Text textAlign="center" mx="auto"
                  fontSize={15}
                              fontWeight={600}
                              fontFamily="Pretendard"
                  sx={{color:"primary.text.primary"}}

                  >
                    No Data Found
                  </Text>
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      
      </ChakraProvider>
    </>
  );
};

export default PlanDetailTable;