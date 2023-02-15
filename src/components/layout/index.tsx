import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import DrawerMenu from "./drawer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12}>
        <DrawerMenu children={children}/>
      </Grid>
    </Grid>
  );
};

export default Layout;
