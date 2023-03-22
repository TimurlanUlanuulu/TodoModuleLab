import React from "react";
import { useAppSelector, useAppDispatch } from "../consts/hooks";
import { useEffect } from "react";
import { fetchColums } from "../store/columnSlice";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Container from "@mui/material/Container";
import ColumnItem from "./ColumnItem";
import AddColumnField from "./AddColumnField";

const ColumnList = () => {
  const columns = useAppSelector((state) => state.columnStore.columns);

  return (
    <Container>
      <AddColumnField />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          {columns.map((column) => (
            <ColumnItem column={column} key={column.id} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ColumnList;
