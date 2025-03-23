import React, { useState } from "react";
import Final from '../FinalResult/Final';
import SolarEstimated from '../FinalResult/SolarEstimated';
import Graph from '../FinalResult/Graph';

export default function FinalPurposal() {
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        email: "ywdg@gmail.com",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Final />
            <SolarEstimated />
            <Graph />

            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="form-container">
                    <form className="user-form">
                        <label>First name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder=""
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        <label>Second name</label>
                        <input
                            type="text"
                            name="secondName"
                            placeholder="Second name"
                            value={formData.secondName}
                            onChange={handleChange}
                        />

                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <div className="d-flex justify-content-center">
                            <a className="button-elementd btn btn-primary">
                                NEXT
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
