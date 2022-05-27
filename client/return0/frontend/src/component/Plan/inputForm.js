import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import { Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@material-ui/core/Select";
import FormData from "./FormData";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes, { number } from "prop-types";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EstimatedTime from "./EstimatedTime";
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function inputForm(props) {
  const [Jobname, setJobname] = useState("");
  const [Weight, setWeight] = useState(""); //  작업 중량
  const [EndDate, setEndDate] = useState(new Date());
  const [EstTime, setEstTime] = useState(""); //  예상 시간
  const [Line, setLine] = useState("");
  const [Width, setWidth] = useState(null); //  입력한 폭
  const [Worker, setWorker] = useState("");
  const [Warehouse, setWarehouse] = useState("");
  const [Workplace, setWorkplace] = useState("");
  const [Emergency, setEmergency] = useState("");
  const [Customer, setCustomer] = useState("");
  const [Slitter, setSlitter] = useState(""); //  설비 번호
  const [Material, setMaterial] = useState(""); //  원자재
  const [Note, setNote] = useState("");
  const [SubmitCheck, setSubmitcheck] = useState(false);
  //  예상시간
  const [SLWidth, setSLWidth] = useState(""); //  원자재 기본 폭
  const [SLTime, setSLTime] = useState(0); //  슬리터공정 완료 시간
  const [SLPunch, setSLPunch] = useState(0); //  슬리터별 완료 기준 펀치수
  const { open, handleClose, setShowTable } = props;

  // handleChange
  const handlerSetOpen = (e) => {
    setOpen(false);
  };
  const handleJobnameChange = (e) => {
    setJobname(e.target.value);
  };
  const handleMaterialChange = (e) => {
    MaterialList.filter(function (object) {
      //  작업 중량 바꾸기
      if (object["value"] === e.target.value) {
        setWeight(object["weight"]); //  원자재 별 무게
        setSLWidth(object["width"]); //  원자재 별 넓이
        setSLTime(object["SLtime"]); //  슬리터 걸리는 시간
        setSLPunch(object["MustPunch"]); //  슬리터별 펀치가 몇 개가 되어야하는지

        Width > object["width"] ? setWidth("") : null;
      }
    });
    setMaterial(e.target.value);
  };
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const handleEstTimeChange = (e) => {
    //  예상 시간
    setEstTime(e.target.value);
  };
  const handleWidthChange = (e) => {
    //  폭
    setWidth(SLWidth < parseInt(e.target.value) ? SLWidth : e.target.value); //  원자재 넓이 안 넘어 가게
  };
  const handleWorkerChange = (e) => {
    setWorker(e.target.value);
  };
  const handleCustomerChange = (e) => {
    setCustomer(e.target.value);
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitcheck(true);
    Swal.fire({
      title: "Success!",
      text: "Registration Success.",
      icon: "success",
      confirmButtonText: "OK",
    });
    // alert("등록되었습니다.");
    handleClose();
  };


  const handleWarehouseChange = (e) => {
    setWarehouse(e.target.value);
  };

  const handleWorkplaceChange = (e) => {
    setWorkplace(e.target.value);
  };

  const handleSlitterChange = (e) => {
    setSlitter(e.target.value);
  };

  const handleEmergencyChange = (e) => {
    setEmergency(e.target.value);
  };

  const MaterialList = [
    {
      value: "1",
      label: "COIL_305PM_215_001",
      weight: "5000",
      width: 1000,
      SLtime: 3,
      MustPunch: 380000,
    },
    {
      value: "2",
      label: "COIL_305PM_215_002",
      weight: "2500",
      width: 500,
      SLtime: 3,
      MustPunch: 300000,
    },
    {
      value: "3",
      label: "COIL_305PM_215_003",
      weight: "1500",
      width: 300,
      SLtime: 3,
      MustPunch: 320000,
    },
    {
      value: "4",
      label: "COIL_305PM_215_004",
      weight: "7000",
      width: 1400,
      SLtime: 5,
      MustPunch: 480000,
    },
    {
      value: "5",
      label: "COIL_305PM_215_005",
      weight: "6000",
      width: 1200,
      SLtime: 4.5,
      MustPunch: 420000,
    },
    {
      value: "6",
      label: "COIL_305PM_215_006",
      weight: "9000",
      width: 1800,
      SLtime: 5,
      MustPunch: 500000,
    },
    {
      value: "7",
      label: "COIL_305PM_215_007",
      weight: "5500",
      width: 1100,
      SLtime: 4.5,
      MustPunch: 400000,
    },
    {
      value: "8",
      label: "COIL_305PM_215_008",
      weight: "15000",
      width: 3000,
      SLtime: 6,
      MustPunch: 570000,
    },
    {
      value: "9",
      label: "COIL_305PM_215_009",
      weight: "3500",
      width: 700,
      SLtime: 4,
      MustPunch: 500000,
    },
  ];
  const SlitterList = [
    {
      value: "1",
      label: "SL_01",
    },
    {
      value: "2",
      label: "SL_02",
    },
    {
      value: "3",
      label: "SL_03",
    },
  ];
  const WorkplaceList = [
    {
      value: "포항",
      label: "포항",
    },
    {
      value: "광양",
      label: "광양",
    },
    {
      value: "천안",
      label: "천안",
    },
  ];
  const CustomerList = [
    {
      value: "현대중공업",
      label: "현대중공업",
    },
    {
      value: "LS",
      label: "LS",
    },
  ];
  const WarehouseList = [
    {
      value: "1",
      label: "창고1",
    },
    {
      value: "2",
      label: "창고2",
    },
    {
      value: "3",
      label: "창고3",
    },
    {
      value: "4",
      label: "창고4",
    },
  ];
  const EmergencyList = [
    {
      value: "0",
      label: "일반",
    },
    {
      value: "1",
      label: "긴급",
    },
  ];

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ backgroundColor: "" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          color="primary.text.primary"
          fontFamily="Pretendard"
          fontWeight="550"
        >
          생산계획 등록
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Box
            sx={{
              padding: "50px",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(6, 1fr)",
              gap: 6,
              rowGap: 6,
            }}
          >
            <TextField

              error={!Material}
              id="outlined-select-currency"
              select
              label="원자재"
              value={Material}
              onChange={handleMaterialChange}
            >
              {MaterialList.map((option, idx) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* <Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
            원자재
            <NativeSelect
                //labelId="demo-simple-select-helper-label"
                //id="demo-simple-select-helper"
                value={Material}
                onChange={handleMaterialChange}
              >
                <option value=""></option>
                <option value="1" key="1">COIL_305PM_215_001</option>
                <option value="2" key="2">COIL_305PM_215_002</option>
                <option value="3" key="3">COIL_305PM_215_003</option>
                
              </NativeSelect>
          </Typography> */}
            <TextField

              error={!Slitter}
              id="outlined-select-currency"
              select
              label="설비 번호"
              value={Slitter}
              onChange={handleSlitterChange}
            >
              {SlitterList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/*<Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
            설비 번호
            <NativeSelect
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={Slitter}
                onChange={handleSlitterChange}
              >
                <option value=""></option>
                <option value="1" key="1">SL_01</option>
                <option value="2" key="2">SL_02</option>
                <option value="3" key="3">SL_03</option>
                
              </NativeSelect>
          </Typography>*/}
            <TextField
              id="outlined"
              label="작업중량"
              disabled={true}
              value={Weight} /*onChange={handleWeightChange}*/
            />
            {/* <Typography gutterBottom color="primary.text.primary" fontFamily="Pretendard" fontWeight="550"  >
           작업중량 
              <Input 
                name="Weight"
                type="number"
                size="xl"
                className="form-control"
                onChange={handleWeightChange}
                color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" 
                value={Weight}
                style={{border:'none'}}
              />
          </Typography> */}

            <TextField
              id="outlined"
              label="원자재 폭"
              value={SLWidth}
              disabled={true}
            />
            {/*<Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
            폭
            <Input
                name="Width"
                type="number"
                size="xl"
                className="form-control"
                onChange={handleWidthChange}
                value={Width}
                 style={{border:'none'}}
              />
          </Typography>*/}
            <TextField
              id="outlined"
              label="예상 시간"
              disabled
              value={EstTime} /*onChange={handleEstTimeChange} */
            />
            {/*<Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
            예상 시간
              <Input
                name="EstTime"
                type="datetime"
                size="xl"
                className="form-control"
                color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" 
                onChange={handleEstTimeChange}
                value={EstTime}
                style={{border:'none'}}
               
              />
        </Typography>*/}
            <TextField
              required
              type={number}
              error={!Width}
              id="outlined"
              label="폭"
              value={Width}
              onChange={handleWidthChange}
            />
            {/*<Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
            폭
            <Input
                name="Width"
                type="number"
                size="xl"
                className="form-control"
                onChange={handleWidthChange}
                value={Width}
                 style={{border:'none'}}
              />
          </Typography>*/}
            <TextField
              error={!EndDate}
              id="date"
              label="납기일"
              type="date"
              value={EndDate}
              onChange={handleEndDateChange}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/*<LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
          label="납기일"
          inputFormat="yyyy-MM-dd"
          value={EndDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>*/}
            {/* <TextField id="outlined" label="납기일"    onChange={handleEndDateChange} /> */}
            {/* <Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
            납기일
              <Input
                name="EndDate"
                type="date"
                size="xl"
                className="form-control"
                color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" 
                onChange={handleEndDateChange}
                value={EndDate}
                style={{border:'none'}}
              />
          </Typography> */}
            <TextField
              error={!Worker}
              id="outlined"
              label="작업 인원"
              value={Worker}
              onChange={handleWorkerChange}
            />
            {/* <Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
            작업 인원
            <Input
                name="Worker"
                type="number"
                size="xl"
                className="form-control"
                onChange={handleWorkerChange}
                value={Worker}
                style={{border:'none'}}
              />
          </Typography> */}

            <TextField
              error={!Workplace}
              id="outlined-select-currency"
              select
              label="사업장"
              value={Workplace}
              onChange={handleWorkplaceChange}
            >
              {WorkplaceList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* <Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
              사업장
              <NativeSelect
                  //labelId="demo-simple-select-helper-label"
                  //id="demo-simple-select-helper"
                  value={Workplace}
                  onChange={handleWorkplaceChange}
                >
                  <option value=""></option>
                  <option value="포항" key="포항">포항</option>
                  <option value="광양" key="광양">광양</option>
                  <option value="천안" key="천안">천안</option>
                  
                </NativeSelect>
        </Typography>*/}

            <TextField
              error={!Customer}
              id="outlined-select-currency"
              select
              label="고객사"
              value={Customer}
              onChange={handleCustomerChange}
            >
              {CustomerList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/*<Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
          고객사
              <NativeSelect
                //labelId="demo-simple-select-helper-label"
                //id="demo-simple-select-helper"
                value={Customer}
                onChange={handleCustomerChange}
              >
                 <option value=""></option>
                <option value="현대중공업" key="현대중공업">현대중공업</option>
                <option value="LS" key="LS">LS</option>
              </NativeSelect>
          </Typography>*/}

            <TextField
              error={!Warehouse}
              id="outlined-select-currency"
              select
              label="창고"
              value={Warehouse}
              onChange={handleWarehouseChange}
            >
              {WarehouseList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/*-         <Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
             창고
             <NativeSelect
                //labelId="demo-simple-select-helper-label"
                //id="demo-simple-select-helper"
                value={Warehouse}
                onChange={handleWarehouseChange}
              >
                 <option value=""></option>
                <option value="1" key="1">창고1</option>
                <option value="2" key="2">창고2</option>
                <option value="3" key="3">창고3</option>
                <option value="4" key="4">창고4</option>
              </NativeSelect>
        </Typography>*/}

            <TextField
              error={!Emergency}
              id="outlined-select-currency"
              select
              label="긴급 여부"
              value={Emergency}
              onChange={handleEmergencyChange}
            >
              {EmergencyList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* <Typography gutterBottom  color="primary.text.primary" fontFamily="Pretendard" fontWeight="550" >
          긴급 여부
          <NativeSelect
                //labelId="demo-simple-select-helper-label"
                //id="demo-simple-select-helper"
                value={Emergency}
                onChange={handleEmergencyChange}
              >
                <option value=""></option>
                <option value="0" key="0">일반</option>
                <option value="1" key="1">긴급</option>
              </NativeSelect>
          </Typography> */}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "10px",
              width: "100px",
              fontFamily: "Pretendard",
              fontWeight: "600",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            등 록
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <FormData
        // Jobname={Jobname}
        Weight={Weight}
        EndDate={EndDate}
        EstTime={EstTime}
        // Line={Line}
        Width={Width}
        Workplace={Workplace}
        Worker={Worker}
        Customer={Customer}
        Note={Note}
        M_Selected={Material}
        s_Selected={Slitter}
        submitCheck={SubmitCheck}
        W_Selected={Warehouse}
        E_Selected={Emergency}
        setSubmitcheck={setSubmitcheck} // 상태 초기화
        setShowTable={setShowTable} //  테이블 업데이트 하기 위함
        setWeight={setWeight}
        setEndDate={setEndDate}
        setEstTime={setEstTime}
        setLine={setLine}
        setWidth={setWidth}
        setWorker={setWorker}
        setWarehouse={setWarehouse}
        setWorkplace={setWorkplace}
        setEmergency={setEmergency}
        setCustomer={setCustomer}
        setSlitter={setSlitter}
        setMaterial={setMaterial}
      ></FormData>
      <EstimatedTime
        SLWidth={SLWidth} //  원자재 기본 폭
        Weight={Weight} //  작업 중량
        Material={Material} //  원자재
        Width={Width} //  입력한 폭
        setEstTime={setEstTime} //  예상시간set.
        SLTime={SLTime} //  슬리터별 정해진 시간
        SLPunch={SLPunch}
        style={{ display: "none" }}
      />
    </div>
    //   <Box>
    //     <Dialog
    //       open={show}
    //       onClose={hide}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description"
    //     >
    //     <DialogTitle>Subscribe</DialogTitle>
    //     <DialogContent>
    //     <Row className="show-grid">
    //           {/* <Col xs={12} md={6}>
    //                           <span>작업명</span>
    //                           <input
    //                               name="Jobname"
    //                               type="text"
    //                               size="xl"
    //                               className="form-control"
    //                               onChange={handleJobnameChange}
    //                               value={Jobname}
    //                           />
    //                       </Col> */}
    //           <Col xs={12} md={6} style={{marginBottom:'1em'}} >
    //           <span> 작업중량 </span>
    //             <Input
    //               name="Weight"
    //               type="number"
    //               size="xl"
    //               className="form-control"
    //               onChange={handleWeightChange}
    //               value={Weight}
    //               style={{border:'none'}}
    //             />
    //           </Col>
    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //             <span>납기일</span>
    //             <Input
    //               name="EndDate"
    //               type="date"
    //               size="xl"
    //               className="form-control"
    //               onChange={handleEndDateChange}
    //               value={EndDate}
    //               style={{border:'none'}}
    //             />
    //           </Col>
    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //             <span>예상 시간</span>
    //             <Input
    //               name="EstTime"
    //               type="datetime"
    //               size="xl"
    //               className="form-control"
    //               onChange={handleEstTimeChange}
    //               value={EstTime}
    //               style={{border:'none'}}
    //               color="primary"
    //             />
    //           </Col>

    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //             <span >폭</span>
    //             <Input
    //               name="Width"
    //               type="number"
    //               size="xl"
    //               className="form-control"
    //               onChange={handleWidthChange}
    //               value={Width}
    //                style={{border:'none'}}
    //             />
    //           </Col>
    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //             <span>작업 인원</span>
    //             <Input
    //               name="Worker"
    //               type="number"
    //               size="xl"
    //               className="form-control"
    //               onChange={handleWorkerChange}
    //               value={Worker}
    //               style={{border:'none'}}
    //             />
    //           </Col>
    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //           <FormControl fullWidth>
    //           <span>원자재</span>
    //             <NativeSelect
    //               //labelId="demo-simple-select-helper-label"
    //               //id="demo-simple-select-helper"
    //               value={Material}
    //               onChange={handleMaterialChange}
    //             >
    //               <option value=""></option>
    //               <option value="1" key="1">COIL_305PM_215_001</option>
    //               <option value="2" key="2">COIL_305PM_215_002</option>
    //               <option value="3" key="3">COIL_305PM_215_003</option>

    //             </NativeSelect>
    //           </FormControl>

    //           </Col>

    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //           <FormControl fullWidth>
    //           <span>설비 번호</span>
    //             <NativeSelect
    //               labelId="demo-simple-select-helper-label"
    //               id="demo-simple-select-helper"
    //               value={Slitter}
    //               onChange={handleSlitterChange}
    //             >
    //               <option value=""></option>
    //               <option value="1" key="1">SL_01</option>
    //               <option value="2" key="2">SL_02</option>
    //               <option value="3" key="3">SL_03</option>

    //             </NativeSelect>
    //           </FormControl>
    //           </Col>

    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //             <FormControl fullWidth>
    //             <span>사업장</span>
    //               <NativeSelect
    //                 //labelId="demo-simple-select-helper-label"
    //                 //id="demo-simple-select-helper"
    //                 value={Workplace}
    //                 onChange={handleWorkplaceChange}
    //               >
    //                 <option value=""></option>
    //                 <option value="포항" key="포항">포항</option>
    //                 <option value="광양" key="광양">광양</option>
    //                 <option value="천안" key="천안">천안</option>

    //               </NativeSelect>
    //             </FormControl>
    //           </Col>

    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //           <FormControl fullWidth>
    //           <span>고객사</span>
    //             <NativeSelect
    //               //labelId="demo-simple-select-helper-label"
    //               //id="demo-simple-select-helper"
    //               value={Customer}
    //               onChange={handleCustomerChange}
    //             >
    //                <option value=""></option>
    //               <option value="현대중공업" key="현대중공업">현대중공업</option>
    //               <option value="LS" key="LS">LS</option>
    //             </NativeSelect>
    //           </FormControl>
    //           </Col>

    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //           <FormControl fullWidth>
    //           <span>창고</span>
    //             <NativeSelect
    //               //labelId="demo-simple-select-helper-label"
    //               //id="demo-simple-select-helper"
    //               value={Warehouse}
    //               onChange={handleWarehouseChange}
    //             >
    //                <option value=""></option>
    //               <option value="1" key="1">창고1</option>
    //               <option value="2" key="2">창고2</option>
    //               <option value="3" key="3">창고3</option>
    //               <option value="4" key="4">창고4</option>
    //             </NativeSelect>
    //           </FormControl>
    //           </Col>

    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //           <FormControl fullWidth>
    //           <span>긴급 여부</span>
    //             <NativeSelect
    //               //labelId="demo-simple-select-helper-label"
    //               //id="demo-simple-select-helper"
    //               value={Emergency}
    //               onChange={handleEmergencyChange}
    //             >
    //               <option value=""></option>
    //               <option value="0" key="0">일반</option>
    //               <option value="1" key="1">긴급</option>
    //             </NativeSelect>
    //           </FormControl>
    //           </Col>
    //           <Col xs={12} md={6} style={{marginBottom:'1em'}}>
    //             <span>비고</span>
    //             <Input
    //               name="Note"
    //               type="text"
    //               size="xl"
    //               className="form-control"
    //               onClick={handleNoteChange}
    //               value={Note}
    //               style={{border:'none'}}
    //             />
    //           </Col>
    //         </Row>

    //       <DialogActions>
    //       <Button
    //           // onClick={handleSubmit}
    //           onClick={setShowTable}
    //           style={{ margin: "5px", width: "100%" }}
    //           data-dismiss="modal"
    //         >
    //           {" "}
    //           생산계획 등록{" "}
    //         </Button>
    //       </DialogActions>
    //     </DialogContent>

    //  </Dialog>
    //     <FormData
    //     // Jobname={Jobname}
    //     Weight={Weight}
    //     EndDate={EndDate}
    //     EstTime={EstTime}
    //     // Line={Line}
    //     Width={Width}
    //     Workplace={Workplace}
    //     Worker={Worker}
    //     Customer={Customer}
    //     Note={Note}
    //     M_Selected={Material}
    //     s_Selected={Slitter}
    //     submitCheck={SubmitCheck}
    //     W_Selected={Warehouse}
    //     E_Selected={Emergency}
    //     setSubmitcheck={setSubmitcheck} // 상태 초기화
    //     setShowTable={setShowTable} //  테이블 업데이트 하기 위함
    //     setWeight={setWeight}
    //     setEndDate={setEndDate}
    //     setEstTime={setEstTime}
    //     setLine={setLine}
    //     setWidth={setWidth}
    //     setWorker={setWorker}
    //     setWarehouse={setWarehouse}
    //     setWorkplace={setWorkplace}
    //     setEmergency={setEmergency}
    //     setCustomer={setCustomer}
    //     setSlitter={setSlitter}
    //     setMaterial={setMaterial}
    //   ></FormData>

    //   </Box>
  );
}

export default inputForm;