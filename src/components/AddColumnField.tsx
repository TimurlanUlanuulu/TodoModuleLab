import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch } from "../consts/hooks";
import { addColumns } from "../store/columnSlice";

const AddColumnField: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const addNewColumnFunc = () => {
    if (!text.trim()) {
      alert("Field title cant be empty");
      return;
    }
    dispatch(addColumns(text));
    setText("");
  };

  const keyPressFunc = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      addNewColumnFunc();
    }
  };

  return (
    <div>
      <Container>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="standard-required"
            label="Column title"
            variant="standard"
            fullWidth
            sx={{ margin: "30px 0" }}
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
      </Container>
    </div>
  );
};

export default AddColumnField;
