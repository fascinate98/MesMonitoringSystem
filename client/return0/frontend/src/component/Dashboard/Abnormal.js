import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Condition from "./Condition/Condition";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block",  }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <div>

      <Condition />
    </div>
  );
}
