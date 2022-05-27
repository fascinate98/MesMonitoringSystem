import axios from "axios";
import React, { useEffect, useState } from "react";
import { call } from '../../service/ApiService';    //  통신
const FormData = ({
  Weight,
  EndDate,
  EstTime,
  Width,
  Workplace,
  Worker,
  Customer,
  Note,
  M_Selected,
  s_Selected,
  submitCheck,
  W_Selected,
  E_Selected,
  setSubmitcheck,
  setWeight,
  setEndDate,
  setEstTime,
  setLine,
  setWidth,
  setWorker,
  setWarehouse,
  setWorkplace,
  setEmergency,
  setCustomer,
  setSlitter,
  setMaterial,
  setShowTable
}) => {
  const selectItem = {
    // joborderJobname: Jobname,
    joborderWriter:sessionStorage.getItem("id"),
    joborderWeight: Weight,
    joborderEndDate: EndDate,
    joborderEstTime: EstTime,
    joborderWidth: Width,
    joborderWorkplace: Workplace,
    joborderWorkerNum: Worker,
    joborderCustomer: Customer,
    joborderEmg: Note,
    joborderMaterialId: M_Selected,
    joborderSlitterNo: s_Selected,
    joborderWarehouseId: W_Selected,
    joborderEmg: E_Selected,
  };
  // const [APIData, setAPIData] = useState([]);

  // const select =  function(){
  //   axios.get(`/api/plan`).then((response) => {
  //     var planData = response.data.data;
  //     for (var i = 0; i < planData.length; i++) {
  //       planData[i].joborderEmg =
  //         planData[i].joborderEmg === 0 ? "일반" : "🚨긴급🚨";
  //     }
  //     setAPIData(planData);
  //   });
  // };

  const [regCheck, setRegCheck] = useState(false);
  function QR(){
    try {
      call(`/api/qr`, {}, 2).then((response) => {
        console.log(`\n/QR\n`);
        console.log(response.data.data);
      });
    } catch (err) {
      console.error(err);
    }
  }
  

  useEffect(() => { 
    console.log("---------------------------")
    console.log(submitCheck)   
    if (submitCheck) {
      (async () => {
        try {
          call(`/api/registration`, selectItem, 1).then((response)=>{
            console.log(response.data.data);
            // setRegCheck(true);
            QR();
          });
        
        } catch (err) {
          console.error(err);
        }
          setWeight("");
          setEndDate("");
          setEstTime("");
          setLine("");
          setWidth("");
          setWorker("");
          setWarehouse("");
          setWorkplace("");
          setEmergency("");
          setCustomer("");
          setSlitter("");
          setMaterial(""); 
          // select(); 
        
      })();
      setSubmitcheck(false);
      setShowTable(true);
    }
    setSubmitcheck(false);

  }, [selectItem]);
  return ;
};

export default FormData;