import React, { Component, Fragment, useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { mainListItems } from "./SideBarList";
import logoImg from "../../../assets/img/logo.png";
import { textAlign } from "@mui/system";
import { FiMoreVertical, FiMenu, FiLogOut } from "react-icons/fi";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import { Grid } from "@mui/material";
import { RiMoonLine, RiMoonFill } from "react-icons/ri";
import { color } from "highcharts";
import SideBarList from "./SideBarList"

const drawerWidth = 330;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 60px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 60px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),  
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const Main = ( {children, mode, setMode, name} ) => {
  const changetheme = () => {
    setMode(!mode)
    sessionStorage.setItem('mode', mode);
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };                                          

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiPaper-root": {
      },

      paper:{
        padding: theme.spacing(3, 2),
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    } 

  }));
  const classes = useStyles();
  const theme = useTheme();


  return (
    <Fragment>

        <Box sx={{ display: "flex",}}>
          <CssBaseline />
        <AppBar position="fixed" open={open}>

      </AppBar>

          <Drawer variant="permanent" open={open} anchor="left" className={classes.root} 

            PaperProps={{
              sx:{backgroundColor: "primary.background.default",
              color:"primary.background.default",
              background:"primary.background.default",
              border:"none"
                }
            }}
          >          
          <Toolbar>
          <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="end"
              sx={{
                ...(open && { display: 'none' }),
                color:"primary.button.primary",
                top:"30%",
                marginLeft:"35px"
              }}
            >
              <RiMenuUnfoldLine fontSize="30"/>
            </IconButton>
            <IconButton 
              onClick={handleDrawerClose} 
              backgroundColor="palette.bgcolor"
              aria-label="open drawer"
              edge="end" 
              sx={{
                ...(!open && { display: 'none' }),
                color:"primary.button.primary",
                top:"30%",
                marginLeft:"35px"
              }}>
            
            <RiMenuFoldLine fontSize="30"/>
          </IconButton>

        </Toolbar>

   
            {/* <Toolbar
              sx={{
                alignItems: "center"
              }}
              style={{backgroundColor:"#111827"}}
            > */}
              {/* <img
                src={logoImg}
                style={{ width:"180px", marginTop:"20px", marginBottom:"20px" , backgroundColor: "black"}}
              ></img> */}
            {/* </Toolbar> */}
            {/* <Divider style={{ backgroundColor: '#A3A8B6' }} variant="middle" sx={{ borderBottomWidth: 1 }}  /> */}
            <List  

            component="nav"  bgcolor="#123123" style={{position:"relative",  height:"100%", }}

 
            sx={{
              mt:"90px",
              borderWidth:"0px",
              // hover states
              '& .MuiListItemButton-root:hover': {
                 bgcolor: 'primary.background.default',
                // borderTopLeftRadius:"38px", 
                // borderBottomLeftRadius: "38px",
           
                // pt:"15px",
                // pb:"15px",
                // mt:"5px",
                // mb:"5px",
                 ml:"35px",
                // borderWidth:"0px"
                '& .MuiListItemIcon-root': {
                  
                  color: 'primary.button.secondary',
                  backgroundColor: "primary.button.color", 
                  borderRadius: "50%" ,
                  padding: theme.spacing(1.5),
                  minWidth:"0px",
                  minHeight:"0px",
                  textAlign:"center",
                  marginRight:"20px",
                },
              },
             
              '& .MuiListItemButton-root': {
                // bgcolor: '#1F2937',
                // borderTopLeftRadius:"38px", 
                // borderBottomLeftRadius: "38px",
                // pt:"15px",
                // pb:"15px",
                // mt:"5px",
                // mb:"5px",
                 ml:"35px",
                 '& .MuiListItemIcon-root': {
                  color: 'primary.button.primary',
                  size:"large",
                  borderRadius: "50%" ,
                  padding: theme.spacing(1.8),
                  minWidth:"0px",
                  minHeight:"0px",
                  textAlign:"center",
                  marginRight:"20px",
                  transition:"background  .5s"

                },
              },
        
            }}
            ><SideBarList  /></List>
          </Drawer>


          <Box
            component="main"
            bgcolor="background.default"
            sx={{
              position:"relative",
              backgroundColor: "primary.background.default",
        
              border:"none",
              flexGrow: 1,
              height:"100vh",
              overflow: "auto",
              justifyContent: "center"
            }}
          >

          <Box
            component={"div"}
          
            
            sx={{
              position:"fixed",
              top:"3%",
              left:"10%",
              userSelect:"none",
              zIndex:"9999",
              width:"80%",
              alignItems:"center",
              textAlign:"center",
              justifyContent: "middle",
              display:"flex",
              //여기서 테두리 뺌
              border:"none",
              
            }}>
              <Box>
                <Typography color="primary.button.primary" fontFamily="Pretendard" fontWeight="600" style={{textAlign:"center"}}
                  fontSize={27}   letterSpacing={3}>
                      MES 생산관리 시스템
                  </Typography>
              </Box>


              <Box
              sx={{
                  position:"fixed",
                  display:"flex",
                  alignItems:"center",
                  right:"7%",
                  justifyContent: "middle",
                  textAlign:"center"

              }}>
                
                {/* <MyApp/> */}
                <IconButton sx={{  color:"primary.button.primary", pading: "0", }} onClick={changetheme}   >
         
                  {theme.palette.mode === 'dark' ? <RiMoonFill fontSize={22}/> : <RiMoonLine fontSize={22}/>}
                </IconButton>





                <Typography color="primary.button.primary" fontFamily="Pretendard" fontWeight="600" 
                  fontSize={20} marginLeft={"10px"} style={{textAlign:"center"}} letterSpacing={3} >
                      {sessionStorage.getItem('user')}님, 안녕하세요!
                  </Typography>
              </Box>
        

     

          </Box>

           
          <Grid container spacing={3}  top="12%" maxWidth="95%"  height="850px" position="relative" marginLeft={0}>
            {children}
            {/* <Grid item xs={12} sm={8}>
              <Paper
                  sx={{
                    position:"relative",
                    borderRadius:"38px",
                    padding:"30px",
                    background:"#1F2937",
                  }}>
                  {children}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                  sx={{
                    position:"relative",
                    borderRadius:"38px",
                    padding:"30px",
                    background:"#1F2937",
                  }}>
                    
              </Paper>
            </Grid> */}
          </Grid>
          </Box>
        </Box>
      {/* </ThemeProvider>
      </ColorModeContext.Provider> */}
    </Fragment>
  );
};

export default Main;
