import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PhoneNumber() {
    const navigate = useNavigate();

    return (
        <>
            <div
                style={{
                    height: "100vh",
                    backgroundImage: "url(assets/img/hero-section.png)",
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
                    }}
                >

                    <div className="card" style={{ width: '50%', height: '90vh' }}>
                        <div className="container-fluid">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-md-12 text-center">
                                    <img
                                        src='assets/img/hero-sun.png'
                                        alt='Logo'
                                        className="img-fluid"
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <h2 style={{ textAlign: 'center', marginTop: '3%', fontSize: '20px', fontWeight: '600' }}>
                        What is the best phone number to reach you? </h2>
                        <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '3%' }}>A brief phone call can often better help installers tailor to you. EnergySage <br /> won't share your phone number unless you grant us permission.</p>
                        <div className="row g-0 h-100">
                            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center text-center">

                                {/* Left-align the label and input */}
                                <div className="w-100 text-start" style={{ marginLeft: '16%' }}>
                                    <label className="form-label">Phone Number</label>
                                </div>
                                <input type="number" className="form-control bill-s" placeholder="your job or company" />
                                <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '3%' }}>
                                    Your information is safe with us. <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>
                                </p>
                                <div className="mt-3">
                                    <a
                                        onClick={() => navigate('/finalresult')}
                                        className="button-elementd"
                                    >
                                        NEXT
                                        <i className="fas fa-long-arrow-alt-right ms-2" style={{ fontSize: '30px' }}></i>
                                    </a>
                                </div>
                                <div className="mt-3">
                                    <a
                                        onClick={() => navigate('/email')}
                                        style={{ color: 'rgba(255, 166, 0, 1)', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        back
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .card {
                        width: 90% !important; /* Use !important to ensure it overrides other styles */
                        height: 90vh !important;
                        padding: 20px !important;
                    }
                }
            `}</style>
        </>
    )
}
