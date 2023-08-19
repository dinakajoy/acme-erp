import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function FatalErrorPage() {
  <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <ErrorOutlineIcon />
      <Typography component="h1" variant="h4" align="center">
        Sorry, there was an unexpected error!
      </Typography>
      <Button variant="contained" href="mailto:odinakajoy909@gmil.com">
        Report
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => window.location.reload()}
      >
        Refresh the page
      </Button>
    </Paper>
  </Container>;
}
