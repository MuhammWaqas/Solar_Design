import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EstimatedAddress() {
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

                    <div className="card" style={{ width: '60%', height: '93vh' }}>
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


                        <div className="row g-0 h-100 mt-4">
                            <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600' }}>
                                Do you own or lease this property?</h2>

                            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center text-center">
                                <div className="radio-container">
                                    <input type="radio" id="radio1" name="option" className="custom-radio" />
                                    <label htmlFor="radio1" className="radio-label">I own</label>
                                </div>
                                <div className="radio-container mt-2">
                                    <input type="radio" id="radio2" name="option" className="custom-radio" />
                                    <label htmlFor="radio2" className="radio-label">I don't own, but I represent the owner</label>
                                </div>
                                <div className="radio-container mt-2">
                                    <input type="radio" id="radio3" name="option" className="custom-radio" />
                                    <label htmlFor="radio3" className="radio-label">I own</label>
                                </div>

                                <div className="mt-4">
                                    <a
                                        onClick={() => navigate('/estimatedbill')}
                                        className="button-elementd"
                                    >
                                        NEXT
                                        <i className="fas fa-long-arrow-alt-right ms-2" style={{ fontSize: '30px' }}></i>
                                    </a>
                                </div>
                                <div className="mt-3">
                                    <a
                                        onClick={() => navigate('/estimatedaddress')}
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
                        height: 95vh !important;
                        padding: 20px !important;
                    }
                }
            `}</style>
        </>
    );
}