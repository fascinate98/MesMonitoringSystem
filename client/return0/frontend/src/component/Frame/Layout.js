import React, { useEffect, useState } from "react";
import Main from "./Main";
import { Outlet } from "react-router";
import Press from "../Monitoring/Press";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
const Layout = ({ mode, setMode, name, openTime }) => {
  const navigate = useNavigate();
  // const [refresh, setRefresh] = useState('dashboard');   -> 이거 하면 새로고침 두번하면 대시보드로 감
  // const [refresh, setRefresh] = useState(`${window.location.href.split('/')[window.location.href.split('/').length -1]}`);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 116 || (e.ctrlkey == true && e.keyCode == 7)) {
        e.preventDefault();
        const location_href = window.location.href.split("/");
        // console.log("새로고침 " + location_href[location_href.length - 1]);
        // document.location.href = `/${location_href[location_href.length - 1]}`;
        // setRefresh(`${location_href[location_href.length - 1]}`);
        // navigate((`/${location_href[location_href.length - 1]}`).toString());
        reload(location_href[location_href.length - 1]);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
  }, []);
  function reload(url) {
    console.log(`가랏 새로고침 -> ${url}`);
    navigate(`${url}`, { replace: true });
  }
  useBeforeunload((event) => {
    event.preventDefault();
  });
  // useEffect(() => {
  //   reload();
  // }, [refresh]);
  return (
    <Main mode={mode} setMode={setMode} name={name}>
      <div className="PressNotDisplay" style={{ display: "none" }}>
        <Press press_status={1} openTime={openTime} />
        <Dashboard dashboard_status={1} />
      </div>

      <Outlet />
    </Main>
  );
};

export default Layout;
