import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAppDispatch } from "../consts/hooks";
import { ITasks } from "../consts/interfaces";
import { removeTask } from "../store/columnSlice";
import EditTask from "./EditTask";

interface IDetailsTask {
  task: ITasks;
  handleClose: () => void;
}

const DetailsTask: React.FC<IDetailsTask> = ({ task, handleClose }) => {
  const dispatch = useAppDispatch();
  const [editModal, setEditModal] = useState(false);


  return (
    <div className="main-modal">
      <div className="inner-modal">
        <div className="close">
          <button onClick={handleClose}>X</button>
        </div>
        <Box
          sx={{
            width: "80%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >

            <Typography>
              <strong>Title: </strong>
              {task.title}
            </Typography>
            <Typography textAlign="start">
              <strong>Description: </strong>
              {task.desc ? task.desc : "There is no description yet("}
            </Typography>

          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mt: '10px' }}>
            <Button variant="contained" onClick={() => setEditModal(true)}>Edit</Button>
            <Button variant="contained" color="error" onClick={() => {dispatch(removeTask(task.id.toString())); handleClose() }}>Delete</Button>
          </Box>
        </Box>
        {editModal ? (
          <EditTask task={task} handleClose={() => setEditModal(false)} />
        ) : ""}
      </div>
    </div>
  );
};

export default DetailsTask;
