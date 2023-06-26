import { useState } from "react";

import Header from "./components/Header/Header";
import Calculator from "./components/Calculator/Calculator";
import Table from "./components/Table/Table";

function App() {
  const [data, setData] = useState([]);

  return (
    <div>
      <Header />
      <Calculator onSubmit={(yearlyData) => setData(yearlyData)} />
      <Table data={data} />
    </div>
  );
}

export default App;
