import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Estimated from "./pages/Estimated/Estimated";
import EstimatedAddress from "./pages/Estimated/EstimatedAddress";
import EstimatedOwnLease from "./pages/Estimated/EstimatedOwnLease";
import EstimatedBill from "./pages/Estimated/EstimatedBill";
import PlanPurchase from "./pages/Estimated/PlanPurchase";
import CompanyName from "./pages/Estimated/CompanyName";
import Info from "./pages/Estimated/Info";
import Email from "./pages/Estimated/Email";
import PhoneNumber from "./pages/Estimated/PhoneNumber";
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
          <Route path="/estimatedownlease" element={<EstimatedOwnLease />} />
          <Route path="/estimatedbill" element={<EstimatedBill />} />
          <Route path="/planpurchase" element={<PlanPurchase />} />
          <Route path="/companyname" element={<CompanyName />} />
          <Route path="/info" element={<Info />} />
          <Route path="/email" element={<Email />} />
          <Route path="/phonenumber" element={<PhoneNumber />} />
          <Route path="/finalresult" element={<FinalResult />} />
          <Route path="/final" element={<Final />} />
          <Route path="/finalpurposal" element={<FinalPurposal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
