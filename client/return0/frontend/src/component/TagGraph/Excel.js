import * as XLSX from "xlsx"; 
 
<CommonButton className='excel-btn' onClick={()=> excelDownload(columns)}>
   엑셀 다운로드
 </CommonButton>

 // 엑셀 등록
 const handleFile = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        setRows([...rows]);
        return;
      }
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray, { type: "buffer" });
        const worksheetname = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetname];
        const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });

        const excelData = data.map((row) => {
          if (row.receivingDate.indexOf("/") != -1) {
            let rowDate = row.receivingDate.split("/");
            row.receivingDate =
              ("20" + rowDate[2]).slice(-4) +
              "-" +
              ("0" + rowDate[0]).slice(-2) +
              "-" +
              ("0" + rowDate[1]).slice(-2);
            return row;
          }
          return row;
        });
        console.log(excelData);
        resolve(excelData);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      registerExcelTable(d);
    });
  };

  // 엑셀 다운로드
  const handleOnExport = () => {
    let workbook = XLSX.utils.book_new();
    let Heading = [
      [
        "PressLogPressId",
        "PressLogTime",
        "PressLogStatus",
        "PressLogPunch"
      ],
    ];

    let worksheet = XLSX.utils.aoa_to_sheet(Heading);
    XLSX.utils.sheet_add_json(worksheet, rows, {
      header: [
        "PressLogPressId",
        "PressLogTime",
        "PressLogStatus",
        "PressLogPunch",
      ],
      skipHeader: true,
      origin: -1,
    });

    // let worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "구입재료 입고처리");
    XLSX.writeFile(
      workbook,
      `TagHistory_${excelFormating(startDate)}-${excelFormating(endDate)}.xlsx`
    );
  };




  
// const fileType =
// "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// const fileExtension = ".xlsx";
// const ws = XLSX.utils.json_to_sheet([
// {
//   id: 1,
//   name: "Daniel",
//   age: "20",
//   sex: "M"
// },
// {
//   id: 2,
//   name: "Kim",
//   age: "30",
//   sex: "M"
// },
// {
//   id: 3,
//   name: "Lee",
//   age: "33",
//   sex: "M"
// },
// {
//   id: 4,
//   name: "Min",
//   age: "50",
//   sex: "F"
// },
// {
//   id: 5,
//   name: "Yun",
//   age: "20",
//   sex: "F"
// }
// ]);
// const Day = new Date();
// const fileDownload = () => {
// const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
// const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// const data = new Blob([excelBuffer], { type: fileType });
// // saveAs(data, `${Day.format("YY-MM-DD")}${fileExtension}`);
// saveAs(data, `${selectDate}${fileExtension}`)
// };

// // const [excelState, setexcelState] = useState(false);


// const excelDownload = (columns) => {
//   const ws = xlsx.utils.json_to_sheet(columns);
//   const wb = xlsx.utils.book_new();

//   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
//   xlsx.writeFile(wb, `${state.title}_${Date.now().tost}.xlsx`);
// };

// 엑셀 다운로드
// const [rows, setRows] = useState();