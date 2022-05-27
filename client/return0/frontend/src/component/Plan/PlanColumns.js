import {
  SelectColumnFilter,
  DefaultColumnFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
  RangeSliderColumnFilter,
} from "../Plan/Filter";

export var COLUMNS = [
  {
    Header: "지시 일자",
    accessor: "joborderRegDate",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "긴급 여부",
    accessor: "joborderEmg",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "지시명",
    accessor: "joborderJobname",
    Filter: DefaultColumnFilter,
    // filter: "fuzzyText",
  },
  {
    Header: "사업장",
    accessor: "joborderWorkplace",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "설비",
    accessor: "slitterName",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "원자재명",
    accessor: "materialProdName",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "투입재 폭(m)",
    accessor: "materialWidth",
    Filter: RangeSliderColumnFilter,
    filter: "between",
  },
  {
    Header: "계획 폭(m)",
    accessor: "joborderWidth",
    Filter: RangeSliderColumnFilter,
    filter: "between",
  },
  {
    Header: "전체 줄 수",
    accessor: "joborderLine",
    Filter: RangeSliderColumnFilter,
    filter: "between",
  },
];
