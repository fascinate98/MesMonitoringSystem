import {
  SelectColumnFilter,
  DefaultColumnFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
  RangeSliderColumnFilter,
} from "./Filter";

export var FILTERCOLUMNS = [
  {
    Header: "Lot No",
    accessor: "materialLotno",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "작업 시작 시각",
    accessor: "joborderResultStartTime",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "작업 종료 시각",
    accessor: "joborderResultFinishTime",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "지시 번호",
    accessor: "joborderOrdernum",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "작업자",
    accessor: "userName",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "계획 중량",
    accessor: "joborderWeight",
    Filter: RangeSliderColumnFilter,
    filter: "between",
  },
  {
    Header: "생산 중량",
    accessor: "joborderResultWeight",
    Filter: RangeSliderColumnFilter,
    filter: "between",
  },
  {
    Header: "창고",
    accessor: "warehouseName",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "품번",
    accessor: "materialProdName",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
];
