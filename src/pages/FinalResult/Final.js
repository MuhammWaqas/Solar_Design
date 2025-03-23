import React, { useState } from "react";

export default function Final() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <>
            <section className="container-fluid p-0 mt-2">
                <div className="row g-0">
                    <div className="col-md-8">
                        <img
                            src={"assets/img/final_solarsystem.png"}
                            alt="Solar System Map"
                            className="img-fluid w-100"
                            style={{ height: "100vh", objectFit: "cover" }}
                        />
                    </div>

                    <div className="col-md-4 d-flex align-items-center" style={{ background: "#f8f8f8", height: "100vh", marginTop: "-3%" }}>
                        <div className="container">
                            {/* Search Box */}
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Enter a valid address" />
                            </div>

                            <p className="text-muted text-center mt-4">
                                Click an area below to see what type of information the Solar API can provide.
                            </p>

                            {/* Card Section */}
                            <div className="custom-card p-3 shadow rounded mt-4">
                                {/* Section 1 */}
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
                                        <i className={`fas fa-chevron-${openSection === "section1" ? "up" : "down"}`}></i>
                                    </div>
                                    {openSection === "section1" && (
                                        <div className="section-content ps-4 text-secondary">
                                            <div className="row">
                                                <div className="col-6 text-start">
                                                    <p><strong>Penal count</strong> </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <p>32 Penal</p>
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
                                                        <label htmlFor="toggle" style={{marginLeft: '5px'}}>
                                                            Solar Penal{" "}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                                <hr />

                                {/* Section 2 */}
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

                                {/* Section 3 */}
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
