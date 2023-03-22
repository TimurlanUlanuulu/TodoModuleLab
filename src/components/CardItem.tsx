import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAppDispatch } from "../consts/hooks";
import { ITasks } from "../consts/interfaces";
import { removeTask, toggleTask } from "../store/columnSlice";
import DetailsTask from "./DetailsTask";
import Snack from "./Snack";

interface ICardItemProps {
  task: ITasks;
}

const CardItem: React.FC<ICardItemProps> = ({ task }) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [modal, setModal] = useState(false)
  const { title, completed } = task;
  const id = task.id.toString();
  const dispatch = useAppDispatch();
  const toggleTaskFunc = () => {
    dispatch(toggleTask(id));
    setTimeout(() => {
      setSnackOpen(true);
    }, 300);
  };

  return (
    <li className="tasks-list">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskFunc()}
        />
        <Typography className="task-title">{title}</Typography>
      </Box>
      {task.inBasket ? (
        <Button variant="contained" size="small" color="success" onClick={() => dispatch(removeTask(id))}>
        return
      </Button>
      ) : task.completed ? (
        <Button variant="contained" size="small" color="error" onClick={() => dispatch(removeTask(id))}>
          Delete
        </Button>
      ) : (
        <Button variant="contained" size="small" onClick={() => setModal(true)}>
          Details
        </Button>
      )}
      {modal ? (
        <DetailsTask task={task} handleClose={() => setModal(false)} />
      ) : ""}
      <Snack isOpen={snackOpen} handleClose={() => setSnackOpen(false)} />
    </li>
  );
};

export default CardItem;
