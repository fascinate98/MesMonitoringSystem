import {
  SelectColumnFilter,
  DefaultColumnFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
  RangeSliderColumnFilter,
} from "./Filter";

export var COLUMNS = [
  {
    Header: "이상 번호",
    accessor: "isAbnormalId",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "이상 설비 번호",
    accessor: "isAbnormalPressId",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "이상 분류",
    accessor: "isAbnormalStatus",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "발생 시각",
    accessor: "isAbnormalRegDate",
    Filter: SelectColumnFilter,
    filter: "equals",
  }
];
