import React, { useEffect } from "react";

import "./App.css";
import AddColumnField from "./components/AddColumnField";
import ColumnList from "./components/ColumnList";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./consts/hooks";
import MainRoutes from "./MainRoutes";
import { fetchColums } from "./store/columnSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.columnStore);

  useEffect(() => {
    dispatch(fetchColums());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <MainRoutes />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error {error}</h1>}
    </div>
  );
};

export default App;
