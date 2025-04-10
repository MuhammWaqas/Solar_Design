import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GoogleMap, Marker, Circle, InfoWindow } from '@react-google-maps/api';
import { AppContext } from '../StateManagement/Context';

const data = [
    { year: 2021, solar: 2000, noSolar: 3000 },
    { year: 2022, solar: 2500, noSolar: 3500 },
    { year: 2023, solar: 3000, noSolar: 4000 },
    { year: 2024, solar: 3500, noSolar: 4500 },
    { year: 2025, solar: 4000, noSolar: 5000 },
];

export default function Final() {
    const navigate = useNavigate();
    const { data: contextData } = useContext(AppContext); // Use context to get data
    const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const [circleCenter, setCircleCenter] = useState(null);
    const [circleRadius, setCircleRadius] = useState(100);
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    useEffect(() => {
        if (contextData.locationInfo) {
            setMapCenter({
                lat: contextData.locationInfo.geo[0],
                lng: contextData.locationInfo.geo[1],
            });
            setMarkerPosition({
                lat: contextData.locationInfo.geo[0],
                lng: contextData.locationInfo.geo[1],
            });
        }
    }, [contextData.locationInfo]);

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
                setSolarPotential(false); // Show chart for section 3
            }
        }
    };

    return (
        <>
            <section className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-md-8 position-relative">
                        <GoogleMap
                            mapContainerStyle={{ height: '110vh', width: '100%' }}
                            center={mapCenter}
                            zoom={20}
                            options={{
                                mapTypeId: 'satellite',
                                disableDefaultUI: true,
                            }}
                        >
                            {data.locationInfo && (
                                <>
                                    {markerPosition && (
                                        <Marker
                                            position={markerPosition}
                                            onClick={() => setShowInfoWindow(true)} // Show info window on marker click
                                        />
                                    )}
                                    {showInfoWindow && markerPosition && (
                                        <InfoWindow
                                            position={markerPosition}
                                            onCloseClick={() => setShowInfoWindow(false)} // Close info window
                                        >
                                            <div>
                                                <h4>Building Insights</h4>
                                                <p>Panel Count: {contextData.userInfo.panelcount}</p>
                                                <p>Roof Area: {contextData.userInfo.roofarea}</p>
                                                <p>Sunshine Hours: {contextData.userInfo.sunshine}</p>
                                            </div>
                                        </InfoWindow>
                                    )}
                                    {circleCenter && (
                                        <Circle
                                            center={circleCenter}
                                            radius={circleRadius}
                                            options={{
                                                fillColor: 'rgba(255, 0, 0, 0.2)',
                                                strokeColor: 'rgba(255, 0, 0, 0.5)',
                                                strokeWeight: 2,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </GoogleMap>

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
                                        <span className="value">{contextData.userInfo?.sunshine || 'N/A'}</span>
                                    </div>
                                    <div className="data-row">
                                        <span>Roof area</span>
                                        <span className="value">{contextData.userInfo?.roofarea || 'N/A'}</span>
                                    </div>
                                    <div className="data-row">
                                        <span>Max panel count</span>
                                        <span className="value">{contextData.userInfo?.maxPanelCount || 'N/A'}</span>
                                    </div>
                                    <div className="data-row">
                                        <span>CO₂ savings</span>
                                        <span className="value">{contextData.userInfo?.carbonOffsetFactorKgPerMwh || 'N/A'}</span>
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

                    <div className="col-md-4 d-flex align-items-center" style={{ background: "#f8f8f8", height: "auto", marginTop: "-3%" }}>
                        <div className="container">
                            <div className="text-center" style={{ marginTop: '10%' }}>
                                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                                    <input
                                        type="text"
                                        className="form-control mb-2 mb-sm-0 me-sm-2" // Add margin-bottom for spacing on mobile
                                        placeholder="Enter a valid address"
                                        style={{ flex: '1' }} // Allow input to grow
                                    />
                                    <a
                                        onClick={() => navigate('/finalpurposal')}
                                        className="button-arrow" // Add Bootstrap button classes for styling
                                    >
                                        <i className="fas fa-long-arrow-alt-right ms-2" style={{ fontSize: '30px' }}></i>
                                    </a>
                                </div>
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

                            <div className="d-flex flex-row justify-content-center align-items-center text-center" style={{ marginTop: '8%' }}>
                                <div className="me-2"> {/* Add margin-end for spacing between buttons */}
                                    <a
                                        className="group-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Show Proposal
                                    </a>
                                </div>
                                <div>
                                    <a
                                        className="group-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Contact Me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Powered by MC3
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter your first name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter your last name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="enter your email"
                                        />
                                    </div>
                                </div>
                                <div id="emailHelp" className="form-text">
                                    To fill this form then you move next
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="d-flex flex-row justify-content-center align-items-center text-center">
                                <button type="button" className="group-btns">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}