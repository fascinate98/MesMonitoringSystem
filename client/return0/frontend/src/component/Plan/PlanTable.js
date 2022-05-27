import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
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
} from "../Performance/Filter";
import { call } from "../../service/ApiService"; //  통신
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FiDivide } from "react-icons/fi";
import PlanDetailTable from "./PlanDetailTable";
import Button from "@mui/material/Button";

const PlanTable = ({
  showTable,
  setShowTable,
  showDetailTable,
  setShowDetailTable,
  selected,
  setSelected,
  handleClickOpen,
}) => {
  //   let columns = Object.keys(Data[0]);  //columns list before using react table.

  // we momoized the columns and data so that our table don't get render again and again.

  const [APIData, setAPIData] = useState([]);
  const emg = [{ name: "일반" }, { name: "긴급" }];

  function getPlan() {
    call(`/api/plan`, {}, 2).then((response) => {
      var planData = response.data.data;
      for (var i = 0; i < planData.length; i++) {
        planData[i].joborderEmg = planData[i].joborderEmg === 0 ? "일반" : "🚨";
      }
      setAPIData(planData);
      setPageSize(10);
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
    console.log(APIData);
  }, [APIData]);
  // useEffect(() => {
  //   console.log("selected: ", selected);
  //   if (selected !== null) {
  //     getPlan(selected);
  //   }
  // }, [selected]);

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

  const getCellValue = (e, j) => {
    console.log(e);
    // setCellValue((cellvalue) =>
    //   cellvalue === "blue" ? (cellvalue = "red") : (cellvalue = "blue")
    // );
    setSelectedId(e.id);
    setColumn(j);
  };
  const [column, setColumn] = useState(-1);
  const [selectedId, setSelectedId] = useState(-1);
  const classes = useStyles();

  return (
    <>
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
                        color: "primary.text.primary",
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
                color="primary.text.primary"
                sx={{
                  overflowX: "scroll",
                  marginBottom: "40px",
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
                  height="480px"
                >
                  <Thead
                    p="0"
                    position="sticky"
                    zIndex="1"
                    top="0px"
                    bg="none"
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
                            borderColor="gray.800"
                            p="1em"
                            className="th1"
                            key={columnIndex}
                            fontSize={18}
                            color="primary.text.primary"
                            fontFamily="Pretendard"
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
                      page.map((row, j) => {
                        prepareRow(row);
                        return (
                          <Tr
                            className="tr1"
                            {...row.getRowProps()}
                            onClick={() => getCellValue(row, j)}
                            style={{
                              background:
                                selectedId === row.id && column === j
                                  ? "#C6F6D5"
                                  : "none",
                              color:
                                selectedId === row.id && column === j
                                  ? "#000000"
                                  : "primary.text.primary",
                            }}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <Td
                                  fontSize={15}
                                  fontWeight={600}
                                  fontFamily="Pretendard"
                                  color="primary.text.primary"
                                  className="td1"
                                  borderColor="gray.200"
                                  {...cell.getCellProps()}
                                  onClick={(e) => {
                                    console.log(
                                      "cell.row.original.joborderId: ",
                                      cell.row.original.joborderId
                                    );
                                    setSelected(cell.row.original.joborderId);
                                  }}
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
              <div style={{ marginLeft: "auto" }}>
                <Spacer />
                <Box
                  sx={{
                    display: "grid",
                    gridAutoFlow: "row",
                    gridTemplateColumns: "repeat(12, 1fr)",
                  }}
                >
                  <Box gridColumn="span 2"></Box>
                  <Box
                    gridColumn="span 8"
                    color={"primary.button.paging"}
                    display="flex"
                    justifyContent="center"
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
                  </Box>
                  <Box gridColumn="span 2" fontFamily={"Pretendard"}>
                    <Button
                      style={{
                        width: "100px",
                        fontFamily: "Pretendard",
                        fontWeight: "600",
                      }}
                      variant="contained"
                      onClick={handleClickOpen}
                    >
                      등 록
                    </Button>
                  </Box>
                </Box>
              </div>
            </Box>

            <PlanDetailTable
              showDetailTable={showDetailTable}
              setShowDetailTable={setShowDetailTable}
              selected={selected}
              setSelected={setSelected}
            />
          </Grid>
        </Grid>
      </ChakraProvider>
    </>
  );
};

export default PlanTable;
