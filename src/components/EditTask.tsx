import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAppDispatch } from "../consts/hooks";
import { ITasks } from "../consts/interfaces";
import { editTask, removeTask } from "../store/columnSlice";

interface IDetailsTask {
  task: ITasks;
  handleClose: () => void;
}

const EditTask: React.FC<IDetailsTask> = ({ task, handleClose }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);

  const saveEdits = () => {
    if(!title.trim()) {
       alert("Field title cant be empty");
       return; 
    }

    const newTask = {
        ...task,
        title: title,
        desc: desc
    }
    dispatch(editTask(newTask));
    handleClose();
  }

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

          <TextField
            id="standard-required"
            label="Todo title"
            variant="standard"
            fullWidth
            sx={{ margin: "10px 0" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="standard-required"
            label="Todo description"
            variant="standard"
            fullWidth
            sx={{ margin: "10px 0" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />


          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: "10px",
            }}
          >
            <Button variant="contained" onClick={saveEdits}>SAVE</Button>

          </Box>
        </Box>
      </div>
    </div>
  );
};

export default EditTask;
