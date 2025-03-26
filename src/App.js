import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Estimated from "./pages/Estimated/Estimated";
import EstimatedAddress from "./pages/Estimated/EstimatedAddress";
import EstimatedBill from "./pages/Estimated/EstimatedBill";
import FinalResult from "./pages/FinalResult/FinalResult";
import Final from "./pages/FinalResult/Final";
import FinalPurposal from "./pages/FinalPurposal/FinalPurposal";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Estimated />} />
          <Route path="/estimatedaddress" element={<EstimatedAddress />} />
          <Route path="/estimatedbill" element={<EstimatedBill />} />
          <Route path="/finalresult" element={<FinalResult />} />
          <Route path="/final" element={<Final />} />
          <Route path="/finalpurposal" element={<FinalPurposal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
