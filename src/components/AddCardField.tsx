import React, {useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch } from "../consts/hooks";
import { addTask } from "../store/columnSlice";

interface IAddCardFieldProps{
  id: number;
}

const AddCardField: React.FC<IAddCardFieldProps> = ({id}) => {

  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const addNewColumnFunc = () => {
    if(!text.trim()){
      alert("Field title cant be empty")
      return;
    } 
    dispatch(addTask({text, id}));
    setText("");
  }

  const keyPressFunc = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key == "Enter"){
      addNewColumnFunc();
    }
  }
  
  return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          margin: "0 auto"
        }}
      >
        <TextField
          id="standard-required"
          label="Todo title"
          variant="standard"
          fullWidth
          sx={{ margin: "10px 0" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => keyPressFunc(e)}
        />
        <Button
          color="success"
          variant="contained"
          size="small"
          sx={{ height: "100%", width: "10%" }}
          onClick={() => addNewColumnFunc()}
        >
          ADD
        </Button>
      </Box>

  );
};

export default AddCardField;
