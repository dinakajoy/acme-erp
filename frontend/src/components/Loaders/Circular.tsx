import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function CircularIndeterminate() {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" style={{height: '100vh'}}>
      <Box>
        <CircularProgress />
      </Box>
    </Grid>
  );
}
