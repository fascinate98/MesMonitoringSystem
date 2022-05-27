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
import { FiSearch } from "react-icons/fi";

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
import { COLUMNS } from "./Columns";
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
} from "./Filter";
import axios from "axios";
import styles from "../../../../assets/scss/component/Condition.scss";
import { call } from "../../../service/ApiService"; //  통신
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Condition = () => {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    call(`/api/condition`, 2).then((response) => {
      var planData = response.data.data;
      for (var i = 0; i < planData.length; i++) {
        // console.log(planData[i].isAbnormalStatus);
        planData[i].isAbnormalStatus =
          planData[i].isAbnormalStatus === 1
            ? "누적 타발수 증가값 이상"
            : "누적 타발수 입력오류";
      }
      setAPIData(planData);
      setPageSize(5);
    });
  }, []);
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

  const useStyles = makeStyles((theme) => ({
    backgroundpaper: {
      whiteSpace: "nowrap",
      borderRadius: "38px",
      padding: "30px",
      userSelect: "none",
      backgroundColor: "#123123",
      height: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ChakraProvider>
        <Box p="1em" textAlign="center">
          {/* <Text p="1em" fontSize="30px" textAlign="center" /> */}
          <Box
            maxH="30em"
            overflowY="scroll"
            sx={{ color: "primary.text.primary" }}
          >
            <Table
              {...getTableProps()}
              size="sm"
              variant="simple"
              colorScheme="gray"
              mb={"30px"}
              sx={{ borderCollapse: "collapse ", height: "300px" }}
            >
              <Thead
                p="0"
                position="sticky"
                zIndex="1"
                top="0px"
                style={{ overflow: "scroll" }}
                bg="transparent"
              >
                {headerGroups.map((headerGroup, indexKey) => (
                  <Tr
                    p="0"
                    key={indexKey}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, columnIndex) => (
                      <Th
                        fontSize={18}
                        fontFamily="Pretendard"
                        color="primary.text.primary"
                        borderColor="gray.800"
                        p="1em"
                        className="th1"
                        key={columnIndex}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {/* This will render the Title of column */}
                        {column.render("Header")}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "▼"
                            : "▲"
                          : "　"}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>

              <Tbody className="body1" p="1em" {...getTableBodyProps()}>
                {page && page.length > 0 ? (
                  page.map((row) => {
                    prepareRow(row);
                    return (
                      <Tr className="tr1" {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <Td
                              fontSize={15}
                              fontWeight={600}
                              fontFamily="Pretendard"
                              color="primary.text.primary"
                              borderColor="gray.200"
                              className="td1"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                              {""}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })
                ) : (
                  <Text
                    textAlign="center"
                    fontSize="1em"
                    mx="auto"
                    color={"primary.text.primary"}
                  >
                    No Data Found
                  </Text>
                )}
              </Tbody>
            </Table>
          </Box>
          <div style={{ width: "100%", marginLeft: "auto" }}>
            <Spacer />
            <Box color={"primary.button.paging"}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  _focus={{ boxShadow: "" }}
                  _hover={{ backgroundColor: "" }}
                  _active={{ backgroundColor: "" }}
                  color=""
                  bg=""
                  fontSize="15px"
                  icon={<ArrowLeftIcon />}
                  disabled={!canPreviousPage}
                  onClick={() => gotoPage(0)}
                />
                <IconButton
                  _focus={{ boxShadow: "" }}
                  _hover={{ backgroundColor: "" }}
                  _active={{ backgroundColor: "" }}
                  color=""
                  bg=""
                  fontSize="30px"
                  icon={<ChevronLeftIcon color={"primary.text.primary"} />}
                  disabled={!canPreviousPage}
                  onClick={() => previousPage()}
                />

                <Text m="0" alignSelf="center">
                  {pageIndex + 1} - {pageOptions.length}{" "}
                </Text>

                <IconButton
                  _focus={{ boxShadow: "" }}
                  _hover={{ backgroundColor: "" }}
                  _active={{ backgroundColor: "" }}
                  color=""
                  bg=""
                  fontSize="30px"
                  icon={<ChevronRightIcon />}
                  disabled={!canNextPage}
                  onClick={() => nextPage()}
                />
                <IconButton
                  _focus={{ boxShadow: "" }}
                  _hover={{ backgroundColor: "" }}
                  _active={{ backgroundColor: "" }}
                  color=""
                  bg=""
                  fontSize="15px"
                  icon={<ArrowRightIcon />}
                  disabled={!canNextPage}
                  onClick={() => gotoPage(pageCount - 1)}
                />
              </div>
            </Box>
          </div>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Condition;
