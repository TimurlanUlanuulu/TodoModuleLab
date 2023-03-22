import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../consts/hooks";
import { fetchTasks } from "../store/columnSlice";
import CardItem from "./CardItem";

const CompletedList = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.columnStore.tasks);
    useEffect(() => {
        dispatch(fetchTasks());
      }, []);
  return (
    <Container>
      <Box sx={{ flexGrow: 1, mt: "50px" }}>
        <Grid container>
          <Grid item xs={4} sx={{ border: "2px red solid" }}>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              Completed Tasks
            </Typography>
            <Divider />
            <ul>
              {tasks.map((task) => {
                if (task.completed && !task.inBasket) {
                  return <CardItem task={task} key={task.id} />;
                }
              })}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CompletedList;
