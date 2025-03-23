import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { year: 2021, solar: 2000, noSolar: 3000 },
    { year: 2022, solar: 2500, noSolar: 3500 },
    { year: 2023, solar: 3000, noSolar: 4000 },
    { year: 2024, solar: 3500, noSolar: 4500 },
    { year: 2025, solar: 4000, noSolar: 5000 },
];

export default function Final() {
    const [openSection, setOpenSection] = useState(null);
    const [imageSrc, setImageSrc] = useState("assets/img/solar_api.png");
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [showSolarCard, setShowSolarCard] = useState(false);
    const [showSolarPotential, setSolarPotential] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const toggleSection = (section) => {
        if (openSection === section) {
            setOpenSection(null);
            setImageSrc("assets/img/solar_api.png");
            setShowProfileCard(false);
            setShowSolarCard(false);
            setSolarPotential(false);
            setShowChart(false);
        } else {
            setOpenSection(section);
            setImageSrc("assets/img/solar_api.png");
            if (section === "section1") {
                setShowProfileCard(true);
                setShowSolarCard(false);
                setSolarPotential(false);
                setShowChart(false);
            } else if (section === "section2") {
                setSolarPotential(true);
                setShowProfileCard(false);
                setShowSolarCard(false);
                setShowChart(false);
            } else if (section === "section3") {
                setShowProfileCard(false);
                setShowSolarCard(true); // Show solar card for section 3
                setShowChart(true);
                setSolarPotential(false);// Show chart for section 3
            }
        }
    };

    return (
        <>
            <section className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-md-8 position-relative">
                        <img
                            src={imageSrc}
                            alt="Solar System Map"
                            className="img-fluid w-100"
                            style={{ height: "110vh", objectFit: "cover" }}
                        />
                        {showProfileCard && (
                            <div className="insights-card position-absolute" style={{ top: "20px", left: "20px", zIndex: 1000 }}>
                                <div className="card-header">
                                    <i className="fas fa-home home-icon"></i>
                                    <span className="title">Building Insights endpoint</span>
                                </div>
                                <hr />
                                <div className="card-body">
                                    <div className="data-row">
                                        <span>Annual sunshine</span>
                                        <span className="value">1,811.3 hr</span>
                                    </div>
                                    <div className="data-row">
                                        <span>Roof area</span>
                                        <span className="value">2,399.4 m²</span>
                                    </div>
                                    <div className="data-row">
                                        <span>Max panel count</span>
                                        <span className="value">987 panels</span>
                                    </div>
                                    <div className="data-row">
                                        <span>CO₂ savings</span>
                                        <span className="value">428.9 Kg/MWh</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showSolarPotential && (
                            <div className="insights-card position-absolute" style={{ top: "20px", left: "20px", zIndex: 1000 }}>
                                <div className="card-header">
                                    <i className="fas fa-layer-group icon"></i>
                                    <span className="title">Data Layers endpoint</span>
                                </div>
                                <hr />
                                <div className="card-body">
                                    <div className="data-row">
                                        <p style={{ textAlign: 'center' }}>We’ve helped THOUSANDS of homeowners like you, switch to save money & save the environment.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showSolarCard && (
                            <div className="solar-card position-absolute" style={{ top: "20px", left: "20px", zIndex: 1000 }}>
                                <div className="card-header">
                                    <i className="fas fa-money-check  header-icon"></i>
                                    <span className="title">Solar Potential analysis</span>
                                </div>
                                <hr />
                                <div className="card-body">
                                    <div className="data-row">
                                        <span>Yearly energy</span>
                                        <span className="value">14,060.3 kWh</span>
                                    </div>
                                    <div className="data-row">
                                        <span>Installation size</span>
                                        <span className="value">7.8 kW</span>
                                    </div>
                                    <div className="data-row">
                                        <span>Installation cost</span>
                                        <span className="value">$31,000.00</span>
                                    </div>
                                    <div className="data-row">
                                        <span>Energy covered</span>
                                        <span className="value">103 %</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showChart && (
                            <div className="chart-container position-absolute" style={{ top: "250px", left: "20px", zIndex: 1000 }}>
                                <h4 className="chart-title">Cost analysis for 20 years</h4>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="solar" stroke="#007bff" name="Solar" />
                                        <Line type="monotone" dataKey="noSolar" stroke="#ff4d4d" name="No solar" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="summary">
                                    <div className="summary-row">
                                        <span>Cost without solar</span>
                                        <span className="value">$61,305.29</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Cost with solar</span>
                                        <span className="value">$25,291.42</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Savings</span>
                                        <span className="value">$36,013.87</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Break even</span>
                                        <span className="value">2033 in 8 years</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-md-4 d-flex align-items-center" style={{ background: "#f8f8f8", height: "100vh", marginTop: "-3%" }}>
                        <div className="container">
                            <div className="mb-3">
                                <input type="text" className="form-control me-sm-3" placeholder="Enter a valid address" />
                            </div>

                            <p className="text-muted text-center mt-4">
                                Click an area below to see what type of information the Solar API can provide.
                            </p>

                            <div className="custom-card p-3 shadow rounded mt-4">
                                <div>
                                    <div
                                        className="section-title d-flex justify-content-between align-items-center"
                                        onClick={() => toggleSection("section1")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span>
                                            <i className="fas fa-home icon text-warning me-2"></i> <b>Building Insights endpoint</b>
                                            <p style={{ color: "black", marginLeft: "14%", fontSize: "13px" }}>Yearly energy: 14.06 MWh</p>
                                        </span>
                                        <i className={` fas fa-chevron-${openSection === "section1" ? "up" : "down"}`}></i>
                                    </div>
                                    {openSection === "section1" && (
                                        <div className="section-content ps-4 text-secondary">
                                            <div className="row">
                                                <div className="col-6 text-start">
                                                    <p><strong>Panel count</strong> </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <p>32 Panels</p>
                                                </div>
                                            </div>
                                            <input type="range" className="form-range" min="10" max="100" defaultValue="" />
                                            <fieldset className="border p-2 rounded">
                                                <legend className="fs-6 text-muted">Panel Capacity</legend>
                                                <input type="number" className="form-control" defaultValue="250" />
                                            </fieldset>
                                            <div className="d-flex justify-content-between align-items-center mt-4">
                                                <div className="content">
                                                    <div className="checkbox-group">
                                                        <label className="toggle2">
                                                            <input type="checkbox" id="cb2" name="toggle2" /><i></i></label>
                                                        <label htmlFor="toggle" style={{ marginLeft: '5px' }}>
                                                            Solar Panel{" "}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <div>
                                    <div
                                        className="section-title d-flex justify-content-between align-items-center"
                                        onClick={() => toggleSection("section2")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span>
                                            <i className="fas fa-layer-group icon text-warning me-2"></i> <b>Data Layers endpoint</b>
                                        </span>
                                        <i className={`fas fa-chevron-${openSection === "section2" ? "up" : "down"}`}></i>
                                    </div>
                                    {openSection === "section2" && (
                                        <div className="section-content ps-4 text-secondary">Monthly sunshine</div>
                                    )}
                                </div>
                                <hr />
                                <div>
                                    <div
                                        className="section-title d-flex justify-content-between align-items-center"
                                        onClick={() => toggleSection("section3")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span>
                                            <i className="fas fa-money-check icon text-warning me-2"></i> <b>Solar Potential analysis</b>
                                        </span>
                                        <i className={`fas fa-chevron-${openSection === "section3" ? "up" : "down"}`}></i>
                                    </div>
                                    {openSection === "section3" && (
                                        <div className="section-content ps-4 text-secondary">
                                            Values are only placeholders. Update with your own values.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}