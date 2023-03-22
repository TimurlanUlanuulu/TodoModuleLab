import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../consts/hooks";
import { clearBin, fetchTasks } from "../store/columnSlice";
import CardItem from "./CardItem";

const BasketList = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.columnStore.tasks);
    useEffect(() => {
        dispatch(fetchTasks());
      }, []);
    const clearBinFunc = () => {
        const should = window.confirm("All tasks in bin will be delete without possiblity of recovery")
        if(should) dispatch(clearBin())
    }
  return (
    <Container>
      <Box sx={{ flexGrow: 1, mt: "50px" }}>
        <Grid container>
          <Grid item xs={4} sx={{ border: "2px red solid" }}>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              TRASH BIN
            </Typography>
            <Divider />
            <ul>
              {tasks.map((task) => {
                if (task.inBasket) {
                  return <CardItem task={task} key={task.id} />;
                }
              })}
            </ul>
            <Button sx={{width: "80%", margin: "10px 0"}} variant="contained" color="error" onClick={clearBinFunc}>Clear Bin</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BasketList;
