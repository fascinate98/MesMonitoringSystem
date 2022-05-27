import React from 'react'
import { DataGrid } from '@mui/x-data-grid';import PropTypes from 'prop-types';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'jobname',
    headerName: '작업명',
    width: 150,
    editable: true,
  },
  {
    field: 'weight',
    headerName: '생산 중량',
    width: 150,
    editable: true,
  },
  {
    field: 'endDate',
    headerName: '납기일',
    width: 110,
    editable: true,
  },
  {
    field: 'estTime',
    headerName: '예상 시간',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'line',
    headerName: '줄 수',
    width: 110,
    editable: true,
  },
  {
    field: 'width',
    headerName: '폭',
    width: 110,
    editable: true,
  },
  {
    field: 'workplace',
    headerName: '사업장',
    width: 110,
    editable: true,
  },
  {
    field: 'slitterno',
    headerName: '설비 번호',
    width: 110,
    editable: true,
  },
  {
    field: 'material',
    headerName: '원자재',
    width: 110,
    editable: true,
  },
  {
    field: 'workernum',
    headerName: '작업인원',
    width: 110,
    editable: true,
  },
  {
    field: 'customer',
    headerName: '고객사',
    width: 110,
    editable: true,
  },
  {
    field: 'etc',
    headerName: '비고',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function RegistGrid({equiplist}){
    return (
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <br></br>
      <button>
        등록
      </button>
    </div>
    )
}