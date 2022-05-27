import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { styled, createTheme, useTheme } from "@mui/material/styles";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import ListItemIcon from "@mui/material/ListItemIcon";

import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import MonitorIcon from "@mui/icons-material/Monitor";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import TableChartIcon from "@mui/icons-material/TableChart";
import LogoutIcon from "@mui/icons-material/Logout";
import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";
import { Link } from "react-router-dom";
import "../../../assets/fonts/font.css";
import { fontFamily, fontWeight, typography } from "@mui/system";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FiPieChart,
  FiCalendar,
  FiBarChart2,
  FiAlertCircle,
  FiMonitor,
  FiAlertTriangle,
  FiLogOut,
} from "react-icons/fi";
import { BiLineChart } from "react-icons/bi";
import { ThemeProvider } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { RiHistoryLine } from "react-icons/ri";
import { FiClock } from "react-icons/fi";

export default function mainListItems(colorMode, modeTheme) {
  const navigate = useNavigate();
  const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
  return (
    <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={modeTheme}>
          <Link
            to="/dashboard"
            style={{ color: "primary.button.primary", textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <FiPieChart fontSize="28" />
              </ListItemIcon>
              <ListItemText
                primary="대시보드"
                route="/dashboard"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            to="/plan"
            style={{ color: "primary.button.primary", textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <FiCalendar fontSize="28" />
              </ListItemIcon>
              <ListItemText
                primary="생산계획 조회/등록"
                route="/plan"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            to="/performance"
            style={{ color: "primary.button.primary", textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <FiBarChart2 fontSize="28" />
              </ListItemIcon>
              <ListItemText
                primary="생산실적"
                route="/performance"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            to="/condition"
            style={{ color: "primary.button.primary", textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <FiAlertTriangle fontSize="28" />
              </ListItemIcon>
              <ListItemText
                primary="생산 이상상태"
                route="/condition"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            to="/monitoring"
            style={{ color: "primary.button.primary", textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <FiMonitor fontSize="28" />
              </ListItemIcon>
              <ListItemText
                primary="공정 모니터링"
                route="/monitoring"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            to="/tagTrend"
            style={{ color: "primary.button.primary", textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <BiLineChart fontSize="28" />
              </ListItemIcon>
              <ListItemText
                primary="Tag 트랜드"
                route="/tagTrend"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>

          <Link
            to="/tagHistory"
            style={{ color: "primary.button.primary", textDecoration: "none" , opacity:".92"}}
          >
            <ListItemButton>
              <ListItemIcon>
                <FiClock fontSize="30" />
              </ListItemIcon>
              <ListItemText
                primary="Tag 히스토리"
                route="/tagHistory"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>

          <Link to="/">
            <ListItemButton
              style={{
                color: "primary.button.primary",
                position: "absolute",
                bottom: "7%",
                width: "100%",
              }}
              onClick={() => {
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('ACCESS_TOKEN');
                // navigate('/', { replace: true });
                document.location.href = "/";
              }}
            >
              
              <ListItemIcon>
                <FiLogOut fontSize="28" />
              </ListItemIcon>
              <ListItemText
                primary="로그아웃"
                primaryTypographyProps={{
                  color: "primary.button.primary",
                  fontFamily: "Pretendard",
                  fontWeight: "550",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </Link>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
  );
}
