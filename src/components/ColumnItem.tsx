import React, { useEffect } from "react";
import { IColumn, ITasks } from "../consts/interfaces";
import Divider from "@mui/material/Divider/Divider";
import AddColumnField from "./AddColumnField";
import AddCardField from "./AddCardField";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../consts/hooks";
import { deleteColumns, fetchTasks } from "../store/columnSlice";
import CardItem from "./CardItem";

interface ColumnItemProps {
  column: IColumn;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ column }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.columnStore.tasks);

  const deleteColumnFunc = (id: string) => {
    const del = window.confirm(
      "Are you sure you want to delete the entire to-do list? When deleting tasks, they will not go into the trash"
    );
    if (del == true) dispatch(deleteColumns(id));
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <Grid item xs={4} sx={{ border: "2px red solid" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
        {column.title}
      </Typography>
      <Divider />
      <AddCardField id={column.id} />
      <Divider />
      <ul>
        {tasks.map((task) => {
          if (column.id == task.columnId && !task.completed && !task.inBasket) {
            return <CardItem task={task} key={task.id} />;
          }
        })}
      </ul>
      <Button
        color="error"
        onClick={() => deleteColumnFunc(column.id.toString())}
      >
        Delete column
      </Button>
    </Grid>
  );
};

export default ColumnItem;
