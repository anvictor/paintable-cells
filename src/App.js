import { useState } from "react";
import "./App.css";
import PaintableTable from "./SelectedTable";
import ResultStatus from './ResultStatus';

function App() {
  const [adStatus, setAdStatus] = useState("");
  return (
    <>
      <PaintableTable getStatus={setAdStatus}/>
      <ResultStatus data={adStatus}/>
    </>
  );
}

export default App;
