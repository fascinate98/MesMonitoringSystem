import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
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
import { makeStyles } from "@material-ui/core/styles";
import { call } from "../../service/ApiService"; //  통신
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export default function Performance() {
  //   let columns = Object.keys(Data[0]);  //columns list before using react table.

  // we momoized the columns and data so that our table don't get render again and again.

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("ACCESS_TOKEN")) {
      navigate("/", { replace: true });
      // document.location.href = "/";
    }
    call(`/api/performance`, {}, 2).then((response) => {
      setAPIData(response.data.data);
      setPageSize(14);
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
      width: "100%",
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
      backgroundColor: "#F9F9F9",
      whiteSpace: "nowrap",
      borderRadius: "38px",
      userSelect: "none",
      height: "380px",
    },
  }));

  const classes = useStyles();

  return (
    <Box
      className={classes.backgroundpaper}
      boxShadow={1}
      marginLeft="10px"
      backgroundColor="primary.background.contents"
      width={"100%"}
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
        생산실적
      </Typography>
      <ChakraProvider>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={2}>
            <Box
              className={classes.backgroundpaper}
              boxShadow={1}
              color={"primary.text.primary"}
              backgroundColor="primary.background.contents"
              height="710px"
            >
              {headerGroups.map((headerGroup, indexKey) => (
                <div
                  p="0"
                  key={indexKey}
                  {...headerGroup.getHeaderGroupProps()}
                  marginLeft={"100px"}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <div
                      borderColor="gray.200"
                      className="th1"
                      key={columnIndex}
                      style={{
                        fontSize: "15",
                        fontWeight: "600",
                        color: "primary.button.primary",
                        fontFamily: "Pretendard",
                      }}
                    >
                      {/* This will render the Title of column */}
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Box textAlign="center">
              <Text fontSize="2xl" textAlign="center" />
              <Box
                maxH="30em"
                sx={{
                  color: "primary.text.primary",
                  marginBottom: "40px",
                  overflowX: "scroll",
                  "&::-webkit-scrollbar": {
                    width: "16px",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    height: "9px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "primary.scroll.primary",
                  },
                }}
              >
                <Table
                  {...getTableProps()}
                  size="sm"
                  variant="simple"
                  height={"620px"}
                  sx={{}}
                >
                  <Thead
                    p="0"
                    position="sticky"
                    zIndex="1"
                    top="0px"
                    style={{ overflow: "scroll" }}
                    bg="transparent"
                    sx={{ color: "primary.text.primary" }}
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
                                  className="td1"
                                  fontSize={15}
                                  fontWeight={600}
                                  fontFamily="Pretendard"
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
                      <Text textAlign="center" fontSize="1em" mx="auto">
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
                      icon={<ChevronLeftIcon />}
                      disabled={!canPreviousPage}
                      onClick={() => previousPage()}
                    />
                    <Text m="0" alignSelf="center" fontFamily={"Pretendard"}>
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
          </Grid>
        </Grid>
      </ChakraProvider>
    </Box>
  );
}
