import React from "react";
import { Button, Grid } from "@mui/material";
import Layout from "../reusables/Layout";
import Table from "../reusables/Table";

const Accounts = () => {
  return (
    <Layout>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
      <Table />
    </Layout>
  );
};

export default Accounts;
