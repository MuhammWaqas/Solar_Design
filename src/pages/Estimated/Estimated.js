import React from "react"
import { useNavigate } from 'react-router-dom';


export default function Estimated() {
    const navigate = useNavigate();

    return (
        <>
            <div
                style={{
                    height: "120vh",
                    backgroundImage:
                        "url(assets/img/hero-section.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                className="position-relative w-100"
            >
                <div
                    className="position-absolute text-white d-flex flex-column align-items-center justify-content-center"
                    style={{
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        // backgroundColor: "rgba(0, 0, 0, 0.44)"
                    }}
                >

                    <h1 className="mb-4 mt-2 font-weight-bold text-center"
                        style={{
                            fontWeight: '900',
                            fontSize: '40px',
                            boxShadow: 'rgba(0, 0, 0, 0.29)'


                        }}>
                        Explore Solar Options <br />
                        Without Sharing Personal Info
                    </h1>
                    <div className="text-center mt-4">
                        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <input
                                type="text"
                                className="form-control mb-2 mb-sm-0 me-sm-2" // Add margin-bottom for spacing on mobile
                                placeholder="Enter a valid address"
                                style={{ flex: '1' }} // Allow input to grow
                            />
                            <a
                                onClick={() => navigate('/estimatedaddress')}
                                className="button-elemented" // Add Bootstrap button classes for styling
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
