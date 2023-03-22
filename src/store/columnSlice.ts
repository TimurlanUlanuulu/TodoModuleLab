import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TASKS_IP, TODO_IP } from "../consts/api";
import { IColumn, ITasks } from "../consts/interfaces";

type TodosState = {
    columns: IColumn[],
    tasks: ITasks[],
    loading: boolean,
    error: string | null
}

const initialState: TodosState = {
    columns: [],
    tasks: [],
    loading: false,
    error: null,
}

export const fetchColums = createAsyncThunk<IColumn[], undefined, {rejectValue: string}>(
    "columns/fetchColumns",
    async function(_, {rejectWithValue}){
        const response = await axios(TODO_IP);
        console.log(response);
        
        if(response.status !== 200){
            return rejectWithValue("Server Error!");
        }

        return await response.data
    }
)

export const addColumns = createAsyncThunk<IColumn, string, {rejectValue: string}>(
    "columns/addColumns",
    async function(title, {rejectWithValue}){
        const newColumn = {
            title
        }

        const response = await axios.post(TODO_IP, newColumn)
        if(response.status !== 201){
            return rejectWithValue("Server Error!");
        }

        return (await response.data as IColumn)
        
    }
)

export const deleteColumns = createAsyncThunk<string, string, {rejectValue: string}>(
    "columns/deleteColumns",
    async function(id, {rejectWithValue}){
        const response = await axios.delete(`${TODO_IP}/${id}`);

        if(response.status !== 200) return rejectWithValue("Server Error!");     

        return id;
    }
)

export const fetchTasks = createAsyncThunk<ITasks[], undefined, {rejectValue: string}>(
    "columns/fetchTasks",
    async function(_, {rejectWithValue}){
        const response = await axios(TASKS_IP);

        if(response.status !== 200){
            return rejectWithValue("Server Error!");
        }

        return (await response.data as ITasks[])
    }
)

export const addTask = createAsyncThunk<ITasks, {text: string, id: number}, {rejectValue: string}>( 
    "tasks/addTask",
    async function(obj, {rejectWithValue}){    
        const newTask = {
            title: obj.text,
            desc: "",
            completed: false,
            inBasket: false,
            columnId: obj.id
        }

        const response = await axios.post(TASKS_IP, newTask);

        if(response.status !== 201) return rejectWithValue("Server Error!")     

        return (await response.data as ITasks);
        
    }
)

export const toggleTask = createAsyncThunk<ITasks, string, { rejectValue: string; state: { columnStore: TodosState } }>(
    "todos/toggleTask",
    async function(id, {rejectWithValue, getState}){
        let task = getState().columnStore.tasks.find(todo => todo.id.toString() === id) as ITasks
        if(task){
            task = {
                ...task,
                completed: !task.completed
            }
            const response = await axios.patch(`${TASKS_IP}/${id}`, task);

            if(response.status !== 200) return rejectWithValue("Server Error")
            
            if(task.completed) alert("Task have been added to completed list")

            return await response.data as ITasks
        }
        return rejectWithValue("Cannot find this task");

    }
)

export const removeTask = createAsyncThunk<ITasks, string, {rejectValue: string, state: {columnStore: TodosState}}>(
    "todos/removeTask",
    async function (id, {rejectWithValue, getState}){
        let task = getState().columnStore.tasks.find(task => task.id.toString() === id)
        if(task){
            task = {
                ...task,
                inBasket: !task.inBasket
            }

            const response = await axios.patch(`${TASKS_IP}/${id}`, task);

            if(response.status != 200) return rejectWithValue("Server Error!");

            if(task.inBasket) alert("Task have been added to basket")

            return await response.data as ITasks
        }
        return rejectWithValue("Cannot find this task")
    }
)

export const clearBin = createAsyncThunk<ITasks[], undefined, {rejectValue: string, state: {columnStore: TodosState}}>(
    "todos/clearBin",
    async function (_, {rejectWithValue, getState}){
        let tasksDelete = getState().columnStore.tasks.filter(task => task.inBasket)
        if(tasksDelete){
            
            tasksDelete.forEach(async task => {
                const response = await axios.delete(`${TASKS_IP}/${task.id}`);
                if(response.status != 200) return rejectWithValue("Server Error!");

            })

            return tasksDelete as ITasks[]
        }
        return rejectWithValue("Cannot find this task")
    }
)

export const editTask = createAsyncThunk<ITasks, ITasks, {rejectValue: string}>(
  "todos/editTask",
  async function (editedTask, {rejectWithValue}) {
    const response = await axios.patch(`${TASKS_IP}/${editedTask.id}`, editedTask)

    if(response.status !== 200) return rejectWithValue("Server Error!")

    return await response.data as ITasks
  }
)

export const ColumnSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchColums.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchColums.fulfilled, (state, action) => {
                state.columns = action.payload;
                state.loading = false;
            })
            .addCase(addColumns.fulfilled, (state, action) => {
                state.columns.push(action.payload);
            })
            .addCase(deleteColumns.fulfilled, (state, action) => {
                state.columns = state.columns.filter(column => column.id.toString() !== action.payload)
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)  
            })
            .addCase(toggleTask.fulfilled, (state, action) => {
                const task = state.tasks.find(task => task.id === action.payload.id)
                if(task) task.completed = !task.completed
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const task = state.tasks.find(task => task.id === action.payload.id)
                if(task) task.inBasket = !task.inBasket
            })
            .addCase(clearBin.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => !task.inBasket)
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(task => {
                    if(task.id === action.payload.id) return action.payload
                    return task
                });
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false
            })
    }
})

export default ColumnSlice.reducer

function isError(action: AnyAction){
    return action.type.endsWith("rejected");
}